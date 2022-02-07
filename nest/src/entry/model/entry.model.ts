import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Comment } from "../../comment/model/comment.model";
import { User } from "../../user/model/user.model";
import { EntryCount } from "../../.generated/prisma-nestjs-graphql/entry/outputs/entry-count.output";
import { Category } from "../../category/model/category.model";
import { JSONResolver } from "graphql-scalars";
import GraphQLJSON from "graphql-type-json";

@ObjectType("Entry")
export class Entry {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  published?: boolean;

  @Field(() => String, { nullable: false })
  authorId!: string;

  @Field(() => [GraphQLJSON], { nullable: true })
  content!: Array<typeof GraphQLJSON>;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;

  @Field(() => String, { nullable: true })
  featuredImage?: string | null;

  @Field(() => [Category], { nullable: true })
  categories?: Array<Category>;

  @Field(() => User, { nullable: false })
  author?: User;

  @Field(() => [Comment], { nullable: true })
  comments?: Array<Comment>;

  @Field(() => String, { nullable: true })
  categoryId?: string | null;

  @Field(() => EntryCount, {
    nullable: false,
    defaultValue: { categories: 0, comments: 0 }
  })
  _count!: EntryCount;
}
