import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "../../user/model/user.model";
import { Token } from "./token.model";
import { Session } from "../../session/model";

@ObjectType("Auth")
export class Auth {

  @Field(() => User, {nullable: true})
  user!: User;

  @Field(() => [Session], { nullable: true })
  session!: Session[] | null;

  @Field(_type => String, { nullable: false })
  accessToken!: Token["accessToken"];

  @Field(_type => String, { nullable: false })
  refreshToken!: Token["refreshToken"];
}
