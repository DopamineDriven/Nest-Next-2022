import { Field, InputType } from "@nestjs/graphql";
import { StringFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/string-filter.input";
import { StringNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/string-nullable-filter.input";
import { EnumRoleNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/enum-role-nullable-filter.input";
import { EnumUserStatusNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/enum-user-status-nullable-filter.input";
import { DateTimeFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/date-time-filter.input";
import { DateTimeNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/date-time-nullable-filter.input";
import { ProfileRelationFilter } from "src/.generated/prisma-nestjs-graphql/profile/inputs/profile-relation-filter.input";
import { AccountListRelationFilter } from "src/.generated/prisma-nestjs-graphql/account/inputs/account-list-relation-filter.input";
import { EntryListRelationFilter } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-list-relation-filter.input";
import { ConnectionListRelationFilter } from "src/.generated/prisma-nestjs-graphql/connection/inputs/connection-list-relation-filter.input";
import { CategoryListRelationFilter } from "src/.generated/prisma-nestjs-graphql/category/inputs/category-list-relation-filter.input";
import { CommentListRelationFilter } from "src/.generated/prisma-nestjs-graphql/comment/inputs/comment-list-relation-filter.input";
import { SessionListRelationFilter } from "src/.generated/prisma-nestjs-graphql/session/inputs/session-list-relation-filter.input";
import { UserRelationFilter } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-relation-filter.input";
import { ViewerEntity } from "../model/viewer.model";
import { globalIdField } from "graphql-relay";

@InputType("ViewerWhereInput")
export class ViewerWhereInput {
  @Field(() => [ViewerWhereInput], { nullable: true })
  AND?: Array<ViewerWhereInput>;

  @Field(() => [ViewerWhereInput], { nullable: true })
  OR?: Array<ViewerWhereInput>;

  @Field(() => [ViewerWhereInput], { nullable: true })
  NOT?: Array<ViewerWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter;
}
