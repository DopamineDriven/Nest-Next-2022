import {
  PageInfo as PageInfoRelay,
  ConnectionCursor,
  toGlobalId
} from "graphql-relay";
import {
  ObjectType,
  Field,
  registerEnumType,
  Int,
  ReturnTypeFuncValue,
  ArgsType,
  InputType,
  PickType,
  ID,
  EnumOptions,
  createUnionType,
  UnionOptions,
  Union,
  GraphQLExecutionContext,
  GqlContextType,
  FieldOptions,
  ResolveFieldOptions,
  Parent
} from "@nestjs/graphql";
import { UserConnection } from "../../user/model/user-connection.model";
import { EntryConnection } from "../../entry/model/entry-connection.model";
import { ProfileConnection } from "../../profile/model/profile-connection.model";
import {
  SessionConnection,
  SessionEdge
} from "../../session/model/session-connection.model";
import { Type } from "@nestjs/common";
import { Unionize } from "utility-types";
import { User } from "src/user/model/user.model";
import { Profile } from "src/profile/model/profile.model";
import { XOR } from "src/common/types/helpers.type";
import { AuthDetailed } from "src/auth/model/auth-detailed.model";
import { Entry } from "src/entry/model/entry.model";
import { ViewerEntity } from "./viewer.model";
import { Auth, Token, Viewer } from "src/auth/model";
import { Session } from "src/session/model";
import { UnionDefinition } from "@nestjs/graphql/dist/schema-builder/factories/union-definition.factory";
import { Source } from "graphql";
import { RootTypeFactory } from "@nestjs/graphql/dist/schema-builder/factories/root-type.factory";
import { TypeFieldsAccessor } from "@nestjs/graphql/dist/schema-builder/services/type-fields.accessor";

import { ResolveTypeFactory } from "@nestjs/graphql/dist/schema-builder/factories/resolve-type.factory";
import { GraphQLFieldResolverParams } from "apollo-server-types";
export type ContentNodeFodder = {
  // user: (id: User['id']) => User;
  // session: (id: Session['id']) => Session;
  // profile: (id: Profile['id']) => Profile;
  // authDetail: (accessToken: Token['accessToken']) => AuthDetailed;
  // entry: (id: Entry['id']) => Entry;
  // me: (id: string) => Viewer;
  users: UserConnection;
  entries: EntryConnection;
  profiles: ProfileConnection;
  sessions: SessionConnection;
};

// export type ContentNodes =
//   | UserConnection
//   | EntryConnection
//   | ProfileConnection
//   | SessionConnection;

// createUnionType<Type<ContentNodes>[]>({
//   name: "ContentNodes",
//   types: (): Type<ContentNodes>[] => [
//     UserConnection,
//     EntryConnection,
//     ProfileConnection,
//     SessionConnection
//   ],
//   resolveType: ({
//     resolveType({ root: ParentType, context: GqlContextType, info: GraphQLResolveInfo, abstractType: GraphQLAbstractType }: GraphQLFieldResolverParams={[argName: root]: Field ; }) =>  Resolve,
//     name,
//     types,
//     description
//   } as UnionOptions<Type<ContentNodes>[]>) => {
//     const resolvingTypes = () => resolveType({types: [UserConnection, EntryConnection, ProfileConnection, SessionConnection]) })
//   }
// });

type Constructor = { new (...args: any[]): any };

@ObjectType()
export class PageInfo implements PageInfoRelay {
  @Field(_type => String, { nullable: true })
  startCursor: ConnectionCursor | null;

  @Field(_type => String, { nullable: true })
  endCursor: ConnectionCursor | null;

  @Field(_type => Boolean, { defaultValue: false })
  hasPreviousPage: boolean;

  @Field(_type => Boolean, { defaultValue: false })
  hasNextPage: boolean;
}

enum Direction {
  ASC = "ASC",
  DESC = "DESC"
}
registerEnumType<typeof Direction>(Direction, {
  name: "Direction"
} as EnumOptions<typeof Direction>);

export function ConnectionFilterArgsType<
  T extends Constructor,
  V extends ReturnTypeFuncValue
>(filterType: V): (target: T) => Constructor {
  return (target: T): Constructor => {
    @ArgsType()
    class ConnectionFilterArgsType extends target {
      @Field(() => Int, { nullable: true })
      first: number;

      @Field(() => String, { nullable: true })
      after?: ConnectionCursor | null;

      @Field(() => Int, { nullable: true })
      last: number;

      @Field(() => String, { nullable: true })
      before?: ConnectionCursor | null;

      @Field(() => filterType)
      filter?: V;
    }
    return ConnectionFilterArgsType;
  };
}

export function ConnectionOrderingInputType<
  T extends Constructor,
  V extends ReturnTypeFuncValue
>(orderType: V): (target: T) => Constructor {
  return (target: T): Constructor => {
    @InputType(target.name)
    class ConnectionOrderingInputType extends target {
      @Field(() => Direction, { defaultValue: Direction.ASC })
      direction: keyof typeof Direction;

      @Field(() => orderType)
      orderBy: V;
    }
    return ConnectionOrderingInputType;
  };
}

export function ConnectionEdgeObjectType<
  T extends Constructor,
  V extends ReturnTypeFuncValue
>(nodeType: V): (target: T) => Constructor {
  return (target: T): Constructor => {
    @ObjectType(target.name)
    class ConnectionEdgeObjectType extends target {
      @Field(() => nodeType)
      node: V;

      @Field()
      cursor: ConnectionCursor;
    }
    return ConnectionEdgeObjectType;
  };
}

export function ConnectionObjectType<
  T extends Constructor,
  V extends ReturnTypeFuncValue
>(edgeType: V): (target: T) => Constructor {
  return (target: T): Constructor => {
    @ObjectType(target.name)
    class ConnectionObjectType extends target {
      @Field(() => PageInfo)
      pageInfo: PageInfo;

      @Field(() => Int, { defaultValue: 0 })
      totalCount: number;

      @Field(() => [edgeType])
      edges: V[];
    }

    return ConnectionObjectType;
  };

  // export function UserObject<T extends Constructor, V extends ReturnTypeFuncValue>(userType: V): (target: T) => Constructor {
  //   return (target: T): Constructor => {
  //     @ObjectType(target.name)
  //     class UserObjectType extends target {
  //       @Field(() => )
  //     }
  //   }
  // }
}
