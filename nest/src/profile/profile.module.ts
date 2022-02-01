import { ProfileResolver } from "./profile.resolver";
import { Module } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { PaginationModule } from "../pagination/pagination.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PaginationModule, PrismaModule],
  providers: [ProfileResolver, ProfileService],
  exports: [ProfileService]
})
export class ProfileModule {}
