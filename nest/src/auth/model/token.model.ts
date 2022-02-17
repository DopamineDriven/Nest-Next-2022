import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Token {
  @Field(() => String, { nullable: true, description: "JWT access token" })
  accessToken!: string | null;

  @Field(() => String, { nullable: true, description: "JWT refresh token" })
  refreshToken!: string | null;
}
