import { UserStatus } from "../../.generated/prisma-nestjs-graphql/prisma/enums/user-status.enum";
import { Role } from "../../.generated/prisma-nestjs-graphql/prisma/enums/role.enum";
import { Field, HideField, ID, ObjectType } from "@nestjs/graphql";
import { Connection } from "../../connection/model/connection.model";
import { Comment } from "../../comment/model/comment.model";
import { Account } from "../../account/model/account.model";
import { Entry } from "../../entry/model/entry.model";
import { Session } from "../../session/model/session.model";
import { UserCount } from "../outputs/user-count.output";
import { Profile } from "../../profile/model/profile.model";
import { Category } from "../../category/model/category.model";
import { NullLiteral } from "ts-morph";
import { GraphQLJSON, JSONObjectResolver, JSONResolver } from "graphql-scalars";
import { MediaItem } from "src/media/model/media.model";
import { Prisma } from "@prisma/client";
import { Node } from "src/node/model/node.model";
type Nullable<T> = T | null;

@ObjectType("User")
export class User implements Node {
  @Field(() => ID, {
    name: "id",
    nullable: false
  })
  id!: string;
  @Field(() => String, { nullable: true })
  firstName: string | null;

  @Field(() => String, { nullable: true })
  lastName: string | null;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => [JSONObjectResolver])
  image!: Array<any>

  @Field(() => Role, { nullable: true, defaultValue: Role.USER })
  role: Nullable<keyof typeof Role>;

  @Field(() => UserStatus, {
    defaultValue: UserStatus.OFFLINE
  })
  status!: Nullable<keyof typeof UserStatus>;

  @HideField()
  @Field(() => String, { nullable: false, defaultValue: "", name: "password" })
  password!: string;

  @Field(_type => Date, {
    name: "createdAt",
    defaultValue: new Date(Date.now()),
    description: "Identifies the date and time when the user was created."
  })
  createdAt: Date;
  @Field(_type => Date, {
    name: "updatedAt",
    nullable: true,
    description: "Identifies the date and time when the user was last updated."
  })
  updatedAt: Date | null;

  @Field(() => Date, { nullable: true })
  emailVerified: Date | null;

  @Field(() => Profile || NullLiteral, { nullable: true })
  profile?: Profile | null;

  @Field(() => [Account] || [NullLiteral], { nullable: true })
  accounts?: Array<Account> | null;

  @Field(() => [Entry] || [NullLiteral], { nullable: true })
  entries?: Array<Entry> | null;

  @Field(() => [Session] || [NullLiteral], { nullable: true })
  sessions?: Array<Session> | null;

  @Field(() => [Connection] || [NullLiteral], { nullable: true })
  connections?: Array<Connection>;

  @Field(() => [Comment] || [NullLiteral], { nullable: true })
  comments?: Array<Comment>;

  @Field(() => [Category] || [NullLiteral], { nullable: true })
  categories?: Array<Category>;

  @Field(() => [MediaItem], { nullable: true })
  mediaItems?: Array<MediaItem> | null

  @Field(() => UserCount, {
    defaultValue: {
      accounts: 0,
      entries: 0,
      connections: 0,
      categories: 0,
      comments: 0,
      sessions: 0,
      mediaItems: 0
    },
    nullable: true
  })
  _count?: UserCount | null;
}
