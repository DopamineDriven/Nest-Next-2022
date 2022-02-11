import { ObjectType, Field, ID, InterfaceType } from "@nestjs/graphql";

@InterfaceType("Node")
export class Node {
  @Field(_type => ID, { name: "id" })
  id: string;
}
