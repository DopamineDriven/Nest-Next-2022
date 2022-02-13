import { Token } from "./token.model";
import {JwtDecoded} from "../dto/jwt-decoded.dto"
import { ObjectType, Field } from "@nestjs/graphql";


@ObjectType("ViewerAuthInfo")
export class ViewerAuthInfo {
  @Field(() => JwtDecoded)
  viewerJwt: JwtDecoded;

  @Field(() => String)
  refreshToken: string;

  @Field(() => String)
  accessToken: string;
}
