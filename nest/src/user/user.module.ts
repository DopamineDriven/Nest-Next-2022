import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { PasswordModule } from "../password/password.module";
import { PaginationModule } from "../pagination/pagination.module";
import { AuthJwtModule } from "../auth/auth-jwt.module";
import { PrismaModule } from "../prisma/prisma.module";
import { PasswordService } from "../password";
import { AuthJwtService } from "../auth/auth-jwt.service";

@Module({
  imports: [PaginationModule, PrismaModule],
  providers: [UserResolver, UserService, PasswordService],
  exports: [UserService]
})
export class UserModule {}
