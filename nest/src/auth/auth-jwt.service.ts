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

import { Token } from "./model/token.model";
import { ConfigService } from "@nestjs/config";
import { JwtDecoded } from "./dto/jwt-decoded.dto";
import { SecurityConfig } from "../common/config/config-interfaces.config";

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
          role: payload.role,
          name: payload.name,
          status: payload.status,
          createdAt: new Date(Date.now()),
          emailVerified: new Date(Date.now()),
          image: payload.image
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
    // const signedToken = this.jwtService.sign(tokens, {
    //   algorithm: "HS256",
    //   noTimestamp: false,
    //   header: { alg: "HS256", typ: "JWT" },
    //   secret: jwtConstants.secret
    // });

    return this.generateTokens({
      userId: user.id
    });
  }

  async validateUser(userId: string | null): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { id: userId ? userId : "" }
    });
  }

  getUserFromToken(token: string): Promise<User | null> {
    console.log(token ?? "");
    const id = this.jwtService.decode(token, {
      complete: true
    }) as JwtDecoded;
    // new Storage().setItem("userId", id.payload.userId);
    // // Use reflector class ja feel
    // SetMetadata("USER_ID", id.payload.userId).KEY

    console.log(id);
    return this.prismaService.user.findUnique({
      where: { id: id.payload?.userId }
    });
  }
  generateTokens(payload: { userId: string }): Token {
    const { userId } = payload;
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
