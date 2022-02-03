import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType
} from "../../common/pagination/pagination";
import { Profile } from "./profile.model";
import { ProfileOrderByWithRelationAndSearchRelevanceInput } from "../../.generated/prisma-nestjs-graphql/profile/inputs/profile-order-by-with-relation-and-search-relevance.input";
import { ProfileRelationFilter } from "src/.generated/prisma-nestjs-graphql/profile/inputs/profile-relation-filter.input";
import { ProfileCountAggregateInput } from "src/.generated/prisma-nestjs-graphql/profile/inputs/profile-count-aggregate.input";
@ConnectionFilterArgsType(ProfileRelationFilter)
export class ProfileFilter {}

@ConnectionOrderingInputType(ProfileCountAggregateInput)
export class ProfileOrderBy {}

@ConnectionEdgeObjectType(Profile)
export class ProfileEdge {}

@ConnectionObjectType(ProfileEdge)
export class ProfileConnection {}
