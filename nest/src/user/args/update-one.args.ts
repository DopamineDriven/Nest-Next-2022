import { Field, ArgsType } from "@nestjs/graphql";
import { UserUpdateInput } from "../../.generated/prisma-nestjs-graphql/user/inputs/user-update.input";
import { UserWhereUniqueInput } from "../../.generated/prisma-nestjs-graphql/user/inputs/user-where-unique.input";

@ArgsType()
export class UpdateOneUserArgs {
  @Field(() => UserUpdateInput, { nullable: false })
  data!: UserUpdateInput;

  @Field(() => UserWhereUniqueInput, { nullable: false })
  where!: UserWhereUniqueInput;
}
