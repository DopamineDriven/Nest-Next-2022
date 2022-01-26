import { Field, ObjectType } from "@nestjs/graphql";
import { JwtHeaders, JwtPayload } from ".";

@ObjectType("JwtDecoded")
export class JwtDecoded {
  @Field(_type => JwtHeaders, { nullable: true })
  header?: JwtHeaders;

  @Field(_type => JwtPayload, { nullable: true })
  payload?: JwtPayload;

  @Field(_type => String, { nullable: true })
  signature?: string;
}