import { BigIntResolver } from 'graphql-scalars';
import { Field, InterfaceType, ObjectType } from '@nestjs/graphql';

@InterfaceType()
export class JwtPayload {
  /**
   * User Id
   */
  @Field(_type => String, { nullable: true })
  userId: string;
  /**
   * Issued at
   */
  @Field(_type => BigIntResolver, { nullable: true })
   iat: number;
   /**
    * Expiration time
    */
  @Field(_type => BigIntResolver, { nullable: true })
   exp: number;
}