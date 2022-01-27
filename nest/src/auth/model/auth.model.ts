import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "../../user/model/user.model";
import { Token } from ".";


@ObjectType("Auth")
export class Auth {
  __typename = "Auth"
  @Field(() => User)
  user!: User;
  @Field(_type => String, { nullable: false })
  accessToken!: Token["accessToken"];
  @Field(_type => String, { nullable: false })
  refreshToken!: Token["refreshToken"];
}
