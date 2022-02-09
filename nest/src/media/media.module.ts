import { MediaResolver } from "./media.resolver";
import { Module } from "@nestjs/common";
import { PaginationModule } from "../pagination/pagination.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PaginationModule, PrismaModule],
  providers: [MediaResolver]
})
export class MediaModule {}
