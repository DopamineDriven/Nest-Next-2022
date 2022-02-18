import { Field, InputType, Int } from "@nestjs/graphql";
import { ConnectionWhereInput } from "src/.generated/prisma-nestjs-graphql/connection/inputs/connection-where.input";
import { ConnectionOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/connection/inputs/connection-order-by-with-relation-and-search-relevance.input";
import { ConnectionWhereUniqueInput } from "src/.generated/prisma-nestjs-graphql/connection/inputs/connection-where-unique.input";
import { ConnectionScalarFieldEnum } from "src/.generated/prisma-nestjs-graphql/connection/enums/connection-scalar-field.enum";
import { PaginationArgsInput } from "src/common/pagination/pagination.args";

@InputType("FindManyConnectionsPaginatedInput")
export class FindManyConnectionsPaginatedInput {
  @Field(() => ConnectionWhereInput, { nullable: true })
  where?: ConnectionWhereInput;

  @Field(() => [ConnectionOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true
  })
  orderBy?: Array<ConnectionOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => ConnectionWhereUniqueInput, { nullable: true })
  cursor?: ConnectionWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [ConnectionScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof ConnectionScalarFieldEnum>;
  @Field(() => PaginationArgsInput)
  pagination: PaginationArgsInput;
}
