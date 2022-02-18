import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType("CategoryCount")
export class CategoryCount {
  @Field(() => Int, { nullable: false, defaultValue: 0 })
  entries!: number;
}
