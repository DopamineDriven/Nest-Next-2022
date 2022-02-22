import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Token {
  @Field(() => String, { nullable: false, description: "JWT access token" })
  accessToken!: string;

  @Field(() => String, { nullable: false, description: "JWT refresh token" })
  refreshToken!: string;
}
