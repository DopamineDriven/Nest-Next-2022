import { PrismaService } from "../prisma/prisma.service";
import { PasswordService } from "./password.service";
import {
  Injectable,
  NotFoundException,
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
import { LoginInput } from "./inputs";
import { Serializer } from "src/common/types/json.type";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import { serialize } from "cookie";
import { Response } from "express";
import { Role } from "src/.generated/prisma-nestjs-graphql/prisma/enums/role.enum";
import { Session } from "src/session/model";
import { Auth } from "./model";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService
  ) {}

  public maxAge = 60 * 60 * 360; // 360 hours ~ 15 days
  setTokenCookie(res: Response, token: string) {
    const authConfig = this.configService.get<SecurityConfig>("security");
    const cookie = serialize(
      authConfig?.secret
        ? authConfig.secret
        : `${process.env.JWT_SECRET ?? ""}`,
      token,
      {
        maxAge: this.maxAge, // 360 hours ~ 15 days
        expires: new Date(Date.now() + this.maxAge * 1000),
        httpOnly: false,
        secure: process.env.NODE_ENV === "production" ? true : false,
        path: "/",
        sameSite: "lax"
      }
    );
    return res.setHeader("Set-Cookie", cookie);
  }

  async createNewUser(dataRegister: SignupInput): Promise<AuthDetailed> {
    try {
      const registerUser = await this.prismaService.user
        .create({
          data: {
            role: dataRegister.email.includes("andrew@windycitydevs.io")
              ? Role.SUPERADMIN
              : Role.USER,
            status: "ONLINE",
            emailVerified: new Date(Date.now()),
            email: dataRegister.email,
            firstName: dataRegister.firstName,
            image:
              dataRegister.image ??
              "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g4apn65eo8acy988pfhb.gif",
            lastName: dataRegister.lastName,
            password: await this.passwordService.hashPassword(
              dataRegister.password
            ),
            createdAt: new Date(Date.now())
          }
        })
        .then(async user => {
          const generateAccessAndRefreshTokens = this.generateTokens({
            userId: user.id
          });

          if (generateAccessAndRefreshTokens) {
            const { header, payload, signature } = this.jwtService.decode(
              generateAccessAndRefreshTokens.accessToken,
              { complete: true }
            ) as JwtDecoded;
            return await this.prismaService.user
              .update({
                include: { sessions: true },
                where: { id: user.id },
                data: {
                  status: { set: "ONLINE" },
                  updatedAt: { set: new Date(Date.now()) },
                  sessions: {
                    create: {
                      accessToken: generateAccessAndRefreshTokens.accessToken,
                      refreshToken: generateAccessAndRefreshTokens.refreshToken,
                      alg: header.alg,
                      exp: payload.exp,
                      iat: payload.iat,
                      lastVerified: new Date(Date.now()),
                      provider: "JWT",
                      signature: signature,
                      scopes:
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
                          : ["read", "write"],
                      tokenState: "valid"
                    }
                  }
                }
              })
              .then(data => {
                return {
                  auth: {
                    accessToken: generateAccessAndRefreshTokens.accessToken,
                    refreshToken: generateAccessAndRefreshTokens.refreshToken,
                    session: data.sessions[0] as Session,
                    user: {
                      createdAt: data.createdAt,
                      email: data.email,
                      emailVerified: data.emailVerified,
                      firstName: data.firstName,
                      id: data.id,
                      image: data.image,
                      lastName: data.lastName,
                      password: data.password,
                      role: data.role,
                      status: data.status,
                      updatedAt: data.updatedAt
                    } as User
                  },
                  jwt: {
                    header: header,
                    payload: payload,
                    signature: signature
                  }
                } as AuthDetailed;
              });
          } else {
            const { accessToken, refreshToken } = this.generateTokens({
              userId: user.id
            });
            const decode = this.jwtService.decode(accessToken ?? "", {
              complete: true
            }) as JwtDecoded;
            return await this.prismaService.user
              .update({
                include: { sessions: true },
                data: {
                  status: { set: "ONLINE" },
                  updatedAt: { set: new Date(Date.now()) },
                  sessions: {
                    create: {
                      accessToken: accessToken,
                      refreshToken: refreshToken,
                      alg: decode.header.alg,
                      exp: decode.payload.exp,
                      iat: decode.payload.iat,
                      lastVerified: new Date(Date.now()),
                      provider: "JWT",
                      signature: decode.signature,
                      scopes:
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
                          : ["read", "write"],
                      tokenState: "valid"
                    }
                  }
                },
                where: { id: user.id }
              })
              .then(data => {
                return {
                  auth: {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    session: data.sessions[0] as Session,
                    user: {
                      createdAt: data.createdAt,
                      email: data.email,
                      emailVerified: data.emailVerified,
                      firstName: data.firstName,
                      id: data.id,
                      image: data.image,
                      lastName: data.lastName,
                      password: data.password,
                      role: data.role,
                      status: data.status,
                      updatedAt: data.updatedAt
                    } as User
                  },
                  jwt: decode
                } as AuthDetailed;
              });
          }
        });
      console.log(registerUser);
      return registerUser;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        throw new ConflictException(
          `Email ${dataRegister.email} already used.`
        );
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
  }

  async getViewerFromContext(viewerId: string) {
    return await this.validateUser(viewerId);
  }

  async getUserWithDecodedToken(token: string): Promise<AuthDetailed> {
    const { header, payload, signature } = this.jwtService.decode(token, {
      complete: true
    }) as JwtDecoded;

    return await this.prismaService.session
      .findFirst({
        orderBy: { iat: "desc" },
        where: { user: { id: { equals: payload.userId } } },
        include: { user: { include: { _count: true, sessions: true } } }
      })
      .then(payload => {
        const user = payload?.user;
        return {
          auth: {
            accessToken: token,
            refreshToken: payload?.refreshToken,
            user: {
              password: user?.password,
              createdAt: user?.createdAt,
              email: user?.email,
              emailVerified: user?.emailVerified,
              firstName: user?.firstName,
              id: user?.id,
              image: user?.image,
              lastName: user?.lastName,
              role: user?.role,
              status: user?.status,
              updatedAt: user?.updatedAt,
              _count: user?._count,
              sessions: user?.sessions
            },
            session: {
              accessToken: payload?.accessToken,
              alg: payload?.alg,
              exp: payload?.exp,
              iat: payload?.iat,
              id: payload?.id,
              lastVerified: payload?.lastVerified,
              provider: payload?.provider,
              refreshToken: payload?.refreshToken,
              scopes: payload?.scopes,
              signature: payload?.signature,
              tokenState: payload?.tokenState,
              userId: payload?.userId,
              user: payload?.user
            } as Session
          },
          jwt: {
            header,
            payload,
            signature
          }
        } as AuthDetailed;
      });
  }
  async signIn({ email, password }: LoginInput): Promise<AuthDetailed> {
    if (!email || email === new NotFoundException(`email`).message) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const hash = await this.passwordService.hashPassword(password);
    const passwordValid = await this.passwordService.validatePassword({
      password: password,
      encryptedPassword: hash
    });

    if (passwordValid == false) {
      throw new PrismaClientValidationError(
        "Invalid password" + process.exitCode
      );
    }

    const authDetailed = await this.prismaService.session
      .findFirst({
        where: {
          user: { email: { equals: email } }
        },
        include: { user: true }
      })
      .then(payload => {
        return {
          accessToken: payload?.accessToken,
          refreshToken: payload?.refreshToken,
          user: payload?.user,
          session: {
            accessToken: payload?.accessToken,
            alg: payload?.alg,
            exp: payload?.exp,
            iat: payload?.iat,
            id: payload?.id,
            lastVerified: payload?.lastVerified,
            provider: payload?.provider,
            refreshToken: payload?.refreshToken,
            scopes: payload?.scopes,
            signature: payload?.signature,
            tokenState: payload?.tokenState,
            userId: payload?.userId,
            user: payload?.user
          } as Session
        } as Auth;
      })
      .then(async authJwt => {
        const getNewTokes = this.generateTokens({
          userId: authJwt.user.id
        });
        const getDecodedTokeVal = this.jwtService.decode(
          (getNewTokes?.accessToken as string) ?? "",
          { complete: true }
        ) as JwtDecoded;
        return await this.prismaService.user
          .update({
            include: { sessions: true },
            where: { id: authJwt.user.id },
            data: {
              status: { set: "ONLINE" },
              updatedAt: { set: new Date(Date.now()) },
              sessions: {
                create: {
                  accessToken: getNewTokes.accessToken,
                  refreshToken: getNewTokes.refreshToken,
                  alg: getDecodedTokeVal.header.alg,
                  exp: getDecodedTokeVal.payload.exp,
                  iat: getDecodedTokeVal.payload.iat,
                  lastVerified: new Date(Date.now()),
                  provider: "JWT",
                  signature: getDecodedTokeVal.signature,
                  scopes:
                    authJwt.user?.role === "SUPERADMIN"
                      ? ["read", "write", "edit", "administer", "impersonate"]
                      : authJwt.user?.role === "ADMIN"
                      ? ["read", "write", "edit", "administer"]
                      : authJwt.user?.role === "MAINTAINER"
                      ? ["read", "write", "edit"]
                      : ["read", "write"],
                  tokenState: "valid"
                }
              }
            }
          })
          .then(dataReturned => {
            return {
              auth: {
                accessToken: getNewTokes.accessToken,
                refreshToken: getNewTokes.refreshToken,
                user: dataReturned as User,
                session:
                  dataReturned.sessions && dataReturned.sessions.length > 1
                    ? dataReturned.sessions.sort((a, b) => b.iat! - a.iat!)[0]
                    : (dataReturned.sessions[0] as Session)
              },
              jwt: getDecodedTokeVal as JwtDecoded
            };
          });
      });

    return {
      auth: {
        accessToken: authDetailed.auth?.accessToken,
        refreshToken: authDetailed.auth?.refreshToken,
        session: authDetailed.auth.session,
        user: authDetailed.auth.user
      },
      jwt: authDetailed.jwt
    };
  }

  async login(email: string, password: string): Promise<Token> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword({
      encryptedPassword:
        user.password ?? (await this.passwordService.hashPassword(password)),
      password: password
    });

    if (!passwordValid) {
      throw new PrismaClientValidationError("Invalid password").message;
    }

    return this.generateTokens({
      userId: user.id
    });
  }

  async validateUser(userId: string | null) {
    return await this.prismaService.user.findUnique({
      include: {
        _count: true,
        mediaItems: true,
        sessions: true
      },
      where: { id: userId ? userId : "" }
    });
  }

  toBase64Url(data: AuthDetailed) {
    return Buffer.from(
      new Serializer<AuthDetailed>().serialize(
        JSON.parse("authDetailed", () => ({
          reviver: (key: RegExp, value: AuthDetailed) => ({
            this: this,
            key: /([test])/ === key,
            value: data === value ? data : value
          })
        }))
      )
    );
  }

  getDecodedJwtComplete(token: string) {
    return this.jwtService.decode(token, { complete: true }) as JwtDecoded;
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
      secret: this.configService.get("JWT_REFRESH_SECRET"),
      expiresIn: securityConfig?.refreshIn ?? "7d"
    });
  }

  async updatePassword(
    updatePasswordInput: { oldPassword: string; newPassword: string },
    tokenFromContext: string
  ): Promise<User> {
    return await this.getUserFromToken(tokenFromContext)
      .then(async dataUser => {
        const crossCompare = await this.passwordService.validatePassword({
          password: updatePasswordInput.oldPassword,
          encryptedPassword: dataUser?.password ? dataUser.password : ""
        });

        if (crossCompare === false) {
          throw new PrismaClientValidationError("Invalid password").message;
        }
        return {
          user: dataUser,
          validationResult: crossCompare
        };
      })
      .then(async data => {
        return await this.prismaService.user.update({
          where: data.user?.id
            ? { id: data.user.id }
            : { email: data.user?.email },
          data: {
            password: await this.passwordService.hashPassword(
              updatePasswordInput.newPassword
            ),
            status: "ONLINE",
            updatedAt: new Date(Date.now())
          }
        });
      })
      .then(user => user);
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get("JWT_REFRESH_SECRET")
      });

      return this.generateTokens({
        userId
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
