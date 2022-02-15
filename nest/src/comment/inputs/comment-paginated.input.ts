import { Field, InputType, Int } from "@nestjs/graphql";
import { PaginationArgsInput } from "src/common/pagination/pagination.args";
import { CommentWhereInput } from "src/.generated/prisma-nestjs-graphql/comment/inputs/comment-where.input";
import { CommentOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/comment/inputs/comment-order-by-with-relation-and-search-relevance.input";
import { CommentWhereUniqueInput } from "src/.generated/prisma-nestjs-graphql/comment/inputs/comment-where-unique.input";
import { CommentScalarFieldEnum } from "src/.generated/prisma-nestjs-graphql/comment/enums/comment-scalar-field.enum";

@InputType("FindManyCommentsPaginatedInput")
export class FindManyCommentsPaginatedInput {
  @Field(() => CommentWhereInput, { nullable: true })
  where?: CommentWhereInput;

  @Field(() => [CommentOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true
  })
  orderBy?: Array<CommentOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => CommentWhereUniqueInput, { nullable: true })
  cursor?: CommentWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [CommentScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof CommentScalarFieldEnum>;
  @Field(() => PaginationArgsInput)
  pagination: PaginationArgsInput;
}
