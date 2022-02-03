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

  async getUserWithDecodedToken(token: string): Promise<AuthDetailed> {
    console.log(token ?? "");
    const id = this.jwtService.decode(token, {
      complete: true
    }) as JwtDecoded;
    const user = await this.validateUser(id.payload.userId);
    const { accessToken, refreshToken } = this.generateTokens({
      userId: id.payload.userId
    });
    const prismaTransaction = await this.prismaService.$transaction(
      async prisma => {
        const userUpdate = await prisma.user.update({
          where: { id: id.payload.userId },
          data: {
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
          }
        });
        const findSesh = await prisma.session.findFirst({
          where: { userId: id.payload.userId },
          orderBy: { lastVerified: "asc" }
        });
        return { user: userUpdate, session: findSesh };
      },
      { maxWait: 5000, timeout: 10000 }
    );

    const authDetailed = {
      auth: {
        accessToken,
        refreshToken,
        session: prismaTransaction.session,
        user: prismaTransaction.user
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

    const { accessToken, refreshToken } = this.generateTokens({
      userId: (await this.prismaService.user.findFirst({
        where: {
          email: email
        },
        select: {id: true}
      }).then(id => id))?.id as unknown as string
    });
    const { jwt, auth } = await this.getUserWithDecodedToken(
      accessToken ? accessToken : ""
    );

    const userInfo = await this.prismaService.user.update({
      where: { id: auth.user?.id ? auth.user.id : "" },
      data: {
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
      }
    });
    const session = await this.prismaService.session.findFirst({
      where: { userId: jwt.payload.userId }
    });

    return {
      auth: {
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
        session: session,
        user: userInfo
      },
      jwt: jwt    };
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
    return this.prismaService.user.findUnique({
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
// async register<T extends Prisma.UserCreateArgs>(payload: SelectingSubset<T, Prisma.UserCreateArgs>): Promise<AuthSansSession> {
//   try {
//     const hashedPassword = await this.passwordService.hashPassword(
//       payload.data.password ? payload.data.password : ""
//     );
//     const user = await this.prismaService.user.create({
//       data: {
//         email: payload.data.email,
//         password: hashedPassword,
//         status: "ONLINE",
//         role: payload.data.email.includes("andrew@windycitydevs.io")
//           ? "SUPERADMIN"
//           : payload.data.email.includes("andrew.simpson.ross@gmail.com")
//             ? "SUPERADMIN"
//             : "USER",
//         firstName: payload.data.firstName,
//         lastName: payload.data.lastName,
//         createdAt: new Date(Date.now()),
//         emailVerified: new Date(Date.now()),
//         image: payload.data.image
//       }
//     });

//     const { accessToken, refreshToken } = this.generateTokens({
//       userId: user.id
//     });
//     return user
//       ? accessToken && refreshToken
//         ? {
//           user: user,
//           accessToken: accessToken,
//           refreshToken
//         }
//         : {
//           user: user,
//           accessToken: "bad generate",
//           refreshToken: "bad generate"
//         }
//       : {
//         user: null,
//         accessToken: "bad access",
//         refreshToken: "bad refresh"
//       };
//   } catch (e) {
//     if (
//       e instanceof Prisma.PrismaClientKnownRequestError &&
//       e.code === "P2002"
//     ) {
//       throw new ConflictException(`Email ${payload.email} already used.`);
//     } else {
//       throw new Error(e as any).message;
//     }
//   }
// }
// async createUser(payload: SignupInput): Promise<Auth> {
//   const hashedPassword = await this.passwordService.hashPassword(
//     payload.password
//   );

//   const prismaTransactionUpsertAndQueryData =
//     await this.prismaService.user.create({
//       data: {
//         ...payload,
//         email: payload.email,
//         password: hashedPassword,
//         role: payload.email.includes("andrew@windycitydevs.io")
//           ? "SUPERADMIN"
//           : payload.email.includes("andrew.simpson.ross@gmail.com")
//             ? "SUPERADMIN"
//             : "USER",
//         firstName: payload.firstName,
//         lastName: payload.lastName,
//         status: "ONLINE",
//         createdAt: new Date(Date.now()),
//         emailVerified: new Date(Date.now()),
//         image: payload.image
//       }
//     });
//   const { accessToken, refreshToken } = this.generateTokens({
//     userId: prismaTransactionUpsertAndQueryData.id
//   });

//   const { jwt, auth } = await this.getUserWithDecodedToken(
//     accessToken ? accessToken : ""
//   );
//   try {
//     const { user, session } = await this.prismaService
//       .$transaction([
//         this.prismaService.user.update({
//           where: { id: jwt.payload.userId },
//           data: {
//             status: "ONLINE",
//             updatedAt: new Date(Date.now()),
//             sessions: {
//               connectOrCreate: [
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
//               ]
//             }
//           }
//         }),
//         this.prismaService.session.findFirst({
//           where: { userId: jwt.payload.userId },
//           orderBy: { lastVerified: "asc" }
//         })
//       ])
//       .then(val => {
//         return {
//           user: val[0],
//           session: val[1]
//         };
//       });
//     return {
//       refreshToken: auth.refreshToken ? auth.refreshToken : refreshToken,
//       accessToken: auth.accessToken ? auth.accessToken : accessToken,
//       user: user,
//       session: session
//     };
//   } catch (e) {
//     if (
//       e instanceof Prisma.PrismaClientKnownRequestError &&
//       e.code === "P2002"
//     ) {
//       throw new ConflictException(`Email ${payload.email} already used.`);
//     } else {
//       throw new Error(`[open-ended error in user create]: ${e}`);
//     }
//   }
// }

// async login(email: string, password: string): Promise<AuthDetailed> {
//   const user = await this.prismaService.user.findUnique({ where: { email } });
//   if (!user) {
//     throw new NotFoundException(`No user found for email: ${email}`);
//   }
//   const passwordValid = await this.passwordService.validatePassword(
//     password,
//     user.password
//   );

//   if (!passwordValid) {
//     throw new BadRequestException("Invalid password");
//   }

//   const { accessToken, refreshToken } = this.generateTokens({
//     userId: user.id
//   });
//   const { jwt, auth } = await this.getUserWithDecodedToken(
//     accessToken ? accessToken : ""
//   );

//   const loginTransaction = await this.prismaService.$transaction(
//     async prisma => {
//       const userInfo = await prisma.user.update({
//         where: { id: user.id },
//         data: {
//           updatedAt: new Date(Date.now()),
//           status: "ONLINE",
//           sessions: {
//             connectOrCreate: [
//               {
//                 where: { userId: jwt.payload.userId },
//                 create: {
//                   accessToken: accessToken,
//                   alg: jwt.header.alg,
//                   exp: jwt.payload.exp,
//                   iat: jwt.payload.iat,
//                   refreshToken: refreshToken,
//                   signature: jwt.signature,
//                   provider: jwt.header.typ,
//                   lastVerified: new Date(Date.now()),
//                   scopes: ["read", "write"],
//                   tokenState: "VALID"
//                 }
//               }
//             ]
//           }
//         }
//       });
//       const session = await prisma.session.findFirst({
//         where: { userId: jwt.payload.userId },
//         orderBy: { lastVerified: "asc" }
//       });
//       return userInfo
//         ? session
//           ? {
//             user: userInfo,
//             session: session
//           }
//           : { user: userInfo, session: null }
//         : { userInfo: null, session: null };
//     }, { maxWait: 5000, timeout: 10000 }
//   );

//   return {
//     jwt: jwt,
//     auth: auth
//   };
// }

// async validateUser(userId: string | null): Promise<User | null> {
//   return await this.prismaService.user.findUnique({
//     where: { id: userId ? userId : "" },
//     include: { _count: true }
//   });
// }

// getUserFromToken(token: string): Promise<User | null> {
//   console.log(token ?? "");
//   const id = this.jwtService.decode(token, {
//     complete: true
//   }) as JwtDecoded;
//   // new Storage().setItem("userId", id.payload.userId);
//   // // Use reflector class ja feel
//   // SetMetadata("USER_ID", id.payload.userId).KEY

//   console.log(id);
//   return this.prismaService.user.findUnique({
//     where: { id: id.payload.userId }
//   });
// }

// async getUserWithDecodedToken(token: string): Promise<AuthDetailed> {
//   console.log(token ?? "");
//   const id = this.jwtService.decode(token, {
//     complete: true
//   }) as JwtDecoded;
//   const user = await this.validateUser(id.payload.userId);
//   const { accessToken, refreshToken } = this.generateTokens({
//     userId: id.payload.userId
//   });
//   const prismaTransaction = await this.prismaService.$transaction(
//     async prisma => {
//       const userUpdate = await prisma.user.update({
//         where: { id: id.payload.userId },
//         data: {
//           status: "ONLINE",
//           updatedAt: new Date(Date.now()),
//           sessions: {
//             connectOrCreate: [
//               {
//                 where: { userId: id.payload.userId },
//                 create: {
//                   accessToken: accessToken,
//                   alg: id.header.alg,
//                   exp: id.payload.exp,
//                   iat: id.payload.iat,
//                   refreshToken: refreshToken,
//                   signature: id.signature,
//                   provider: id.header.typ,
//                   lastVerified: new Date(Date.now()),
//                   scopes:
//                     user?.role === "SUPERADMIN"
//                       ? ["read", "write", "edit", "administer", "impersonate"]
//                       : user?.role === "ADMIN"
//                         ? ["read", "write", "edit", "administer"]
//                         : user?.role === "MAINTAINER"
//                           ? ["read", "write", "edit"]
//                           : ["read", "write"],
//                   tokenState: "valid"
//                 }
//               }
//             ]
//           }
//         }
//       });
//       const findSesh = await prisma.session.findFirst({
//         where: { userId: id.payload.userId },
//         orderBy: { lastVerified: "asc" }
//       });
//       return { user: userUpdate, session: findSesh };
//     },
//     { maxWait: 5000, timeout: 10000 }
//   );

//   return {
//     auth: {
//       user: prismaTransaction.user,
//       accessToken,
//       refreshToken,
//       session: prismaTransaction.session
//     },
//     jwt: id
//   };
// }

// generateTokens(payload: { userId: string }): Token {
//   return {
//     accessToken: this.generateAccessToken(payload),
//     refreshToken: this.generateRefreshToken(payload)
//   };
// }
// generateAccessToken(payload: { userId: string }) {
//   const securityConfig = this.configService.get<SecurityConfig>("security");
//   return this.jwtService.sign(payload, {
//     algorithm: "HS512",
//     secret: securityConfig?.secret
//   });
// }
// generateRefreshToken(payload: { userId: string }): string {
//   const securityConfig = this.configService.get<SecurityConfig>("security");
//   return this.jwtService.sign(payload, {
//     algorithm: "HS512",
//     secret: securityConfig?.secret
//   });
// }
// async refreshToken(token: string) {
//   try {
//     const user = await this.jwtService.verifyAsync(token, {
//       algorithms: ["HS512", "HS256"],
//       complete: true,
//       secret: this.configService.get<SecurityConfig>("security")?.secret
//     });
//     console.log(user ?? "");
//     return this.generateTokens({
//       userId: user.userId
//     });
//   } catch (e) {
//     throw new UnauthorizedException();
//   }
// }
