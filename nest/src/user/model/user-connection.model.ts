import { User } from "./user.model";
import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType
} from "../../common/pagination/pagination";
import { UserOrderByWithRelationAndSearchRelevanceInput } from "src/graphql.schema";
import { UserRelationFilter } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-relation-filter.input";
import { UserCountAggregateInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-count-aggregate.input";
import { UserCountOrderByAggregateInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-count-order-by-aggregate.input";
import { Field, Int } from "@nestjs/graphql";
import { UserOrderByRelevanceInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-order-by-relevance.input";
import { UserCount } from "../outputs/user-count.output";



@ConnectionFilterArgsType(UserRelationFilter)
export class UserFilter {}
@ConnectionOrderingInputType(UserOrderByRelevanceInput)
export class UserOrderBy {}

@ConnectionEdgeObjectType(User)
export class UserEdge {}

@ConnectionObjectType(UserEdge)
export class UserConnection {}
