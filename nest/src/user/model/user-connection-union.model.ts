import { Type } from "@nestjs/common";
import {
  createUnionType,
  GqlExecutionContext,
  GraphQLExecutionContext,
  ResolveTypeFn,
  Union,
  UnionOptions
} from "@nestjs/graphql";
import { isTypeOfExpression } from "@ts-morph/common/lib/typescript";
import { GraphQLTypeResolver, __TypeKind } from "graphql";
import { TypeResolveFn } from "src/.generated/nest/graphql.nest";
import { Entry } from "src/entry";
import {
  EntryConnection,
  UserConnection,
  ProfileConnection,
  ProfileEdge,
  EntryEdge,
  UserEdge
} from "src/graphql.schema";
import { Profile } from "src/profile";
import { User } from "./user.model";
import {
  ConnectionEdgeObjectType,
  ConnectionObjectType
} from "src/common/pagination/pagination";
export type TypeConnectionsUnionType =
  | UserConnection
  | EntryConnection
  | ProfileConnection;

export const typeConnectionsUnion = createUnionType<
  Type<TypeConnectionsUnionType>[]
>({
  name: "TypeConnectionsUnion",
  types: () => [UserConnection, EntryConnection, ProfileConnection],
  resolveType: ({
    "0": { __typename, edges, pageInfo, totalCount },
    "1": { getType, getContext },
    "2": { returnType, fieldName, fieldNodes },
    "3": { name, resolveType }
  }: Parameters<
    GraphQLTypeResolver<
      Union<Type<TypeConnectionsUnionType>[]>,
      GraphQLExecutionContext
    >
  >): UserConnection | EntryConnection | ProfileConnection | undefined => {
    return __typename === "EntryConnection"
      ? new EntryConnection()
      : __typename === "ProfileConnection"
      ? new ProfileConnection()
      : __typename === "UserConnection"
      ? new UserConnection()
      : undefined;
  }
});

export type BaseTypes = User | Entry | Profile;

export const baseTypes = createUnionType<Type<BaseTypes>[]>({
  name: "TypesUnion",
  types: () => [Profile, Entry, User],
  resolveType: ({
    "0": { id },
    "1": { getType, getClass },
    "2": { returnType },
    "3": { name }
  }: Parameters<
    GraphQLTypeResolver<Union<Type<BaseTypes>[]>, GraphQLExecutionContext>
  >): typeof Profile | typeof Entry | typeof User | undefined => {
    return new Profile().id === id
      ? Profile
      : new Entry().id === id
      ? Entry
      : new User().id === id
      ? User
      : undefined;
  }
});
@ConnectionEdgeObjectType(baseTypes as BaseTypes)
export class BaseTypesEdge {}

@ConnectionObjectType(BaseTypesEdge)
export class BaseTypesConnection {}
