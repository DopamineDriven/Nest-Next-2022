import { Field } from "@nestjs/graphql";
import { InputType } from "@nestjs/graphql";
import { CategoryCreateNestedManyWithoutEntriesInput } from "src/.generated/prisma-nestjs-graphql/category/inputs/category-create-nested-many-without-entries.input";
import { UserCreateNestedOneWithoutEntriesInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-create-nested-one-without-entries.input";
import { CommentCreateNestedManyWithoutEntryInput } from "src/.generated/prisma-nestjs-graphql/comment/inputs/comment-create-nested-many-without-entry.input";

@InputType("EntryCreateNuevoInput")
export class EntryCreateNuevoInput {
  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => Boolean, { nullable: true })
  published?: boolean;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => String, { nullable: true })
  featuredImage?: string;
}
