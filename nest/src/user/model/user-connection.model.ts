import { User } from "./user.model";
import { Field, registerEnumType, Int } from "@nestjs/graphql";
import { UserOrderField } from "../inputs/user-order.input";
import { UserOrderByWithRelationAndSearchRelevanceInput } from "../../.generated/prisma-nestjs-graphql/user/inputs/user-order-by-with-relation-and-search-relevance.input";
import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType
} from "../../common/pagination/pagination";
import { UserCount } from "../../.generated/prisma-nestjs-graphql/user/outputs/user-count.output";
import { UserOrderByRelevanceInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-order-by-relevance.input";
import { UserOrderByRelevanceFieldEnum } from "src/graphql.schema";
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
  @Field(_type => UserOrderByRelevanceFieldEnum, { nullable: true })
  type!: keyof typeof UserOrderByRelevanceFieldEnum;
}
@ConnectionOrderingInputType()
export class UserOrderBy extends UserOrderByRelevanceInput {
  constructor() {
    super();
  }
}

@ConnectionEdgeObjectType(User)
export class UserEdge {}

@ConnectionObjectType(UserEdge)
export class UserConnection {
  @Field(() => Int, {defaultValue: 0})
  userCount!: number;
}


