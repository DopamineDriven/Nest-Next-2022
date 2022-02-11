import { Module } from "@nestjs/common";
import { ViewerService } from "./viewer.service";
import { PasswordModule } from "../password/password.module";
import { PaginationModule } from "../pagination/pagination.module";
import { PrismaModule } from "../prisma/prisma.module";
import { PasswordService } from "../password";
import { AuthModule } from "../auth/auth-jwt.module";

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [PasswordService, ViewerService],
  exports: [ViewerService]
})
export class ViewerModule {}
