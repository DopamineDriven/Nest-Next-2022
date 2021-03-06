import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { PasswordModule } from "../auth/password.module";
import { PaginationModule } from "../pagination/pagination.module";
import { PrismaModule } from "../prisma/prisma.module";
import { PasswordService } from "../auth/password.service";
import { AuthModule } from "../auth/auth-jwt.module";

@Module({
  imports: [PaginationModule, PrismaModule, AuthModule, PasswordModule],
  providers: [UserResolver, UserService, PasswordService],
  exports: [UserService]
})
export class UserModule {}
