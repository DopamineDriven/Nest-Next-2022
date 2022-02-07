import { Field, InterfaceType, ObjectType } from "@nestjs/graphql";
import { PageInfo as PageRelay, ConnectionCursor } from "graphql-relay";

@InterfaceType("PageInfoShape")
export class PageInfoShape implements PageRelay {
  endCursor: ConnectionCursor | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: ConnectionCursor | null;
}

@ObjectType("PageInfo")
export class PageInfo implements PageInfoShape {
  __typename?: "PageInfo";
  @Field(() => String, { nullable: true, defaultValue: "" })
  endCursor: ConnectionCursor | null;
  @Field(() => Boolean, { defaultValue: false })
  hasNextPage: boolean;
  @Field(() => Boolean, { defaultValue: false })
  hasPreviousPage: boolean;
  @Field(() => String, { nullable: true, defaultValue: "" })
  startCursor: ConnectionCursor | null;
}
