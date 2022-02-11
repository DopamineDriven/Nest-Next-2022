import { MediaResolver } from "./media.resolver";
import { Module } from "@nestjs/common";
import { PaginationModule } from "../pagination/pagination.module";
import { PrismaModule } from "../prisma/prisma.module";
import { MediaItemService } from "./media.service";
@Module({
  imports: [PaginationModule, PrismaModule],
  providers: [MediaResolver, MediaItemService],
  exports: [MediaItemService]
})
export class MediaModule {}
