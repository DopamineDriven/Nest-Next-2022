import { isUUID } from "@nestjs/common/utils/is-uuid";
import {
  Args,
  createUnionType,
  Field,
  GqlExecutionContext,
  ID,
  ObjectType,
  Parent,
  Query,
  ResolveField,
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
import { Node, NodeImplementedUnion } from "./model/node.model";
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
import { GraphQLIsTypeOfFn, GraphQLResolveInfo } from "graphql/type";
import { Connection } from "src/connection";
import { Account } from "src/account";
import { Category } from "src/category";
import { PrismaService } from "src/prisma/prisma.service";
import { UnwrapPromise } from "@prisma/client";
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

export const NodeImplementedUnionConst = createUnionType<
  Type<NodeImplementedUnion>[]
>({
  name: "NodeBaseFieldUnion",
  types: () => [
    Account,
    Category,
    Comment,
    Connection,
    Entry,
    MediaItem,
    Profile,
    Session,
    User
  ],
  resolveType(
    { id }: NodeImplementedUnion,
    { getInfo }: GqlExecutionContext,
    info: GraphQLResolveInfo,
    abstract: GraphQLAbstractType
  ) {
    return id in User && abstract.name === User.name
      ? User
      : id in Entry && abstract.name === Entry.name
      ? Entry
      : id in Account && abstract.name === Account.name
      ? Account
      : id in Connection && abstract.name === Connection.name
      ? Connection
      : id in Category && abstract.name === Category.name
      ? Category
      : id in Comment && abstract.name === Comment.name
      ? Comment
      : id in Session && abstract.name === Session.name
      ? Session
      : id in Profile && abstract.name === Profile.name
      ? Profile
      : User ||
        Entry ||
        MediaItem ||
        Session ||
        Comment ||
        Connection ||
        Category ||
        Profile ||
        Account;
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
type Nullable<T> = T | null;
@Resolver(() => Node)
export class NodeResolver {
  constructor(
    private prismaService: PrismaService,
    @Inject(MediaItemService)
    private readonly mediaItemService: MediaItemService,
    @Inject(SessionService) private readonly sessionService: SessionService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(EntryService) private readonly entryService: EntryService,
    @Inject(CommentService) private readonly commentService: CommentService,
    @Inject(ProfileService) private readonly profileService: ProfileService // private readonly sessionService: SessionService
  ) {}
  assertAllTypesCovered(_x: never, id: string): never {
    throw new Error("could not find any resource with id: " + id);
  }

  @Query(() => NodeImplementedUnionConst, { name: "nodeField" })
  async nodeField(
    @Args("cursor", { type: () => String }) cursor: string
  ): Promise<Nullable<NodeImplementedUnion>> {
    const { type, id } = fromGlobalId(cursor) as {
      type:
        | "User"
        | "Entry"
        | "Connection"
        | "Account"
        | "Category"
        | "MediaItem"
        | "Comment"
        | "Session"
        | "Profile";
      id: string;
    };

    if (type === "User") {
      const user = await this.prismaService.user.findUnique({
        where: { id: cursor || id }
      });
      return user;
    }
    if (type === "Profile") {
      const profile = await this.prismaService.profile.findUnique({
        where: { id: cursor || id }
      });
      return profile;
    }

    if (type === "Entry") {
      const entry = await this.prismaService.entry.findUnique({
        where: { id: cursor || id }
      });
      return entry;
    }

    if (type === "MediaItem") {
      const mediaItem = await this.prismaService.mediaItem.findUnique({
        where: { id: cursor || id }
      });

      return mediaItem;
    }

    if (type === "Session") {
      const session = await this.prismaService.session.findUnique({
        where: { id: cursor || id }
      });
      return session;
    }

    if (type === "Comment") {
      const comment = await this.prismaService.comment.findUnique({
        where: { id: cursor }
      });
      return comment;
    }

    if (type === "Connection") {
      const connection = await this.prismaService.connection.findUnique({
        where: { id: cursor || id }
      });
      return connection;
    }
    if (type === "Category") {
      const category = await this.prismaService.category
        .findUnique({
          where: { id: cursor || id }
        })
        .then(category => category);
      return category;
    }
    return this.assertAllTypesCovered(type as unknown as never, id);
  }

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
