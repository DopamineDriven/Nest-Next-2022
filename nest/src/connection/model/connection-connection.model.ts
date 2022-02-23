import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType,
  ConnectionNodesObjectType
} from "../../common/pagination/pagination";
import { Connection } from "./connection.model";
import { ConnectionOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/connection/inputs/connection-order-by-with-relation-and-search-relevance.input";
import { ConnectionListRelationFilter } from "src/.generated/prisma-nestjs-graphql/connection/inputs/connection-list-relation-filter.input";

@ConnectionFilterArgsType(ConnectionListRelationFilter)
export class ConnectionFilter {}

@ConnectionOrderingInputType(
  ConnectionOrderByWithRelationAndSearchRelevanceInput
)
export class ConnectionOrderBy {}

@ConnectionNodesObjectType(Connection)
export class ConnectionNodes {}

@ConnectionEdgeObjectType(Connection)
export class ConnectionEdge {}

@ConnectionObjectType(ConnectionEdge)
export class ConnectionConnection {}
