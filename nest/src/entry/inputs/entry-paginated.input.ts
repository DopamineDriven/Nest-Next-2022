import { Field, InputType, Int } from "@nestjs/graphql";
import { PaginationArgsInput } from "src/common/pagination/pagination.args";
import { EntryWhereInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-where.input";
import { EntryOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-order-by-with-relation-and-search-relevance.input";
import { EntryWhereUniqueInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-where-unique.input";
import { EntryScalarFieldEnum } from "src/.generated/prisma-nestjs-graphql/entry/enums/entry-scalar-field.enum";

@InputType("FindManyEntriessPaginatedInput")
export class FindManyEntriesPaginatedInput {
  @Field(() => EntryWhereInput, { nullable: true })
  where?: EntryWhereInput;

  @Field(() => [EntryOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true
  })
  orderBy?: Array<EntryOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => EntryWhereUniqueInput, { nullable: true })
  cursor?: EntryWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [EntryScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof EntryScalarFieldEnum>;
  @Field(() => PaginationArgsInput)
  pagination: PaginationArgsInput;
}
