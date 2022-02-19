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
  EnumOptions
} from "@nestjs/graphql";
import { Type } from "@nestjs/common";
export interface PaginationType<T = any> extends Function {
  new (...args: any[]): T extends infer U ? U : T;
}

interface IEdgeType<T> {
  cursor: string;
  node: T;
}

export interface IPaginatedType<T> {
  edges: IEdgeType<T>[];
  nodes: T[];
  totalCount: number;
  hasNextPage: boolean;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(type => String)
    cursor: string;

    @Field(type => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(type => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Field(type => [classRef], { nullable: true })
    nodes: T[];

    @Field(type => Int)
    totalCount: number;

    @Field()
    hasNextPage: boolean;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}

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
  U extends { id: string },
  V extends ReturnTypeFuncValue
>(nodeType: V, idRef: U): (target: T) => Constructor {
  return (target: T): Constructor => {
    @ObjectType(target.name)
    class ConnectionEdgeObjectType extends target {
      @Field(() => nodeType)
      node: V;

      @Field(() => String)
      cursor(id: U["id"], __typename: string): ConnectionCursor {
        return toGlobalId(target.name, id);
      }
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
}
export function ConnectionNodesObjectType<
  T extends Constructor,
  V extends ReturnTypeFuncValue
>(nodesType: V): (target: T) => Constructor {
  return (target: T): Constructor => {
    @ObjectType(target.name)
    class NodesObjectType extends target {
      @Field(() => PageInfo, { defaultValue: null, nullable: true })
      pageInfo: PageInfo;

      @Field(() => Int, { defaultValue: 0 })
      totalCount: number;

      @Field(() => [nodesType])
      nodes: V[];
    }

    return NodesObjectType;
  };
}

/**
 * export function ConnectionEdgeObjectType<
  T extends Constructor,
  V extends ReturnTypeFuncValue,
  L extends ReturnTypeFuncValue
>(nodeType: V, edgeType: L): (target: T) => Constructor {
  return (target: T): Constructor => {
    @ObjectType(target.name)
    class ConnectionEdgeObjectType extends target {
      @Field(() => nodeType)
      node: V;

      @Field()
      cursor: ConnectionCursor;
    }
    @ObjectType(target.name)
    class ConnectionType extends target {
      @Field(() => PageInfo)
      pageInfo: PageInfo;

      @Field(() => Int, { defaultValue: 0 })
      totalCount: number;

      @Field(() => [nodeType], {name: target.name+"s"})
      nodes: V[]

      @Field(() => [edgeType], {name: target.name+"Edges"})
      edges: ConnectionEdgeObjectType[];
    }
    return ConnectionType;
  }
}

 */
