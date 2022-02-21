import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { EntryModule } from "../entry/entry.module";
import { ProfileModule } from "../profile/profile.module";
import { NodeResolver } from "./node.resolver";
import { CommentModule } from "src/comment/comment.module";
import { NodeService } from "./node.service";
import { ResolveTypeFactory } from "@nestjs/graphql/dist/schema-builder/factories/resolve-type.factory";
import { SessionModule } from "src/session/session.module";
import { MediaModule } from "src/media/media.module";
import { NodeUnionResolver } from "./comprehensive-union.resolver";
import { PrismaModule } from "src/prisma";

@Module({
  imports: [
    EntryModule,
    CommentModule,
    UserModule,
    ProfileModule,
    PrismaModule,
    MediaModule,
    SessionModule
  ],
  providers: [NodeResolver, NodeService],
  exports: [NodeService]
})
export class NodeModule {}
