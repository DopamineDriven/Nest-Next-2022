import { UserStatus } from "../../.generated/prisma-nestjs-graphql/prisma/enums/user-status.enum";
import { Role } from "../../.generated/prisma-nestjs-graphql/prisma/enums/role.enum";
import { Field, HideField, ID, ObjectType } from "@nestjs/graphql";
import { Profile } from "../../profile/model/profile.model";
import { NullLiteral } from "ts-morph";
import { Node } from "src/node/model/node.model";
import { UserCount } from "src/.generated/prisma-nestjs-graphql/user/outputs/user-count.output";
import { EntryConnection } from "src/entry/model/entry-connection.model";
import { CommentConnection } from "src/comment/model/comment-connection.model";
import { MediaItemConnection } from "src/media/model/media-connection";
import { SessionConnection } from "src/session/model/session-connection.model";
import {
  ConnectionObjectType,
  ConnectionEdgeObjectType
} from "src/common/pagination/pagination";

type Nullable<T> = T | null;

@ObjectType("ViewerFieldsPaginated", { implements: () => [Node] })
export class ViewerFieldsPaginated implements Node {
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

  @Field(() => String, { nullable: true })
  image: string | null;

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
    nullable: false
  })
  _count?: UserCount;

  @Field(() => EntryConnection)
  entryConnection?: EntryConnection;

  @Field(() => CommentConnection)
  commentConnection?: CommentConnection;

  // @Field(() => CategoryConnection)
  // categoryConnection?: CategoryConnection;

  // @Field(() => ConnectionConnection)
  // connectionConnection?: ConnectionConnection;

  @Field(() => MediaItemConnection)
  mediaItemConnection?: MediaItemConnection;

  @Field(() => SessionConnection)
  sessionConnection?: SessionConnection;
}

@ConnectionEdgeObjectType(ViewerFieldsPaginated)
export class ViewerFieldsPaginatedEdge {}

@ConnectionObjectType(ViewerFieldsPaginatedEdge)
export class ViewerFieldsPaginatedConnection {}
