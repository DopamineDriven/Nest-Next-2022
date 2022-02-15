import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { JwtSigningAlgorithm } from "../../auth/enums/jwt-signing-algorithm.enum";
import { User } from "../../user/model/user.model";
import { Node } from "src/node/model/node.model";

@ObjectType("Session", {implements: () => Node})
export class Session implements Node {
  @Field(_type => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  accessToken: string | null;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => Int, { nullable: true })
  exp: number | null;

  @Field(() => Int, { nullable: true })
  iat: number | null;

  @Field(() => String, { nullable: true })
  alg: string | null;

  @Field(() => String, { nullable: true })
  refreshToken: string | null;

  @Field(() => Date, { nullable: true })
  lastVerified: Date | null;

  @Field(() => String, { nullable: true })
  tokenState: string | null;

  @Field(() => String, { nullable: true })
  signature: string | null;

  @Field(() => String, { nullable: true })
  provider: string | null;

  @Field(() => [String], { nullable: true })
  scopes: string[] | null;

  @Field(() => User, { nullable: true })
  user?: User | null;
}
