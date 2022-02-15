import {
  Resolver,
  Query,
  Mutation,
  Context,
  Info,
  Args
} from "@nestjs/graphql";
import { Inject, UseGuards } from "@nestjs/common";
import { EntryService } from "src/entry/entry.service";
import {
  CommentService,
  CommentUnionType,
  createEntryCommentUnion,
  EntryCommentUnion,
  EntryCommentUnionType
} from "./comment.service";
import { PrismaService } from "src/prisma";
import { AuthService } from "src/auth/auth-jwt.service";
import { CommentConnection } from "./model/comment-connection.model";
import { FindManyCommentsPaginatedInput } from "./inputs/comment-paginated.input";
import { EntryConnection, EntryEdge } from "src/entry/model/entry-connection.model";
import { FindManyEntriesPaginatedInput } from "src/entry/inputs/entry-paginated.input";

@Resolver("CommentResolver")
export class CommentResolver {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(CommentService) private readonly commentService: CommentService,
    @Inject(AuthService) private readonly authService: AuthService
  ) {}

  @Query(() => CommentConnection)
  async listComments(
    @Args("findManyCommentsPaginatedInput")
    params: FindManyCommentsPaginatedInput
  ) {
    return await this.commentService.siftComments(params);
  }

  @Query(() => [createEntryCommentUnion])
  async commentConnectionUnion(
    { unionField }: EntryCommentUnion<CommentUnionType<EntryCommentUnionType>>,
    @Args("findManyCommentsPaginatedInput", {
      type: () => FindManyCommentsPaginatedInput
    })
    commentParams: FindManyCommentsPaginatedInput,
    @Args("findManyEntriesPaginatedInput", {
      type: () => FindManyEntriesPaginatedInput
    })
    entryParams: FindManyEntriesPaginatedInput
  ): Promise<EntryConnection | CommentConnection> {
    return await this.commentService
      .entryCommentUnion({ unionField: unionField }, entryParams, commentParams)
      .then(async data => {
        // const resolve = data.id in EntryConnection ? data.id in EntryConnection : data.id in CommentConnection;
        return  data
      })

  }
}
