import { Field, InputType, Int } from "@nestjs/graphql";
import { FindManyProfileArgs } from "src/.generated/prisma-nestjs-graphql/profile/args/find-many-profile.args";
import { PaginationArgsInput } from "src/common/pagination/pagination.args";
import { ProfileWhereInput } from "../../.generated/prisma-nestjs-graphql/profile/inputs/profile-where.input";
import { ProfileOrderByWithRelationAndSearchRelevanceInput } from "../../.generated/prisma-nestjs-graphql/profile/inputs/profile-order-by-with-relation-and-search-relevance.input";
import { ProfileWhereUniqueInput } from "src/.generated/prisma-nestjs-graphql/profile/inputs/profile-where-unique.input";
import { ProfileScalarFieldEnum } from "src/.generated/prisma-nestjs-graphql/profile/enums/profile-scalar-field.enum";

@InputType("FindManyProfilesPaginatedInput")
export class FindManyProfilesPaginatedInput {
  @Field(() => ProfileWhereInput, { nullable: true })
  where?: ProfileWhereInput;

  @Field(() => [ProfileOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true
  })
  orderBy?: Array<ProfileOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => ProfileWhereUniqueInput, { nullable: true })
  cursor?: ProfileWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [ProfileScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof ProfileScalarFieldEnum>;
  @Field(() => PaginationArgsInput)
  pagination: PaginationArgsInput;
}
