import { Session } from "./session.model";
import { SessionListRelationFilter } from "src/.generated/prisma-nestjs-graphql/session/inputs/session-list-relation-filter.input";
import { SessionOrderByRelevanceInput } from "src/.generated/prisma-nestjs-graphql/session/inputs/session-order-by-relevance.input";
import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType,
  ConnectionNodesObjectType
} from "../../common/pagination/pagination";

@ConnectionFilterArgsType(SessionListRelationFilter)
export class SessionFilter {}
@ConnectionOrderingInputType(SessionOrderByRelevanceInput)
export class SessionOrderBy {}

@ConnectionNodesObjectType(Session)
export class SessionNodes {}

@ConnectionEdgeObjectType(Session, { id: new Session().id as string })
export class SessionEdge {}

@ConnectionObjectType(SessionEdge)
export class SessionConnection {}
