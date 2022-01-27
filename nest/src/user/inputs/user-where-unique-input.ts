import { InputType, Field } from "@nestjs/graphql";


@InputType("UserWhereUniqueInput")
export class UserWhereUniqueInput {
  @Field(_type => String, { nullable: true })
  id?: string;
  @Field(_type => String, { nullable: true })
  email?: string
}