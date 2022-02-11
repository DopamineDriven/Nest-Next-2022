import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType
} from "../../common/pagination/pagination";
import { UserRelationFilter } from "../../.generated/prisma-nestjs-graphql/user/inputs/user-relation-filter.input";
import { UserOrderByRelevanceInput } from "../../.generated/prisma-nestjs-graphql/user/inputs/user-order-by-relevance.input";
import { ViewerEntity } from "./viewer.model";
import { Viewer } from "src/auth/model";

@ConnectionFilterArgsType(UserRelationFilter)
export class UserFilter {}
@ConnectionOrderingInputType(UserOrderByRelevanceInput)
export class UserOrderBy {}

@ConnectionEdgeObjectType(Viewer, { id: new Viewer().id })
export class ViewerEdge {}

@ConnectionObjectType(ViewerEdge)
export class ViewerConnection {}
