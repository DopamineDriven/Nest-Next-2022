import {
  Resolver,
  Query,
  Mutation,
  Context,
  Args,
  Subscription,
  Info
} from "@nestjs/graphql";
import { ExecutionContext, Inject, UseGuards } from "@nestjs/common";
import { Comment } from "./model/comment.model";
import { CommentService } from "./comment.service";
import { PrismaService } from "src/prisma";
import { CommentConnection } from "./model/comment-connection.model";
import { FindManyCommentsPaginatedInput } from "./inputs/comment-paginated.input";
import { AuthGuard } from "src/common/guards/gql-context.guard";
import { CreateNewCommentInput } from "./inputs/create-comment.input";
import { PubSub } from "graphql-subscriptions";
import { GraphQLResolveInfo } from "graphql";
const pubSub = new PubSub();
@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    @Inject(CommentService) private commentService: CommentService
  ) {}
  @Subscription(() => Comment)
  commentCreated(@Info() info: GraphQLResolveInfo) {
    console.log(
      "pubSub createCommentSubscription Triggered: " +
        info.returnType.toJSON() ?? "no info"
    );

    return pubSub.asyncIterator("COMMENT_CREATED");
  }

  @Query(() => CommentConnection)
  async listComments(
    @Args("findManyCommentsPaginatedInput")
    params: FindManyCommentsPaginatedInput
  ) {
    return await this.commentService.siftComments(params);
  }

  @Query(() => Comment)
  async commentByRelayId(
    @Args("cursor", { type: () => String }) cursor: string
  ) {
    return await this.commentService.relayFindUniqueComment({ id: cursor });
  }

  @Mutation(() => Comment)
  @UseGuards(AuthGuard)
  async createNewComment(
    @Args("commentCreateInput", {
      type: () => CreateNewCommentInput
    })
    params: CreateNewCommentInput,
    @Context("viewerId") ctx: ExecutionContext
  ) {
    const newComment = this.commentService.createComment(
      params,
      ctx as unknown as string
    );
    pubSub.publish("COMMENT_CREATED", { entryCreated: newComment });
    return await newComment;
  }
}
