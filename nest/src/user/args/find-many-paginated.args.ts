import { InputType, Field } from "@nestjs/graphql";
import { EnumUserStatusNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/enum-user-status-nullable-filter.input";
import { PaginationArgsInput } from "../../common/pagination/pagination.args";
import { StringNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/string-nullable-filter.input";
import { EnumRoleNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/enum-role-nullable-filter.input";
import { UserOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-order-by-with-relation-and-search-relevance.input";
import { StringFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/string-filter.input";
import { FindUniqueUserArgs } from "src/.generated/prisma-nestjs-graphql/user/args/find-unique-user.args";
import { UserScalarWhereWithAggregatesInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-scalar-where-with-aggregates.input";
type Enumerable<T> = T | Array<T>;

@InputType("ManyUsersPaginatedArgs")
export class ManyUsersPaginatedArgs {
  @Field(() => PaginationArgsInput)
  paginationArgs: PaginationArgsInput;

  @Field(() => StringFilter)
  emailFilter?: StringFilter;

  @Field(() => EnumRoleNullableFilter)
  roles: EnumRoleNullableFilter;

  @Field(() => EnumUserStatusNullableFilter)
  userStatus: EnumUserStatusNullableFilter;

  // @Field(() => [UserScalarWhereWithAggregatesInput])
  // where: UserScalarWhereWithAggregatesInput[];

  @Field(() => StringNullableFilter)
  firstNameFilter: StringNullableFilter;

  @Field(() => StringNullableFilter)
  lastNameFilter: StringNullableFilter;

  @Field(() => [UserOrderByWithRelationAndSearchRelevanceInput])
  orderByRelevance: Array<UserOrderByWithRelationAndSearchRelevanceInput>;
}
