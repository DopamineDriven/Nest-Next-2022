import { AuthResolver } from "./auth-jwt.resolver";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthJwtStrategy } from "./auth-jwt.strategy";
import { ConfigService } from "@nestjs/config";
import { SecurityConfig } from "../common/config/config-interfaces.config";
import { GraphqlAuthGuard } from "../common/guards/graphql-auth.guard";
import { AuthService } from "./auth-jwt.service";
import { PasswordModule } from "../password/password.module";
import { PrismaModule } from "../prisma/prisma.module";
import AuthJwtController from "./auth-jwt.controller";

@Module({
  imports: [
    PrismaModule,
    PasswordModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>("security");
        return {
          secret: configService.get<string>("JWT_ACCESS_SECRET"),
          signOptions: {
            algorithm: "HS512",
            expiresIn: securityConfig?.expiresIn
          }
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [
    AuthResolver,
    AuthService,
    AuthJwtStrategy,
    GraphqlAuthGuard
  ],
  controllers: [AuthJwtController],
  exports: [GraphqlAuthGuard, AuthService, JwtModule]
})
export class AuthModule {}
