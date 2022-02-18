import { Field, InputType, Int } from "@nestjs/graphql";
import { CategoryWhereInput } from "src/.generated/prisma-nestjs-graphql/category/inputs/category-where.input";
import { CategoryOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/category/inputs/category-order-by-with-relation-and-search-relevance.input";
import { CategoryWhereUniqueInput } from "src/.generated/prisma-nestjs-graphql/category/inputs/category-where-unique.input";
import { CategoryScalarFieldEnum } from "src/.generated/prisma-nestjs-graphql/category/enums/category-scalar-field.enum";
import { PaginationArgsInput } from "src/common/pagination/pagination.args";

@InputType("FindManyCategoriesPaginatedInput")
export class FindManyCategoriesPaginatedInput {
  @Field(() => CategoryWhereInput, { nullable: true })
  where?: CategoryWhereInput;

  @Field(() => [CategoryOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true
  })
  orderBy?: Array<CategoryOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => CategoryWhereUniqueInput, { nullable: true })
  cursor?: CategoryWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [CategoryScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof CategoryScalarFieldEnum>;

  @Field(() => PaginationArgsInput)
  pagination: PaginationArgsInput;
}
