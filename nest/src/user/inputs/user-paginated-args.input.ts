import { Field, InputType, Int } from "@nestjs/graphql";
import { PaginationArgsInput } from "src/common/pagination/pagination.args";
import { UserWhereInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-where.input";
import { UserOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-order-by-with-relation-and-search-relevance.input";
import { UserWhereUniqueInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-where-unique.input";
import { UserScalarFieldEnum } from "src/.generated/prisma-nestjs-graphql/user/enums/user-scalar-field.enum";

@InputType("FindManyUsersPaginatedInput")
export class FindManyUsersPaginatedInput {
  @Field(() => UserWhereInput, { nullable: true })
  where?: UserWhereInput;

  @Field(() => [UserOrderByWithRelationAndSearchRelevanceInput])
  orderBy?: Array<UserOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  cursor?: UserWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [UserScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof UserScalarFieldEnum>;

  @Field(() => PaginationArgsInput, {defaultValue: { first: 10 }})
  pagination: PaginationArgsInput;
}
