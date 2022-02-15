import { Module } from "@nestjs/common";
import { EntryModule } from "src/entry/entry.module";
import { CommentResolver } from "./comment.resolver";
import { CommentService } from "./comment.service";
import { PaginationModule } from "../pagination/pagination.module";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "src/auth/auth-jwt.module";

@Module({
  imports: [PaginationModule, PrismaModule, AuthModule, EntryModule],
  providers: [CommentResolver, CommentService],
  exports: [CommentService]
})
export class CommentModule {}
