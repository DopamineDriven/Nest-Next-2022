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
import { Entry } from "src/entry";
import {
  EntryConnection,
  EntryEdge
} from "src/entry/model/entry-connection.model";
import { UserConnection, UserEdge } from "./user-connection.model";
import { ProfileConnection } from "src/profile/model/profile-connection.model";
import { Profile } from "src/profile";
import { User } from "./user.model";
import {
  ConnectionEdgeObjectType,
  ConnectionObjectType,
  ConnectionNodesObjectType
} from "src/common/pagination/pagination";
import { MediaItem } from "src/media/model/media.model";
import {
  MediaItemConnection,
  MediaItemEdge
} from "src/media/model/media-connection";

// export const typeConnectionsUnion = createUnionType<
//   Type<TypeConnectionsUnionType>[]
// >({
//   name: "TypeConnectionsUnion",
//   types: () => [UserConnection, EntryConnection, ProfileConnection],
//   resolveType: ({
//     "0": {  },
//     "1": { getType, getContext },
//     "2": { returnType, fieldName, fieldNodes },
//     "3": { name, resolveType }
//   }: Parameters<
//     GraphQLTypeResolver<
//       Union<Type<TypeConnectionsUnionType>[]>,
//       GraphQLExecutionContext
//     >
//   >): UserConnection | EntryConnection | ProfileConnection | undefined => {
//     return __typename === "EntryConnection"
//       ? new EntryConnection()
//       : __typename === "ProfileConnection"
//       ? new ProfileConnection()
//       : __typename === "UserConnection"
//       ? new UserConnection()
//       : undefined;
//   }
// });

export type BaseTypes = Entry | User | MediaItem;

export const baseTypes = createUnionType<Type<BaseTypes>[]>({
  name: "TypesUnion",
  types: () => [Entry, MediaItem, User],
  resolveType({
    id
  }: BaseTypes): typeof Entry | typeof MediaItem | typeof User | null {
    return id in User
      ? User
      : id in MediaItem
      ? MediaItem
      : id in Entry
      ? Entry
      : null;

    // else if (__typename?.name.includes(EntryConnection.name)) {
    //   return EntryConnection
    // }
    // else if (__typename?.name.includes(MediaItemConnection.name)) {
    //   return MediaItemConnection
    // }
    // else {
    //   return null;
    // }
  }
});
@ConnectionEdgeObjectType(baseTypes, {
  id: new Entry().id || new User().id || new MediaItem().id
})
export class BaseTypesEdge {}

@ConnectionNodesObjectType(baseTypes)
export class BaseTypeNodes {}

@ConnectionObjectType(BaseTypesEdge)
export class BaseTypesConnection {}
