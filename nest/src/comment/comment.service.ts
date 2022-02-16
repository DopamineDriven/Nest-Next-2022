import {
  Args,
  Context,
  createUnionType,
  Field,
  GqlContextType,
  GqlExecutionContext,
  Info,
  InterfaceType,
  ObjectType,
  ResolveField,
  ReturnTypeFunc,
  ReturnTypeFuncValue
} from "@nestjs/graphql";
import { Injectable, Type, Inject, ExecutionContext } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "src/auth/auth-jwt.service";
import { EntryService } from "src/entry/entry.service";
import { FindManyCommentsPaginatedInput } from "./inputs/comment-paginated.input";
import { FindManyEntriesPaginatedInput } from "src/entry/inputs/entry-paginated.input";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { PaginationService } from "src/pagination/pagination.service";
import { Comment } from ".";
import { EntryConnection } from "src/entry/model/entry-connection.model";
import { CommentConnection } from "./model/comment-connection.model";
import { ClassType, Constructor } from "src/common/types/helpers.type";
import { UnwrapPromise } from "@prisma/client";
import {
  GraphQLAbstractType,
  GraphQLIsTypeOfFn,
  GraphQLResolveInfo,
  GraphQLTypeResolver,
  Source,
  __Type
} from "graphql";
import { ResolveTypeFactory } from "@nestjs/graphql/dist/schema-builder/factories/resolve-type.factory";
import { Entry } from "src/entry";
import { info } from "console";
import { CommentUpsertWithWhereUniqueWithoutAuthorInput } from "src/.generated/prisma-nestjs-graphql/comment/inputs/comment-upsert-with-where-unique-without-author.input";

type ResolveTypeFn<TSource = any, TContext = any> = (
  ...args: Parameters<GraphQLTypeResolver<TSource, TContext>>
) => any;
export type EntryCommentUnionType = EntryConnection | CommentConnection | null;
export const createEntryCommentUnion = createUnionType<
  Type<EntryCommentUnionType>[]
>({
  name: "EntryCommentUnion",
  types: () => [EntryConnection, CommentConnection],
  resolveType: (
    { id, authorId, author }: NonNullable<EntryCommentUnionType>,
    {},
    { schema, fieldName },
    { resolveType, name }
  ) => {
    return name === EntryConnection.name && id in EntryConnection
      ? typeof EntryConnection
      : name === CommentConnection.name && id in CommentConnection
      ? typeof CommentConnection
      : null;
  }
});
export interface CommentUnionType<T = EntryCommentUnionType> {
  new (...args: typeof createEntryCommentUnion[]): T extends infer U ? U : T;
}
@InterfaceType("EntryCommentUnion", {
  resolveType<
    TSource extends NonNullable<EntryCommentUnionType>,
    TContext extends GqlExecutionContext
  >(
    { id }: TSource,
    { getInfo }: TContext,
    { returnType }: GraphQLResolveInfo,
    { resolveType }: GraphQLAbstractType
  ): // { getArgByIndex, getClass, getInfo, getHandler, getContext, getType, setType, getRoot }: TContext,
  // { returnType, schema, variableValues, fieldName, parentType, fragments, fieldNodes }: GraphQLResolveInfo,
  // { inspect, toJSON, toString, resolveType, name, toConfig, astNode }: GraphQLAbstractType
  typeof EntryConnection | typeof CommentConnection {
    return id in EntryConnection && fromGlobalId(id).type.startsWith(Entry.name)
      ? EntryConnection
      : id in CommentConnection &&
        fromGlobalId(id).type.startsWith(Comment.name)
      ? CommentConnection
      : EntryConnection || CommentConnection;
  }
})
export abstract class EntryCommentUnion<
  T extends Type<NonNullable<EntryCommentUnionType>>
> {
  @Field(() => [createEntryCommentUnion])
  unionField: T[];
}

@ObjectType("EntryCommentUnionobj", { implements: () => [EntryCommentUnion] })
export class EntryCommentUnionobj
  implements EntryCommentUnion<Type<NonNullable<EntryCommentUnionType>>>
{
  /**
   *
   */
  unionField: Type<EntryConnection | CommentConnection>[];

  constructor() {
    __Type.isTypeOf as GraphQLIsTypeOfFn<
      Type<NonNullable<EntryConnection | CommentConnection>>,
      GqlExecutionContext
    >;
    //.apply((source: <Type<NonNullable<EntryConnection | CommentConnection>> & GqlExecutionContext > (Source.prototype.name, Context(), Info).valueOf().valueOf().constructor()
  }
}

@Injectable()
export class CommentService {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(EntryService) private entryService: EntryService,
    private readonly paginationService: PaginationService
  ) {}
  async siftComments(params: FindManyCommentsPaginatedInput) {
    return await findManyCursorConnection(
      args =>
        this.prismaService.comment.findMany({
          include: {
            author: true,
            entry: true
          },
          distinct: params.distinct,
          take: params.take,
          skip: params.skip,
          where: params.where,
          cursor: args.cursor,
          orderBy: params.orderBy,
          ...args
        }),
      () =>
        this.prismaService.comment.count({
          distinct: params.distinct,
          take: params.take,
          skip: params.skip,
          where: params.where,
          cursor: params.cursor
        }),
      {
        first: params.pagination.first ?? 10,
        last: params.pagination.last,
        before: params.pagination.before,
        after: params.pagination.after
      },
      {
        getCursor: (record: { id: string }) => {
          return record;
        },
        decodeCursor: (cursor: string) => fromGlobalId(cursor),
        encodeCursor: (cursor: { id: string }) =>
          toGlobalId(Comment.name, cursor.id)
      }
    );
  }
  async entryCommentUnion(
    { unionField }: EntryCommentUnionobj,
    entryParams: FindManyEntriesPaginatedInput,
    commentParams: FindManyCommentsPaginatedInput
  ): Promise<EntryConnection | CommentConnection> {
    const unionFieldId =
      unionField.find(entryConnection => entryConnection)?.name ?? "";
    return unionFieldId in EntryConnection.prototype
      ? ((await this.entryService
          .siftEntries(entryParams)
          .then(dataEntry => dataEntry)) as EntryConnection)
      : unionFieldId in CommentConnection.prototype
      ? ((await this.siftComments(commentParams).then(
          dataComment => dataComment
        )) as CommentConnection)
      : (null as unknown as EntryConnection | CommentConnection);
  }

  async relayFindUniqueComment(params: { id: string }) {
    const comment = await this.prismaService.comment.findUnique({
      where: { id: fromGlobalId(params.id).id }
    });
    if (!comment) {
      throw new Error("could not find comment with id " + params.id);
    }
    return comment;
  }

  async createOrUpdateComment(
    params: CommentUpsertWithWhereUniqueWithoutAuthorInput,
    token: string
  ): Promise<Comment[]> {
    const getUser = await this.authService.getUserWithDecodedToken(token);

    return (await this.prismaService.user.upsert({
      where: { id: getUser.jwt.payload.userId },
      include: {
        _count: true,
        entries: true,
        profile: true,
        mediaItems: true,
        sessions: true,
        comments: true,
        categories: true
      },
      create: {
        comments: {
          create: params.create,
          connect: params.where,
          connectOrCreate: { create: params.create, where: params.where }
        },
        id: getUser.auth.user.id,
        email: getUser.auth.user.email
      },
      update: {
        comments: {
          set: { authorId_entryId: params.where.authorId_entryId },
          create: params.create,
          connectOrCreate: { create: params.create, where: params.where }
        }
      }
    })) as unknown as Comment[];
  }
}
