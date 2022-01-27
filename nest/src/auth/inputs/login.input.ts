import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class LoginInput {
  @Field(_type => String, { nullable: true })
  email!: string;

  @Field(_type => String, { nullable: true })
  password!: string;
}
