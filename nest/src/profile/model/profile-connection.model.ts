import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType
} from "../../common/pagination/pagination";
import { Field, Int } from "@nestjs/graphql";
import { Profile } from "./profile.model";
import { ProfileOrderByWithRelationAndSearchRelevanceInput } from "../../.generated/prisma-nestjs-graphql/profile/inputs/profile-order-by-with-relation-and-search-relevance.input";

@ConnectionFilterArgsType()
export class ProfileFilter {
  @Field(_type => String, { nullable: true })
  type!: string;
}

@ConnectionOrderingInputType()
export class ProfileOrderBy {
  @Field(_type => ProfileOrderByWithRelationAndSearchRelevanceInput, {
    nullable: true
  })
  sort: ProfileOrderByWithRelationAndSearchRelevanceInput;
}

@ConnectionEdgeObjectType(Profile)
export class ProfileEdge {}

@ConnectionObjectType(ProfileEdge)
export class ProfileConnection {
  @Field(() => Int, { defaultValue: 0 })
  totalCount!: number;
}
