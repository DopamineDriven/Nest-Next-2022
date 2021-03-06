import { ObjectType, Field, Int, InputType } from "@nestjs/graphql";

@ObjectType("UserCount")
export class UserCount {
  @Field(() => Int, { nullable: false, defaultValue: 0 })
  accounts!: number;

  @Field(() => Int, { nullable: false, defaultValue: 0 })
  entries!: number;

  @Field(() => Int, { nullable: false, defaultValue: 0 })
  connections!: number;

  @Field(() => Int, { nullable: false, defaultValue: 0 })
  categories!: number;

  @Field(() => Int, { nullable: false, defaultValue: 0 })
  comments!: number;

  @Field(() => Int, { nullable: false, defaultValue: 0 })
  sessions!: number;

  @Field(() => Int, { nullable: false, defaultValue: 0 })
  mediaItems!: number;
}
