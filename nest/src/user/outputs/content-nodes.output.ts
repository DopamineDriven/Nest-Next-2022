import { ObjectType, Field } from "@nestjs/graphql";
import { BaseTypeNodes } from "../model/user-connection-union.model";


@ObjectType("ContentNodes")
export class ContentNodes {
  @Field(() => BaseTypeNodes)
  contentNodes: BaseTypeNodes
}
