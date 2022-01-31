import { Session } from "./session.model";
import { Field, registerEnumType, Int } from "@nestjs/graphql";
import { SessionOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/session/inputs/session-order-by-with-relation-and-search-relevance.input";
import { SessionOrderByRelevanceFieldEnum } from "src/.generated/prisma-nestjs-graphql/session/enums/session-order-by-relevance-field.enum";
import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType
} from "../../common/pagination/pagination";

export enum UserOrderByRelevance {
  id = "id",
  name = "name",
  email = "email",
  image = "image",
  password = "password"
}

registerEnumType(UserOrderByRelevance, {
  name: "UserOrderByRelevance",
  description: "Fields to order the user entity by"
});

@ConnectionFilterArgsType()
export class UserFilter {
  @Field(_type => String, { nullable: true })
  type!: string | null;
}
@ConnectionOrderingInputType()
export class SessionOrderBy {
  @Field(_type => SessionOrderByWithRelationAndSearchRelevanceInput, {
    nullable: true
  })
  sort: SessionOrderByWithRelationAndSearchRelevanceInput;
}

@ConnectionEdgeObjectType(Session)
export class SessionEdge {}

@ConnectionObjectType(SessionEdge)
export class SessionConnection {
  @Field(() => Int, { defaultValue: 0 })
  sessionCount?: number;
}
