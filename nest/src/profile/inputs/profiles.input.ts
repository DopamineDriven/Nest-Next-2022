import { Field, InputType } from "@nestjs/graphql";
import { EnumGenderNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/enum-gender-nullable-filter.input";
import { EnumGenderNullableWithAggregatesFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/enum-gender-nullable-with-aggregates-filter.input";
import { EnumPronounsNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/enum-pronouns-nullable-filter.input";
import { JsonNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/json-nullable-filter.input";
import { StringNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/string-nullable-filter.input";
import { ProfileOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/profile/inputs/profile-order-by-with-relation-and-search-relevance.input";
import { PaginationArgsInput } from "src/common/pagination/pagination.args";

@InputType("ProfilesInput")
export class ProfilesInput {
  @Field(() => PaginationArgsInput, { nullable: true })
  paginationArgs?: PaginationArgsInput | undefined;

  @Field(() => ProfileOrderByWithRelationAndSearchRelevanceInput, {
    nullable: true
  })
  orderBy?: ProfileOrderByWithRelationAndSearchRelevanceInput | undefined;

  @Field(() => EnumGenderNullableFilter, { nullable: true })
  genderFilter?: EnumGenderNullableFilter | undefined;

  @Field(() => EnumPronounsNullableFilter, { nullable: true })
  pronounsFilter?: EnumPronounsNullableFilter | undefined;

  @Field(() => StringNullableFilter, { nullable: true })
  dobFilter?: StringNullableFilter | undefined;

  @Field(() => StringNullableFilter, { nullable: true })
  bioFilter?: StringNullableFilter | undefined;
}
