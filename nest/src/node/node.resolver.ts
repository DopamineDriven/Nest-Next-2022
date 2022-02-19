import { isUUID } from "@nestjs/common/utils/is-uuid";
import {
  Args,
  createUnionType,
  Field,
  GqlExecutionContext,
  ID,
  ObjectType,
  Query,
  Resolver,
  Union,
  UnionOptions
} from "@nestjs/graphql";
import { fromGlobalId, globalIdField, toGlobalId } from "graphql-relay";
import { UserService } from "../user/user.service";
import { EntryService } from "../entry/entry.service";
import { User } from "../user/model/user.model";
import { Comment } from "src/comment/model/comment.model";
import { Entry } from "../entry/model/entry.model";
import { MediaItem } from "src/media/model/media.model";
import { MediaItemService } from "src/media/media.service";
import { Profile } from "../profile/model/profile.model";
import { ProfileService } from "../profile/profile.service";
// import { AccountService } from "../Services/AccountService/account.service";
// import { SessionService } from "../Services/SessionService/session.service";
import { Node } from "./model/node.model";
import { NodeService } from "./node.service";
import { ExecutionContext, Inject, Type } from "@nestjs/common";
import {
  CommentConnection,
  CommentEdge
} from "../comment/model/comment-connection.model";
import { CommentService } from "src/comment/comment.service";
import { UserConnection, UserEdge } from "src/user/model/user-connection.model";
import {
  EntryConnection,
  EntryEdge
} from "src/entry/model/entry-connection.model";
import {
  ProfileConnection,
  ProfileEdge
} from "src/profile/model/profile-connection.model";
import { SessionService } from "src/session/session.service";
import {
  SessionConnection,
  SessionEdge
} from "src/session/model/session-connection.model";
import { Session } from "src/session/model/session.model";
import {
  MediaItemConnection,
  MediaItemEdge
} from "src/media/model/media-connection";
import { ConnectionObjectType, ConnectionEdgeObjectType } from "src/common";
import { InstanceWrapper } from "@nestjs/core/injector/instance-wrapper";
import { FindManyUsersPaginatedInput } from "src/user/inputs/user-paginated-args.input";
import { FindManyEntriesPaginatedInput } from "src/entry/inputs/entry-paginated.input";
import { FindManyCommentsPaginatedInput } from "src/comment/inputs/comment-paginated.input";
import { FindManyProfilesPaginatedInput } from "src/profile/inputs/profile-paginated.input";
import { FindManySessionsPaginatedInput } from "src/session/inputs/sessions-paginated.input";
import { FindManyMediaItemsPaginatedInput } from "src/media/inputs/find-many-media-items-paginated.input";
import { ComprehensiveConnectionUnionPartialInput } from "./inputs/connection-union.input";
import { createContextId } from "@nestjs/core";
import {
  GraphQLError,
  GraphQLObjectType,
  GraphQLUnionType,
  isTypeSubTypeOf,
  Thunk,
  defaultTypeResolver,
  GraphQLAbstractType
} from "graphql";
import {
  DirectiveNode,
  Location,
  NamedTypeNode,
  NameNode,
  StringValueNode,
  UnionTypeDefinitionNode
} from "graphql/language";
import {
  GraphQLIsTypeOfFn,
  GraphQLTypeResolver,
  GraphQLUnionTypeConfig,
  GraphQLUnionTypeExtensions,
  GraphQLResolveInfo
} from "graphql/type";

export type Maybe<T> = T | null;
export type UnionOnEdge =
  | UserEdge
  | EntryEdge
  | MediaItemEdge
  | ProfileEdge
  | SessionEdge
  | CommentEdge;

export interface UnionOnEdgeExtended<T extends UnionOnEdge> {
  unionOnEdge: T;
}
@ObjectType("UnionOnEdgeObjectType")
export class UnionOnEdgeObjectType implements UnionOnEdgeExtended<UnionOnEdge> {
  @Field(() => UnionOnEdgeObjectType)
  unionOnEdge: UnionOnEdge;
}

class UnionTypeDef implements UnionTypeDefinitionNode {
  kind: "UnionTypeDefinition";
  description?: StringValueNode | undefined;
  directives?: readonly DirectiveNode[] | undefined;
  loc?: Location | undefined;
  name: NameNode;
  types?: readonly NamedTypeNode[] | undefined;
}

new GraphQLUnionType({
  name: "UnionEdge",
  types: <
    Thunk<GraphQLObjectType<UnionOnEdgeObjectType, GqlExecutionContext>[]>
  >{},
  astNode: <Union<UnionOnEdgeExtended<UnionOnEdge>[]>>{},
  description: "Top Level Union"
});

export type UnionOnNode =
  | UserConnection
  | EntryConnection
  | MediaItemConnection
  | ProfileConnection
  | SessionConnection
  | CommentConnection;

export const UnionNode = createUnionType<Type<UnionOnNode>[]>({
  name: "NodeUnion",
  types: () => [
    UserConnection,
    EntryConnection,
    MediaItemConnection,
    ProfileConnection,
    SessionConnection,
    CommentConnection
  ],
  resolveType(
    options: Type<
      | UserConnection
      | EntryConnection
      | MediaItemConnection
      | ProfileConnection
      | SessionConnection
      | CommentConnection
    >[],
    context: GqlExecutionContext,
    info: GraphQLResolveInfo,
    abstractType: GraphQLAbstractType
  ) {
    if (!options) {
      return new GraphQLError(`no ${options} returned`);
    }
    return (resolving: GraphQLIsTypeOfFn<UnionOnNode, GqlExecutionContext>) =>
      resolving(options, context, info).valueOf() ===
      (CommentConnection && abstractType.name === CommentConnection.name
        ? new CommentConnection()
        : UserConnection && abstractType.name === UserConnection.name
        ? new UserConnection()
        : ProfileConnection && abstractType.name === ProfileConnection.name
        ? new ProfileConnection()
        : SessionConnection && abstractType.name === SessionConnection.name
        ? new SessionConnection()
        : MediaItemConnection && abstractType.name === MediaItemConnection.name
        ? new MediaItemConnection()
        : EntryConnection && abstractType.name === EntryConnection.name
        ? new EntryConnection()
        : undefined);
  }
});

@ConnectionEdgeObjectType(UnionNode, { id: new Node().id })
export class NodeUnionEdge extends InstanceWrapper<
  Type<
    | UserConnection
    | EntryConnection
    | MediaItemConnection
    | ProfileConnection
    | SessionConnection
    | CommentConnection
  >
> {
  constructor() {
    super();
  }
  @Field(() => UnionNode)
  nodeUnion:
    | UserConnection
    | EntryConnection
    | MediaItemConnection
    | ProfileConnection
    | SessionConnection
    | CommentConnection;
}

@ConnectionObjectType(NodeUnionEdge)
export class NodeUnionConnection extends NodeUnionEdge {
  constructor() {
    super();
  }
}

@Resolver(() => Node)
export class NodeResolver {
  constructor(
    @Inject(MediaItemService)
    private readonly mediaItemService: MediaItemService,
    @Inject(SessionService) private readonly sessionService: SessionService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(EntryService) private readonly entryService: EntryService,
    @Inject(CommentService) private readonly commentService: CommentService,
    @Inject(ProfileService) private readonly profileService: ProfileService // private readonly sessionService: SessionService
  ) {}

  @Query(_returns => Node, { nullable: true })
  async node(@Args({ name: "id", type: () => ID }) id: string) {
    const { type, id: cursor } = fromGlobalId(id);
    if (!globalIdField(toGlobalId(type, cursor))) {
      return null;
    }
    return type === User.name && toGlobalId(type, cursor) in UserConnection
      ? await this.userService
          .relayFindUniqueUser({ id: toGlobalId(type, cursor) })
          .then(val => val as User)
      : type === Entry.name && toGlobalId(type, cursor) in EntryConnection
      ? await this.entryService
          .relayFindUniqueEntry({ id: toGlobalId(type, cursor) })
          .then(val => val as Entry)
      : type === Profile.name && toGlobalId(type, cursor) in ProfileConnection
      ? await this.profileService
          .relayFindUniqueProfile({ id: toGlobalId(type, cursor) })
          .then(prof => prof as Profile)
      : type === Comment.name && toGlobalId(type, cursor) in CommentConnection
      ? await this.commentService
          .relayFindUniqueComment({ id: toGlobalId(type, cursor) })
          .then(comment => comment as Comment)
      : type === Session.name && toGlobalId(type, cursor) in SessionConnection
      ? await this.sessionService
          .relayFindUniqueSession({ id: toGlobalId(type, cursor) })
          .then(sesh => sesh as Session)
      : type === MediaItem.name &&
        toGlobalId(type, cursor) in MediaItemConnection
      ? await this.mediaItemService
          .relayFindUniqueMediaItem({ id: toGlobalId(type, cursor) })
          .then(mediaItem => mediaItem as MediaItem)
      : toGlobalId(type, cursor) in
        (UserConnection ||
          EntryConnection ||
          ProfileConnection ||
          MediaItemConnection ||
          SessionConnection ||
          CommentConnection)
      ? (fromGlobalId(toGlobalId(type, cursor)).type as
          | typeof User.name
          | typeof Entry.name
          | typeof Profile.name
          | typeof Comment.name
          | typeof Session.name
          | typeof MediaItem.name)
      : null;
    // switch (toGlobalId(type, cursor)) {
    //   case typeof User:
    //     return await this.userService.relayFindUniqueUser({
    //       id: toGlobalId(type, cursor) in UserConnection ? await this.userService.relayFindUniqueUser({id: cursor}).then((val) => val as User)
    //     })
    //   case typeof Entry:
    //     return await this.entryService.relayFindUniqueEntry({
    //       id: resolvedGlobalId.id
    //     });
    //   case typeof MediaItem:
    //     return await this.mediaItemService.relayFindUniqueMediaItem({
    //       id: resolvedGlobalId.id
    //     });
    //   case typeof Profile:
    //     return await this.profileService.relayFindUniqueProfile({
    //       id: resolvedGlobalId.id
    //     });
    //   case toGlobalId("Comment", id).toString():
    //     return await this.commentService.relayFindUniqueComment({id: id})
    //   // case typeof Contact:
    //   //   return await this.contactService.relayFindUniqueEntry({
    //   //     id: resolvedGlobalId.id
    //   //   });
    //   // case AccountScalarFieldEnum.id:
    //   //   return await this.accountService.relayFindUniqueAccount({
    //   //     id: resolvedGlobalId.id
    //   //   });
    //   // case SessionScalarFieldEnum.id:
    //   //   return await this.sessionService.realyFindUniqueSession({
    //   //     id: resolvedGlobalId.id
    //   //   });
    //   default:
    //     break;
    // }
    // return toGlobalId(
    //   "User" || "Entry" || "Profile" || "MediaItem" || resolvedGlobalId.type,
    //   resolvedGlobalId.id
    // );
  }

  @Query(() => NodeUnionConnection)
  async nodeUnionResolver(
    @Args("manyUsers", { type: () => FindManyUsersPaginatedInput })
    manyUsers: FindManyUsersPaginatedInput,
    @Args("manyEntries", { type: () => FindManyEntriesPaginatedInput })
    manyEntries: FindManyEntriesPaginatedInput,
    @Args("manyComments", { type: () => FindManyCommentsPaginatedInput })
    manyComments: FindManyCommentsPaginatedInput,
    @Args("manyProfiles", { type: () => FindManyProfilesPaginatedInput })
    manyProfiles: FindManyProfilesPaginatedInput,
    @Args("manySessions", { type: () => FindManySessionsPaginatedInput })
    manySessions: FindManySessionsPaginatedInput,
    @Args("manyMediaItems", { type: () => FindManyMediaItemsPaginatedInput })
    manyMediaItems: FindManyMediaItemsPaginatedInput,
    @Args("id", { type: () => String }) id: Node
  ): Promise<NodeUnionConnection> {
    const getNodes = async (id: Node) => {
      switch (id.id in NodeUnionConnection) {
        case fromGlobalId(id.id).type in UserConnection:
          return await this.userService.usersPaginated(manyUsers);
        case fromGlobalId(id.id).type in EntryConnection:
          return await this.entryService.siftEntries(manyEntries);
        case fromGlobalId(id.id).type in CommentConnection:
          return await this.commentService.siftComments(manyComments);
        case fromGlobalId(id.id).type in ProfileConnection:
          return await this.profileService.listProfiles(manyProfiles);
        case fromGlobalId(id.id).type in SessionConnection:
          return await this.sessionService.listSessions(manySessions);
        case fromGlobalId(id.id).type in MediaItemConnection:
          return await this.mediaItemService.listMediaItems(manyMediaItems);
        default:
          break;
      }
    };
    return await getNodes(id)
      .then(data => data)
      .then();
  }

  @Query(() => [UnionNode])
  async comprehensiveConnectionUnion(): Promise<Array<typeof UnionNode>> {
    return [
      new CommentConnection(),
      new UserConnection(),
      new ProfileConnection(),
      new MediaItemConnection(),
      new SessionConnection(),
      new EntryConnection()
    ];
  }
}

/**
   // resolveType({prototype, name}:  | typeof UserEdge
  //   | typeof EntryEdge
  //   | typeof MediaEdge
  //   | typeof ProfileEdge
  //   |typeof SessionEdge
  //   | typeof CommentEdge, context: Node) {
  //  return ((fromGlobalId(context.id).id in UserEdge && fromGlobalId(context.id).type === name as "User"
  //   ? UserEdge
  //   : fromGlobalId(context.id).id in EntryEdge && fromGlobalId(context.id).type === name as "Entry"
  //   ? EntryEdge
  //   : fromGlobalId(context.id).id in ProfileEdge && fromGlobalId(context.id).type === name as "Entry"
  //   ? ProfileEdge
  //   : fromGlobalId(context.id).id === (prototype as MediaEdge).id
  //   ? MediaEdge
  //   : fromGlobalId(context.id).id === (prototype as SessionEdge).id
  //   ? SessionEdge
  //   : fromGlobalId(context.id).id === (prototype as CommentEdge).id
  //   ? new CommentEdge()
  //   : undefined))
  // }
 */
