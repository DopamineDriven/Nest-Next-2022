import { ObjectType, Field, ID, InterfaceType } from "@nestjs/graphql";

@InterfaceType("Node")
export abstract class Node {
  @Field(_type => ID, { name: "id", nullable: false })
  id: string;
}
