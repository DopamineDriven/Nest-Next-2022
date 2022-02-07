import {
  ArgsType,
  Field,
  InputType,
  Int,
  InterfaceType
} from "@nestjs/graphql";
import { ConnectionCursor, ConnectionArguments } from "graphql-relay";

@InterfaceType()
class PaginationArgsShape implements ConnectionArguments {
  skip?: number;
  after?: ConnectionCursor | null;
  before?: ConnectionCursor | null;
  first?: number | null;
  last?: number | null;
}
@ArgsType()
export class PaginationArgs implements PaginationArgsShape {
  __typename?: "PaginationArgs";
  @Field(() => String, { nullable: true, defaultValue: null })
  after?: ConnectionCursor;
  @Field(() => String, { nullable: true })
  before?: ConnectionCursor;
  @Field(() => Int, { nullable: true, defaultValue: null })
  last?: number | undefined;
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  first?: number | undefined;
  @Field(() => Int, { nullable: true, defaultValue: null })
  skip?: number | undefined;
}

@InputType()
export class PaginationArgsInput implements PaginationArgsShape {
  @Field(() => String, { nullable: true, defaultValue: null })
  after?: ConnectionCursor;
  @Field(() => String, { nullable: true, defaultValue: null })
  before?: ConnectionCursor;
  @Field(() => Int, { nullable: true, defaultValue: null })
  last?: number | undefined;
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  first?: number | undefined;
  @Field(() => Int, { nullable: true, defaultValue: null })
  skip?: number | undefined;
}
