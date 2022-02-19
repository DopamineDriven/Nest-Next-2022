import { Field, InputType } from "@nestjs/graphql";
import { ArgsType } from "@nestjs/graphql";
import { SessionWhereInput } from "src/.generated/prisma-nestjs-graphql/session/inputs/session-where.input";
import { SessionOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/session/inputs/session-order-by-with-relation-and-search-relevance.input";
import { Int } from "@nestjs/graphql";
import { SessionScalarFieldEnum } from "src/.generated/prisma-nestjs-graphql/session/enums/session-scalar-field.enum";
import { PaginationArgsInput } from "src/common/pagination/pagination.args";
import { SessionWhereUniqueInput } from "src/.generated/prisma-nestjs-graphql/session/inputs/session-where-unique.input";
import { Prisma } from "@prisma/client";
@InputType("FindManySessionsPaginatedInput")
export class FindManySessionsPaginatedInput {
  @Field(() => SessionWhereInput, { nullable: true })
  where?: SessionWhereInput;

  @Field(() => [SessionOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true
  })
  orderBy?: Array<SessionOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => SessionWhereUniqueInput, { nullable: false })
  cursor?: Prisma.SessionWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [SessionScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof SessionScalarFieldEnum>;

  @Field(() => PaginationArgsInput)
  pagination: PaginationArgsInput;
}
