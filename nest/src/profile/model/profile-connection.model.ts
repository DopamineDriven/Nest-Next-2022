import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType,
  ConnectionNodesObjectType
} from "../../common/pagination/pagination";
import { Profile } from "./profile.model";
import { ProfileRelationFilter } from "src/.generated/prisma-nestjs-graphql/profile/inputs/profile-relation-filter.input";
import { ProfileOrderByRelevanceInput } from "src/.generated/prisma-nestjs-graphql/profile/inputs/profile-order-by-relevance.input";
@ConnectionFilterArgsType(ProfileRelationFilter)
export class ProfileFilter {}

@ConnectionOrderingInputType(ProfileOrderByRelevanceInput)
export class ProfileOrderBy {}

@ConnectionNodesObjectType(Profile)
export class ProfileNodes {}

@ConnectionEdgeObjectType(Profile, { id: new Profile().id })
export class ProfileEdge {}

@ConnectionObjectType(ProfileEdge)
export class ProfileConnection {}
