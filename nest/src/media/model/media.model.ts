import { ObjectType, Field, ID, Float, Int } from "@nestjs/graphql";
import { MimeTypes } from "src/.generated/prisma-nestjs-graphql/prisma/enums/mime-types.enum";
import { User } from "src/user/model/user.model";
import { Node } from "src/node/model/node.model";

@ObjectType("MediaItem")
export class MediaItem implements Node {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => Date, { nullable: false })
  uploadedAt!: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;

  @Field(() => User, { nullable: false })
  user?: User;

  @Field(() => String, { nullable: true })
  name!: string | null;

  @Field(() => String, { nullable: true })
  size?: string | null;

  @Field(() => MimeTypes, { nullable: true })
  type?: keyof typeof MimeTypes | null;

  @Field(() => Date, { nullable: true })
  fileLastModified?: Date | null;

  @Field(() => Float, { nullable: true })
  width!: number | null;

  @Field(() => Float, { nullable: true })
  height!: number | null;

  @Field(() => Int, { nullable: true, defaultValue: 75 })
  quality?: number | null;

  @Field(() => String, { nullable: true })
  src?: string | null;

  @Field(() => String, { nullable: true })
  srcSet?: string | null;
}
