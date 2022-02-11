import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { EntryModule } from "../entry/entry.module";
import { ProfileModule } from "../profile/profile.module";
import { NodeResolver } from "./node.resolver";
import { NodeService } from "./node.service";
import { ResolveTypeFactory } from "@nestjs/graphql/dist/schema-builder/factories/resolve-type.factory";

import { MediaModule } from "src/media/media.module";

@Module({
  imports: [EntryModule, UserModule, ProfileModule, MediaModule],
  providers: [NodeResolver, NodeService],
  exports: [NodeService]
})
export class NodeModule {}
