import { Type } from "@nestjs/common";
import { ObjectType, Field } from "@nestjs/graphql";
import {
  EntryConnection,
  ProfileConnection,
  UserConnection
} from "src/graphql.schema";
import {
  typeConnectionsUnion,
  TypeConnectionsUnionType
} from "../model/user-connection-union.model";

@ObjectType("TypesConnectionUnionTypeOutput", {
  implements: () => [typeConnectionsUnion as TypeConnectionsUnionType]
})
export class TypesConnectionUnionTypeOutput extends Array<
  UserConnection | EntryConnection | ProfileConnection
> {}
