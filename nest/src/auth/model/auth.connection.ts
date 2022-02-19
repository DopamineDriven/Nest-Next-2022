import { Auth } from "./auth.model";
import { AuthDetailed } from "./auth-detailed.model";
import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType,
  ConnectionNodesObjectType
} from "../../common/pagination/pagination";
import { UserRelationFilter } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-relation-filter.input";
import { UserOrderByRelevanceInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-order-by-relevance.input";
import { v4 } from "uuid";

@ConnectionFilterArgsType(UserRelationFilter)
export class UserFilter {}

@ConnectionOrderingInputType(UserOrderByRelevanceInput)
export class UserOrderBy {}

@ConnectionNodesObjectType(Auth)
export class AuthNodes {}

@ConnectionEdgeObjectType(Auth, { id: v4() })
export class AuthEdge {}

@ConnectionObjectType(AuthEdge)
export class AuthConnection {}
