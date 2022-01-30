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
import { User } from "../user/model/user.model";
import { JwtService } from "@nestjs/jwt";
import { SignupInput } from "./inputs/signup.input";
import { Prisma } from "@prisma/client";
import { AuthDetailed } from "./model/auth-detailed.model";
import { Token } from "./model/token.model";
import { ConfigService } from "@nestjs/config";
import { JwtDecoded } from "./dto/jwt-decoded.dto";
import { SecurityConfig } from "../common/config/config-interfaces.config";
import { Auth } from "./model/auth.model";
import { Session } from "../session/model/session.model";
import { Role } from "src/.generated/prisma-nestjs-graphql/prisma/enums/role.enum";

@Injectable()
export class AuthJwtService {
  constructor(
    @Inject<typeof PrismaService>(PrismaService)
    private readonly prismaService: PrismaService,
    @Inject<typeof JwtService>(JwtService)
    private readonly jwtService: JwtService,
    @Inject<typeof PasswordService>(PasswordService)
    private readonly passwordService: PasswordService,
    @Inject<typeof ConfigService>(ConfigService)
    private readonly configService: ConfigService
  ) {}

  async createUser(payload: SignupInput): Promise<Auth> {
    try {
      return await this.prismaService.$transaction(
        async prisma => {
          const hashedPassword = await this.passwordService.hashPassword(
            payload.password
          );

          const prismaTransactionUpsertAndQueryData = await prisma.user.create({
            data: {
              ...payload,
              email: payload.email,
              password: hashedPassword,
              role: payload.email.includes(
                "andrew@windycitydevs.io" || "andrew.simpson.ross@gmail.com"
              )
                ? Role.SUPERADMIN
                : Role.USER,
              name: payload.name,
              status: payload.status,
              createdAt: new Date(Date.now()),
              emailVerified: new Date(Date.now()),
              image: payload.image
            }
          });

          const { accessToken, refreshToken } = this.generateTokens({
            userId: prismaTransactionUpsertAndQueryData.id
          });

          const { jwt, auth } = await this.getUserWithDecodedToken(accessToken);

          const userUpdate = await prisma.user.update({
            where: { id: jwt.payload.userId },
            data: {
              accessToken: accessToken,
              status: "ONLINE",
              updatedAt: new Date(Date.now()),
              sessions: {
                connectOrCreate: [
                  {
                    where: { userId: jwt.payload.userId },
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

          const findCurrentUserSesh = await prisma.session.findFirst({
            where: { userId: jwt.payload.userId },
            include: { user: true },
            orderBy: { lastVerified: "asc" }
          });

          const { sessions, ...userInfo } = userUpdate;

          return {
            refreshToken: auth.refreshToken,
            accessToken: auth.accessToken,
            user: userInfo,
            session: findCurrentUserSesh
          };
        },
        { maxWait: 2500, timeout: 5000 }
      );
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        throw new ConflictException(`Email ${payload.email} already used.`);
      } else {
        throw new Error(`[open-ended error in user create]: ${e}`);
      }
    }
  }

  async login(email: string, password: string) {
    try {
      return await this.prismaService.$transaction(
        async prisma => {
          const user = await prisma.user.findUnique({ where: { email } });
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
          const { jwt, auth } = await this.getUserWithDecodedToken(accessToken);
          const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
              accessToken: accessToken,
              updatedAt: new Date(Date.now()),
              status: "ONLINE",
              sessions: {
                connectOrCreate: [
                  {
                    where: { userId: jwt.payload.userId },
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

          return {
            accessToken,
            refreshToken,
            updatedUser
          };
        },
        { maxWait: 2500, timeout: 5000 }
      );
    } catch (err) {}
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
    const user = await this.validateUser(id.payload.userId);
    const { accessToken, refreshToken } = this.generateTokens({
      userId: id.payload.userId
    });

    const updateUserAndSeshQueryRecentSeshTransaction =
      await this.prismaService.$transaction([
        this.prismaService.user.update({
          where: { id: id.payload.userId },
          data: {
            accessToken: accessToken,
            status: "ONLINE",
            updatedAt: new Date(Date.now()),
            sessions: {
              connectOrCreate: [
                {
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
              ]
            }
          },
          include: { sessions: true }
        }),
        this.prismaService.session.findFirst({
          where: { userId: id.payload.userId },
          include: { user: true },
          orderBy: { lastVerified: "asc" }
        })
      ]);
    const { sessions, ...userInfo } =
      updateUserAndSeshQueryRecentSeshTransaction[0];
    return {
      auth: {
        user: userInfo,
        accessToken,
        refreshToken,
        session: updateUserAndSeshQueryRecentSeshTransaction[1]
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
// import { PrismaService } from "../prisma/prisma.service";
// import { PasswordService } from "../password";
// import {
//   Injectable,
//   NotFoundException,
//   BadRequestException,
//   ConflictException,
//   UnauthorizedException,
//   Inject,
//   forwardRef,
//   ForwardReference
// } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
// import { SignupInput } from "./inputs/signup.input";
// import { Prisma, User } from "@prisma/client";
// import { AuthDetailed } from "./model/auth-detailed.model";
// import { Token } from "./model/token.model";
// import { ConfigService } from "@nestjs/config";
// import { JwtDecoded } from "./dto/jwt-decoded.dto";
// import { SecurityConfig } from "../common/config/config-interfaces.config";
// import { Auth } from "./model/auth.model";
// import { Session } from "../session/model/session.model";

// @Injectable()
// export class AuthJwtService {
//   constructor(
// @Inject<typeof PrismaService>(PrismaService)
// private readonly prismaService: PrismaService,
// @Inject<typeof JwtService>(JwtService)
// private readonly jwtService: JwtService,
// @Inject<typeof PasswordService>(PasswordService)
// private readonly passwordService: PasswordService,
// @Inject<typeof ConfigService>(ConfigService)
// private readonly configService: ConfigService
//   ) {}

//   async createUser(payload: SignupInput): Promise<Auth> {
//     const hashedPassword = await this.passwordService.hashPassword(
//       payload.password
//     );
//     try {
//       const user = await this.prismaService.user.create({
//         data: {
//           ...payload,
//           email: payload.email,
//           password: hashedPassword,
//           role: payload.role,
//           name: payload.name,
//           status: payload.status,
//           createdAt: new Date(Date.now()),
//           emailVerified: new Date(Date.now()),
//           image: payload.image
//         }
//       });
//       const { accessToken, refreshToken } = this.generateTokens({
//         userId: user.id
//       });

//       const { jwt, auth } = await this.getUserWithDecodedToken(accessToken);
//       const prismaTransaction = await this.prismaService.$transaction([
//         this.prismaService.user.upsert({
//           include: { sessions: true },
//           create: { accessToken: accessToken },
//           update: {
//             accessToken: accessToken,
//             status: "ONLINE",
//             sessions: {
//               connectOrCreate: {
//                 create: [
//                   {
//                     where: { userId: jwt.payload.userId },
//                     create: {
//                       accessToken: accessToken,
//                       alg: jwt.header.alg,
//                       exp: jwt.payload.exp,
//                       iat: jwt.payload.iat,
//                       refreshToken: refreshToken,
//                       signature: jwt.signature,
//                       provider: jwt.header.typ,
//                       lastVerified: new Date(Date.now()),
//                       scopes: ["read", "write"],
//                       tokenState: "VALID"
//                     }
//                   }
//                 ],
//                 where: { userId: jwt.payload.userId }
//               }
//             }
//           },
//           where: { id: jwt.payload.userId }
//         }),
//         this.prismaService.session.findFirst({
//           where: { userId: jwt.payload.userId },
//           orderBy: { lastVerified: "asc" },
//           include: { user: true }
//         })
//       ]);

//       const { sessions, ...userInfo } = prismaTransaction[0];
//       return {
//         accessToken,
//         refreshToken,
//         user: userInfo,
//         session: prismaTransaction[1]
//       };
//     } catch (e) {
//       if (
//         e instanceof Prisma.PrismaClientKnownRequestError &&
//         e.code === "P2002"
//       ) {
//         throw new ConflictException(`Email ${payload.email} already used.`);
//       } else {
//         throw new Error(e as any);
//       }
//     }
//   }

//   async login(email: string, password: string) {
//     const user = await this.prismaService.user.findUnique({ where: { email } });

//     if (!user) {
//       throw new NotFoundException(`No user found for email: ${email}`);
//     }

//     const passwordValid = await this.passwordService.validatePassword(
//       password,
//       user.password
//     );

//     if (!passwordValid) {
//       throw new BadRequestException("Invalid password");
//     }

//     const { accessToken, refreshToken } = this.generateTokens({
//       userId: user.id
//     });

//     const jwt = (await this.getUserWithDecodedToken(accessToken)).jwt;

//     const prismaTransaction = await this.prismaService.$transaction([
//       this.prismaService.user.upsert({
//         include: { sessions: true },
//         create: { accessToken: accessToken },
//         update: {
//           accessToken: accessToken,
//           status: "ONLINE",
//           sessions: {
//             connectOrCreate: {
//               create: [
//                 {
//                   where: { userId: jwt.payload.userId },
//                   create: {
//                     accessToken: accessToken,
//                     alg: jwt.header.alg,
//                     exp: jwt.payload.exp,
//                     iat: jwt.payload.iat,
//                     refreshToken: refreshToken,
//                     signature: jwt.signature,
//                     provider: jwt.header.typ,
//                     lastVerified: new Date(Date.now()),
//                     scopes: ["read", "write"],
//                     tokenState: "VALID"
//                   }
//                 }
//               ],
//               where: { userId: jwt.payload.userId }
//             }
//           }
//         },
//         where: { id: jwt.payload.userId }
//       }),
//       this.prismaService.session.findFirst({
//         where: { userId: jwt.payload.userId },
//         orderBy: { lastVerified: "asc" },
//         include: { user: true }
//       })
//     ]);

//     return {
//       accessToken,
//       refreshToken,
//       user: prismaTransaction[0],
//       session: prismaTransaction[1]
//     };
//   }

//   async validateUser(userId: string | null): Promise<User | null> {
//     return await this.prismaService.user.findUnique({
//       where: { id: userId ? userId : "" }
//     });
//   }

//   async getUserWithDecodedToken(token: string): Promise<AuthDetailed> {
//     console.log(token ?? "");
//     const id = this.jwtService.decode(token, {
//       complete: true
//     }) as JwtDecoded;

//     const { accessToken, refreshToken } = this.generateTokens({
//       userId: id.payload.userId
//     });

//     const getUserWithDecodedTokenTransaction =
//       await this.prismaService.$transaction([
//         this.prismaService.user.findFirst({
//           where: { id: id.payload.userId }
//         }),
//         this.prismaService.user.update({
//           where: { id: id.payload.userId },
//           data: {
//             accessToken: accessToken,
//             status: "ONLINE",
//             updatedAt: new Date(Date.now()),
//             sessions: {
//               connectOrCreate: [
//                 {
//                   where: { userId: id.payload.userId },
//                   create: {
//                     accessToken: accessToken,
//                     alg: id.header.alg,
//                     exp: id.payload.exp,
//                     iat: id.payload.iat,
//                     refreshToken: refreshToken,
//                     signature: id.signature,
//                     provider: id.header.typ,
//                     lastVerified: new Date(Date.now()),
//                     scopes: [""],
//                     tokenState: "valid"
//                   }
//                 }
//               ]
//             }
//           },
//           include: { sessions: true }
//         }),
//         this.prismaService.session.findFirst({
//           where: { userId: id.payload.userId },
//           include: { user: true },
//           orderBy: { lastVerified: "asc" }
//         })
//       ]);

//     return {
//       auth: {
//         user: getUserWithDecodedTokenTransaction[0],
//         accessToken,
//         refreshToken,
//         session: getUserWithDecodedTokenTransaction[2]
//       },
//       jwt: id
//     };
//   }
//   generateTokens(payload: { userId: string }): Token {
//     return {
//       accessToken: this.generateAccessToken(payload),
//       refreshToken: this.generateRefreshToken(payload)
//     };
//   }

//   private generateAccessToken(payload: { userId: string }) {
//     return this.jwtService.sign(payload, { algorithm: "HS512" });
//   }

//   private generateRefreshToken(payload: { userId: string }): string {
//     const securityConfig = this.configService.get<SecurityConfig>("security");
//     return this.jwtService.sign(payload, {
//       algorithm: "HS512",
//       secret: this.configService.get("JWT_REFRESH_SECRET")
//     });
//   }

//   async refreshToken(token: string) {
//     try {
//       const user = await this.jwtService.verifyAsync(token, {
//         secret: this.configService.get(
//           process.env.JWT_REFRESH_SECRET ?? "JWT_REFRESH_SECRET"
//         )
//       });
//       console.log(user ?? "");
//       return this.generateTokens({
//         userId: user.userId
//       });
//     } catch (e) {
//       throw new UnauthorizedException();
//     }
//   }
// }
