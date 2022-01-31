import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Comment } from "../../comment/model/comment.model";
import { User } from "../../user/model/user.model";
import { EntryCount } from "../../.generated/prisma-nestjs-graphql/entry/outputs/entry-count.output";
import { Category } from "../../category/model/category.model";

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

  @Field(() => String, { nullable: true })
  content?: string | null;

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

  @Field(() => EntryCount, { nullable: false })
  _count!: EntryCount;
}
