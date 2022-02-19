import { Field, InputType, Int } from "@nestjs/graphql";
import { MediaItemWhereInput } from "src/.generated/prisma-nestjs-graphql/media-item/inputs/media-item-where.input";
import { MediaItemOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/media-item/inputs/media-item-order-by-with-relation-and-search-relevance.input";
import { MediaItemWhereUniqueInput } from "src/.generated/prisma-nestjs-graphql/media-item/inputs/media-item-where-unique.input";
import { MediaItemScalarFieldEnum } from "src/.generated/prisma-nestjs-graphql/media-item/enums/media-item-scalar-field.enum";
import { PaginationArgsInput } from "src/common/pagination/pagination.args";
import { UserWhereInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-where.input";
import { UserOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-order-by-with-relation-and-search-relevance.input";
import { UserWhereUniqueInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-where-unique.input";
import { UserScalarFieldEnum } from "src/.generated/prisma-nestjs-graphql/user/enums/user-scalar-field.enum";
import { EntryWhereInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-where.input";
import { EntryOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-order-by-with-relation-and-search-relevance.input";
import { EntryWhereUniqueInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-where-unique.input";
import { EntryScalarFieldEnum } from "src/.generated/prisma-nestjs-graphql/entry/enums/entry-scalar-field.enum";
import { ProfileWhereInput } from "src/.generated/prisma-nestjs-graphql/profile/inputs/profile-where.input";
import { ProfileOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/profile/inputs/profile-order-by-with-relation-and-search-relevance.input";
import { ProfileWhereUniqueInput } from "src/.generated/prisma-nestjs-graphql/profile/inputs/profile-where-unique.input";
import { ProfileScalarFieldEnum } from "src/.generated/prisma-nestjs-graphql/profile/enums/profile-scalar-field.enum";
import { SessionWhereInput } from "src/.generated/prisma-nestjs-graphql/session/inputs/session-where.input";
import { SessionOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/session/inputs/session-order-by-with-relation-and-search-relevance.input";
import { SessionScalarFieldEnum } from "src/.generated/prisma-nestjs-graphql/session/enums/session-scalar-field.enum";
import { SessionWhereUniqueInput } from "src/.generated/prisma-nestjs-graphql/session/inputs/session-where-unique.input";
import { CommentWhereInput } from "src/.generated/prisma-nestjs-graphql/comment/inputs/comment-where.input";
import { CommentOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/comment/inputs/comment-order-by-with-relation-and-search-relevance.input";
import { CommentWhereUniqueInput } from "src/.generated/prisma-nestjs-graphql/comment/inputs/comment-where-unique.input";
import { CommentScalarFieldEnum } from "src/.generated/prisma-nestjs-graphql/comment/enums/comment-scalar-field.enum";

@InputType("ManyCommentsPartialInput")
export class ManyCommentsPartialInput {
  @Field(() => CommentWhereInput, { nullable: true })
  where?: CommentWhereInput;

  @Field(() => [CommentOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true
  })
  orderBy?: Array<CommentOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => CommentWhereUniqueInput, { nullable: true })
  cursor?: CommentWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [CommentScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof CommentScalarFieldEnum>;

  @Field(() => PaginationArgsInput, {
    defaultValue: { first: 10 },
    nullable: true
  })
  pagination: PaginationArgsInput;
}

@InputType("ManySessionsPartialInput")
export class ManySessionsPartialInput {
  @Field(() => SessionWhereInput, { nullable: true })
  where?: SessionWhereInput;

  @Field(() => [SessionOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true
  })
  orderBy?: Array<SessionOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => SessionWhereUniqueInput, { nullable: false })
  cursor?: SessionWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [SessionScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof SessionScalarFieldEnum>;

  @Field(() => PaginationArgsInput, {
    defaultValue: { first: 10 },
    nullable: true
  })
  pagination?: PaginationArgsInput | null;
}

@InputType("ManyProfilesPartialInput")
export class ManyProfilesPartialInput {
  @Field(() => ProfileWhereInput, { nullable: true })
  where?: ProfileWhereInput;

  @Field(() => [ProfileOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true
  })
  orderBy?: Array<ProfileOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => ProfileWhereUniqueInput, { nullable: true })
  cursor?: ProfileWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [ProfileScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof ProfileScalarFieldEnum>;
  @Field(() => PaginationArgsInput, {
    defaultValue: { first: 10 },
    nullable: true
  })
  pagination?: PaginationArgsInput | null;
}

@InputType("ManyEntriesPartialInput")
export class ManyEntriesPartialInput {
  @Field(() => EntryWhereInput, { nullable: true })
  where?: EntryWhereInput;

  @Field(() => [EntryOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true
  })
  orderBy?: Array<EntryOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => EntryWhereUniqueInput, { nullable: true })
  cursor?: EntryWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [EntryScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof EntryScalarFieldEnum>;
  @Field(() => PaginationArgsInput, {
    defaultValue: { first: 10 },
    nullable: true
  })
  pagination?: PaginationArgsInput | null;
}
@InputType("ManyUsersPartialInput")
export class ManyUsersPartialInput {
  @Field(() => UserWhereInput, { nullable: true })
  where?: UserWhereInput;

  @Field(() => [UserOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true
  })
  orderBy?: Array<UserOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  cursor?: UserWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [UserScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof UserScalarFieldEnum>;

  @Field(() => PaginationArgsInput, {
    defaultValue: { first: 10 },
    nullable: true
  })
  pagination?: PaginationArgsInput | null;
}

@InputType("ManyMediaItemsPartialInput")
export class ManyMediaItemsPartialInput {
  @Field(() => MediaItemWhereInput, { nullable: true })
  where?: MediaItemWhereInput;

  @Field(() => [MediaItemOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true
  })
  orderBy?: Array<MediaItemOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => MediaItemWhereUniqueInput, { nullable: true })
  cursor?: MediaItemWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [MediaItemScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof MediaItemScalarFieldEnum>;

  @Field(() => PaginationArgsInput, {
    defaultValue: { first: 10 },
    nullable: true
  })
  pagination?: PaginationArgsInput | null;
}

@InputType("ComprehensiveConnectionUnionPartialInput")
export class ComprehensiveConnectionUnionPartialInput {
  @Field(() => ManyUsersPartialInput)
  manyUsersPartialInput?: ManyUsersPartialInput;

  @Field(() => ManySessionsPartialInput)
  manySessionsPartialInput?: ManySessionsPartialInput;

  @Field(() => ManyProfilesPartialInput)
  manyProfilesPartialInput?: ManyProfilesPartialInput;

  @Field(() => ManyMediaItemsPartialInput)
  manyMediaItemsPartialInput?: ManyMediaItemsPartialInput;

  @Field(() => ManyEntriesPartialInput)
  manyEntriesPartialInput?: ManyEntriesPartialInput;

  @Field(() => ManyCommentsPartialInput)
  manyCommentsPartialInput?: ManyCommentsPartialInput;
}
