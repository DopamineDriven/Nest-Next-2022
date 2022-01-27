import { CommentReactions } from "../../.generated/prisma-nestjs-graphql/prisma/enums/comment-reactions.enum";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { User } from "../../user/model/user.model";
import { Entry } from "../../entry";
import { JSONObjectResolver } from "graphql-scalars";

@ObjectType("Comment")
export class Comment {
  @Field(() => ID, {nullable:false})
  id!: string;

  @Field(() => String, {nullable:false})
  authorId!: string;

  @Field(() => String, {nullable:false})
  entryId!: string;

  @Field(() => JSONObjectResolver, {nullable:true})
  body?: typeof JSONObjectResolver | null;

  @Field(() => String, {nullable:true})
  position?: string | null;

  @Field(() => Date, {nullable:false})
  createdAt!: Date;

  @Field(() => Date, {nullable:true})
  updatedAt?: Date | null;

  @Field(() => [CommentReactions], {nullable:true})
  reactions?: Array<keyof typeof CommentReactions>;

  @Field(() => Entry, {nullable:false})
  entry?: Entry;

  @Field(() => User, {nullable:false})
  author!: User;
}