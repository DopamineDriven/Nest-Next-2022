import { Field, ObjectType } from "@nestjs/graphql";
import { JwtSigningAlgorithm } from "../enums";

@ObjectType()
export class JwtHeaders {
  /**
   * Signing Algorithm
   */
  @Field(_type => JwtSigningAlgorithm, {
    nullable: true,
    defaultValue: JwtSigningAlgorithm.None
  })
  alg?: keyof typeof JwtSigningAlgorithm;
  /**
   * Strategy Used
   */
  @Field(_type => String, { nullable: true })
  typ?: string;
}
