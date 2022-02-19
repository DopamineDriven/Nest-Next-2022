import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType("EntryCount")
export class EntryCount {
  @Field(() => Int, { nullable: false, defaultValue: 0 })
  categories!: number;

  @Field(() => Int, { nullable: false, defaultValue: 0 })
  comments!: number;
}
