import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "../../user/model/user.model";
import { Token } from "./token.model";
import { Session } from "../../session/model";

@ObjectType("Auth")
export class Auth {
  @Field(() => User, { nullable: true })
  user!: User | null;

  @Field(() => Session, { nullable: true })
  session: Session | null;

  @Field(_type => String, { nullable: true })
  accessToken!: string | null;

  @Field(_type => String, { nullable: true })
  refreshToken!: string | null;
}
