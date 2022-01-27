import { PrismaService } from "../prisma/prisma.service";
import { PasswordService } from "../password";
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  Inject,
  forwardRef,
  ForwardReference
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignupInput } from "./inputs/signup.input";
import { Prisma, User } from "@prisma/client";
import { AuthDetailed } from "./model/auth-detailed.model";
import { Token } from "./model/token.model";
import { ConfigService } from "@nestjs/config";
import { JwtDecoded } from "./dto/jwt-decoded.dto";
import { SecurityConfig } from "../common/config/config-interfaces.config";
import { Auth } from "./model/auth.model";
import { Session } from "../session/model/session.model";

@Injectable()
export class AuthJwtService {
  constructor(
    @Inject<ForwardReference<PrismaService>>(forwardRef(() => PrismaService))
    private readonly prismaService: PrismaService,
    @Inject<ForwardReference<JwtService>>(forwardRef(() => JwtService))
    private readonly jwtService: JwtService,
    @Inject<ForwardReference<PasswordService>>(
      forwardRef(() => PasswordService)
    )
    private readonly passwordService: PasswordService,
    @Inject<ForwardReference<ConfigService>>(forwardRef(() => ConfigService))
    private readonly configService: ConfigService
  ) {}

  async createUser(payload: SignupInput): Promise<Auth> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password
    );
    try {
      const user = await this.prismaService.user.create({
        data: {
          ...payload,
          email: payload.email,
          password: hashedPassword,
          role: payload.role,
          name: payload.name,
          status: payload.status,
          createdAt: new Date(Date.now()),
          emailVerified: new Date(Date.now()),
          image: payload.image
        }
      });
      const { accessToken, refreshToken } = this.generateTokens({
        userId: user.id
      });

      const {jwt, auth} = await this.getUserWithDecodedToken(accessToken)

      const userAndSesh = await this.prismaService.user.update({
        where: { id: auth.user.id },
        data: {
          accessToken: accessToken,
          sessions: {
          connectOrCreate: [
            {
              where: { accessToken: accessToken },
              create: {
                accessToken: accessToken,
                alg: jwt.header.alg,
                exp: jwt.payload.exp,
                iat: jwt.payload.iat,
                refreshToken: refreshToken,
                signature: jwt.signature,
                provider: jwt.header.typ,
                lastVerified: new Date(Date.now()),
                scopes: ["read", "write"],
                tokenState: "VALID"
              }
            }
          ]
          }
        },
        include: { sessions: true }
      });

      const getSessionWithUser = await this.prismaService.session.findMany({
        where: { userId: auth.user.id },
        include: { user: true }
      })

      const { sessions, ...userInfo } = userAndSesh;
      return {
        accessToken,
        refreshToken,
        user: userInfo,
        session: getSessionWithUser
      };
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

  async login(email: string, password: string) {
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

    const { accessToken, refreshToken } = this.generateTokens({
      userId: user.id
    });

    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        accessToken: accessToken,
        updatedAt: new Date(Date.now()),
        status: "ONLINE"
      }
    });

    return {
      accessToken,
      refreshToken,
      updatedUser
    };
  }

  async validateUser(userId: string | null): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { id: userId ? userId : "" }
    });
  }

  async getUserWithDecodedToken(token: string): Promise<AuthDetailed> {
    console.log(token ?? "");
    const id = this.jwtService.decode(token, {
      complete: true
    }) as JwtDecoded;

    const user = await this.prismaService.user.findUnique({
      where: { id: id.payload?.userId ? id.payload.userId : "" }
    });

    const { accessToken, refreshToken } = this.generateTokens({
      userId: user?.id ? user.id : ""
    });
    await this.prismaService.user.update({
      where: { id: user?.id },
      data: {
        accessToken: accessToken,
        sessions: {
          connectOrCreate: [
            {
              where: { accessToken: accessToken },
              create: {
                accessToken: accessToken,
                alg: id.header.alg,
                exp: id.payload.exp,
                iat: id.payload.iat,
                refreshToken: refreshToken,
                signature: id.signature,
                provider: id.header.typ,
                lastVerified: new Date(Date.now()),
                scopes: [""],
                tokenState: "valid"
              }
            }
          ]
        }
      },
      include: {sessions: true}
    });

    const findSesh = await this.prismaService.session.findMany({
      where: { userId: user?.id },
      include: { user: true }
    });
    return {
      auth: {
        user: user ? user : (null as unknown as User),
        accessToken,
        refreshToken,
        session: findSesh
      },
      jwt: id
    };
  }
  generateTokens(payload: { userId: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload)
    };
  }

  private generateAccessToken(payload: { userId: string }) {
    return this.jwtService.sign(payload, { algorithm: "HS512" });
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>("security");
    return this.jwtService.sign(payload, {
      algorithm: "HS512",
      secret: this.configService.get("JWT_REFRESH_SECRET")
    });
  }

  async refreshToken(token: string) {
    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get(
          process.env.JWT_REFRESH_SECRET ?? "JWT_REFRESH_SECRET"
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
