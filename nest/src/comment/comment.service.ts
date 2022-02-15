import {
  Args,
  Context,
  createUnionType,
  Field,
  InterfaceType,
  ResolveField,
  ReturnTypeFuncValue
} from "@nestjs/graphql";
import { Injectable, Type, Inject } from "@nestjs/common";
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

export type EntryCommentUnionType = EntryConnection | CommentConnection | null;
export const createEntryCommentUnion = createUnionType<
  Type<EntryCommentUnionType>[]
>({
  name: "EntryCommentUnion",
  types: () => [EntryConnection, CommentConnection],
  resolveType: (
    { id, authorId,  }: NonNullable<EntryCommentUnionType>,
    {},
    { schema, fieldName },
    { resolveType, name }
  ) => {
    return name.includes("Entry")
      ? name === EntryConnection.name && id in EntryConnection
      : name.includes("Comment")
      ? name === CommentConnection.name && id in CommentConnection
      : null;
  }
})

export interface CommentUnionType<T = EntryCommentUnionType> {
  new (...args: typeof createEntryCommentUnion[]): T;
}
@InterfaceType("EntryCommentUnion")
export declare class EntryCommentUnion<T extends CommentUnionType<EntryCommentUnionType>> {
  @Field(() => [createEntryCommentUnion])
unionField: T[]
}

@Injectable()
export class CommentService {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(EntryService) private readonly entryService: EntryService,
    private readonly paginationService: PaginationService
  ) { }
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
    { unionField }: EntryCommentUnion<CommentUnionType<EntryCommentUnionType>>,
    entryParams: FindManyEntriesPaginatedInput,
    commentParams: FindManyCommentsPaginatedInput
  ): Promise<EntryConnection | CommentConnection> {

    const unionFieldId = unionField.find(entryConnection => entryConnection)?.name ?? "";
    return (unionFieldId in EntryConnection.prototype)
      ? (await this.entryService.siftEntries(entryParams).then((dataEntry => dataEntry) ) as EntryConnection)
      : (unionFieldId in CommentConnection.prototype)
        ? (await this.siftComments(commentParams).then(dataComment => dataComment) as CommentConnection)
        : null as unknown as (EntryConnection | CommentConnection);
  }

  async siftViewerComments(
    params: FindManyCommentsPaginatedInput,
    token: string
  ) {
    const getToken = await this.authService
      .getUserWithDecodedToken(token)
      .then(async ({ auth, jwt }) => {
        return await this.siftComments(params);
      });
  }
}
