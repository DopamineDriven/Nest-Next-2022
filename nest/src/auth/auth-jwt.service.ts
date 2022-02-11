import { PrismaService } from "../prisma/prisma.service";
import { PasswordService } from "../password";
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException
} from "@nestjs/common";
import { User } from "../user/model/user.model";
import { JwtService } from "@nestjs/jwt";
import { SignupInput } from "./inputs/signup.input";
import { Prisma } from "@prisma/client";
import { AuthDetailed } from "./model/auth-detailed.model";
import { Token } from "./model/token.model";
import { ConfigService } from "@nestjs/config";
import { JwtDecoded } from "./dto/jwt-decoded.dto";
import { SecurityConfig } from "../common/config/config-interfaces.config";
// import { Auth, AuthSansSession } from "./model/auth.model";
// import { Session } from "../session/model/session.model";
// import { Role } from "src/.generated/prisma-nestjs-graphql/prisma/enums/role.enum";
import { LoginInput } from "./inputs";
import { Serializer } from "src/common/types/json.type";
import crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService
  ) {}
  async createUser(payload: SignupInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password
    );
    try {
      const user = await this.prismaService.user.create({
        data: {
          ...payload,
          email: payload.email,
          password: hashedPassword,
          role: payload.email.includes("andrew@windycitydevs.io")
            ? "SUPERADMIN"
            : payload.email.includes("andrew.simpson.ross@gmail.com")
            ? "SUPERADMIN"
            : "USER",
          firstName: payload.firstName,
          lastName: payload.lastName,
          status: "ONLINE",
          createdAt: new Date(Date.now()),
          emailVerified: new Date(Date.now()),
        }
      });
      return this.generateTokens({
        userId: user.id
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        throw new ConflictException(`Email ${payload.email} already used.`);
      } else {
        throw new Error(e as any);
      }
    }
  }
  excludeUserOrViewerField<User, Key extends keyof User>(
    user: User,
    ...keys: Key[]
  ): Omit<User, Key> {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  };
  async getUserWithDecodedToken(token: string) {
    const id = this.jwtService.decode(token, {
      complete: true
    }) as JwtDecoded;
    const user = await this.validateUser(id.payload.userId);
    const { accessToken, refreshToken } = this.generateTokens({
      userId: id.payload.userId
    });

    const userUpdate = await this.prismaService.user.update({
      where: { id: id.payload.userId },
      include: { _count: true, mediaItems: true, sessions: true },
      data: {
        status: { set: "ONLINE" },
        updatedAt: { set: new Date(Date.now()) },
        sessions: {
          upsert: [
            {
              update: {
                accessToken: accessToken,
                alg: { set: id.header.alg },
                exp: {
                  set: id.payload.exp
                },
                iat: {
                  set: id.payload.iat
                },
                refreshToken: { set: refreshToken },
                signature: { set: id.signature },
                provider: {
                  set: id.header.typ
                },
                lastVerified: { set: new Date(Date.now()) },
                scopes: {
                  set:
                    user?.role === "SUPERADMIN"
                      ? [
                        "read",
                        "write",
                        "edit",
                        "administer",
                        "impersonate"
                      ]
                      : user?.role === "ADMIN"
                        ? ["read", "write", "edit", "administer"]
                        : user?.role === "MAINTAINER"
                          ? ["read", "write", "edit"]
                          : ["read", "write"]
                },
                tokenState: { set: "valid" }
              },
              where: { userId: id.payload.userId },
              create: {
                accessToken: accessToken,
                alg: id.header.alg,
                exp: id.payload.exp,
                iat: id.payload.iat,
                refreshToken: refreshToken,
                signature: id.signature,
                provider: id.header.typ,
                lastVerified: new Date(Date.now()),
                scopes:
                  user?.role === "SUPERADMIN"
                    ? ["read", "write", "edit", "administer", "impersonate"]
                    : user?.role === "ADMIN"
                      ? ["read", "write", "edit", "administer"]
                      : user?.role === "MAINTAINER"
                        ? ["read", "write", "edit"]
                        : ["read", "write"],
                tokenState: "valid"
              }
            }
          ],
        }
      }
    }).then(data => data);

    const dataSpread = { session: userUpdate.sessions, user: { ...userUpdate }};
    const authDetailed = {
      auth: {
        accessToken,
        refreshToken,
        session: dataSpread.session[0],
        user: dataSpread.user
      },
      jwt: id
    };

    return {
      ...authDetailed
    };
  }

  async signIn({ email, password }: LoginInput): Promise<AuthDetailed> {
    if (!email || email === new NotFoundException(`email`).message) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const hash = await this.passwordService.hashPassword(password);
    const passwordValid = await this.passwordService.validatePassword(
      password,
      hash
    );

    if (!passwordValid) {
      throw new BadRequestException("Invalid password");
    }

    const userInfoo =  await this.prismaService.user
    .findFirst({
      where: {
        email: email
      },
      select: { id: true }
    })
      .then(id => id).then((id) => {
      return this.generateTokens({userId: id?.id ? id.id : ""})
      }).then(async({ accessToken }) => accessToken)

    const { jwt, auth } = await this.getUserWithDecodedToken(
      userInfoo ? userInfoo : ""
    );

    const userInfo = await this.prismaService.user.update({
      where: { id: auth.user?.id ? auth.user.id : "" },
      include: { _count: true, mediaItems: true, sessions: true },
      data: {
        updatedAt: new Date(Date.now()),
        status: "ONLINE",
        sessions: {
          connectOrCreate: [
            {
              where: { userId: jwt.payload.userId },
              create: {
                accessToken: userInfoo ?? auth.accessToken,
                alg: jwt.header.alg,
                exp: jwt.payload.exp,
                iat: jwt.payload.iat,
                refreshToken: auth.refreshToken,
                signature: jwt.signature,
                provider: jwt.header.typ,
                lastVerified: new Date(Date.now()),
                scopes: ["read", "write"],
                tokenState: "VALID"
              }
            }
          ]
        }
      }
    }).then((data) => data);
    const dataSpread = { session: userInfo.sessions, user: { ...userInfo }};


    return {
      auth: {
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
        session: dataSpread.session[0],
        user: dataSpread.user
      },
      jwt: jwt
    };
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password
    );

    if (!passwordValid) {
      throw new BadRequestException("Invalid password");
    }

    return this.generateTokens({
      userId: user.id
    });
  }

  async validateUser(userId: string | null) {
    return await this.prismaService.user.findUnique({
      include: { _count: true, mediaItems: true },
      where: { id: userId ? userId : "" }
    });
  }

  toBase64Url(data: AuthDetailed) {
    return Buffer.from(
      new Serializer<AuthDetailed>().serialize(
        JSON.parse("authDetailed", () => ({
          reviver: (key: RegExp, value: AuthDetailed) => ({
            this: this,
            key: /([test ])/ === key,
            value: data === value
          })
        }))
      )
    );
  }

  fromBase64Url(value: WithImplicitCoercion<string | Uint8Array | readonly number[]>, data: AuthDetailed) {
    return Buffer.from("base64").toString("utf-8");
  }

  getUserFromToken(token: string) {
    console.log(token ?? "");

    const id = this.jwtService.decode(token, {
      complete: true
    }) as JwtDecoded;
    return this.prismaService.user.findUnique({
      include: { _count: true, mediaItems: true },
      where: { id: id.payload.userId }
    });
  }

  generateTokens(payload: { userId: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload)
    };
  }

  private generateAccessToken(payload: { userId: string }) {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>("security");
    return this.jwtService.sign(payload, {
      secret: securityConfig?.secret
        ? securityConfig.secret
        : process.env.JWT_ACCESS_SECRET
        ? process.env.JWT_ACCESS_SECRET
        : ""
    });
  }

  async refreshToken(token: string) {
    try {
      const secuityConfig = this.configService.get<SecurityConfig>("security");
      const user = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get(
          secuityConfig?.refreshSecret
            ? secuityConfig.refreshSecret
            : process.env.JWT_REFRESH_SECRET
            ? process.env.JWT_REFRESH_SECRET
            : "JWT_REFRESH_SECRET"
        )
      });
      console.log(user ?? "");
      return this.generateTokens({
        userId: user.userId
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
