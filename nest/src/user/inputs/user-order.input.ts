import { Order } from "./order.input";
import { SortOrder } from "../../.generated/prisma-nestjs-graphql/prisma/enums/sort-order.enum";
import { registerEnumType, Field, InputType } from "@nestjs/graphql";

export enum UserOrderField {
  id = "ID",
  name = "NAME",
  email = "EMAIL",
  createdAt = "CREATED_AT",
  updatedAt = "UPDATED_AT"
}

registerEnumType(UserOrderField, {
  name: "UserOrderField",
  description: "Properties by which user connections may be ordered"
})

@InputType()
export class UserOrder implements Order {
  @Field(() => SortOrder)
  direction: SortOrder;
  field!: UserOrderField;
}