import { Auth } from "./auth.model";
import { JwtDecoded } from "../dto/jwt-decoded.dto";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType("AuthDetailed")
export class AuthDetailed {
  @Field(_type => Auth, { nullable: true })
  auth: Auth;
  @Field(_type => JwtDecoded, { nullable: true })
  jwt: JwtDecoded;
}
