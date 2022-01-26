import { Field, InputType } from "@nestjs/graphql";
import { SortOrder } from "../../.generated/prisma-nestjs-graphql/prisma/enums/sort-order.enum";

@InputType({ isAbstract: true })
export abstract class Order {
  @Field(() => SortOrder)
  direction!: SortOrder;
}