import { Module } from "@nestjs/common";
import { ViewerService } from "./viewer.service";
import { PasswordModule } from "../auth/password.module";
import { PaginationModule } from "../pagination/pagination.module";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth-jwt.module";
import { ViewerResolver } from "./viewer.resolver";

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ViewerService, ViewerResolver],
  exports: [ViewerService]
})
export class ViewerModule {}
