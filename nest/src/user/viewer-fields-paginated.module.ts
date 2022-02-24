import { ViewerFieldsPaginatedResolver } from "./viewer-fields-paginated.resolver";
import { ViewerFieldsPaginatedService } from "./viewer-fields-paginated.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { SessionModule } from "src/session/session.module";
import { CommentModule } from "src/comment/comment.module";
import { EntryModule } from "src/entry/entry.module";
import { MediaModule } from "src/media/media.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    PrismaModule,
    SessionModule,
    CommentModule,
    EntryModule,
    MediaModule
  ],
  providers: [ViewerFieldsPaginatedService, ViewerFieldsPaginatedResolver],
  exports: [ViewerFieldsPaginatedService]
})
export class ViewerFieldsPaginatedModule {}
