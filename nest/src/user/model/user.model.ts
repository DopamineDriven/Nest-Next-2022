import { UserStatus } from "../../.generated/prisma-nestjs-graphql/prisma/enums/user-status.enum";
import { Role } from "../../.generated/prisma-nestjs-graphql/prisma/enums/role.enum";
import { Field, HideField, ID, ObjectType } from "@nestjs/graphql";
import { Connection } from "../../connection/model/connection.model";
import { Comment } from "../../comment/model/comment.model";
import { Account } from "../../account/model/account.model";
import { Entry } from "../../entry/model/entry.model";
import { Session } from "../../session/model/session.model";
import { UserCount } from "../../.generated/prisma-nestjs-graphql/user/outputs/user-count.output";
import { Profile } from "../../profile/model/profile.model";
import { Category } from "../../category/model/category.model";
@ObjectType("User")
export class User {
  /** User Shape -- note, prisma uses uuid v4 -- uuid will be valid ACROSS all databases -- no conflicts */
  @Field(() => ID, {
    name: "id",
    nullable: false,
    description:
      "User Shape -- note, prisma uses uuid v4 -- uuid will be valid ACROSS all databases -- no conflicts"
  })
  id!: string;
  @Field(() => String, { nullable: true })
  name?: string | null;

  @Field(() => String, { nullable: true })
  email!: string | null;

  @Field(() => String, { nullable: true })
  image?: string | null;

  @Field(() => Role, { nullable: false, defaultValue: Role.USER })
  role?: keyof typeof Role;

  @Field(() => UserStatus, {
    defaultValue: UserStatus.OFFLINE
  })
  status!: keyof typeof UserStatus;

  @HideField()
  @Field(() => String, { nullable: false, defaultValue: "", name: "password" })
  password!: string;

  @Field(_type => Date, {
    name: "createdAt",
    defaultValue: new Date(Date.now()),
    description: "Identifies the date and time when the object was created."
  })
  createdAt: Date;
  @Field(_type => Date, {
    name: "updatedAt",
    nullable: true,
    description:
      "Identifies the date and time when the object was last updated."
  })
  updatedAt: Date | null;

  @Field(() => Date, { nullable: true })
  emailVerified?: Date | null;

  @Field(() => Profile, { nullable: true })
  profile?: Profile | null;

  @Field(() => [Account], { nullable: true })
  accounts?: Array<Account>;

  @Field(() => [Entry], { nullable: true })
  entries?: Array<Entry>;

  @Field(() => [Session], { nullable: true })
  sessions?: Array<Session>;

  @Field(() => [Connection], { nullable: true })
  connections?: Array<Connection>;

  @Field(() => [Comment], { nullable: true })
  comments?: Array<Comment>;

  @Field(() => [Category], {nullable:true})
  categories?: Array<Category>;

  @Field(_type => String, { nullable: true })
  accessToken?: string;

  @Field(() => UserCount, { nullable: false })
  _count?: UserCount;
}