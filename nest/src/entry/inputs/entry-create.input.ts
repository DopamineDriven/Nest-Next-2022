import { Field, ID, InputType } from "@nestjs/graphql";
import { CategoryCreateNestedManyWithoutEntriesInput } from "src/.generated/prisma-nestjs-graphql/category/inputs/category-create-nested-many-without-entries.input";
import { UserCreateNestedOneWithoutEntriesInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-create-nested-one-without-entries.input";
import { CommentCreateNestedManyWithoutEntryInput } from "src/.generated/prisma-nestjs-graphql/comment/inputs/comment-create-nested-many-without-entry.input";
import { UserCreateOrConnectWithoutEntriesInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-create-or-connect-without-entries.input";
import { EntryCreatecontentInput } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/entry-createcontent.input";
import { GraphQLJSON, JSONObjectResolver } from "graphql-scalars";
import { EntryCreatefeaturedImageInput } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/entry-createfeatured-image.input";

@InputType("EntryCreateOneInput")
export class EntryCreateOneInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => Boolean, { nullable: true })
  published?: boolean;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;

  @Field(() => EntryCreatefeaturedImageInput, {nullable:true})
  featuredImage?: EntryCreatefeaturedImageInput;

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => EntryCreatecontentInput, { nullable: true })
  content?: EntryCreatecontentInput;

  @Field(() => CategoryCreateNestedManyWithoutEntriesInput, { nullable: true })
  categories?: CategoryCreateNestedManyWithoutEntriesInput;

  @Field(() => UserCreateNestedOneWithoutEntriesInput, { nullable: false })
  author!: UserCreateNestedOneWithoutEntriesInput;

  @Field(() => CommentCreateNestedManyWithoutEntryInput, { nullable: true })
  comments?: CommentCreateNestedManyWithoutEntryInput;
}
