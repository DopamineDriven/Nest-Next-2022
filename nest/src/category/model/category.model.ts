import { ObjectType, Field, ID } from "@nestjs/graphql";
import { User } from "../../user/model/user.model";
import { CategoryCount } from "../../.generated/prisma-nestjs-graphql/category/outputs/category-count.output";
import { Entry } from "../../entry/model/entry.model";

@ObjectType("Category")
export class Category {
  @Field(() => ID, {nullable:false})
  id!: string;

  @Field(() => String, {nullable:false})
  creatorId!: string;

  @Field(() => Date, {nullable:true})
  createdAt!: Date | null;

  @Field(() => Date, {nullable:true})
  updatedAt?: Date | null;

  @Field(() => String, {nullable:false})
  name!: string;

  @Field(() => [Entry], {nullable:true})
  entries?: Array<Entry>;

  @Field(() => String, {nullable:true})
  entryId?: string | null;

  @Field(() => User, {nullable:false})
  creator?: User;

  @Field(() => CategoryCount, {nullable:false})
  _count?: CategoryCount;
}