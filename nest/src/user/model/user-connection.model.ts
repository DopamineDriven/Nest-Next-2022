import { User } from ".";
import { Field, registerEnumType, Int } from "@nestjs/graphql";
import { UserOrderField } from "..";
import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType
} from "../../common";

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
export class UserOrderBy {
  @Field(_type => UserOrderField, { nullable: true })
  sort: UserOrderField;
}

@ConnectionEdgeObjectType(User)
export class UserEdge {}

@ConnectionObjectType(UserEdge)
export class UserConnection {
  @Field(() => Int, { defaultValue: 0 })
  userCount!: number;
}
