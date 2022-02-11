import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { User } from "../../user/model/user.model";
import { Node } from "src/node/model/node.model";

@ObjectType("Account")
export class Account implements Node {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  type!: string;

  @Field(() => String, { nullable: false })
  provider!: string;

  @Field(() => String, { nullable: false })
  providerAccountId!: string;

  @Field(() => String, { nullable: true })
  scope?: string | null;

  @Field(() => String, { nullable: true })
  access_token?: string | null;

  @Field(() => Int, { nullable: true })
  expires_at?: number | null;

  @Field(() => String, { nullable: true })
  id_token?: string | null;

  @Field(() => String, { nullable: true })
  token_type?: string | null;

  @Field(() => String, { nullable: true })
  oauth_token?: string | null;

  @Field(() => String, { nullable: true })
  oauth_token_secret?: string | null;

  @Field(() => String, { nullable: true })
  refresh_token?: string | null;

  @Field(() => String, { nullable: true })
  refresh_secret?: string | null;

  @Field(() => String, { nullable: true })
  session_state?: string | null;

  @Field(() => User, { nullable: false })
  user!: User;
}
