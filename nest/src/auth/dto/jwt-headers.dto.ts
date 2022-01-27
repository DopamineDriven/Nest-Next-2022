import { Field, InterfaceType, ObjectType } from "@nestjs/graphql";
import { JwtSigningAlgorithm } from "../enums";

@ObjectType()
export class JwtHeaders {
  /**
   * Signing Algorithm
   */
  @Field(_type => JwtSigningAlgorithm, {
    defaultValue: JwtSigningAlgorithm.None
  })
  alg: keyof typeof JwtSigningAlgorithm;
  /**
   * Strategy Used
   */
  @Field(_type => String)
  typ: string;
}
