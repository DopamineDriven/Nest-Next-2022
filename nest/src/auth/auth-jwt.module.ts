import { AuthJwtResolver } from "./auth-jwt.resolver";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthJwtStrategy } from "./auth-jwt.strategy";
import { ConfigService } from "@nestjs/config";
import { SecurityConfig } from "../common/config/config-interfaces.config";
import { GraphqlAuthGuard } from "../common/guards/graphql-auth.guard";
import { AuthJwtService } from "./auth-jwt.service";
import AuthJwtController from "./auth-jwt.controller";
import { PasswordModule } from "../password/password.module";
import { PrismaModule } from "../prisma/prisma.module";
import { jwtConstants } from "./constants/auth-jwt.constant";

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
            expiresIn: securityConfig?.expiresIn
          }
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [
    AuthJwtService,
    AuthJwtResolver,
    AuthJwtStrategy,
    GraphqlAuthGuard
  ],
  controllers: [AuthJwtController],
  exports: [GraphqlAuthGuard, AuthJwtService]
})
export class AuthJwtModule {}
