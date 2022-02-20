import { Field } from "@nestjs/graphql";
import { InputType } from "@nestjs/graphql";
import { CommentCreatereactionsInput } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/comment-createreactions.input";
import { EntryCreateNestedOneWithoutCommentsInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-create-nested-one-without-comments.input";
import { UserCreateNestedOneWithoutCommentsInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-create-nested-one-without-comments.input";

import { ArgsType } from "@nestjs/graphql";
import { CommentCreateInput } from "src/.generated/prisma-nestjs-graphql/comment/inputs/comment-create.input";
import { CommentReactions } from "src/.generated/prisma-nestjs-graphql/prisma/enums/comment-reactions.enum";
import { EnumCommentReactionsNullableListFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/enum-comment-reactions-nullable-list-filter.input";

@InputType("CreateOneCommentInput")
export class CreateOneCommentInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  body?: string;

  @Field(() => String, { nullable: true })
  position?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;

  @Field(() => CommentCreatereactionsInput, { nullable: true })
  reactions?: CommentCreatereactionsInput;

  @Field(() => EntryCreateNestedOneWithoutCommentsInput, { nullable: true })
  entry?: EntryCreateNestedOneWithoutCommentsInput;

  @Field(() => UserCreateNestedOneWithoutCommentsInput, { nullable: true })
  author?: UserCreateNestedOneWithoutCommentsInput;
  // @Field(() => UserCreateNestedOneWithoutCommentsInput, {nullable:true})
  // author?: UserCreateNestedOneWithoutCommentsInput;
}

@InputType("CreateOneCommentArgs")
export class CreateOneCommentArgs {
  @Field(() => CreateOneCommentInput, { nullable: false })
  data!: CreateOneCommentInput;
}

@InputType("CommentCreateReactionsInput")
export class CommentCreateReactionsInput {
  @Field(() => [CommentReactions], { nullable: false })
  set!: Array<keyof typeof CommentReactions>;
}

@InputType("CreateewCommentInput")
export class CreateNewCommentInput {
  @Field(() => String)
  entryId: string;

  @Field(() => String)
  body?: string;

  @Field(() => String)
  position?: string;

  @Field(() => [CommentReactions])
  reactions: CommentCreateReactionsInput;
}
