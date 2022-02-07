import { Type } from "@nestjs/common";
import {
  ObjectType,
  Field,
  Int,
  Float,
  createUnionType
} from "@nestjs/graphql";
import { EntryConnection } from "src/entry/model/entry-connection.model";
import { ProfileConnection } from "src/graphql.schema";
import { SessionConnection } from "src/session/model/session-connection.model";
import { UserConnection } from "../model/user-connection.model";

export interface ClassGqlType<T = any> {
  new (...args: any[]): T;
}

export type ViewerConnectionUnion =
  | UserConnection
  | EntryConnection
  | ProfileConnection
  | SessionConnection;

  type MappUnion<T extends keyof ViewerConnectionUnion> = {
    [P in T]: ViewerConnectionUnion[P]
    };

// let yyyy = (props: MappUnion<"UserConnection">) => {}

// export const ViewerContentUnion =
//   createUnionType<ClassGqlType<ViewerConnectionUnion>[]>({
//     name: "ViewerContentUnion",
//     types: () => [EntryConnection, ProfileConnection, SessionConnection, UserConnection],
//     resolveType: (>):
//       |  UserConnection
//       |  EntryConnection
//       |  ProfileConnection
//       |  SessionConnection => {})
