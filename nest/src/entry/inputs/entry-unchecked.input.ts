import { Field } from "@nestjs/graphql";
import { InputType } from "@nestjs/graphql";
import { CommentUncheckedCreateNestedManyWithoutEntryInput } from "src/.generated/prisma-nestjs-graphql/comment/inputs/comment-unchecked-create-nested-many-without-entry.input";

@InputType("EntryUncheckedCreateInputSansAuthorId")
export class EntryUncheckedCreateInputSansAuthorId {
  @Field(() => String)
  id!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => Boolean, { nullable: true })
  published!: boolean;

  @Field(() => String, { nullable: true })
  content!: string | null;

  @Field(() => String, { nullable: true })
  featuredImage!: string | null;

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => CommentUncheckedCreateNestedManyWithoutEntryInput, {
    nullable: true
  })
  comments?: CommentUncheckedCreateNestedManyWithoutEntryInput;
}
