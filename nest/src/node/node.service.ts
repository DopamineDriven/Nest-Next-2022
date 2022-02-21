import { User } from "src/user/model/user.model";
import { Entry } from "src/entry/model/entry.model";
import { MediaItem } from "src/media/model/media.model";
import { Session } from "src/session/model/session.model";
import { Comment } from "src/comment/model/comment.model";
import { Connection } from "src/connection/model/connection.model";
import { Injectable } from "@nestjs/common";
import { Node } from "./model/node.model";
import {
  ResolvedGlobalId,
  GraphQLNodeDefinitions,
  globalIdField,
  toGlobalId,
  fromGlobalId,
  nodeDefinitions
} from "graphql-relay/node/node";
import {
  GraphQLFieldConfig,
  GraphQLInterfaceType,
  GraphQLResolveInfo
} from "graphql";
import {
  Field,
  GraphQLExecutionContext,
  ID,
  ObjectType,
  ReturnTypeFuncValue
} from "@nestjs/graphql";
import { ConnectionCursor } from "graphql-relay";
import { ModelsEnum } from "./enums/models.enum";
import { Category } from "src/category/model/category.model";
import { Account } from "src/account/model/account.model";
import { Viewer } from "src/auth/model/auth.model";
import { UnionDefinitionFactory } from "@nestjs/graphql/dist/schema-builder/factories/union-definition.factory";
type Constructor = { new (...args: any[]): any };

export interface RootTypes<
  T extends
    | User
    | Entry
    | MediaItem
    | Session
    | Comment
    | Connection
    | Category
    | Account
    | Viewer
> {
  __typename: keyof typeof ModelsEnum;
  node(id: string): RootTypes<T>;
  id:
    | User["id"]
    | Entry["id"]
    | MediaItem["id"]
    | Session["id"]
    | Comment["id"]
    | Connection["id"]
    | Category["id"]
    | Account["id"]
    | Viewer["id"];
}

@Injectable()
export class NodeService {
  node: (
    id: string
  ) => RootTypes<
    | User
    | Entry
    | MediaItem
    | Session
    | Comment
    | Connection
    | Category
    | Account
    | Viewer
  >;
  __typename: keyof typeof ModelsEnum;
  id:
    | User["id"]
    | Entry["id"]
    | MediaItem["id"]
    | Session["id"]
    | Comment["id"]
    | Connection["id"]
    | Category["id"]
    | Account["id"]
    | Viewer["id"];
  nodehandler<
    T extends ReturnTypeFuncValue,
    V extends Constructor,
    U extends { id: string }
  >(nodeType: T, cursor: U): (target: V) => Constructor {
    return (target: V): Constructor => {
      @ObjectType(target.name)
      class NodeDefs extends target {
        @Field(() => nodeType)
        node: T;

        @Field(() => ID)
        cursor(): ResolvedGlobalId {
          return {
            id: cursor.id,
            type:
              this.__typename.valueOf() === target.name
                ? target.name
                : this.__typename
          };
        }
        @Field(() => ModelsEnum)
        __typename: keyof typeof ModelsEnum;
      }
      return NodeDefs;
    };
  }

  // async getNodes(): Promise<{
  //   node: {
  //     id: string;
  //     __typename:
  //       | "UserNode"
  //       | "EntryNode"
  //       | "ProfileNode"
  //       | "ContactNode";
  //   };
  // }> {
  //   const id = toGlobalId(this.node().__typename, this.node().id);
  //   const __typename = this.node().__typename;
  //   return this.node, { node: { id, __typename: "ContactNode" || "EntryNode" || "ProfileNode" || "UserNode"  } };
}

// export function nodehandler<T extends ReturnTypeFuncValue, V extends Constructor>(
//   nodeType: T
// ): (target: V) => Constructor {
//   return (target: V): Constructor => {
//     @ObjectType(target.name)
//     class NodeDefs extends target {
//       @Field(() => nodeType)
//       nodeConstructor(id: string, __typename: string): RootTypes<User | Entry | MediaItem | Session | Comment | Connection | Category | Account | Viewer> {
//         return ({
//           id,
//           __typename: "Account" || "Viewer" ||  "Category" || "Comment" || "Connection" || "Entry" || "MediaItem" || "Profile" || "Session" || "User" || "VerificationToken",
//           node: (id, __typename) => toGlobalId(__typename, id)
//       })

//       @Field(() => ID)
//       id: string;

//       @Field(() => ModelsEnum)
//       __typename: keyof typeof ModelsEnum;
//     }
//     return NodeDefs;
//   };
// }
