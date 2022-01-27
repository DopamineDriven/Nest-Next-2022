import { Field, InterfaceType, ObjectType } from "@nestjs/graphql";
import { JwtHeaders, JwtPayload } from ".";

@ObjectType("JwtDecoded")
export class JwtDecoded {
  @Field(_type => JwtHeaders)
  header: JwtHeaders;

  @Field(_type => JwtPayload)
  payload: JwtPayload;

  @Field(_type => String)
  signature: string;
}