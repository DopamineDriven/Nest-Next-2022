import { ExecutionContext } from "@nestjs/common";
import { Resolver, ResolveField } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import { CommentConnection } from "src/comment/model/comment-connection.model";
import { EntryConnection } from "src/entry/model/entry-connection.model";
import { MediaItemConnection } from "src/media/model/media-connection";
import { ProfileConnection } from "src/profile/model/profile-connection.model";
import { SessionConnection } from "src/session/model/session-connection.model";
import { UserConnection } from "src/user/model/user-connection.model";
import { Unionize } from "utility-types";
import { UnionOnNode, UnionNode } from "./node.resolver";

@Resolver("NodeUnion")
export class NodeUnionResolver {
  @ResolveField()
  __resolveType(
    {}: UnionOnNode,
    {}: ExecutionContext,
    { fieldName }: GraphQLResolveInfo
  ) {
    if (fieldName.includes("User")) {
      return UserConnection;
    }
    if (fieldName.includes("Entry")) {
      return EntryConnection;
    }
    if (fieldName.includes("MediaItem")) {
      return MediaItemConnection;
    }
    if (fieldName.includes("Comment")) {
      return CommentConnection;
    }
    if (fieldName.includes("Session")) {
      return SessionConnection;
    }
    if (fieldName.includes("Profile")) {
      return ProfileConnection;
    }
    return null;
  }

  
}
