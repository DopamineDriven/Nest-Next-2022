import { Field, ID } from "@nestjs/graphql";
import { InputType } from "@nestjs/graphql";
import { Role } from "src/.generated/prisma-nestjs-graphql/prisma/enums/role.enum";
import { UserStatus } from "src/.generated/prisma-nestjs-graphql/prisma/enums/user-status.enum";
import { ProfileCreateNestedOneWithoutUserInput } from "src/.generated/prisma-nestjs-graphql/profile/inputs/profile-create-nested-one-without-user.input";
import { AccountCreateNestedManyWithoutUserInput } from "src/.generated/prisma-nestjs-graphql/account/inputs/account-create-nested-many-without-user.input";
import { EntryCreateNestedManyWithoutAuthorInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-create-nested-many-without-author.input";
import { ConnectionCreateNestedManyWithoutOwnerInput } from "src/.generated/prisma-nestjs-graphql/connection/inputs/connection-create-nested-many-without-owner.input";
import { CategoryCreateNestedManyWithoutCreatorInput } from "src/.generated/prisma-nestjs-graphql/category/inputs/category-create-nested-many-without-creator.input";
import { CommentCreateNestedManyWithoutAuthorInput } from "src/.generated/prisma-nestjs-graphql/comment/inputs/comment-create-nested-many-without-author.input";
import { SessionCreateNestedManyWithoutUserInput } from "src/.generated/prisma-nestjs-graphql/session/inputs/session-create-nested-many-without-user.input";
import { MediaItemCreateNestedManyWithoutUserInput } from "src/.generated/prisma-nestjs-graphql/media-item/inputs/media-item-create-nested-many-without-user.input";

@InputType("UserCreateMutationInput")
export class UserCreateMutationInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => Role, { nullable: true })
  role?: keyof typeof Role;

  @Field(() => UserStatus, { nullable: true })
  status?: keyof typeof UserStatus;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;

  @Field(() => Date, { nullable: true })
  emailVerified?: Date | string;

  @Field(() => String, { nullable: true })
  image?: string;

  @Field(() => ProfileCreateNestedOneWithoutUserInput, { nullable: true })
  profile?: ProfileCreateNestedOneWithoutUserInput;

  @Field(() => AccountCreateNestedManyWithoutUserInput, { nullable: true })
  accounts?: AccountCreateNestedManyWithoutUserInput;

  @Field(() => EntryCreateNestedManyWithoutAuthorInput, { nullable: true })
  entries?: EntryCreateNestedManyWithoutAuthorInput;

  @Field(() => ConnectionCreateNestedManyWithoutOwnerInput, { nullable: true })
  connections?: ConnectionCreateNestedManyWithoutOwnerInput;

  @Field(() => CategoryCreateNestedManyWithoutCreatorInput, { nullable: true })
  categories?: CategoryCreateNestedManyWithoutCreatorInput;

  @Field(() => CommentCreateNestedManyWithoutAuthorInput, { nullable: true })
  comments?: CommentCreateNestedManyWithoutAuthorInput;

  @Field(() => SessionCreateNestedManyWithoutUserInput, { nullable: true })
  sessions?: SessionCreateNestedManyWithoutUserInput;

  @Field(() => MediaItemCreateNestedManyWithoutUserInput, { nullable: true })
  mediaItems?: MediaItemCreateNestedManyWithoutUserInput;
}
