import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { Role } from "../../.generated/prisma-nestjs-graphql/prisma/enums/role.enum";
import { UserOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-order-by-with-relation-and-search-relevance.input";

@InputType()
export class GetUsersPaginatedArgs {
  @Field(() => String, { nullable: true })
  filterByEmail: string | null;
  ///
  @Field(_type => [Role], {})
  role: Array<keyof typeof Role>;

  @Field(() => [Role], { defaultValue: null, nullable: true })
  filterByRole: Array<keyof typeof Role> | null;

  @Field(() => UserOrderByWithRelationAndSearchRelevanceInput, {
    nullable: true
  })
  orderBy: UserOrderByWithRelationAndSearchRelevanceInput | null;
}
