import { User } from "./user.model";
import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType,
  ConnectionNodesObjectType
} from "../../common/pagination/pagination";
import { UserRelationFilter } from "../../.generated/prisma-nestjs-graphql/user/inputs/user-relation-filter.input";
import { UserOrderByRelevanceInput } from "../../.generated/prisma-nestjs-graphql/user/inputs/user-order-by-relevance.input";

@ConnectionFilterArgsType(UserRelationFilter)
export class UserFilter {}
@ConnectionOrderingInputType(UserOrderByRelevanceInput)
export class UserOrderBy {}

@ConnectionNodesObjectType(User)
export class UserNodes {}

@ConnectionEdgeObjectType(User, { id: new User().id })
export class UserEdge {}

@ConnectionObjectType(UserEdge)
export class UserConnection {}
