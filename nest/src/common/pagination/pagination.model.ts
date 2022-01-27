import { Field, InterfaceType, ObjectType } from "@nestjs/graphql";
import { PageInfo as PageRelay, ConnectionCursor } from "graphql-relay";

@InterfaceType()
export class PageInfoShape implements PageRelay {
  endCursor: ConnectionCursor | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: ConnectionCursor | null;
}

@ObjectType()
export class PageInfo implements PageInfoShape {
  __typename?: "PageInfo";
  @Field(() => String, { nullable: true })
  endCursor: ConnectionCursor | null;
  @Field(() => Boolean, { nullable: true })
  hasNextPage: boolean;
  @Field(() => Boolean, { nullable: true })
  hasPreviousPage: boolean;
  @Field(() => String, { nullable: true })
  startCursor: ConnectionCursor | null;
}
