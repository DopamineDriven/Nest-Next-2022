import { ResolverContext } from "@/apollo/resolver-context";
import { Upload } from "graphql-upload";
import {
  GraphQLDate,
  GraphQLDateTime,
  GraphQLTime,
  GraphQLJSON,
  GraphQLJSONObject,
  JSONResolver,
  GraphQLBigInt
} from "graphql-scalars";
import { DeepPartial } from "utility-types";
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type FieldWrapper<T> = T;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: typeof GraphQLBigInt;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: Date;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: typeof String;
};

export type Account = Node & {
  __typename?: "Account";
  access_token?: Maybe<FieldWrapper<Scalars["String"]>>;
  expires_at?: Maybe<FieldWrapper<Scalars["Int"]>>;
  id: FieldWrapper<Scalars["ID"]>;
  id_token?: Maybe<FieldWrapper<Scalars["String"]>>;
  oauth_token?: Maybe<FieldWrapper<Scalars["String"]>>;
  oauth_token_secret?: Maybe<FieldWrapper<Scalars["String"]>>;
  provider: FieldWrapper<Scalars["String"]>;
  providerAccountId: FieldWrapper<Scalars["String"]>;
  refresh_secret?: Maybe<FieldWrapper<Scalars["String"]>>;
  refresh_token?: Maybe<FieldWrapper<Scalars["String"]>>;
  scope?: Maybe<FieldWrapper<Scalars["String"]>>;
  session_state?: Maybe<FieldWrapper<Scalars["String"]>>;
  token_type?: Maybe<FieldWrapper<Scalars["String"]>>;
  type: FieldWrapper<Scalars["String"]>;
  user: FieldWrapper<User>;
  userId: FieldWrapper<Scalars["String"]>;
};

export type AccountCreateManyUserInput = {
  access_token?: InputMaybe<Scalars["String"]>;
  expires_at?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["String"]>;
  id_token?: InputMaybe<Scalars["String"]>;
  oauth_token?: InputMaybe<Scalars["String"]>;
  oauth_token_secret?: InputMaybe<Scalars["String"]>;
  provider: Scalars["String"];
  providerAccountId: Scalars["String"];
  refresh_secret?: InputMaybe<Scalars["String"]>;
  refresh_token?: InputMaybe<Scalars["String"]>;
  scope?: InputMaybe<Scalars["String"]>;
  session_state?: InputMaybe<Scalars["String"]>;
  token_type?: InputMaybe<Scalars["String"]>;
  type: Scalars["String"];
};

export type AccountCreateManyUserInputEnvelope = {
  data: Array<AccountCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars["Boolean"]>;
};

export type AccountCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<AccountWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<AccountCreateOrConnectWithoutUserInput>
  >;
  create?: InputMaybe<Array<AccountCreateWithoutUserInput>>;
  createMany?: InputMaybe<AccountCreateManyUserInputEnvelope>;
};

export type AccountCreateOrConnectWithoutUserInput = {
  create: AccountCreateWithoutUserInput;
  where: AccountWhereUniqueInput;
};

export type AccountCreateWithoutUserInput = {
  access_token?: InputMaybe<Scalars["String"]>;
  expires_at?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["String"]>;
  id_token?: InputMaybe<Scalars["String"]>;
  oauth_token?: InputMaybe<Scalars["String"]>;
  oauth_token_secret?: InputMaybe<Scalars["String"]>;
  provider: Scalars["String"];
  providerAccountId: Scalars["String"];
  refresh_secret?: InputMaybe<Scalars["String"]>;
  refresh_token?: InputMaybe<Scalars["String"]>;
  scope?: InputMaybe<Scalars["String"]>;
  session_state?: InputMaybe<Scalars["String"]>;
  token_type?: InputMaybe<Scalars["String"]>;
  type: Scalars["String"];
};

export type AccountListRelationFilter = {
  every?: InputMaybe<AccountWhereInput>;
  none?: InputMaybe<AccountWhereInput>;
  some?: InputMaybe<AccountWhereInput>;
};

export type AccountOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AccountProviderProviderAccountIdCompoundUniqueInput = {
  provider: Scalars["String"];
  providerAccountId: Scalars["String"];
};

export type AccountWhereInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  NOT?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  access_token?: InputMaybe<StringNullableFilter>;
  expires_at?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<StringFilter>;
  id_token?: InputMaybe<StringNullableFilter>;
  oauth_token?: InputMaybe<StringNullableFilter>;
  oauth_token_secret?: InputMaybe<StringNullableFilter>;
  provider?: InputMaybe<StringFilter>;
  providerAccountId?: InputMaybe<StringFilter>;
  refresh_secret?: InputMaybe<StringNullableFilter>;
  refresh_token?: InputMaybe<StringNullableFilter>;
  scope?: InputMaybe<StringNullableFilter>;
  session_state?: InputMaybe<StringNullableFilter>;
  token_type?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type AccountWhereUniqueInput = {
  id?: InputMaybe<Scalars["String"]>;
  provider_providerAccountId?: InputMaybe<AccountProviderProviderAccountIdCompoundUniqueInput>;
};

export enum AlgorithmType {
  ES256 = "ES256",
  ES256K = "ES256K",
  ES384 = "ES384",
  ES512 = "ES512",
  Ed448 = "Ed448",
  Ed25519 = "Ed25519",
  HS256 = "HS256",
  HS384 = "HS384",
  HS512 = "HS512",
  None = "None",
  PS256 = "PS256",
  PS384 = "PS384",
  PS512 = "PS512",
  RS256 = "RS256",
  RS384 = "RS384",
  RS512 = "RS512"
}

export type Auth = {
  __typename?: "Auth";
  /** JWT access token */
  accessToken: FieldWrapper<Scalars["String"]>;
  /** JWT refresh token */
  refreshToken: FieldWrapper<Scalars["String"]>;
  session?: Maybe<FieldWrapper<Session>>;
  user: FieldWrapper<User>;
};

export type AuthDetailed = {
  __typename?: "AuthDetailed";
  auth?: Maybe<FieldWrapper<Auth>>;
  jwt?: Maybe<FieldWrapper<JwtDecoded>>;
};

export type BaseTypeNodes = {
  __typename?: "BaseTypeNodes";
  nodes: Array<FieldWrapper<TypesUnion>>;
  pageInfo?: Maybe<FieldWrapper<PageInfo>>;
  totalCount: FieldWrapper<Scalars["Int"]>;
};

export type BaseTypesEdge = {
  __typename?: "BaseTypesEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<TypesUnion>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars["Boolean"]>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type Category = Node & {
  __typename?: "Category";
  _count: FieldWrapper<CategoryCount>;
  createdAt?: Maybe<FieldWrapper<Scalars["DateTime"]>>;
  creator: FieldWrapper<User>;
  creatorId: FieldWrapper<Scalars["String"]>;
  entries?: Maybe<Array<FieldWrapper<Entry>>>;
  entryId?: Maybe<FieldWrapper<Scalars["String"]>>;
  id: FieldWrapper<Scalars["ID"]>;
  name: FieldWrapper<Scalars["String"]>;
  updatedAt?: Maybe<FieldWrapper<Scalars["DateTime"]>>;
};

export type CategoryConnection = {
  __typename?: "CategoryConnection";
  edges: Array<FieldWrapper<CategoryEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
  totalCount: FieldWrapper<Scalars["Int"]>;
};

export type CategoryCount = {
  __typename?: "CategoryCount";
  entries: FieldWrapper<Scalars["Int"]>;
};

export type CategoryCreateManyCreatorInput = {
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  entryId?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type CategoryCreateManyCreatorInputEnvelope = {
  data: Array<CategoryCreateManyCreatorInput>;
  skipDuplicates?: InputMaybe<Scalars["Boolean"]>;
};

export type CategoryCreateNestedManyWithoutCreatorInput = {
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<CategoryCreateOrConnectWithoutCreatorInput>
  >;
  create?: InputMaybe<Array<CategoryCreateWithoutCreatorInput>>;
  createMany?: InputMaybe<CategoryCreateManyCreatorInputEnvelope>;
};

export type CategoryCreateNestedManyWithoutEntriesInput = {
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<CategoryCreateOrConnectWithoutEntriesInput>
  >;
  create?: InputMaybe<Array<CategoryCreateWithoutEntriesInput>>;
};

export type CategoryCreateOrConnectWithoutCreatorInput = {
  create: CategoryCreateWithoutCreatorInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryCreateOrConnectWithoutEntriesInput = {
  create: CategoryCreateWithoutEntriesInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryCreateWithoutCreatorInput = {
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  entries?: InputMaybe<EntryCreateNestedManyWithoutCategoriesInput>;
  entryId?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type CategoryCreateWithoutEntriesInput = {
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  creator?: InputMaybe<UserCreateNestedOneWithoutCategoriesInput>;
  entryId?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type CategoryEdge = {
  __typename?: "CategoryEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<Category>;
};

export type CategoryListRelationFilter = {
  every?: InputMaybe<CategoryWhereInput>;
  none?: InputMaybe<CategoryWhereInput>;
  some?: InputMaybe<CategoryWhereInput>;
};

export type CategoryOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum CategoryOrderByRelevanceFieldEnum {
  creatorId = "creatorId",
  entryId = "entryId",
  id = "id",
  name = "name"
}

export type CategoryOrderByRelevanceInput = {
  fields: Array<CategoryOrderByRelevanceFieldEnum>;
  search: Scalars["String"];
  sort: SortOrder;
};

export type CategoryOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<CategoryOrderByRelevanceInput>;
  createdAt?: InputMaybe<SortOrder>;
  creator?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
  creatorId?: InputMaybe<SortOrder>;
  entries?: InputMaybe<EntryOrderByRelationAggregateInput>;
  entryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum CategoryScalarFieldEnum {
  createdAt = "createdAt",
  creatorId = "creatorId",
  entryId = "entryId",
  id = "id",
  name = "name",
  updatedAt = "updatedAt"
}

export type CategoryWhereInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  creator?: InputMaybe<UserRelationFilter>;
  creatorId?: InputMaybe<StringNullableFilter>;
  entries?: InputMaybe<EntryListRelationFilter>;
  entryId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type CategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars["String"]>;
};

export type ChangePasswordInput = {
  newPassword: Scalars["String"];
  oldPassword: Scalars["String"];
};

export type Comment = Node & {
  __typename?: "Comment";
  author: FieldWrapper<User>;
  authorId?: Maybe<FieldWrapper<Scalars["String"]>>;
  body?: Maybe<FieldWrapper<Scalars["String"]>>;
  createdAt: FieldWrapper<Scalars["DateTime"]>;
  entry: FieldWrapper<Entry>;
  entryId?: Maybe<FieldWrapper<Scalars["String"]>>;
  id: FieldWrapper<Scalars["ID"]>;
  position?: Maybe<FieldWrapper<Scalars["String"]>>;
  reactions?: Maybe<Array<FieldWrapper<CommentReactions>>>;
  updatedAt?: Maybe<FieldWrapper<Scalars["DateTime"]>>;
};

export type CommentAuthorIdEntryIdCompoundUniqueInput = {
  authorId: Scalars["String"];
  entryId: Scalars["String"];
};

export type CommentConnection = {
  __typename?: "CommentConnection";
  edges: Array<FieldWrapper<CommentEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
  totalCount: FieldWrapper<Scalars["Int"]>;
};

export type CommentCreateManyAuthorInput = {
  body?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  entryId?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  position?: InputMaybe<Scalars["String"]>;
  reactions?: InputMaybe<CommentCreateManyreactionsInput>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type CommentCreateManyAuthorInputEnvelope = {
  data: Array<CommentCreateManyAuthorInput>;
  skipDuplicates?: InputMaybe<Scalars["Boolean"]>;
};

export type CommentCreateManyEntryInput = {
  authorId?: InputMaybe<Scalars["String"]>;
  body?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  id?: InputMaybe<Scalars["String"]>;
  position?: InputMaybe<Scalars["String"]>;
  reactions?: InputMaybe<CommentCreateManyreactionsInput>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type CommentCreateManyEntryInputEnvelope = {
  data: Array<CommentCreateManyEntryInput>;
  skipDuplicates?: InputMaybe<Scalars["Boolean"]>;
};

export type CommentCreateManyreactionsInput = {
  set: Array<CommentReactions>;
};

export type CommentCreateNestedManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<CommentCreateOrConnectWithoutAuthorInput>
  >;
  create?: InputMaybe<Array<CommentCreateWithoutAuthorInput>>;
  createMany?: InputMaybe<CommentCreateManyAuthorInputEnvelope>;
};

export type CommentCreateNestedManyWithoutEntryInput = {
  connect?: InputMaybe<Array<CommentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<CommentCreateOrConnectWithoutEntryInput>
  >;
  create?: InputMaybe<Array<CommentCreateWithoutEntryInput>>;
  createMany?: InputMaybe<CommentCreateManyEntryInputEnvelope>;
};

export type CommentCreateOrConnectWithoutAuthorInput = {
  create: CommentCreateWithoutAuthorInput;
  where: CommentWhereUniqueInput;
};

export type CommentCreateOrConnectWithoutEntryInput = {
  create: CommentCreateWithoutEntryInput;
  where: CommentWhereUniqueInput;
};

export type CommentCreateWithoutAuthorInput = {
  body?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  entry?: InputMaybe<EntryCreateNestedOneWithoutCommentsInput>;
  id?: InputMaybe<Scalars["String"]>;
  position?: InputMaybe<Scalars["String"]>;
  reactions?: InputMaybe<CommentCreatereactionsInput>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type CommentCreateWithoutEntryInput = {
  author?: InputMaybe<UserCreateNestedOneWithoutCommentsInput>;
  body?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  id?: InputMaybe<Scalars["String"]>;
  position?: InputMaybe<Scalars["String"]>;
  reactions?: InputMaybe<CommentCreatereactionsInput>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type CommentCreatereactionsInput = {
  set: Array<CommentReactions>;
};

export type CommentEdge = {
  __typename?: "CommentEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<Comment>;
};

export type CommentListRelationFilter = {
  every?: InputMaybe<CommentWhereInput>;
  none?: InputMaybe<CommentWhereInput>;
  some?: InputMaybe<CommentWhereInput>;
};

export type CommentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum CommentOrderByRelevanceFieldEnum {
  authorId = "authorId",
  body = "body",
  entryId = "entryId",
  id = "id",
  position = "position"
}

export type CommentOrderByRelevanceInput = {
  fields: Array<CommentOrderByRelevanceFieldEnum>;
  search: Scalars["String"];
  sort: SortOrder;
};

export type CommentOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<CommentOrderByRelevanceInput>;
  author?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
  authorId?: InputMaybe<SortOrder>;
  body?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  entry?: InputMaybe<EntryOrderByWithRelationAndSearchRelevanceInput>;
  entryId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  reactions?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum CommentReactions {
  ANGRY = "ANGRY",
  CARE = "CARE",
  CONFUSED = "CONFUSED",
  DISLIKE = "DISLIKE",
  LAUGH = "LAUGH",
  LIKE = "LIKE",
  LOVE = "LOVE",
  PARROT = "PARROT",
  ROCKET = "ROCKET",
  TEARS = "TEARS",
  WOW = "WOW"
}

export enum CommentScalarFieldEnum {
  authorId = "authorId",
  body = "body",
  createdAt = "createdAt",
  entryId = "entryId",
  id = "id",
  position = "position",
  reactions = "reactions",
  updatedAt = "updatedAt"
}

export type CommentWhereInput = {
  AND?: InputMaybe<Array<CommentWhereInput>>;
  NOT?: InputMaybe<Array<CommentWhereInput>>;
  OR?: InputMaybe<Array<CommentWhereInput>>;
  author?: InputMaybe<UserRelationFilter>;
  authorId?: InputMaybe<StringNullableFilter>;
  body?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  entry?: InputMaybe<EntryRelationFilter>;
  entryId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  position?: InputMaybe<StringNullableFilter>;
  reactions?: InputMaybe<EnumCommentReactionsNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type CommentWhereUniqueInput = {
  authorId_entryId?: InputMaybe<CommentAuthorIdEntryIdCompoundUniqueInput>;
  id?: InputMaybe<Scalars["String"]>;
};

export type Connection = Node & {
  __typename?: "Connection";
  email: FieldWrapper<Scalars["String"]>;
  firstName?: Maybe<FieldWrapper<Scalars["String"]>>;
  id: FieldWrapper<Scalars["ID"]>;
  ip?: Maybe<FieldWrapper<Scalars["String"]>>;
  lastModified?: Maybe<FieldWrapper<Scalars["DateTime"]>>;
  lastName?: Maybe<FieldWrapper<Scalars["String"]>>;
  owner: FieldWrapper<User>;
  ownerId?: Maybe<FieldWrapper<Scalars["String"]>>;
  phoneNumber?: Maybe<FieldWrapper<Scalars["PhoneNumber"]>>;
};

export type ConnectionConnection = {
  __typename?: "ConnectionConnection";
  edges: Array<FieldWrapper<ConnectionEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
  totalCount: FieldWrapper<Scalars["Int"]>;
};

export type ConnectionCreateManyOwnerInput = {
  email: Scalars["String"];
  firstName?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  ip?: InputMaybe<Scalars["String"]>;
  lastModified?: InputMaybe<Scalars["DateTime"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  phoneNumber?: InputMaybe<Scalars["String"]>;
};

export type ConnectionCreateManyOwnerInputEnvelope = {
  data: Array<ConnectionCreateManyOwnerInput>;
  skipDuplicates?: InputMaybe<Scalars["Boolean"]>;
};

export type ConnectionCreateNestedManyWithoutOwnerInput = {
  connect?: InputMaybe<Array<ConnectionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<ConnectionCreateOrConnectWithoutOwnerInput>
  >;
  create?: InputMaybe<Array<ConnectionCreateWithoutOwnerInput>>;
  createMany?: InputMaybe<ConnectionCreateManyOwnerInputEnvelope>;
};

export type ConnectionCreateOrConnectWithoutOwnerInput = {
  create: ConnectionCreateWithoutOwnerInput;
  where: ConnectionWhereUniqueInput;
};

export type ConnectionCreateWithoutOwnerInput = {
  email: Scalars["String"];
  firstName?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  ip?: InputMaybe<Scalars["String"]>;
  lastModified?: InputMaybe<Scalars["DateTime"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  phoneNumber?: InputMaybe<Scalars["String"]>;
};

export type ConnectionEdge = {
  __typename?: "ConnectionEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<Connection>;
};

export type ConnectionListRelationFilter = {
  every?: InputMaybe<ConnectionWhereInput>;
  none?: InputMaybe<ConnectionWhereInput>;
  some?: InputMaybe<ConnectionWhereInput>;
};

export type ConnectionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum ConnectionOrderByRelevanceFieldEnum {
  email = "email",
  firstName = "firstName",
  id = "id",
  ip = "ip",
  lastName = "lastName",
  ownerId = "ownerId",
  phoneNumber = "phoneNumber"
}

export type ConnectionOrderByRelevanceInput = {
  fields: Array<ConnectionOrderByRelevanceFieldEnum>;
  search: Scalars["String"];
  sort: SortOrder;
};

export type ConnectionOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<ConnectionOrderByRelevanceInput>;
  email?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  ip?: InputMaybe<SortOrder>;
  lastModified?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  owner?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
  ownerId?: InputMaybe<SortOrder>;
  phoneNumber?: InputMaybe<SortOrder>;
};

export enum ConnectionScalarFieldEnum {
  email = "email",
  firstName = "firstName",
  id = "id",
  ip = "ip",
  lastModified = "lastModified",
  lastName = "lastName",
  ownerId = "ownerId",
  phoneNumber = "phoneNumber"
}

export type ConnectionWhereInput = {
  AND?: InputMaybe<Array<ConnectionWhereInput>>;
  NOT?: InputMaybe<Array<ConnectionWhereInput>>;
  OR?: InputMaybe<Array<ConnectionWhereInput>>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  ip?: InputMaybe<StringNullableFilter>;
  lastModified?: InputMaybe<DateTimeNullableFilter>;
  lastName?: InputMaybe<StringNullableFilter>;
  owner?: InputMaybe<UserRelationFilter>;
  ownerId?: InputMaybe<StringNullableFilter>;
  phoneNumber?: InputMaybe<StringNullableFilter>;
};

export type ConnectionWhereUniqueInput = {
  id?: InputMaybe<Scalars["String"]>;
};

export type ContentNodes = {
  __typename?: "ContentNodes";
  contentNodes: FieldWrapper<BaseTypeNodes>;
};

export type CreatNewCommentInput = {
  body: Scalars["String"];
  entryId: Scalars["String"];
  position: Scalars["String"];
  reactions: Array<CommentReactions>;
};

export type CreateNewProfileInput = {
  bio?: InputMaybe<Scalars["String"]>;
  city?: InputMaybe<Scalars["String"]>;
  country?: InputMaybe<Scalars["String"]>;
  coverPhoto?: InputMaybe<Scalars["String"]>;
  dob?: InputMaybe<Scalars["String"]>;
  gender?: InputMaybe<Gender>;
  occupation?: InputMaybe<Scalars["String"]>;
  phoneNumber?: InputMaybe<Scalars["String"]>;
  pronouns?: InputMaybe<Pronouns>;
};

export type CreateOneProfile = {
  data: CreateNewProfileInput;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars["DateTime"]>;
  gt?: InputMaybe<Scalars["DateTime"]>;
  gte?: InputMaybe<Scalars["DateTime"]>;
  in?: InputMaybe<Array<Scalars["DateTime"]>>;
  lt?: InputMaybe<Scalars["DateTime"]>;
  lte?: InputMaybe<Scalars["DateTime"]>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars["DateTime"]>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars["DateTime"]>;
  gt?: InputMaybe<Scalars["DateTime"]>;
  gte?: InputMaybe<Scalars["DateTime"]>;
  in?: InputMaybe<Array<Scalars["DateTime"]>>;
  lt?: InputMaybe<Scalars["DateTime"]>;
  lte?: InputMaybe<Scalars["DateTime"]>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["DateTime"]>>;
};

export type Entry = Node & {
  __typename?: "Entry";
  _count: FieldWrapper<EntryCount>;
  author: FieldWrapper<User>;
  authorId?: Maybe<FieldWrapper<Scalars["String"]>>;
  categories?: Maybe<Array<FieldWrapper<Category>>>;
  categoryId?: Maybe<FieldWrapper<Scalars["String"]>>;
  comments?: Maybe<Array<FieldWrapper<Comment>>>;
  content?: Maybe<FieldWrapper<Scalars["String"]>>;
  createdAt: FieldWrapper<Scalars["DateTime"]>;
  featuredImage?: Maybe<FieldWrapper<Scalars["String"]>>;
  id: FieldWrapper<Scalars["ID"]>;
  published?: Maybe<FieldWrapper<Scalars["Boolean"]>>;
  title?: Maybe<FieldWrapper<Scalars["String"]>>;
  updatedAt?: Maybe<FieldWrapper<Scalars["DateTime"]>>;
};

export type EntryConnection = {
  __typename?: "EntryConnection";
  edges: Array<FieldWrapper<EntryEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
  totalCount: FieldWrapper<Scalars["Int"]>;
};

export type EntryCount = {
  __typename?: "EntryCount";
  categories: FieldWrapper<Scalars["Int"]>;
  comments: FieldWrapper<Scalars["Int"]>;
};

export type EntryCreateManyAuthorInput = {
  categoryId?: InputMaybe<Scalars["String"]>;
  content?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  featuredImage?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  published?: InputMaybe<Scalars["Boolean"]>;
  title: Scalars["String"];
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type EntryCreateManyAuthorInputEnvelope = {
  data: Array<EntryCreateManyAuthorInput>;
  skipDuplicates?: InputMaybe<Scalars["Boolean"]>;
};

export type EntryCreateNestedManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<EntryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<EntryCreateOrConnectWithoutAuthorInput>
  >;
  create?: InputMaybe<Array<EntryCreateWithoutAuthorInput>>;
  createMany?: InputMaybe<EntryCreateManyAuthorInputEnvelope>;
};

export type EntryCreateNestedManyWithoutCategoriesInput = {
  connect?: InputMaybe<Array<EntryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<EntryCreateOrConnectWithoutCategoriesInput>
  >;
  create?: InputMaybe<Array<EntryCreateWithoutCategoriesInput>>;
};

export type EntryCreateNestedOneWithoutCommentsInput = {
  connect?: InputMaybe<EntryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<EntryCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<EntryCreateWithoutCommentsInput>;
};

export type EntryCreateOneInput = {
  author: UserCreateNestedOneWithoutEntriesInput;
  categories?: InputMaybe<CategoryCreateNestedManyWithoutEntriesInput>;
  categoryId?: InputMaybe<Scalars["String"]>;
  content?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  featuredImage?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  published?: InputMaybe<Scalars["Boolean"]>;
  title: Scalars["String"];
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type EntryCreateOrConnectWithoutAuthorInput = {
  create: EntryCreateWithoutAuthorInput;
  where: EntryWhereUniqueInput;
};

export type EntryCreateOrConnectWithoutCategoriesInput = {
  create: EntryCreateWithoutCategoriesInput;
  where: EntryWhereUniqueInput;
};

export type EntryCreateOrConnectWithoutCommentsInput = {
  create: EntryCreateWithoutCommentsInput;
  where: EntryWhereUniqueInput;
};

export type EntryCreateWithoutAuthorInput = {
  categories?: InputMaybe<CategoryCreateNestedManyWithoutEntriesInput>;
  categoryId?: InputMaybe<Scalars["String"]>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutEntryInput>;
  content?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  featuredImage?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  published?: InputMaybe<Scalars["Boolean"]>;
  title: Scalars["String"];
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type EntryCreateWithoutCategoriesInput = {
  author?: InputMaybe<UserCreateNestedOneWithoutEntriesInput>;
  categoryId?: InputMaybe<Scalars["String"]>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutEntryInput>;
  content?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  featuredImage?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  published?: InputMaybe<Scalars["Boolean"]>;
  title: Scalars["String"];
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type EntryCreateWithoutCommentsInput = {
  author?: InputMaybe<UserCreateNestedOneWithoutEntriesInput>;
  categories?: InputMaybe<CategoryCreateNestedManyWithoutEntriesInput>;
  categoryId?: InputMaybe<Scalars["String"]>;
  content?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  featuredImage?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  published?: InputMaybe<Scalars["Boolean"]>;
  title: Scalars["String"];
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type EntryEdge = {
  __typename?: "EntryEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<Entry>;
};

export type EntryListRelationFilter = {
  every?: InputMaybe<EntryWhereInput>;
  none?: InputMaybe<EntryWhereInput>;
  some?: InputMaybe<EntryWhereInput>;
};

export type EntryOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum EntryOrderByRelevanceFieldEnum {
  authorId = "authorId",
  categoryId = "categoryId",
  content = "content",
  featuredImage = "featuredImage",
  id = "id",
  title = "title"
}

export type EntryOrderByRelevanceInput = {
  fields: Array<EntryOrderByRelevanceFieldEnum>;
  search: Scalars["String"];
  sort: SortOrder;
};

export type EntryOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<EntryOrderByRelevanceInput>;
  author?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
  authorId?: InputMaybe<SortOrder>;
  categories?: InputMaybe<CategoryOrderByRelationAggregateInput>;
  categoryId?: InputMaybe<SortOrder>;
  comments?: InputMaybe<CommentOrderByRelationAggregateInput>;
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  featuredImage?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  published?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type EntryRelationFilter = {
  is?: InputMaybe<EntryWhereInput>;
  isNot?: InputMaybe<EntryWhereInput>;
};

export enum EntryScalarFieldEnum {
  authorId = "authorId",
  categoryId = "categoryId",
  content = "content",
  createdAt = "createdAt",
  featuredImage = "featuredImage",
  id = "id",
  published = "published",
  title = "title",
  updatedAt = "updatedAt"
}

export type EntryWhereInput = {
  AND?: InputMaybe<Array<EntryWhereInput>>;
  NOT?: InputMaybe<Array<EntryWhereInput>>;
  OR?: InputMaybe<Array<EntryWhereInput>>;
  author?: InputMaybe<UserRelationFilter>;
  authorId?: InputMaybe<StringNullableFilter>;
  categories?: InputMaybe<CategoryListRelationFilter>;
  categoryId?: InputMaybe<StringNullableFilter>;
  comments?: InputMaybe<CommentListRelationFilter>;
  content?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  featuredImage?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  published?: InputMaybe<BoolFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type EntryWhereUniqueInput = {
  id?: InputMaybe<Scalars["String"]>;
};

export type EnumCommentReactionsNullableListFilter = {
  equals?: InputMaybe<Array<CommentReactions>>;
  has?: InputMaybe<CommentReactions>;
  hasEvery?: InputMaybe<Array<CommentReactions>>;
  hasSome?: InputMaybe<Array<CommentReactions>>;
  isEmpty?: InputMaybe<Scalars["Boolean"]>;
};

export type EnumGenderNullableFilter = {
  equals?: InputMaybe<Gender>;
  in?: InputMaybe<Array<Gender>>;
  not?: InputMaybe<NestedEnumGenderNullableFilter>;
  notIn?: InputMaybe<Array<Gender>>;
};

export type EnumMediaItemDestinationNullableFilter = {
  equals?: InputMaybe<MediaItemDestination>;
  in?: InputMaybe<Array<MediaItemDestination>>;
  not?: InputMaybe<NestedEnumMediaItemDestinationNullableFilter>;
  notIn?: InputMaybe<Array<MediaItemDestination>>;
};

export type EnumMimeTypesNullableFilter = {
  equals?: InputMaybe<MimeTypes>;
  in?: InputMaybe<Array<MimeTypes>>;
  not?: InputMaybe<NestedEnumMimeTypesNullableFilter>;
  notIn?: InputMaybe<Array<MimeTypes>>;
};

export type EnumPronounsNullableFilter = {
  equals?: InputMaybe<Pronouns>;
  in?: InputMaybe<Array<Pronouns>>;
  not?: InputMaybe<NestedEnumPronounsNullableFilter>;
  notIn?: InputMaybe<Array<Pronouns>>;
};

export type EnumRoleNullableFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleNullableFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type EnumUserStatusNullableFilter = {
  equals?: InputMaybe<UserStatus>;
  in?: InputMaybe<Array<UserStatus>>;
  not?: InputMaybe<NestedEnumUserStatusNullableFilter>;
  notIn?: InputMaybe<Array<UserStatus>>;
};

export type FindManyCategoriesPaginatedInput = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>;
  distinct?: InputMaybe<Array<CategoryScalarFieldEnum>>;
  orderBy?: InputMaybe<
    Array<CategoryOrderByWithRelationAndSearchRelevanceInput>
  >;
  pagination: PaginationArgsInput;
  skip?: InputMaybe<Scalars["Int"]>;
  take?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<CategoryWhereInput>;
};

export type FindManyCommentsPaginatedInput = {
  cursor?: InputMaybe<CommentWhereUniqueInput>;
  distinct?: InputMaybe<Array<CommentScalarFieldEnum>>;
  orderBy?: InputMaybe<
    Array<CommentOrderByWithRelationAndSearchRelevanceInput>
  >;
  pagination: PaginationArgsInput;
  skip?: InputMaybe<Scalars["Int"]>;
  take?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<CommentWhereInput>;
};

export type FindManyConnectionsPaginatedInput = {
  cursor?: InputMaybe<ConnectionWhereUniqueInput>;
  distinct?: InputMaybe<Array<ConnectionScalarFieldEnum>>;
  orderBy?: InputMaybe<
    Array<ConnectionOrderByWithRelationAndSearchRelevanceInput>
  >;
  pagination: PaginationArgsInput;
  skip?: InputMaybe<Scalars["Int"]>;
  take?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<ConnectionWhereInput>;
};

export type FindManyEntriessPaginatedInput = {
  cursor?: InputMaybe<EntryWhereUniqueInput>;
  distinct?: InputMaybe<Array<EntryScalarFieldEnum>>;
  orderBy?: InputMaybe<
    Array<EntryOrderByWithRelationAndSearchRelevanceInput>
  >;
  pagination: PaginationArgsInput;
  skip?: InputMaybe<Scalars["Int"]>;
  take?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<EntryWhereInput>;
};

export type FindManyMediaItemsPaginatedInput = {
  cursor?: InputMaybe<MediaItemWhereUniqueInput>;
  distinct?: InputMaybe<Array<MediaItemScalarFieldEnum>>;
  orderBy?: InputMaybe<
    Array<MediaItemOrderByWithRelationAndSearchRelevanceInput>
  >;
  pagination?: InputMaybe<PaginationArgsInput>;
  skip?: InputMaybe<Scalars["Int"]>;
  take?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<MediaItemWhereInput>;
};

export type FindManyProfilesPaginatedInput = {
  cursor?: InputMaybe<ProfileWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProfileScalarFieldEnum>>;
  orderBy?: InputMaybe<
    Array<ProfileOrderByWithRelationAndSearchRelevanceInput>
  >;
  pagination: PaginationArgsInput;
  skip?: InputMaybe<Scalars["Int"]>;
  take?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<ProfileWhereInput>;
};

export type FindManySessionsPaginatedInput = {
  cursor?: InputMaybe<SessionWhereUniqueInput>;
  distinct?: InputMaybe<Array<SessionScalarFieldEnum>>;
  orderBy?: InputMaybe<
    Array<SessionOrderByWithRelationAndSearchRelevanceInput>
  >;
  pagination: PaginationArgsInput;
  skip?: InputMaybe<Scalars["Int"]>;
  take?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<SessionWhereInput>;
};

export type FindManyUsersPaginatedInput = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy: Array<UserOrderByWithRelationAndSearchRelevanceInput>;
  pagination?: InputMaybe<PaginationArgsInput>;
  skip?: InputMaybe<Scalars["Int"]>;
  take?: InputMaybe<Scalars["Int"]>;
  where?: InputMaybe<UserWhereInput>;
};

export type FindViewerEntriesPaginatedInput = {
  cursor?: InputMaybe<EntryWhereUniqueInput>;
  distinct?: InputMaybe<Array<EntryScalarFieldEnum>>;
  orderBy?: InputMaybe<
    Array<EntryOrderByWithRelationAndSearchRelevanceInput>
  >;
  pagination: PaginationArgsInput;
  skip?: InputMaybe<Scalars["Int"]>;
  take?: InputMaybe<Scalars["Int"]>;
  unique?: InputMaybe<EntryWhereUniqueInput>;
  where?: InputMaybe<ViewerEntriesWhereInput>;
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars["Float"]>;
  gt?: InputMaybe<Scalars["Float"]>;
  gte?: InputMaybe<Scalars["Float"]>;
  in?: InputMaybe<Array<Scalars["Float"]>>;
  lt?: InputMaybe<Scalars["Float"]>;
  lte?: InputMaybe<Scalars["Float"]>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["Float"]>>;
};

export enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE",
  OTHER = "OTHER",
  UNCERTAIN = "UNCERTAIN"
}

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars["Int"]>;
  gt?: InputMaybe<Scalars["Int"]>;
  gte?: InputMaybe<Scalars["Int"]>;
  in?: InputMaybe<Array<Scalars["Int"]>>;
  lt?: InputMaybe<Scalars["Int"]>;
  lte?: InputMaybe<Scalars["Int"]>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["Int"]>>;
};

export type JwtDecoded = {
  __typename?: "JwtDecoded";
  header: FieldWrapper<JwtHeaders>;
  payload: FieldWrapper<JwtPayload>;
  signature: FieldWrapper<Scalars["String"]>;
};

export type JwtHeaders = {
  __typename?: "JwtHeaders";
  alg: FieldWrapper<AlgorithmType>;
  typ: FieldWrapper<Scalars["String"]>;
};

export type JwtPayload = {
  __typename?: "JwtPayload";
  exp?: Maybe<FieldWrapper<Scalars["BigInt"]>>;
  iat?: Maybe<FieldWrapper<Scalars["BigInt"]>>;
  userId?: Maybe<FieldWrapper<Scalars["String"]>>;
};

export type LoginInput = {
  email?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
};

export type MediaItem = Node & {
  __typename?: "MediaItem";
  fileLastModified?: Maybe<FieldWrapper<Scalars["DateTime"]>>;
  height?: Maybe<FieldWrapper<Scalars["Float"]>>;
  id: FieldWrapper<Scalars["ID"]>;
  name?: Maybe<FieldWrapper<Scalars["String"]>>;
  quality?: Maybe<FieldWrapper<Scalars["Int"]>>;
  size?: Maybe<FieldWrapper<Scalars["String"]>>;
  src?: Maybe<FieldWrapper<Scalars["String"]>>;
  srcSet?: Maybe<FieldWrapper<Scalars["String"]>>;
  type?: Maybe<FieldWrapper<MimeTypes>>;
  updatedAt?: Maybe<FieldWrapper<Scalars["DateTime"]>>;
  uploadedAt: FieldWrapper<Scalars["DateTime"]>;
  user: FieldWrapper<User>;
  userId?: Maybe<FieldWrapper<Scalars["String"]>>;
  width?: Maybe<FieldWrapper<Scalars["Float"]>>;
};

export type MediaItemConnection = {
  __typename?: "MediaItemConnection";
  edges: Array<FieldWrapper<MediaItemEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
  totalCount: FieldWrapper<Scalars["Int"]>;
};

export type MediaItemCreateManyUserInput = {
  ariaLabel?: InputMaybe<Scalars["String"]>;
  caption?: InputMaybe<Scalars["String"]>;
  destination?: InputMaybe<MediaItemDestination>;
  fileLastModified?: InputMaybe<Scalars["DateTime"]>;
  height?: InputMaybe<Scalars["Float"]>;
  id?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  quality?: InputMaybe<Scalars["Int"]>;
  size?: InputMaybe<Scalars["String"]>;
  src?: InputMaybe<Scalars["String"]>;
  srcSet?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<MimeTypes>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  uploadedAt?: InputMaybe<Scalars["DateTime"]>;
  width?: InputMaybe<Scalars["Float"]>;
};

export type MediaItemCreateManyUserInputEnvelope = {
  data: Array<MediaItemCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars["Boolean"]>;
};

export type MediaItemCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<MediaItemWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<MediaItemCreateOrConnectWithoutUserInput>
  >;
  create?: InputMaybe<Array<MediaItemCreateWithoutUserInput>>;
  createMany?: InputMaybe<MediaItemCreateManyUserInputEnvelope>;
};

export type MediaItemCreateOrConnectWithoutUserInput = {
  create: MediaItemCreateWithoutUserInput;
  where: MediaItemWhereUniqueInput;
};

export type MediaItemCreateWithoutUserInput = {
  ariaLabel?: InputMaybe<Scalars["String"]>;
  caption?: InputMaybe<Scalars["String"]>;
  destination?: InputMaybe<MediaItemDestination>;
  fileLastModified?: InputMaybe<Scalars["DateTime"]>;
  height?: InputMaybe<Scalars["Float"]>;
  id?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  quality?: InputMaybe<Scalars["Int"]>;
  size?: InputMaybe<Scalars["String"]>;
  src?: InputMaybe<Scalars["String"]>;
  srcSet?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<MimeTypes>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  uploadedAt?: InputMaybe<Scalars["DateTime"]>;
  width?: InputMaybe<Scalars["Float"]>;
};

export enum MediaItemDestination {
  AVATAR = "AVATAR",
  COMMENT_ATTACHMENT = "COMMENT_ATTACHMENT",
  COVER_IMAGE = "COVER_IMAGE",
  ENTRY_ATTACHMENT = "ENTRY_ATTACHMENT",
  FEATURED_IMAGE = "FEATURED_IMAGE"
}

export type MediaItemEdge = {
  __typename?: "MediaItemEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<MediaItem>;
};

export type MediaItemListRelationFilter = {
  every?: InputMaybe<MediaItemWhereInput>;
  none?: InputMaybe<MediaItemWhereInput>;
  some?: InputMaybe<MediaItemWhereInput>;
};

export type MediaItemNameUserIdCompoundUniqueInput = {
  name: Scalars["String"];
  userId: Scalars["String"];
};

export type MediaItemOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum MediaItemOrderByRelevanceFieldEnum {
  ariaLabel = "ariaLabel",
  caption = "caption",
  id = "id",
  name = "name",
  size = "size",
  src = "src",
  srcSet = "srcSet",
  title = "title",
  userId = "userId"
}

export type MediaItemOrderByRelevanceInput = {
  fields: Array<MediaItemOrderByRelevanceFieldEnum>;
  search: Scalars["String"];
  sort: SortOrder;
};

export type MediaItemOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<MediaItemOrderByRelevanceInput>;
  ariaLabel?: InputMaybe<SortOrder>;
  caption?: InputMaybe<SortOrder>;
  destination?: InputMaybe<SortOrder>;
  fileLastModified?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  quality?: InputMaybe<SortOrder>;
  size?: InputMaybe<SortOrder>;
  src?: InputMaybe<SortOrder>;
  srcSet?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  uploadedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
  userId?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
};

export enum MediaItemScalarFieldEnum {
  ariaLabel = "ariaLabel",
  caption = "caption",
  destination = "destination",
  fileLastModified = "fileLastModified",
  height = "height",
  id = "id",
  name = "name",
  quality = "quality",
  size = "size",
  src = "src",
  srcSet = "srcSet",
  title = "title",
  type = "type",
  updatedAt = "updatedAt",
  uploadedAt = "uploadedAt",
  userId = "userId",
  width = "width"
}

export type MediaItemWhereInput = {
  AND?: InputMaybe<Array<MediaItemWhereInput>>;
  NOT?: InputMaybe<Array<MediaItemWhereInput>>;
  OR?: InputMaybe<Array<MediaItemWhereInput>>;
  ariaLabel?: InputMaybe<StringNullableFilter>;
  caption?: InputMaybe<StringNullableFilter>;
  destination?: InputMaybe<EnumMediaItemDestinationNullableFilter>;
  fileLastModified?: InputMaybe<DateTimeNullableFilter>;
  height?: InputMaybe<FloatNullableFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringNullableFilter>;
  quality?: InputMaybe<IntNullableFilter>;
  size?: InputMaybe<StringNullableFilter>;
  src?: InputMaybe<StringNullableFilter>;
  srcSet?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumMimeTypesNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  uploadedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringNullableFilter>;
  width?: InputMaybe<FloatNullableFilter>;
};

export type MediaItemWhereUniqueInput = {
  id?: InputMaybe<Scalars["String"]>;
  name_userId?: InputMaybe<MediaItemNameUserIdCompoundUniqueInput>;
};

export enum MimeTypes {
  AVIF = "AVIF",
  BMP = "BMP",
  GIF = "GIF",
  JPEG = "JPEG",
  PNG = "PNG",
  SVG = "SVG",
  TIFF = "TIFF",
  WEBP = "WEBP"
}

export type Mutation = {
  __typename?: "Mutation";
  changePassword: FieldWrapper<User>;
  createEntryWithAxios: FieldWrapper<Entry>;
  createNewComment: FieldWrapper<Comment>;
  createNewEntry: FieldWrapper<Entry>;
  createNewProfile: FieldWrapper<Profile>;
  nuevoEntry: FieldWrapper<Entry>;
  registerNewUser: FieldWrapper<AuthDetailed>;
  signin: FieldWrapper<AuthDetailed>;
  updateUserPassword: FieldWrapper<User>;
};

export type MutationchangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};

export type MutationcreateEntryWithAxiosArgs = {
  createNew: EntryCreateOneInput;
};

export type MutationcreateNewCommentArgs = {
  commentCreateInput: CreatNewCommentInput;
};

export type MutationcreateNewEntryArgs = {
  entryCreateInput: EntryCreateOneInput;
};

export type MutationcreateNewProfileArgs = {
  createNewProfileInput: CreateOneProfile;
};

export type MutationnuevoEntryArgs = {
  nuevoEntry: EntryCreateOneInput;
};

export type MutationregisterNewUserArgs = {
  userCreateInput: SignupInput;
};

export type MutationsigninArgs = {
  userloginInput: LoginInput;
};

export type MutationupdateUserPasswordArgs = {
  passwordInput: ChangePasswordInput;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars["Boolean"]>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars["DateTime"]>;
  gt?: InputMaybe<Scalars["DateTime"]>;
  gte?: InputMaybe<Scalars["DateTime"]>;
  in?: InputMaybe<Array<Scalars["DateTime"]>>;
  lt?: InputMaybe<Scalars["DateTime"]>;
  lte?: InputMaybe<Scalars["DateTime"]>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars["DateTime"]>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars["DateTime"]>;
  gt?: InputMaybe<Scalars["DateTime"]>;
  gte?: InputMaybe<Scalars["DateTime"]>;
  in?: InputMaybe<Array<Scalars["DateTime"]>>;
  lt?: InputMaybe<Scalars["DateTime"]>;
  lte?: InputMaybe<Scalars["DateTime"]>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["DateTime"]>>;
};

export type NestedEnumGenderNullableFilter = {
  equals?: InputMaybe<Gender>;
  in?: InputMaybe<Array<Gender>>;
  not?: InputMaybe<NestedEnumGenderNullableFilter>;
  notIn?: InputMaybe<Array<Gender>>;
};

export type NestedEnumMediaItemDestinationNullableFilter = {
  equals?: InputMaybe<MediaItemDestination>;
  in?: InputMaybe<Array<MediaItemDestination>>;
  not?: InputMaybe<NestedEnumMediaItemDestinationNullableFilter>;
  notIn?: InputMaybe<Array<MediaItemDestination>>;
};

export type NestedEnumMimeTypesNullableFilter = {
  equals?: InputMaybe<MimeTypes>;
  in?: InputMaybe<Array<MimeTypes>>;
  not?: InputMaybe<NestedEnumMimeTypesNullableFilter>;
  notIn?: InputMaybe<Array<MimeTypes>>;
};

export type NestedEnumPronounsNullableFilter = {
  equals?: InputMaybe<Pronouns>;
  in?: InputMaybe<Array<Pronouns>>;
  not?: InputMaybe<NestedEnumPronounsNullableFilter>;
  notIn?: InputMaybe<Array<Pronouns>>;
};

export type NestedEnumRoleNullableFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleNullableFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type NestedEnumUserStatusNullableFilter = {
  equals?: InputMaybe<UserStatus>;
  in?: InputMaybe<Array<UserStatus>>;
  not?: InputMaybe<NestedEnumUserStatusNullableFilter>;
  notIn?: InputMaybe<Array<UserStatus>>;
};

export type NestedFloatNullableFilter = {
  equals?: InputMaybe<Scalars["Float"]>;
  gt?: InputMaybe<Scalars["Float"]>;
  gte?: InputMaybe<Scalars["Float"]>;
  in?: InputMaybe<Array<Scalars["Float"]>>;
  lt?: InputMaybe<Scalars["Float"]>;
  lte?: InputMaybe<Scalars["Float"]>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["Float"]>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars["Int"]>;
  gt?: InputMaybe<Scalars["Int"]>;
  gte?: InputMaybe<Scalars["Int"]>;
  in?: InputMaybe<Array<Scalars["Int"]>>;
  lt?: InputMaybe<Scalars["Int"]>;
  lte?: InputMaybe<Scalars["Int"]>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["Int"]>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars["String"]>;
  endsWith?: InputMaybe<Scalars["String"]>;
  equals?: InputMaybe<Scalars["String"]>;
  gt?: InputMaybe<Scalars["String"]>;
  gte?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<Scalars["String"]>>;
  lt?: InputMaybe<Scalars["String"]>;
  lte?: InputMaybe<Scalars["String"]>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]>>;
  search?: InputMaybe<Scalars["String"]>;
  startsWith?: InputMaybe<Scalars["String"]>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars["String"]>;
  endsWith?: InputMaybe<Scalars["String"]>;
  equals?: InputMaybe<Scalars["String"]>;
  gt?: InputMaybe<Scalars["String"]>;
  gte?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<Scalars["String"]>>;
  lt?: InputMaybe<Scalars["String"]>;
  lte?: InputMaybe<Scalars["String"]>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]>>;
  search?: InputMaybe<Scalars["String"]>;
  startsWith?: InputMaybe<Scalars["String"]>;
};

export type Node = {
  id: FieldWrapper<Scalars["ID"]>;
};

export type NodeBaseFieldUnion =
  | Account
  | Category
  | Comment
  | Connection
  | Entry
  | MediaItem
  | Profile
  | Session
  | User;

export type NodeUnion =
  | CommentConnection
  | EntryConnection
  | MediaItemConnection
  | ProfileConnection
  | SessionConnection
  | UserConnection;

export type NodeUnionConnection = {
  __typename?: "NodeUnionConnection";
  edges: Array<FieldWrapper<NodeUnionEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
  totalCount: FieldWrapper<Scalars["Int"]>;
};

export type NodeUnionEdge = {
  __typename?: "NodeUnionEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<NodeUnion>;
};

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<FieldWrapper<Scalars["String"]>>;
  hasNextPage: FieldWrapper<Scalars["Boolean"]>;
  hasPreviousPage: FieldWrapper<Scalars["Boolean"]>;
  startCursor?: Maybe<FieldWrapper<Scalars["String"]>>;
};

export type PaginationArgsInput = {
  after?: InputMaybe<Scalars["String"]>;
  before?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  last?: InputMaybe<Scalars["Int"]>;
};

export type Profile = Node & {
  __typename?: "Profile";
  activiyFeed?: Maybe<FieldWrapper<Scalars["String"]>>;
  bio?: Maybe<FieldWrapper<Scalars["String"]>>;
  city?: Maybe<FieldWrapper<Scalars["String"]>>;
  country?: Maybe<FieldWrapper<Scalars["String"]>>;
  coverPhoto?: Maybe<FieldWrapper<Scalars["String"]>>;
  dob?: Maybe<FieldWrapper<Scalars["String"]>>;
  gender?: Maybe<FieldWrapper<Gender>>;
  id: FieldWrapper<Scalars["ID"]>;
  lastSeen?: Maybe<FieldWrapper<Scalars["DateTime"]>>;
  memberSince: FieldWrapper<Scalars["DateTime"]>;
  occupation?: Maybe<FieldWrapper<Scalars["String"]>>;
  phoneNumber?: Maybe<FieldWrapper<Scalars["String"]>>;
  pronouns?: Maybe<FieldWrapper<Pronouns>>;
  recentActivity?: Maybe<FieldWrapper<Scalars["String"]>>;
  user: FieldWrapper<User>;
  userId?: Maybe<FieldWrapper<Scalars["String"]>>;
  userInProfile: FieldWrapper<User>;
};

export type ProfileConnection = {
  __typename?: "ProfileConnection";
  edges: Array<FieldWrapper<ProfileEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
  totalCount: FieldWrapper<Scalars["Int"]>;
};

export type ProfileCreateNestedOneWithoutUserInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutUserInput>;
  create?: InputMaybe<ProfileCreateWithoutUserInput>;
};

export type ProfileCreateOrConnectWithoutUserInput = {
  create: ProfileCreateWithoutUserInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateWithoutUserInput = {
  activiyFeed?: InputMaybe<Scalars["String"]>;
  bio?: InputMaybe<Scalars["String"]>;
  city?: InputMaybe<Scalars["String"]>;
  country?: InputMaybe<Scalars["String"]>;
  coverPhoto?: InputMaybe<Scalars["String"]>;
  dob?: InputMaybe<Scalars["String"]>;
  gender?: InputMaybe<Gender>;
  id?: InputMaybe<Scalars["String"]>;
  lastSeen?: InputMaybe<Scalars["DateTime"]>;
  memberSince?: InputMaybe<Scalars["DateTime"]>;
  occupation?: InputMaybe<Scalars["String"]>;
  phoneNumber?: InputMaybe<Scalars["String"]>;
  pronouns?: InputMaybe<Pronouns>;
  recentActivity?: InputMaybe<Scalars["String"]>;
};

export type ProfileEdge = {
  __typename?: "ProfileEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<Profile>;
};

export enum ProfileOrderByRelevanceFieldEnum {
  activiyFeed = "activiyFeed",
  bio = "bio",
  city = "city",
  country = "country",
  coverPhoto = "coverPhoto",
  dob = "dob",
  id = "id",
  occupation = "occupation",
  phoneNumber = "phoneNumber",
  recentActivity = "recentActivity",
  userId = "userId"
}

export type ProfileOrderByRelevanceInput = {
  fields: Array<ProfileOrderByRelevanceFieldEnum>;
  search: Scalars["String"];
  sort: SortOrder;
};

export type ProfileOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<ProfileOrderByRelevanceInput>;
  activiyFeed?: InputMaybe<SortOrder>;
  bio?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  country?: InputMaybe<SortOrder>;
  coverPhoto?: InputMaybe<SortOrder>;
  dob?: InputMaybe<SortOrder>;
  gender?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastSeen?: InputMaybe<SortOrder>;
  memberSince?: InputMaybe<SortOrder>;
  occupation?: InputMaybe<SortOrder>;
  phoneNumber?: InputMaybe<SortOrder>;
  pronouns?: InputMaybe<SortOrder>;
  recentActivity?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
  userId?: InputMaybe<SortOrder>;
};

export type ProfileRelationFilter = {
  is?: InputMaybe<ProfileWhereInput>;
  isNot?: InputMaybe<ProfileWhereInput>;
};

export enum ProfileScalarFieldEnum {
  activiyFeed = "activiyFeed",
  bio = "bio",
  city = "city",
  country = "country",
  coverPhoto = "coverPhoto",
  dob = "dob",
  gender = "gender",
  id = "id",
  lastSeen = "lastSeen",
  memberSince = "memberSince",
  occupation = "occupation",
  phoneNumber = "phoneNumber",
  pronouns = "pronouns",
  recentActivity = "recentActivity",
  userId = "userId"
}

export type ProfileWhereInput = {
  AND?: InputMaybe<Array<ProfileWhereInput>>;
  NOT?: InputMaybe<Array<ProfileWhereInput>>;
  OR?: InputMaybe<Array<ProfileWhereInput>>;
  activiyFeed?: InputMaybe<StringNullableFilter>;
  bio?: InputMaybe<StringNullableFilter>;
  city?: InputMaybe<StringNullableFilter>;
  country?: InputMaybe<StringNullableFilter>;
  coverPhoto?: InputMaybe<StringNullableFilter>;
  dob?: InputMaybe<StringNullableFilter>;
  gender?: InputMaybe<EnumGenderNullableFilter>;
  id?: InputMaybe<StringFilter>;
  lastSeen?: InputMaybe<DateTimeNullableFilter>;
  memberSince?: InputMaybe<DateTimeFilter>;
  occupation?: InputMaybe<StringNullableFilter>;
  phoneNumber?: InputMaybe<StringNullableFilter>;
  pronouns?: InputMaybe<EnumPronounsNullableFilter>;
  recentActivity?: InputMaybe<StringNullableFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringNullableFilter>;
};

export type ProfileWhereUniqueInput = {
  id?: InputMaybe<Scalars["String"]>;
  userId?: InputMaybe<Scalars["String"]>;
};

export enum Pronouns {
  HE_HIM_HIS = "HE_HIM_HIS",
  NOT_LISTED = "NOT_LISTED",
  PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
  SHE_HER_HERS = "SHE_HER_HERS",
  THEY_THEM_THEIRS = "THEY_THEM_THEIRS"
}

export type Query = {
  __typename?: "Query";
  categoryByRelayId: FieldWrapper<Category>;
  commentByRelayId: FieldWrapper<Comment>;
  comprehensiveConnectionUnion: Array<FieldWrapper<NodeUnion>>;
  connectionByRelayId: FieldWrapper<Connection>;
  contentNodesUnion: FieldWrapper<ContentNodes>;
  entryById: FieldWrapper<Entry>;
  entryByRelayId: FieldWrapper<Entry>;
  findUniqueMediaItem: FieldWrapper<MediaItem>;
  getUserFromAccessToken: FieldWrapper<AuthDetailed>;
  getViewer: FieldWrapper<AuthDetailed>;
  listCategories: FieldWrapper<CategoryConnection>;
  listComments: FieldWrapper<CommentConnection>;
  listConnections: FieldWrapper<ConnectionConnection>;
  listEntries: FieldWrapper<EntryConnection>;
  listMediaItems: FieldWrapper<MediaItemConnection>;
  listProfiles: FieldWrapper<ProfileConnection>;
  listSessions: FieldWrapper<SessionConnection>;
  listUsers: FieldWrapper<UserConnection>;
  me: FieldWrapper<AuthDetailed>;
  node?: Maybe<FieldWrapper<Node>>;
  nodeField: Array<FieldWrapper<NodeBaseFieldUnion>>;
  nodeUnionResolver: FieldWrapper<NodeUnionConnection>;
  profileByRelayId: FieldWrapper<Profile>;
  sessionByRelayId: FieldWrapper<Session>;
  siftEntries: FieldWrapper<EntryConnection>;
  userById: FieldWrapper<User>;
  userByRelayId: FieldWrapper<User>;
  viewer: FieldWrapper<ViewerDetailed>;
  viewerAuthInfoFromContext: FieldWrapper<ViewerAuthInfo>;
  viewerCommentsPaginated: FieldWrapper<CommentConnection>;
  viewerEntriesPaginated: FieldWrapper<EntryConnection>;
  viewerFieldsPaginated: FieldWrapper<ViewerFieldsPaginatedConnection>;
  viewerMediaItemsPaginated: FieldWrapper<MediaItemConnection>;
  viewerProfile: FieldWrapper<Profile>;
  viewerSessionsPaginated: FieldWrapper<SessionConnection>;
};

export type QuerycategoryByRelayIdArgs = {
  cursor: Scalars["String"];
};

export type QuerycommentByRelayIdArgs = {
  cursor: Scalars["String"];
};

export type QueryconnectionByRelayIdArgs = {
  connectionCursor: Scalars["String"];
};

export type QuerycontentNodesUnionArgs = {
  findManyEntriesPaginatedInput: FindManyEntriessPaginatedInput;
  findManyMediaItemsPaginated?: InputMaybe<FindManyMediaItemsPaginatedInput>;
  findManyUsersPaginatedInput?: InputMaybe<FindManyUsersPaginatedInput>;
};

export type QueryentryByIdArgs = {
  id: Scalars["String"];
};

export type QueryentryByRelayIdArgs = {
  entryCursor: Scalars["String"];
};

export type QueryfindUniqueMediaItemArgs = {
  mediaItemId: Scalars["String"];
};

export type QuerygetUserFromAccessTokenArgs = {
  token: Scalars["String"];
};

export type QuerylistCategoriesArgs = {
  findManyCategoriesPaginatedInput: FindManyCategoriesPaginatedInput;
};

export type QuerylistCommentsArgs = {
  findManyCommentsPaginatedInput: FindManyCommentsPaginatedInput;
};

export type QuerylistConnectionsArgs = {
  findManyConnectionsPaginatedInput: FindManyConnectionsPaginatedInput;
};

export type QuerylistEntriesArgs = {
  findManyEntriesPaginatedInput: FindManyEntriessPaginatedInput;
};

export type QuerylistMediaItemsArgs = {
  findManyMediaItemsPaginated?: InputMaybe<FindManyMediaItemsPaginatedInput>;
};

export type QuerylistProfilesArgs = {
  profilesArgs: FindManyProfilesPaginatedInput;
};

export type QuerylistSessionsArgs = {
  findManySessionsPaginatedInput: FindManySessionsPaginatedInput;
};

export type QuerylistUsersArgs = {
  findManyUsersPaginatedInput?: InputMaybe<FindManyUsersPaginatedInput>;
};

export type QuerynodeArgs = {
  id: Scalars["ID"];
};

export type QuerynodeFieldArgs = {
  cursor: Scalars["String"];
};

export type QuerynodeUnionResolverArgs = {
  id: Scalars["String"];
  manyComments: FindManyCommentsPaginatedInput;
  manyEntries: FindManyEntriessPaginatedInput;
  manyMediaItems: FindManyMediaItemsPaginatedInput;
  manyProfiles: FindManyProfilesPaginatedInput;
  manySessions: FindManySessionsPaginatedInput;
  manyUsers: FindManyUsersPaginatedInput;
};

export type QueryprofileByRelayIdArgs = {
  cursor: Scalars["String"];
};

export type QuerysessionByRelayIdArgs = {
  cursor: Scalars["String"];
};

export type QuerysiftEntriesArgs = {
  entryFindManyInput: FindManyEntriessPaginatedInput;
};

export type QueryuserByIdArgs = {
  id: Scalars["String"];
};

export type QueryuserByRelayIdArgs = {
  cursor: Scalars["String"];
};

export type QueryviewerCommentsPaginatedArgs = {
  viewerCommentsPaginatedInput: FindManyCommentsPaginatedInput;
};

export type QueryviewerEntriesPaginatedArgs = {
  viewerEntriesPaginatedInput: FindViewerEntriesPaginatedInput;
};

export type QueryviewerFieldsPaginatedArgs = {
  viewerFieldsPaginatedInput: ViewerFieldsPaginatedInput;
};

export type QueryviewerMediaItemsPaginatedArgs = {
  viewerMediaItemsPaginatedInput: FindManyMediaItemsPaginatedInput;
};

export type QueryviewerSessionsPaginatedArgs = {
  viewerSessionssPaginatedInput: FindManySessionsPaginatedInput;
};

export enum QueryMode {
  default = "default",
  insensitive = "insensitive"
}

export enum Role {
  ADMIN = "ADMIN",
  MAINTAINER = "MAINTAINER",
  SUPERADMIN = "SUPERADMIN",
  USER = "USER"
}

export type Session = Node & {
  __typename?: "Session";
  accessToken?: Maybe<FieldWrapper<Scalars["String"]>>;
  alg?: Maybe<FieldWrapper<Scalars["String"]>>;
  exp?: Maybe<FieldWrapper<Scalars["Int"]>>;
  iat?: Maybe<FieldWrapper<Scalars["Int"]>>;
  id: FieldWrapper<Scalars["ID"]>;
  lastVerified?: Maybe<FieldWrapper<Scalars["DateTime"]>>;
  provider?: Maybe<FieldWrapper<Scalars["String"]>>;
  refreshToken?: Maybe<FieldWrapper<Scalars["String"]>>;
  scopes?: Maybe<Array<FieldWrapper<Scalars["String"]>>>;
  signature?: Maybe<FieldWrapper<Scalars["String"]>>;
  tokenState?: Maybe<FieldWrapper<Scalars["String"]>>;
  user?: Maybe<FieldWrapper<User>>;
  userId?: Maybe<FieldWrapper<Scalars["String"]>>;
};

export type SessionConnection = {
  __typename?: "SessionConnection";
  edges: Array<FieldWrapper<SessionEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
  totalCount: FieldWrapper<Scalars["Int"]>;
};

export type SessionCreateManyUserInput = {
  accessToken?: InputMaybe<Scalars["String"]>;
  alg?: InputMaybe<Scalars["String"]>;
  exp?: InputMaybe<Scalars["Int"]>;
  iat?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["String"]>;
  lastVerified?: InputMaybe<Scalars["DateTime"]>;
  provider?: InputMaybe<Scalars["String"]>;
  refreshToken?: InputMaybe<Scalars["String"]>;
  scopes?: InputMaybe<SessionCreateManyscopesInput>;
  signature?: InputMaybe<Scalars["String"]>;
  tokenState?: InputMaybe<Scalars["String"]>;
};

export type SessionCreateManyUserInputEnvelope = {
  data: Array<SessionCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars["Boolean"]>;
};

export type SessionCreateManyscopesInput = {
  set: Array<Scalars["String"]>;
};

export type SessionCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<SessionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<SessionCreateOrConnectWithoutUserInput>
  >;
  create?: InputMaybe<Array<SessionCreateWithoutUserInput>>;
  createMany?: InputMaybe<SessionCreateManyUserInputEnvelope>;
};

export type SessionCreateOrConnectWithoutUserInput = {
  create: SessionCreateWithoutUserInput;
  where: SessionWhereUniqueInput;
};

export type SessionCreateWithoutUserInput = {
  accessToken?: InputMaybe<Scalars["String"]>;
  alg?: InputMaybe<Scalars["String"]>;
  exp?: InputMaybe<Scalars["Int"]>;
  iat?: InputMaybe<Scalars["Int"]>;
  id?: InputMaybe<Scalars["String"]>;
  lastVerified?: InputMaybe<Scalars["DateTime"]>;
  provider?: InputMaybe<Scalars["String"]>;
  refreshToken?: InputMaybe<Scalars["String"]>;
  scopes?: InputMaybe<SessionCreatescopesInput>;
  signature?: InputMaybe<Scalars["String"]>;
  tokenState?: InputMaybe<Scalars["String"]>;
};

export type SessionCreatescopesInput = {
  set: Array<Scalars["String"]>;
};

export type SessionEdge = {
  __typename?: "SessionEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<Session>;
};

export type SessionListRelationFilter = {
  every?: InputMaybe<SessionWhereInput>;
  none?: InputMaybe<SessionWhereInput>;
  some?: InputMaybe<SessionWhereInput>;
};

export type SessionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export enum SessionOrderByRelevanceFieldEnum {
  accessToken = "accessToken",
  alg = "alg",
  id = "id",
  provider = "provider",
  refreshToken = "refreshToken",
  scopes = "scopes",
  signature = "signature",
  tokenState = "tokenState",
  userId = "userId"
}

export type SessionOrderByRelevanceInput = {
  fields: Array<SessionOrderByRelevanceFieldEnum>;
  search: Scalars["String"];
  sort: SortOrder;
};

export type SessionOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<SessionOrderByRelevanceInput>;
  accessToken?: InputMaybe<SortOrder>;
  alg?: InputMaybe<SortOrder>;
  exp?: InputMaybe<SortOrder>;
  iat?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastVerified?: InputMaybe<SortOrder>;
  provider?: InputMaybe<SortOrder>;
  refreshToken?: InputMaybe<SortOrder>;
  scopes?: InputMaybe<SortOrder>;
  signature?: InputMaybe<SortOrder>;
  tokenState?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationAndSearchRelevanceInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum SessionScalarFieldEnum {
  accessToken = "accessToken",
  alg = "alg",
  exp = "exp",
  iat = "iat",
  id = "id",
  lastVerified = "lastVerified",
  provider = "provider",
  refreshToken = "refreshToken",
  scopes = "scopes",
  signature = "signature",
  tokenState = "tokenState",
  userId = "userId"
}

export type SessionWhereInput = {
  AND?: InputMaybe<Array<SessionWhereInput>>;
  NOT?: InputMaybe<Array<SessionWhereInput>>;
  OR?: InputMaybe<Array<SessionWhereInput>>;
  accessToken?: InputMaybe<StringNullableFilter>;
  alg?: InputMaybe<StringNullableFilter>;
  exp?: InputMaybe<IntNullableFilter>;
  iat?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<StringFilter>;
  lastVerified?: InputMaybe<DateTimeNullableFilter>;
  provider?: InputMaybe<StringNullableFilter>;
  refreshToken?: InputMaybe<StringNullableFilter>;
  scopes?: InputMaybe<StringNullableListFilter>;
  signature?: InputMaybe<StringNullableFilter>;
  tokenState?: InputMaybe<StringNullableFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringNullableFilter>;
};

export type SessionWhereUniqueInput = {
  id?: InputMaybe<Scalars["String"]>;
};

export type SignupInput = {
  email: Scalars["String"];
  firstName?: InputMaybe<Scalars["String"]>;
  image?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  password: Scalars["String"];
};

export enum SortOrder {
  asc = "asc",
  desc = "desc"
}

export type StringFilter = {
  contains?: InputMaybe<Scalars["String"]>;
  endsWith?: InputMaybe<Scalars["String"]>;
  equals?: InputMaybe<Scalars["String"]>;
  gt?: InputMaybe<Scalars["String"]>;
  gte?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<Scalars["String"]>>;
  lt?: InputMaybe<Scalars["String"]>;
  lte?: InputMaybe<Scalars["String"]>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]>>;
  search?: InputMaybe<Scalars["String"]>;
  startsWith?: InputMaybe<Scalars["String"]>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars["String"]>;
  endsWith?: InputMaybe<Scalars["String"]>;
  equals?: InputMaybe<Scalars["String"]>;
  gt?: InputMaybe<Scalars["String"]>;
  gte?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<Scalars["String"]>>;
  lt?: InputMaybe<Scalars["String"]>;
  lte?: InputMaybe<Scalars["String"]>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]>>;
  search?: InputMaybe<Scalars["String"]>;
  startsWith?: InputMaybe<Scalars["String"]>;
};

export type StringNullableListFilter = {
  equals?: InputMaybe<Array<Scalars["String"]>>;
  has?: InputMaybe<Scalars["String"]>;
  hasEvery?: InputMaybe<Array<Scalars["String"]>>;
  hasSome?: InputMaybe<Array<Scalars["String"]>>;
  isEmpty?: InputMaybe<Scalars["Boolean"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  commentCreated: FieldWrapper<Comment>;
  entryCreated: FieldWrapper<Entry>;
  profileCreated: FieldWrapper<Profile>;
};

export type TypesUnion = Entry | MediaItem | User;

export type User = Node & {
  __typename?: "User";
  _count: FieldWrapper<UserCount>;
  accounts?: Maybe<Array<FieldWrapper<Account>>>;
  categories?: Maybe<Array<FieldWrapper<Category>>>;
  comments?: Maybe<Array<FieldWrapper<Comment>>>;
  connections?: Maybe<Array<FieldWrapper<Connection>>>;
  /** Identifies the date and time when the user was created. */
  createdAt: FieldWrapper<Scalars["DateTime"]>;
  email: FieldWrapper<Scalars["String"]>;
  emailVerified?: Maybe<FieldWrapper<Scalars["DateTime"]>>;
  entries?: Maybe<Array<FieldWrapper<Entry>>>;
  firstName?: Maybe<FieldWrapper<Scalars["String"]>>;
  id: FieldWrapper<Scalars["ID"]>;
  image?: Maybe<FieldWrapper<Scalars["String"]>>;
  lastName?: Maybe<FieldWrapper<Scalars["String"]>>;
  mediaItems?: Maybe<Array<FieldWrapper<MediaItem>>>;
  password: FieldWrapper<Scalars["String"]>;
  profile?: Maybe<FieldWrapper<Profile>>;
  role?: Maybe<FieldWrapper<Role>>;
  sessions?: Maybe<Array<FieldWrapper<Session>>>;
  status: FieldWrapper<UserStatus>;
  /** Identifies the date and time when the user was last updated. */
  updatedAt?: Maybe<FieldWrapper<Scalars["DateTime"]>>;
};

export type UserConnection = {
  __typename?: "UserConnection";
  edges: Array<FieldWrapper<UserEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
  totalCount: FieldWrapper<Scalars["Int"]>;
};

export type UserCount = {
  __typename?: "UserCount";
  accounts: FieldWrapper<Scalars["Int"]>;
  categories: FieldWrapper<Scalars["Int"]>;
  comments: FieldWrapper<Scalars["Int"]>;
  connections: FieldWrapper<Scalars["Int"]>;
  entries: FieldWrapper<Scalars["Int"]>;
  mediaItems: FieldWrapper<Scalars["Int"]>;
  sessions: FieldWrapper<Scalars["Int"]>;
};

export type UserCreateNestedOneWithoutCategoriesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCategoriesInput>;
  create?: InputMaybe<UserCreateWithoutCategoriesInput>;
};

export type UserCreateNestedOneWithoutCommentsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<UserCreateWithoutCommentsInput>;
};

export type UserCreateNestedOneWithoutEntriesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutEntriesInput>;
  create?: InputMaybe<UserCreateWithoutEntriesInput>;
};

export type UserCreateOrConnectWithoutCategoriesInput = {
  create: UserCreateWithoutCategoriesInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutCommentsInput = {
  create: UserCreateWithoutCommentsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutEntriesInput = {
  create: UserCreateWithoutEntriesInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutCategoriesInput = {
  accounts?: InputMaybe<AccountCreateNestedManyWithoutUserInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutAuthorInput>;
  connections?: InputMaybe<ConnectionCreateNestedManyWithoutOwnerInput>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  email: Scalars["String"];
  emailVerified?: InputMaybe<Scalars["DateTime"]>;
  entries?: InputMaybe<EntryCreateNestedManyWithoutAuthorInput>;
  firstName?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  image?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  mediaItems?: InputMaybe<MediaItemCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars["String"]>;
  profile?: InputMaybe<ProfileCreateNestedOneWithoutUserInput>;
  role?: InputMaybe<Role>;
  sessions?: InputMaybe<SessionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type UserCreateWithoutCommentsInput = {
  accounts?: InputMaybe<AccountCreateNestedManyWithoutUserInput>;
  categories?: InputMaybe<CategoryCreateNestedManyWithoutCreatorInput>;
  connections?: InputMaybe<ConnectionCreateNestedManyWithoutOwnerInput>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  email: Scalars["String"];
  emailVerified?: InputMaybe<Scalars["DateTime"]>;
  entries?: InputMaybe<EntryCreateNestedManyWithoutAuthorInput>;
  firstName?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  image?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  mediaItems?: InputMaybe<MediaItemCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars["String"]>;
  profile?: InputMaybe<ProfileCreateNestedOneWithoutUserInput>;
  role?: InputMaybe<Role>;
  sessions?: InputMaybe<SessionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type UserCreateWithoutEntriesInput = {
  accounts?: InputMaybe<AccountCreateNestedManyWithoutUserInput>;
  categories?: InputMaybe<CategoryCreateNestedManyWithoutCreatorInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutAuthorInput>;
  connections?: InputMaybe<ConnectionCreateNestedManyWithoutOwnerInput>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  email: Scalars["String"];
  emailVerified?: InputMaybe<Scalars["DateTime"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  image?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  mediaItems?: InputMaybe<MediaItemCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars["String"]>;
  profile?: InputMaybe<ProfileCreateNestedOneWithoutUserInput>;
  role?: InputMaybe<Role>;
  sessions?: InputMaybe<SessionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type UserEdge = {
  __typename?: "UserEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<User>;
};

export enum UserOrderByRelevanceFieldEnum {
  email = "email",
  firstName = "firstName",
  id = "id",
  image = "image",
  lastName = "lastName",
  password = "password"
}

export type UserOrderByRelevanceInput = {
  fields: Array<UserOrderByRelevanceFieldEnum>;
  search: Scalars["String"];
  sort: SortOrder;
};

export type UserOrderByWithRelationAndSearchRelevanceInput = {
  _relevance?: InputMaybe<UserOrderByRelevanceInput>;
  accounts?: InputMaybe<AccountOrderByRelationAggregateInput>;
  categories?: InputMaybe<CategoryOrderByRelationAggregateInput>;
  comments?: InputMaybe<CommentOrderByRelationAggregateInput>;
  connections?: InputMaybe<ConnectionOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  emailVerified?: InputMaybe<SortOrder>;
  entries?: InputMaybe<EntryOrderByRelationAggregateInput>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  mediaItems?: InputMaybe<MediaItemOrderByRelationAggregateInput>;
  password?: InputMaybe<SortOrder>;
  profile?: InputMaybe<ProfileOrderByWithRelationAndSearchRelevanceInput>;
  role?: InputMaybe<SortOrder>;
  sessions?: InputMaybe<SessionOrderByRelationAggregateInput>;
  status?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export enum UserScalarFieldEnum {
  createdAt = "createdAt",
  email = "email",
  emailVerified = "emailVerified",
  firstName = "firstName",
  id = "id",
  image = "image",
  lastName = "lastName",
  password = "password",
  role = "role",
  status = "status",
  updatedAt = "updatedAt"
}

export enum UserStatus {
  BANNED = "BANNED",
  DEACTIVATED = "DEACTIVATED",
  DELETED = "DELETED",
  OFFLINE = "OFFLINE",
  ONLINE = "ONLINE",
  SUSPENDED = "SUSPENDED"
}

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  accounts?: InputMaybe<AccountListRelationFilter>;
  categories?: InputMaybe<CategoryListRelationFilter>;
  comments?: InputMaybe<CommentListRelationFilter>;
  connections?: InputMaybe<ConnectionListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  emailVerified?: InputMaybe<DateTimeNullableFilter>;
  entries?: InputMaybe<EntryListRelationFilter>;
  firstName?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  image?: InputMaybe<StringNullableFilter>;
  lastName?: InputMaybe<StringNullableFilter>;
  mediaItems?: InputMaybe<MediaItemListRelationFilter>;
  password?: InputMaybe<StringFilter>;
  profile?: InputMaybe<ProfileRelationFilter>;
  role?: InputMaybe<EnumRoleNullableFilter>;
  sessions?: InputMaybe<SessionListRelationFilter>;
  status?: InputMaybe<EnumUserStatusNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
};

export type ViewerAuthInfo = {
  __typename?: "ViewerAuthInfo";
  accessToken: FieldWrapper<Scalars["String"]>;
  refreshToken: FieldWrapper<Scalars["String"]>;
  viewerJwt: FieldWrapper<JwtDecoded>;
};

export type ViewerDetailed = Node & {
  __typename?: "ViewerDetailed";
  _count: FieldWrapper<UserCount>;
  accessToken?: Maybe<FieldWrapper<Scalars["String"]>>;
  accounts?: Maybe<Array<FieldWrapper<Account>>>;
  categories?: Maybe<Array<FieldWrapper<Category>>>;
  comments?: Maybe<Array<FieldWrapper<Comment>>>;
  connections?: Maybe<Array<FieldWrapper<Connection>>>;
  /** Identifies the date and time when the user was created. */
  createdAt: FieldWrapper<Scalars["DateTime"]>;
  email: FieldWrapper<Scalars["String"]>;
  emailVerified?: Maybe<FieldWrapper<Scalars["DateTime"]>>;
  entries?: Maybe<Array<FieldWrapper<Entry>>>;
  firstName?: Maybe<FieldWrapper<Scalars["String"]>>;
  id: FieldWrapper<Scalars["ID"]>;
  image?: Maybe<FieldWrapper<Scalars["String"]>>;
  lastName?: Maybe<FieldWrapper<Scalars["String"]>>;
  mediaItems?: Maybe<Array<FieldWrapper<MediaItem>>>;
  password: FieldWrapper<Scalars["String"]>;
  profile?: Maybe<FieldWrapper<Profile>>;
  refreshToken?: Maybe<FieldWrapper<Scalars["String"]>>;
  role?: Maybe<FieldWrapper<Role>>;
  secret?: Maybe<FieldWrapper<Scalars["String"]>>;
  sessions?: Maybe<Array<FieldWrapper<Session>>>;
  status: FieldWrapper<UserStatus>;
  /** Identifies the date and time when the user was last updated. */
  updatedAt?: Maybe<FieldWrapper<Scalars["DateTime"]>>;
};

export type ViewerEntriesWhereInput = {
  AND?: InputMaybe<Array<ViewerEntriesWhereInput>>;
  NOT?: InputMaybe<Array<ViewerEntriesWhereInput>>;
  OR?: InputMaybe<Array<ViewerEntriesWhereInput>>;
  categories?: InputMaybe<CategoryListRelationFilter>;
  categoryId?: InputMaybe<StringNullableFilter>;
  comments?: InputMaybe<CommentListRelationFilter>;
  content?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  featuredImage?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  published?: InputMaybe<BoolFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type ViewerFieldsPaginated = Node & {
  __typename?: "ViewerFieldsPaginated";
  _count: FieldWrapper<UserCount>;
  commentConnection: FieldWrapper<CommentConnection>;
  /** Identifies the date and time when the user was created. */
  createdAt: FieldWrapper<Scalars["DateTime"]>;
  email: FieldWrapper<Scalars["String"]>;
  emailVerified?: Maybe<FieldWrapper<Scalars["DateTime"]>>;
  entryConnection: FieldWrapper<EntryConnection>;
  firstName?: Maybe<FieldWrapper<Scalars["String"]>>;
  id: FieldWrapper<Scalars["ID"]>;
  image?: Maybe<FieldWrapper<Scalars["String"]>>;
  lastName?: Maybe<FieldWrapper<Scalars["String"]>>;
  mediaItemConnection: FieldWrapper<MediaItemConnection>;
  password: FieldWrapper<Scalars["String"]>;
  profile?: Maybe<FieldWrapper<Profile>>;
  role?: Maybe<FieldWrapper<Role>>;
  sessionConnection: FieldWrapper<SessionConnection>;
  status: FieldWrapper<UserStatus>;
  /** Identifies the date and time when the user was last updated. */
  updatedAt?: Maybe<FieldWrapper<Scalars["DateTime"]>>;
};

export type ViewerFieldsPaginatedConnection = {
  __typename?: "ViewerFieldsPaginatedConnection";
  edges: Array<FieldWrapper<ViewerFieldsPaginatedEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
  totalCount: FieldWrapper<Scalars["Int"]>;
};

export type ViewerFieldsPaginatedEdge = {
  __typename?: "ViewerFieldsPaginatedEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<ViewerFieldsPaginated>;
};

export type ViewerFieldsPaginatedInput = {
  connectionInputs: ViewerFieldsSubConnectionInputs;
  params: FindManyUsersPaginatedInput;
};

export type ViewerFieldsSubConnectionInputs = {
  findManyCommentsInput?: InputMaybe<FindManyCommentsPaginatedInput>;
  findManyEntriesInput?: InputMaybe<FindManyEntriessPaginatedInput>;
  findManyMediaItemsInput?: InputMaybe<FindManyMediaItemsPaginatedInput>;
  findManySessionsInput?: InputMaybe<FindManySessionsPaginatedInput>;
};

export const AccountPartial = gql`
  fragment AccountPartial on Account {
    access_token
    expires_at
    id
    id_token
    userId
    oauth_token
    oauth_token_secret
    provider
    providerAccountId
    refresh_secret
    refresh_token
    scope
    session_state
    token_type
    type
    __typename
  }
`;
export const AuthPartial = gql`
  fragment AuthPartial on Auth {
    accessToken
    refreshToken
    __typename
  }
`;
export const CategoryCountPartial = gql`
  fragment CategoryCountPartial on CategoryCount {
    __typename
    entries
  }
`;
export const CategoryPartial = gql`
  fragment CategoryPartial on Category {
    createdAt
    creatorId
    entryId
    id
    name
    updatedAt
    __typename
  }
`;
export const CategoryConnectionPartial = gql`
  fragment CategoryConnectionPartial on CategoryConnection {
    __typename
    totalCount
  }
`;
export const CategoryEdgePartial = gql`
  fragment CategoryEdgePartial on CategoryEdge {
    __typename
    cursor
  }
`;
export const CommentPartial = gql`
  fragment CommentPartial on Comment {
    __typename
    body
    updatedAt
    createdAt
    entryId
    authorId
    id
    position
    reactions
  }
`;
export const CommentEdgePartial = gql`
  fragment CommentEdgePartial on CommentEdge {
    __typename
    cursor
  }
`;
export const CommentConnectionPartial = gql`
  fragment CommentConnectionPartial on CommentConnection {
    __typename
    totalCount
  }
`;
export const ConnectionPartial = gql`
  fragment ConnectionPartial on Connection {
    firstName
    email
    firstName
    lastName
    id
    ip
    lastModified
    lastName
    ownerId
    phoneNumber
    __typename
  }
`;
export const ConnectionConnectionPartial = gql`
  fragment ConnectionConnectionPartial on ConnectionConnection {
    __typename
    totalCount
  }
`;
export const ConnectionEdgePartial = gql`
  fragment ConnectionEdgePartial on ConnectionEdge {
    __typename
    cursor
  }
`;
export const EntryCountPartial = gql`
  fragment EntryCountPartial on EntryCount {
    categories
    comments
    __typename
  }
`;
export const EntryPartial = gql`
  fragment EntryPartial on Entry {
    authorId
    content
    createdAt
    featuredImage
    title
    published
    id
    __typename
  }
`;
export const EntryConnectionPartial = gql`
  fragment EntryConnectionPartial on EntryConnection {
    totalCount
    __typename
  }
`;
export const EntryEdgePartial = gql`
  fragment EntryEdgePartial on EntryEdge {
    cursor
    __typename
  }
`;
export const JwtDecodedPartial = gql`
  fragment JwtDecodedPartial on JwtDecoded {
    signature
    __typename
  }
`;
export const JwtHeadersPartial = gql`
  fragment JwtHeadersPartial on JwtHeaders {
    alg
    typ
    __typename
  }
`;
export const JwtPayloadPartial = gql`
  fragment JwtPayloadPartial on JwtPayload {
    exp
    iat
    userId
    __typename
  }
`;
export const MediaItemPartial = gql`
  fragment MediaItemPartial on MediaItem {
    id
    name
    width
    height
    quality
    size
    src
    type
    uploadedAt
    userId
    fileLastModified
    __typename
  }
`;
export const MediaItemEdgePartial = gql`
  fragment MediaItemEdgePartial on MediaItemEdge {
    cursor
    __typename
  }
`;
export const MediaItemConnectionPartial = gql`
  fragment MediaItemConnectionPartial on MediaItemConnection {
    totalCount
    __typename
  }
`;
export const PageInfoPartial = gql`
  fragment PageInfoPartial on PageInfo {
    startCursor
    endCursor
    hasNextPage
    hasPreviousPage
    __typename
  }
`;
export const ProfileConnectionPartial = gql`
  fragment ProfileConnectionPartial on ProfileConnection {
    totalCount
    __typename
  }
`;
export const ProfileEdgePartial = gql`
  fragment ProfileEdgePartial on ProfileEdge {
    cursor
    __typename
  }
`;
export const ProfilePartial = gql`
  fragment ProfilePartial on Profile {
    activiyFeed
    bio
    city
    country
    coverPhoto
    dob
    gender
    id
    lastSeen
    memberSince
    occupation
    phoneNumber
    pronouns
    recentActivity
    userId
    __typename
  }
`;
export const SessionPartial = gql`
  fragment SessionPartial on Session {
    accessToken
    alg
    exp
    iat
    id
    lastVerified
    provider
    refreshToken
    scopes
    signature
    tokenState
    userId
    __typename
  }
`;
export const SessionConnectionPartial = gql`
  fragment SessionConnectionPartial on SessionConnection {
    __typename
    totalCount
  }
`;
export const SessionEdgePartial = gql`
  fragment SessionEdgePartial on SessionEdge {
    __typename
    cursor
  }
`;
export const UserCountPartial = gql`
  fragment UserCountPartial on UserCount {
    accounts
    categories
    comments
    connections
    mediaItems
    entries
    sessions
    __typename
  }
`;
export const UserPartial = gql`
  fragment UserPartial on User {
    createdAt
    email
    emailVerified
    id
    image
    firstName
    lastName
    password
    role
    status
    updatedAt
    __typename
  }
`;
export const UserConnectionPartial = gql`
  fragment UserConnectionPartial on UserConnection {
    totalCount
    __typename
  }
`;
export const UserEdgePartial = gql`
  fragment UserEdgePartial on UserEdge {
    cursor
    __typename
  }
`;
export const ViewerAuthInfoPartial = gql`
  fragment ViewerAuthInfoPartial on ViewerAuthInfo {
    __typename
    accessToken
    refreshToken
  }
`;
export const ViewerFieldsPaginatedConnectionPartial = gql`
  fragment ViewerFieldsPaginatedConnectionPartial on ViewerFieldsPaginatedConnection {
    __typename
    totalCount
  }
`;
export const ViewerFieldsPaginatedEdgePartial = gql`
  fragment ViewerFieldsPaginatedEdgePartial on ViewerFieldsPaginatedEdge {
    __typename
    cursor
  }
`;
export const ViewerFieldsPaginatedPartial = gql`
  fragment ViewerFieldsPaginatedPartial on ViewerFieldsPaginated {
    createdAt
    email
    emailVerified
    firstName
    lastName
    id
    image
    password
    role
    status
    updatedAt
    __typename
  }
`;
export const ViewerPartial = gql`
  fragment ViewerPartial on ViewerDetailed {
    id
    accessToken
    createdAt
    email
    emailVerified
    firstName
    lastName
    password
    role
    status
    updatedAt
    __typename
  }
`;
export const changePassword = gql`
  mutation changePassword($changePassword: ChangePasswordInput!) {
    changePassword(changePasswordInput: $changePassword) {
      ...UserPartial
    }
  }
  ${UserPartial}
`;
export const createNewComment = gql`
  mutation createNewComment(
    $createNewCommentInput: CreatNewCommentInput!
  ) {
    createNewComment(commentCreateInput: $createNewCommentInput) {
      ...CommentPartial
    }
  }
  ${CommentPartial}
`;
export const createNewProfile = gql`
  mutation createNewProfile($newProfileInput: CreateOneProfile!) {
    createNewProfile(createNewProfileInput: $newProfileInput) {
      ...ProfilePartial
    }
  }
  ${ProfilePartial}
`;
export const createEntry = gql`
  mutation createEntry($createOneEntry: EntryCreateOneInput!) {
    createNewEntry(entryCreateInput: $createOneEntry) {
      ...EntryPartial
    }
  }
  ${EntryPartial}
`;
export const registerNewUser = gql`
  mutation registerNewUser($userCreateMutationInput: SignupInput!) {
    registerNewUser(userCreateInput: $userCreateMutationInput) {
      auth {
        ...AuthPartial
        user {
          _count {
            ...UserCountPartial
          }
          ...UserPartial
        }
        session {
          ...SessionPartial
        }
      }
      jwt {
        header {
          ...JwtHeadersPartial
        }
        payload {
          ...JwtPayloadPartial
        }
        ...JwtDecodedPartial
      }
    }
  }
  ${AuthPartial}
  ${UserCountPartial}
  ${UserPartial}
  ${SessionPartial}
  ${JwtHeadersPartial}
  ${JwtPayloadPartial}
  ${JwtDecodedPartial}
`;
export const signInUser = gql`
  mutation signInUser($loginInput: LoginInput!) {
    signin(userloginInput: $loginInput) {
      auth {
        ...AuthPartial
        user {
          ...UserPartial
          _count {
            ...UserCountPartial
          }
        }
        session {
          ...SessionPartial
        }
      }
      jwt {
        header {
          ...JwtHeadersPartial
        }
        payload {
          ...JwtPayloadPartial
        }
        ...JwtDecodedPartial
      }
      __typename
    }
  }
  ${AuthPartial}
  ${UserPartial}
  ${UserCountPartial}
  ${SessionPartial}
  ${JwtHeadersPartial}
  ${JwtPayloadPartial}
  ${JwtDecodedPartial}
`;
export const categoryByEncodedCursor = gql`
  query categoryByEncodedCursor($categoryCursor: String!) {
    categoryByRelayId(cursor: $categoryCursor) {
      ...CategoryPartial
    }
  }
  ${CategoryPartial}
`;
export const commentByEncodedCursor = gql`
  query commentByEncodedCursor($commentCursor: String!) {
    commentByRelayId(cursor: $commentCursor) {
      ...CommentPartial
    }
  }
  ${CommentPartial}
`;
export const connectionByEncodedCursor = gql`
  query connectionByEncodedCursor($connectionCursor: String!) {
    connectionByRelayId(connectionCursor: $connectionCursor) {
      ...ConnectionPartial
    }
  }
  ${ConnectionPartial}
`;
export const entryByEncodedCursor = gql`
  query entryByEncodedCursor($entryCursor: String!) {
    entryByRelayId(entryCursor: $entryCursor) {
      ...EntryPartial
    }
  }
  ${EntryPartial}
`;
export const deriveUserDetailsFromToken = gql`
  query deriveUserDetailsFromToken {
    __typename
    getViewer {
      __typename
      auth {
        session {
          ...SessionPartial
        }
        user {
          _count {
            ...UserCountPartial
          }
          ...UserPartial
        }
        ...AuthPartial
      }
      jwt {
        header {
          ...JwtHeadersPartial
        }
        payload {
          ...JwtPayloadPartial
        }
        ...JwtDecodedPartial
      }
    }
  }
  ${SessionPartial}
  ${UserCountPartial}
  ${UserPartial}
  ${AuthPartial}
  ${JwtHeadersPartial}
  ${JwtPayloadPartial}
  ${JwtDecodedPartial}
`;
export const listCategories = gql`
  query listCategories(
    $findManyCategoriesInput: FindManyCategoriesPaginatedInput!
  ) {
    listCategories(
      findManyCategoriesPaginatedInput: $findManyCategoriesInput
    ) {
      ...CategoryConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...CategoryEdgePartial
        node {
          ...CategoryPartial
          creator {
            ...UserPartial
          }
          entries {
            ...EntryPartial
          }
          _count {
            ...CategoryCountPartial
          }
        }
      }
    }
  }
  ${CategoryConnectionPartial}
  ${PageInfoPartial}
  ${CategoryEdgePartial}
  ${CategoryPartial}
  ${UserPartial}
  ${EntryPartial}
  ${CategoryCountPartial}
`;
export const listComments = gql`
  query listComments(
    $findManyCommentsInput: FindManyCommentsPaginatedInput!
  ) {
    listComments(findManyCommentsPaginatedInput: $findManyCommentsInput) {
      ...CommentConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...CommentEdgePartial
        node {
          ...CommentPartial
          author {
            ...UserPartial
          }
          entry {
            ...EntryPartial
          }
        }
      }
    }
  }
  ${CommentConnectionPartial}
  ${PageInfoPartial}
  ${CommentEdgePartial}
  ${CommentPartial}
  ${UserPartial}
  ${EntryPartial}
`;
export const listConnections = gql`
  query listConnections(
    $findManyConnectionsInput: FindManyConnectionsPaginatedInput!
  ) {
    listConnections(
      findManyConnectionsPaginatedInput: $findManyConnectionsInput
    ) {
      ...ConnectionConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...ConnectionEdgePartial
        node {
          ...ConnectionPartial
        }
      }
    }
  }
  ${ConnectionConnectionPartial}
  ${PageInfoPartial}
  ${ConnectionEdgePartial}
  ${ConnectionPartial}
`;
export const listEntries = gql`
  query listEntries(
    $findManyEntriesInput: FindManyEntriessPaginatedInput!
  ) {
    listEntries(findManyEntriesPaginatedInput: $findManyEntriesInput) {
      ...EntryConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...EntryEdgePartial
        node {
          ...EntryPartial
          _count {
            ...EntryCountPartial
          }
          author {
            ...UserPartial
          }
          comments {
            ...CommentPartial
          }
        }
      }
    }
  }
  ${EntryConnectionPartial}
  ${PageInfoPartial}
  ${EntryEdgePartial}
  ${EntryPartial}
  ${EntryCountPartial}
  ${UserPartial}
  ${CommentPartial}
`;
export const listMediaItems = gql`
  query listMediaItems(
    $findManyMediaItemsPaginated: FindManyMediaItemsPaginatedInput!
  ) {
    listMediaItems(
      findManyMediaItemsPaginated: $findManyMediaItemsPaginated
    ) {
      ...MediaItemConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...MediaItemEdgePartial
        node {
          ...MediaItemPartial
        }
      }
    }
  }
  ${MediaItemConnectionPartial}
  ${PageInfoPartial}
  ${MediaItemEdgePartial}
  ${MediaItemPartial}
`;
export const listProfiles = gql`
  query listProfiles(
    $findManyProfilesInput: FindManyProfilesPaginatedInput!
  ) {
    listProfiles(profilesArgs: $findManyProfilesInput) {
      ...ProfileConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...ProfileEdgePartial
        node {
          ...ProfilePartial
          user {
            ...UserPartial
            _count {
              ...UserCountPartial
            }
          }
        }
      }
    }
  }
  ${ProfileConnectionPartial}
  ${PageInfoPartial}
  ${ProfileEdgePartial}
  ${ProfilePartial}
  ${UserPartial}
  ${UserCountPartial}
`;
export const listSessions = gql`
  query listSessions(
    $findManySessionsInput: FindManySessionsPaginatedInput!
  ) {
    listSessions(findManySessionsPaginatedInput: $findManySessionsInput) {
      ...SessionConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...SessionEdgePartial
        node {
          ...SessionPartial
          user {
            ...UserPartial
            _count {
              ...UserCountPartial
            }
          }
        }
      }
    }
  }
  ${SessionConnectionPartial}
  ${PageInfoPartial}
  ${SessionEdgePartial}
  ${SessionPartial}
  ${UserPartial}
  ${UserCountPartial}
`;
export const allUsers = gql`
  query allUsers(
    $findManyUsersPaginatedInput: FindManyUsersPaginatedInput
  ) {
    listUsers(findManyUsersPaginatedInput: $findManyUsersPaginatedInput) {
      ...UserConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...UserEdgePartial
        node {
          ...UserPartial
          profile {
            ...ProfilePartial
          }
          mediaItems {
            ...MediaItemPartial
          }
          entries {
            ...EntryPartial
          }
          _count {
            ...UserCountPartial
          }
        }
      }
    }
  }
  ${UserConnectionPartial}
  ${PageInfoPartial}
  ${UserEdgePartial}
  ${UserPartial}
  ${ProfilePartial}
  ${MediaItemPartial}
  ${EntryPartial}
  ${UserCountPartial}
`;
export const profileByEncodedCursor = gql`
  query profileByEncodedCursor($profileCursor: String!) {
    profileByRelayId(cursor: $profileCursor) {
      ...ProfilePartial
    }
  }
  ${ProfilePartial}
`;
export const sessionByEncodedCursor = gql`
  query sessionByEncodedCursor($sessionCursor: String!) {
    sessionByRelayId(cursor: $sessionCursor) {
      ...SessionPartial
    }
  }
  ${SessionPartial}
`;
export const userByEncodedCursor = gql`
  query userByEncodedCursor($userCursor: String!) {
    userByRelayId(cursor: $userCursor) {
      ...UserPartial
    }
  }
  ${UserPartial}
`;
export const userDecodedFromToken = gql`
  query userDecodedFromToken($accessToken: String!) {
    getUserFromAccessToken(token: $accessToken) {
      __typename
      auth {
        session {
          ...SessionPartial
        }
        user {
          _count {
            ...UserCountPartial
          }
          ...UserPartial
        }
        ...AuthPartial
      }
      jwt {
        header {
          ...JwtHeadersPartial
        }
        payload {
          ...JwtPayloadPartial
        }
        ...JwtDecodedPartial
      }
    }
  }
  ${SessionPartial}
  ${UserCountPartial}
  ${UserPartial}
  ${AuthPartial}
  ${JwtHeadersPartial}
  ${JwtPayloadPartial}
  ${JwtDecodedPartial}
`;
export const viewerCommentsViaContext = gql`
  query viewerCommentsViaContext(
    $viewerCommentsInput: FindManyCommentsPaginatedInput!
  ) {
    viewerCommentsPaginated(
      viewerCommentsPaginatedInput: $viewerCommentsInput
    ) {
      pageInfo {
        ...PageInfoPartial
      }
      ...CommentConnectionPartial
      edges {
        ...CommentEdgePartial
        node {
          ...CommentPartial
          author {
            _count {
              ...UserCountPartial
            }
            ...UserPartial
          }
        }
      }
    }
  }
  ${PageInfoPartial}
  ${CommentConnectionPartial}
  ${CommentEdgePartial}
  ${CommentPartial}
  ${UserCountPartial}
  ${UserPartial}
`;
export const viewerEntriesViaContext = gql`
  query viewerEntriesViaContext(
    $findViewerEntriesPaginatedInput: FindViewerEntriesPaginatedInput!
  ) {
    viewerEntriesPaginated(
      viewerEntriesPaginatedInput: $findViewerEntriesPaginatedInput
    ) {
      ...EntryConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...EntryEdgePartial
        node {
          ...EntryPartial
          _count {
            ...EntryCountPartial
          }
        }
      }
    }
  }
  ${EntryConnectionPartial}
  ${PageInfoPartial}
  ${EntryEdgePartial}
  ${EntryPartial}
  ${EntryCountPartial}
`;
export const viewerFieldsConnectionViaContext = gql`
  query viewerFieldsConnectionViaContext(
    $viewerFieldsPaginatedInput: ViewerFieldsPaginatedInput!
  ) {
    viewerFieldsPaginated(
      viewerFieldsPaginatedInput: $viewerFieldsPaginatedInput
    ) {
      pageInfo {
        ...PageInfoPartial
      }
      ...ViewerFieldsPaginatedConnectionPartial
      edges {
        ...ViewerFieldsPaginatedEdgePartial
        node {
          _count {
            ...UserCountPartial
          }
          ...ViewerFieldsPaginatedPartial
          profile {
            ...ProfilePartial
          }
          commentConnection {
            pageInfo {
              ...PageInfoPartial
            }
            ...CommentConnectionPartial
            edges {
              ...CommentEdgePartial
              node {
                ...CommentPartial
              }
            }
          }
          entryConnection {
            pageInfo {
              ...PageInfoPartial
            }
            ...EntryConnectionPartial
            edges {
              ...EntryEdgePartial
              node {
                ...EntryPartial
                _count {
                  ...EntryCountPartial
                }
              }
            }
          }
          sessionConnection {
            pageInfo {
              ...PageInfoPartial
            }
            ...SessionConnectionPartial
            edges {
              ...SessionEdgePartial
              node {
                ...SessionPartial
              }
            }
          }
        }
      }
    }
  }
  ${PageInfoPartial}
  ${ViewerFieldsPaginatedConnectionPartial}
  ${ViewerFieldsPaginatedEdgePartial}
  ${UserCountPartial}
  ${ViewerFieldsPaginatedPartial}
  ${ProfilePartial}
  ${CommentConnectionPartial}
  ${CommentEdgePartial}
  ${CommentPartial}
  ${EntryConnectionPartial}
  ${EntryEdgePartial}
  ${EntryPartial}
  ${EntryCountPartial}
  ${SessionConnectionPartial}
  ${SessionEdgePartial}
  ${SessionPartial}
`;
export const viewerAuthFromContext = gql`
  query viewerAuthFromContext {
    viewerAuthInfoFromContext {
      viewerJwt {
        header {
          ...JwtHeadersPartial
        }
        payload {
          ...JwtPayloadPartial
        }
        ...JwtDecodedPartial
      }
      ...ViewerAuthInfoPartial
    }
  }
  ${JwtHeadersPartial}
  ${JwtPayloadPartial}
  ${JwtDecodedPartial}
  ${ViewerAuthInfoPartial}
`;
export const viewerProfileViaContext = gql`
  query viewerProfileViaContext {
    viewerProfile {
      ...ProfilePartial
      user {
        ...UserPartial
      }
    }
  }
  ${ProfilePartial}
  ${UserPartial}
`;
export const viewerSessionsViaContext = gql`
  query viewerSessionsViaContext(
    $findManySessionsInput: FindManySessionsPaginatedInput!
  ) {
    viewerSessionsPaginated(
      viewerSessionssPaginatedInput: $findManySessionsInput
    ) {
      pageInfo {
        ...PageInfoPartial
      }
      ...SessionConnectionPartial
      edges {
        ...SessionEdgePartial
        node {
          ...SessionPartial
        }
      }
    }
  }
  ${PageInfoPartial}
  ${SessionConnectionPartial}
  ${SessionEdgePartial}
  ${SessionPartial}
`;
export const Viewer = gql`
  query Viewer {
    me {
      auth {
        ...AuthPartial
        user {
          ...UserPartial
          entries {
            ...EntryPartial
            comments {
              ...CommentPartial
            }
          }
        }
        session {
          ...SessionPartial
        }
      }
      jwt {
        header {
          ...JwtHeadersPartial
        }
        payload {
          ...JwtPayloadPartial
        }
        ...JwtDecodedPartial
      }
      __typename
    }
  }
  ${AuthPartial}
  ${UserPartial}
  ${EntryPartial}
  ${CommentPartial}
  ${SessionPartial}
  ${JwtHeadersPartial}
  ${JwtPayloadPartial}
  ${JwtDecodedPartial}
`;
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<
  TResult,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info?: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info?: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info?: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Account: ResolverTypeWrapper<DeepPartial<Account>>;
  AccountCreateManyUserInput: ResolverTypeWrapper<
    DeepPartial<AccountCreateManyUserInput>
  >;
  AccountCreateManyUserInputEnvelope: ResolverTypeWrapper<
    DeepPartial<AccountCreateManyUserInputEnvelope>
  >;
  AccountCreateNestedManyWithoutUserInput: ResolverTypeWrapper<
    DeepPartial<AccountCreateNestedManyWithoutUserInput>
  >;
  AccountCreateOrConnectWithoutUserInput: ResolverTypeWrapper<
    DeepPartial<AccountCreateOrConnectWithoutUserInput>
  >;
  AccountCreateWithoutUserInput: ResolverTypeWrapper<
    DeepPartial<AccountCreateWithoutUserInput>
  >;
  AccountListRelationFilter: ResolverTypeWrapper<
    DeepPartial<AccountListRelationFilter>
  >;
  AccountOrderByRelationAggregateInput: ResolverTypeWrapper<
    DeepPartial<AccountOrderByRelationAggregateInput>
  >;
  AccountProviderProviderAccountIdCompoundUniqueInput: ResolverTypeWrapper<
    DeepPartial<AccountProviderProviderAccountIdCompoundUniqueInput>
  >;
  AccountWhereInput: ResolverTypeWrapper<DeepPartial<AccountWhereInput>>;
  AccountWhereUniqueInput: ResolverTypeWrapper<
    DeepPartial<AccountWhereUniqueInput>
  >;
  AlgorithmType: ResolverTypeWrapper<DeepPartial<AlgorithmType>>;
  Auth: ResolverTypeWrapper<DeepPartial<Auth>>;
  AuthDetailed: ResolverTypeWrapper<DeepPartial<AuthDetailed>>;
  BaseTypeNodes: ResolverTypeWrapper<
    DeepPartial<
      Omit<BaseTypeNodes, "nodes"> & {
        nodes: Array<ResolversTypes["TypesUnion"]>;
      }
    >
  >;
  BaseTypesEdge: ResolverTypeWrapper<
    DeepPartial<
      Omit<BaseTypesEdge, "node"> & { node: ResolversTypes["TypesUnion"] }
    >
  >;
  BigInt: ResolverTypeWrapper<DeepPartial<Scalars["BigInt"]>>;
  BoolFilter: ResolverTypeWrapper<DeepPartial<BoolFilter>>;
  Boolean: ResolverTypeWrapper<DeepPartial<Scalars["Boolean"]>>;
  Category: ResolverTypeWrapper<DeepPartial<Category>>;
  CategoryConnection: ResolverTypeWrapper<DeepPartial<CategoryConnection>>;
  CategoryCount: ResolverTypeWrapper<DeepPartial<CategoryCount>>;
  CategoryCreateManyCreatorInput: ResolverTypeWrapper<
    DeepPartial<CategoryCreateManyCreatorInput>
  >;
  CategoryCreateManyCreatorInputEnvelope: ResolverTypeWrapper<
    DeepPartial<CategoryCreateManyCreatorInputEnvelope>
  >;
  CategoryCreateNestedManyWithoutCreatorInput: ResolverTypeWrapper<
    DeepPartial<CategoryCreateNestedManyWithoutCreatorInput>
  >;
  CategoryCreateNestedManyWithoutEntriesInput: ResolverTypeWrapper<
    DeepPartial<CategoryCreateNestedManyWithoutEntriesInput>
  >;
  CategoryCreateOrConnectWithoutCreatorInput: ResolverTypeWrapper<
    DeepPartial<CategoryCreateOrConnectWithoutCreatorInput>
  >;
  CategoryCreateOrConnectWithoutEntriesInput: ResolverTypeWrapper<
    DeepPartial<CategoryCreateOrConnectWithoutEntriesInput>
  >;
  CategoryCreateWithoutCreatorInput: ResolverTypeWrapper<
    DeepPartial<CategoryCreateWithoutCreatorInput>
  >;
  CategoryCreateWithoutEntriesInput: ResolverTypeWrapper<
    DeepPartial<CategoryCreateWithoutEntriesInput>
  >;
  CategoryEdge: ResolverTypeWrapper<DeepPartial<CategoryEdge>>;
  CategoryListRelationFilter: ResolverTypeWrapper<
    DeepPartial<CategoryListRelationFilter>
  >;
  CategoryOrderByRelationAggregateInput: ResolverTypeWrapper<
    DeepPartial<CategoryOrderByRelationAggregateInput>
  >;
  CategoryOrderByRelevanceFieldEnum: ResolverTypeWrapper<
    DeepPartial<CategoryOrderByRelevanceFieldEnum>
  >;
  CategoryOrderByRelevanceInput: ResolverTypeWrapper<
    DeepPartial<CategoryOrderByRelevanceInput>
  >;
  CategoryOrderByWithRelationAndSearchRelevanceInput: ResolverTypeWrapper<
    DeepPartial<CategoryOrderByWithRelationAndSearchRelevanceInput>
  >;
  CategoryScalarFieldEnum: ResolverTypeWrapper<
    DeepPartial<CategoryScalarFieldEnum>
  >;
  CategoryWhereInput: ResolverTypeWrapper<DeepPartial<CategoryWhereInput>>;
  CategoryWhereUniqueInput: ResolverTypeWrapper<
    DeepPartial<CategoryWhereUniqueInput>
  >;
  ChangePasswordInput: ResolverTypeWrapper<
    DeepPartial<ChangePasswordInput>
  >;
  Comment: ResolverTypeWrapper<DeepPartial<Comment>>;
  CommentAuthorIdEntryIdCompoundUniqueInput: ResolverTypeWrapper<
    DeepPartial<CommentAuthorIdEntryIdCompoundUniqueInput>
  >;
  CommentConnection: ResolverTypeWrapper<DeepPartial<CommentConnection>>;
  CommentCreateManyAuthorInput: ResolverTypeWrapper<
    DeepPartial<CommentCreateManyAuthorInput>
  >;
  CommentCreateManyAuthorInputEnvelope: ResolverTypeWrapper<
    DeepPartial<CommentCreateManyAuthorInputEnvelope>
  >;
  CommentCreateManyEntryInput: ResolverTypeWrapper<
    DeepPartial<CommentCreateManyEntryInput>
  >;
  CommentCreateManyEntryInputEnvelope: ResolverTypeWrapper<
    DeepPartial<CommentCreateManyEntryInputEnvelope>
  >;
  CommentCreateManyreactionsInput: ResolverTypeWrapper<
    DeepPartial<CommentCreateManyreactionsInput>
  >;
  CommentCreateNestedManyWithoutAuthorInput: ResolverTypeWrapper<
    DeepPartial<CommentCreateNestedManyWithoutAuthorInput>
  >;
  CommentCreateNestedManyWithoutEntryInput: ResolverTypeWrapper<
    DeepPartial<CommentCreateNestedManyWithoutEntryInput>
  >;
  CommentCreateOrConnectWithoutAuthorInput: ResolverTypeWrapper<
    DeepPartial<CommentCreateOrConnectWithoutAuthorInput>
  >;
  CommentCreateOrConnectWithoutEntryInput: ResolverTypeWrapper<
    DeepPartial<CommentCreateOrConnectWithoutEntryInput>
  >;
  CommentCreateWithoutAuthorInput: ResolverTypeWrapper<
    DeepPartial<CommentCreateWithoutAuthorInput>
  >;
  CommentCreateWithoutEntryInput: ResolverTypeWrapper<
    DeepPartial<CommentCreateWithoutEntryInput>
  >;
  CommentCreatereactionsInput: ResolverTypeWrapper<
    DeepPartial<CommentCreatereactionsInput>
  >;
  CommentEdge: ResolverTypeWrapper<DeepPartial<CommentEdge>>;
  CommentListRelationFilter: ResolverTypeWrapper<
    DeepPartial<CommentListRelationFilter>
  >;
  CommentOrderByRelationAggregateInput: ResolverTypeWrapper<
    DeepPartial<CommentOrderByRelationAggregateInput>
  >;
  CommentOrderByRelevanceFieldEnum: ResolverTypeWrapper<
    DeepPartial<CommentOrderByRelevanceFieldEnum>
  >;
  CommentOrderByRelevanceInput: ResolverTypeWrapper<
    DeepPartial<CommentOrderByRelevanceInput>
  >;
  CommentOrderByWithRelationAndSearchRelevanceInput: ResolverTypeWrapper<
    DeepPartial<CommentOrderByWithRelationAndSearchRelevanceInput>
  >;
  CommentReactions: ResolverTypeWrapper<DeepPartial<CommentReactions>>;
  CommentScalarFieldEnum: ResolverTypeWrapper<
    DeepPartial<CommentScalarFieldEnum>
  >;
  CommentWhereInput: ResolverTypeWrapper<DeepPartial<CommentWhereInput>>;
  CommentWhereUniqueInput: ResolverTypeWrapper<
    DeepPartial<CommentWhereUniqueInput>
  >;
  Connection: ResolverTypeWrapper<DeepPartial<Connection>>;
  ConnectionConnection: ResolverTypeWrapper<
    DeepPartial<ConnectionConnection>
  >;
  ConnectionCreateManyOwnerInput: ResolverTypeWrapper<
    DeepPartial<ConnectionCreateManyOwnerInput>
  >;
  ConnectionCreateManyOwnerInputEnvelope: ResolverTypeWrapper<
    DeepPartial<ConnectionCreateManyOwnerInputEnvelope>
  >;
  ConnectionCreateNestedManyWithoutOwnerInput: ResolverTypeWrapper<
    DeepPartial<ConnectionCreateNestedManyWithoutOwnerInput>
  >;
  ConnectionCreateOrConnectWithoutOwnerInput: ResolverTypeWrapper<
    DeepPartial<ConnectionCreateOrConnectWithoutOwnerInput>
  >;
  ConnectionCreateWithoutOwnerInput: ResolverTypeWrapper<
    DeepPartial<ConnectionCreateWithoutOwnerInput>
  >;
  ConnectionEdge: ResolverTypeWrapper<DeepPartial<ConnectionEdge>>;
  ConnectionListRelationFilter: ResolverTypeWrapper<
    DeepPartial<ConnectionListRelationFilter>
  >;
  ConnectionOrderByRelationAggregateInput: ResolverTypeWrapper<
    DeepPartial<ConnectionOrderByRelationAggregateInput>
  >;
  ConnectionOrderByRelevanceFieldEnum: ResolverTypeWrapper<
    DeepPartial<ConnectionOrderByRelevanceFieldEnum>
  >;
  ConnectionOrderByRelevanceInput: ResolverTypeWrapper<
    DeepPartial<ConnectionOrderByRelevanceInput>
  >;
  ConnectionOrderByWithRelationAndSearchRelevanceInput: ResolverTypeWrapper<
    DeepPartial<ConnectionOrderByWithRelationAndSearchRelevanceInput>
  >;
  ConnectionScalarFieldEnum: ResolverTypeWrapper<
    DeepPartial<ConnectionScalarFieldEnum>
  >;
  ConnectionWhereInput: ResolverTypeWrapper<
    DeepPartial<ConnectionWhereInput>
  >;
  ConnectionWhereUniqueInput: ResolverTypeWrapper<
    DeepPartial<ConnectionWhereUniqueInput>
  >;
  ContentNodes: ResolverTypeWrapper<DeepPartial<ContentNodes>>;
  CreatNewCommentInput: ResolverTypeWrapper<
    DeepPartial<CreatNewCommentInput>
  >;
  CreateNewProfileInput: ResolverTypeWrapper<
    DeepPartial<CreateNewProfileInput>
  >;
  CreateOneProfile: ResolverTypeWrapper<DeepPartial<CreateOneProfile>>;
  DateTime: ResolverTypeWrapper<DeepPartial<Scalars["DateTime"]>>;
  DateTimeFilter: ResolverTypeWrapper<DeepPartial<DateTimeFilter>>;
  DateTimeNullableFilter: ResolverTypeWrapper<
    DeepPartial<DateTimeNullableFilter>
  >;
  Entry: ResolverTypeWrapper<DeepPartial<Entry>>;
  EntryConnection: ResolverTypeWrapper<DeepPartial<EntryConnection>>;
  EntryCount: ResolverTypeWrapper<DeepPartial<EntryCount>>;
  EntryCreateManyAuthorInput: ResolverTypeWrapper<
    DeepPartial<EntryCreateManyAuthorInput>
  >;
  EntryCreateManyAuthorInputEnvelope: ResolverTypeWrapper<
    DeepPartial<EntryCreateManyAuthorInputEnvelope>
  >;
  EntryCreateNestedManyWithoutAuthorInput: ResolverTypeWrapper<
    DeepPartial<EntryCreateNestedManyWithoutAuthorInput>
  >;
  EntryCreateNestedManyWithoutCategoriesInput: ResolverTypeWrapper<
    DeepPartial<EntryCreateNestedManyWithoutCategoriesInput>
  >;
  EntryCreateNestedOneWithoutCommentsInput: ResolverTypeWrapper<
    DeepPartial<EntryCreateNestedOneWithoutCommentsInput>
  >;
  EntryCreateOneInput: ResolverTypeWrapper<
    DeepPartial<EntryCreateOneInput>
  >;
  EntryCreateOrConnectWithoutAuthorInput: ResolverTypeWrapper<
    DeepPartial<EntryCreateOrConnectWithoutAuthorInput>
  >;
  EntryCreateOrConnectWithoutCategoriesInput: ResolverTypeWrapper<
    DeepPartial<EntryCreateOrConnectWithoutCategoriesInput>
  >;
  EntryCreateOrConnectWithoutCommentsInput: ResolverTypeWrapper<
    DeepPartial<EntryCreateOrConnectWithoutCommentsInput>
  >;
  EntryCreateWithoutAuthorInput: ResolverTypeWrapper<
    DeepPartial<EntryCreateWithoutAuthorInput>
  >;
  EntryCreateWithoutCategoriesInput: ResolverTypeWrapper<
    DeepPartial<EntryCreateWithoutCategoriesInput>
  >;
  EntryCreateWithoutCommentsInput: ResolverTypeWrapper<
    DeepPartial<EntryCreateWithoutCommentsInput>
  >;
  EntryEdge: ResolverTypeWrapper<DeepPartial<EntryEdge>>;
  EntryListRelationFilter: ResolverTypeWrapper<
    DeepPartial<EntryListRelationFilter>
  >;
  EntryOrderByRelationAggregateInput: ResolverTypeWrapper<
    DeepPartial<EntryOrderByRelationAggregateInput>
  >;
  EntryOrderByRelevanceFieldEnum: ResolverTypeWrapper<
    DeepPartial<EntryOrderByRelevanceFieldEnum>
  >;
  EntryOrderByRelevanceInput: ResolverTypeWrapper<
    DeepPartial<EntryOrderByRelevanceInput>
  >;
  EntryOrderByWithRelationAndSearchRelevanceInput: ResolverTypeWrapper<
    DeepPartial<EntryOrderByWithRelationAndSearchRelevanceInput>
  >;
  EntryRelationFilter: ResolverTypeWrapper<
    DeepPartial<EntryRelationFilter>
  >;
  EntryScalarFieldEnum: ResolverTypeWrapper<
    DeepPartial<EntryScalarFieldEnum>
  >;
  EntryWhereInput: ResolverTypeWrapper<DeepPartial<EntryWhereInput>>;
  EntryWhereUniqueInput: ResolverTypeWrapper<
    DeepPartial<EntryWhereUniqueInput>
  >;
  EnumCommentReactionsNullableListFilter: ResolverTypeWrapper<
    DeepPartial<EnumCommentReactionsNullableListFilter>
  >;
  EnumGenderNullableFilter: ResolverTypeWrapper<
    DeepPartial<EnumGenderNullableFilter>
  >;
  EnumMediaItemDestinationNullableFilter: ResolverTypeWrapper<
    DeepPartial<EnumMediaItemDestinationNullableFilter>
  >;
  EnumMimeTypesNullableFilter: ResolverTypeWrapper<
    DeepPartial<EnumMimeTypesNullableFilter>
  >;
  EnumPronounsNullableFilter: ResolverTypeWrapper<
    DeepPartial<EnumPronounsNullableFilter>
  >;
  EnumRoleNullableFilter: ResolverTypeWrapper<
    DeepPartial<EnumRoleNullableFilter>
  >;
  EnumUserStatusNullableFilter: ResolverTypeWrapper<
    DeepPartial<EnumUserStatusNullableFilter>
  >;
  FindManyCategoriesPaginatedInput: ResolverTypeWrapper<
    DeepPartial<FindManyCategoriesPaginatedInput>
  >;
  FindManyCommentsPaginatedInput: ResolverTypeWrapper<
    DeepPartial<FindManyCommentsPaginatedInput>
  >;
  FindManyConnectionsPaginatedInput: ResolverTypeWrapper<
    DeepPartial<FindManyConnectionsPaginatedInput>
  >;
  FindManyEntriessPaginatedInput: ResolverTypeWrapper<
    DeepPartial<FindManyEntriessPaginatedInput>
  >;
  FindManyMediaItemsPaginatedInput: ResolverTypeWrapper<
    DeepPartial<FindManyMediaItemsPaginatedInput>
  >;
  FindManyProfilesPaginatedInput: ResolverTypeWrapper<
    DeepPartial<FindManyProfilesPaginatedInput>
  >;
  FindManySessionsPaginatedInput: ResolverTypeWrapper<
    DeepPartial<FindManySessionsPaginatedInput>
  >;
  FindManyUsersPaginatedInput: ResolverTypeWrapper<
    DeepPartial<FindManyUsersPaginatedInput>
  >;
  FindViewerEntriesPaginatedInput: ResolverTypeWrapper<
    DeepPartial<FindViewerEntriesPaginatedInput>
  >;
  Float: ResolverTypeWrapper<DeepPartial<Scalars["Float"]>>;
  FloatNullableFilter: ResolverTypeWrapper<
    DeepPartial<FloatNullableFilter>
  >;
  Gender: ResolverTypeWrapper<DeepPartial<Gender>>;
  ID: ResolverTypeWrapper<DeepPartial<Scalars["ID"]>>;
  Int: ResolverTypeWrapper<DeepPartial<Scalars["Int"]>>;
  IntNullableFilter: ResolverTypeWrapper<DeepPartial<IntNullableFilter>>;
  JwtDecoded: ResolverTypeWrapper<DeepPartial<JwtDecoded>>;
  JwtHeaders: ResolverTypeWrapper<DeepPartial<JwtHeaders>>;
  JwtPayload: ResolverTypeWrapper<DeepPartial<JwtPayload>>;
  LoginInput: ResolverTypeWrapper<DeepPartial<LoginInput>>;
  MediaItem: ResolverTypeWrapper<DeepPartial<MediaItem>>;
  MediaItemConnection: ResolverTypeWrapper<
    DeepPartial<MediaItemConnection>
  >;
  MediaItemCreateManyUserInput: ResolverTypeWrapper<
    DeepPartial<MediaItemCreateManyUserInput>
  >;
  MediaItemCreateManyUserInputEnvelope: ResolverTypeWrapper<
    DeepPartial<MediaItemCreateManyUserInputEnvelope>
  >;
  MediaItemCreateNestedManyWithoutUserInput: ResolverTypeWrapper<
    DeepPartial<MediaItemCreateNestedManyWithoutUserInput>
  >;
  MediaItemCreateOrConnectWithoutUserInput: ResolverTypeWrapper<
    DeepPartial<MediaItemCreateOrConnectWithoutUserInput>
  >;
  MediaItemCreateWithoutUserInput: ResolverTypeWrapper<
    DeepPartial<MediaItemCreateWithoutUserInput>
  >;
  MediaItemDestination: ResolverTypeWrapper<
    DeepPartial<MediaItemDestination>
  >;
  MediaItemEdge: ResolverTypeWrapper<DeepPartial<MediaItemEdge>>;
  MediaItemListRelationFilter: ResolverTypeWrapper<
    DeepPartial<MediaItemListRelationFilter>
  >;
  MediaItemNameUserIdCompoundUniqueInput: ResolverTypeWrapper<
    DeepPartial<MediaItemNameUserIdCompoundUniqueInput>
  >;
  MediaItemOrderByRelationAggregateInput: ResolverTypeWrapper<
    DeepPartial<MediaItemOrderByRelationAggregateInput>
  >;
  MediaItemOrderByRelevanceFieldEnum: ResolverTypeWrapper<
    DeepPartial<MediaItemOrderByRelevanceFieldEnum>
  >;
  MediaItemOrderByRelevanceInput: ResolverTypeWrapper<
    DeepPartial<MediaItemOrderByRelevanceInput>
  >;
  MediaItemOrderByWithRelationAndSearchRelevanceInput: ResolverTypeWrapper<
    DeepPartial<MediaItemOrderByWithRelationAndSearchRelevanceInput>
  >;
  MediaItemScalarFieldEnum: ResolverTypeWrapper<
    DeepPartial<MediaItemScalarFieldEnum>
  >;
  MediaItemWhereInput: ResolverTypeWrapper<
    DeepPartial<MediaItemWhereInput>
  >;
  MediaItemWhereUniqueInput: ResolverTypeWrapper<
    DeepPartial<MediaItemWhereUniqueInput>
  >;
  MimeTypes: ResolverTypeWrapper<DeepPartial<MimeTypes>>;
  Mutation: ResolverTypeWrapper<{}>;
  NestedBoolFilter: ResolverTypeWrapper<DeepPartial<NestedBoolFilter>>;
  NestedDateTimeFilter: ResolverTypeWrapper<
    DeepPartial<NestedDateTimeFilter>
  >;
  NestedDateTimeNullableFilter: ResolverTypeWrapper<
    DeepPartial<NestedDateTimeNullableFilter>
  >;
  NestedEnumGenderNullableFilter: ResolverTypeWrapper<
    DeepPartial<NestedEnumGenderNullableFilter>
  >;
  NestedEnumMediaItemDestinationNullableFilter: ResolverTypeWrapper<
    DeepPartial<NestedEnumMediaItemDestinationNullableFilter>
  >;
  NestedEnumMimeTypesNullableFilter: ResolverTypeWrapper<
    DeepPartial<NestedEnumMimeTypesNullableFilter>
  >;
  NestedEnumPronounsNullableFilter: ResolverTypeWrapper<
    DeepPartial<NestedEnumPronounsNullableFilter>
  >;
  NestedEnumRoleNullableFilter: ResolverTypeWrapper<
    DeepPartial<NestedEnumRoleNullableFilter>
  >;
  NestedEnumUserStatusNullableFilter: ResolverTypeWrapper<
    DeepPartial<NestedEnumUserStatusNullableFilter>
  >;
  NestedFloatNullableFilter: ResolverTypeWrapper<
    DeepPartial<NestedFloatNullableFilter>
  >;
  NestedIntNullableFilter: ResolverTypeWrapper<
    DeepPartial<NestedIntNullableFilter>
  >;
  NestedStringFilter: ResolverTypeWrapper<DeepPartial<NestedStringFilter>>;
  NestedStringNullableFilter: ResolverTypeWrapper<
    DeepPartial<NestedStringNullableFilter>
  >;
  Node:
    | ResolversTypes["Account"]
    | ResolversTypes["Category"]
    | ResolversTypes["Comment"]
    | ResolversTypes["Connection"]
    | ResolversTypes["Entry"]
    | ResolversTypes["MediaItem"]
    | ResolversTypes["Profile"]
    | ResolversTypes["Session"]
    | ResolversTypes["User"]
    | ResolversTypes["ViewerDetailed"]
    | ResolversTypes["ViewerFieldsPaginated"];
  NodeBaseFieldUnion: DeepPartial<
    | ResolversTypes["Account"]
    | ResolversTypes["Category"]
    | ResolversTypes["Comment"]
    | ResolversTypes["Connection"]
    | ResolversTypes["Entry"]
    | ResolversTypes["MediaItem"]
    | ResolversTypes["Profile"]
    | ResolversTypes["Session"]
    | ResolversTypes["User"]
  >;
  NodeUnion: DeepPartial<
    | ResolversTypes["CommentConnection"]
    | ResolversTypes["EntryConnection"]
    | ResolversTypes["MediaItemConnection"]
    | ResolversTypes["ProfileConnection"]
    | ResolversTypes["SessionConnection"]
    | ResolversTypes["UserConnection"]
  >;
  NodeUnionConnection: ResolverTypeWrapper<
    DeepPartial<NodeUnionConnection>
  >;
  NodeUnionEdge: ResolverTypeWrapper<
    DeepPartial<
      Omit<NodeUnionEdge, "node"> & { node: ResolversTypes["NodeUnion"] }
    >
  >;
  PageInfo: ResolverTypeWrapper<DeepPartial<PageInfo>>;
  PaginationArgsInput: ResolverTypeWrapper<
    DeepPartial<PaginationArgsInput>
  >;
  PhoneNumber: ResolverTypeWrapper<DeepPartial<Scalars["PhoneNumber"]>>;
  Profile: ResolverTypeWrapper<DeepPartial<Profile>>;
  ProfileConnection: ResolverTypeWrapper<DeepPartial<ProfileConnection>>;
  ProfileCreateNestedOneWithoutUserInput: ResolverTypeWrapper<
    DeepPartial<ProfileCreateNestedOneWithoutUserInput>
  >;
  ProfileCreateOrConnectWithoutUserInput: ResolverTypeWrapper<
    DeepPartial<ProfileCreateOrConnectWithoutUserInput>
  >;
  ProfileCreateWithoutUserInput: ResolverTypeWrapper<
    DeepPartial<ProfileCreateWithoutUserInput>
  >;
  ProfileEdge: ResolverTypeWrapper<DeepPartial<ProfileEdge>>;
  ProfileOrderByRelevanceFieldEnum: ResolverTypeWrapper<
    DeepPartial<ProfileOrderByRelevanceFieldEnum>
  >;
  ProfileOrderByRelevanceInput: ResolverTypeWrapper<
    DeepPartial<ProfileOrderByRelevanceInput>
  >;
  ProfileOrderByWithRelationAndSearchRelevanceInput: ResolverTypeWrapper<
    DeepPartial<ProfileOrderByWithRelationAndSearchRelevanceInput>
  >;
  ProfileRelationFilter: ResolverTypeWrapper<
    DeepPartial<ProfileRelationFilter>
  >;
  ProfileScalarFieldEnum: ResolverTypeWrapper<
    DeepPartial<ProfileScalarFieldEnum>
  >;
  ProfileWhereInput: ResolverTypeWrapper<DeepPartial<ProfileWhereInput>>;
  ProfileWhereUniqueInput: ResolverTypeWrapper<
    DeepPartial<ProfileWhereUniqueInput>
  >;
  Pronouns: ResolverTypeWrapper<DeepPartial<Pronouns>>;
  Query: ResolverTypeWrapper<{}>;
  QueryMode: ResolverTypeWrapper<DeepPartial<QueryMode>>;
  Role: ResolverTypeWrapper<DeepPartial<Role>>;
  Session: ResolverTypeWrapper<DeepPartial<Session>>;
  SessionConnection: ResolverTypeWrapper<DeepPartial<SessionConnection>>;
  SessionCreateManyUserInput: ResolverTypeWrapper<
    DeepPartial<SessionCreateManyUserInput>
  >;
  SessionCreateManyUserInputEnvelope: ResolverTypeWrapper<
    DeepPartial<SessionCreateManyUserInputEnvelope>
  >;
  SessionCreateManyscopesInput: ResolverTypeWrapper<
    DeepPartial<SessionCreateManyscopesInput>
  >;
  SessionCreateNestedManyWithoutUserInput: ResolverTypeWrapper<
    DeepPartial<SessionCreateNestedManyWithoutUserInput>
  >;
  SessionCreateOrConnectWithoutUserInput: ResolverTypeWrapper<
    DeepPartial<SessionCreateOrConnectWithoutUserInput>
  >;
  SessionCreateWithoutUserInput: ResolverTypeWrapper<
    DeepPartial<SessionCreateWithoutUserInput>
  >;
  SessionCreatescopesInput: ResolverTypeWrapper<
    DeepPartial<SessionCreatescopesInput>
  >;
  SessionEdge: ResolverTypeWrapper<DeepPartial<SessionEdge>>;
  SessionListRelationFilter: ResolverTypeWrapper<
    DeepPartial<SessionListRelationFilter>
  >;
  SessionOrderByRelationAggregateInput: ResolverTypeWrapper<
    DeepPartial<SessionOrderByRelationAggregateInput>
  >;
  SessionOrderByRelevanceFieldEnum: ResolverTypeWrapper<
    DeepPartial<SessionOrderByRelevanceFieldEnum>
  >;
  SessionOrderByRelevanceInput: ResolverTypeWrapper<
    DeepPartial<SessionOrderByRelevanceInput>
  >;
  SessionOrderByWithRelationAndSearchRelevanceInput: ResolverTypeWrapper<
    DeepPartial<SessionOrderByWithRelationAndSearchRelevanceInput>
  >;
  SessionScalarFieldEnum: ResolverTypeWrapper<
    DeepPartial<SessionScalarFieldEnum>
  >;
  SessionWhereInput: ResolverTypeWrapper<DeepPartial<SessionWhereInput>>;
  SessionWhereUniqueInput: ResolverTypeWrapper<
    DeepPartial<SessionWhereUniqueInput>
  >;
  SignupInput: ResolverTypeWrapper<DeepPartial<SignupInput>>;
  SortOrder: ResolverTypeWrapper<DeepPartial<SortOrder>>;
  String: ResolverTypeWrapper<DeepPartial<Scalars["String"]>>;
  StringFilter: ResolverTypeWrapper<DeepPartial<StringFilter>>;
  StringNullableFilter: ResolverTypeWrapper<
    DeepPartial<StringNullableFilter>
  >;
  StringNullableListFilter: ResolverTypeWrapper<
    DeepPartial<StringNullableListFilter>
  >;
  Subscription: ResolverTypeWrapper<{}>;
  TypesUnion: DeepPartial<
    | ResolversTypes["Entry"]
    | ResolversTypes["MediaItem"]
    | ResolversTypes["User"]
  >;
  User: ResolverTypeWrapper<DeepPartial<User>>;
  UserConnection: ResolverTypeWrapper<DeepPartial<UserConnection>>;
  UserCount: ResolverTypeWrapper<DeepPartial<UserCount>>;
  UserCreateNestedOneWithoutCategoriesInput: ResolverTypeWrapper<
    DeepPartial<UserCreateNestedOneWithoutCategoriesInput>
  >;
  UserCreateNestedOneWithoutCommentsInput: ResolverTypeWrapper<
    DeepPartial<UserCreateNestedOneWithoutCommentsInput>
  >;
  UserCreateNestedOneWithoutEntriesInput: ResolverTypeWrapper<
    DeepPartial<UserCreateNestedOneWithoutEntriesInput>
  >;
  UserCreateOrConnectWithoutCategoriesInput: ResolverTypeWrapper<
    DeepPartial<UserCreateOrConnectWithoutCategoriesInput>
  >;
  UserCreateOrConnectWithoutCommentsInput: ResolverTypeWrapper<
    DeepPartial<UserCreateOrConnectWithoutCommentsInput>
  >;
  UserCreateOrConnectWithoutEntriesInput: ResolverTypeWrapper<
    DeepPartial<UserCreateOrConnectWithoutEntriesInput>
  >;
  UserCreateWithoutCategoriesInput: ResolverTypeWrapper<
    DeepPartial<UserCreateWithoutCategoriesInput>
  >;
  UserCreateWithoutCommentsInput: ResolverTypeWrapper<
    DeepPartial<UserCreateWithoutCommentsInput>
  >;
  UserCreateWithoutEntriesInput: ResolverTypeWrapper<
    DeepPartial<UserCreateWithoutEntriesInput>
  >;
  UserEdge: ResolverTypeWrapper<DeepPartial<UserEdge>>;
  UserOrderByRelevanceFieldEnum: ResolverTypeWrapper<
    DeepPartial<UserOrderByRelevanceFieldEnum>
  >;
  UserOrderByRelevanceInput: ResolverTypeWrapper<
    DeepPartial<UserOrderByRelevanceInput>
  >;
  UserOrderByWithRelationAndSearchRelevanceInput: ResolverTypeWrapper<
    DeepPartial<UserOrderByWithRelationAndSearchRelevanceInput>
  >;
  UserRelationFilter: ResolverTypeWrapper<DeepPartial<UserRelationFilter>>;
  UserScalarFieldEnum: ResolverTypeWrapper<
    DeepPartial<UserScalarFieldEnum>
  >;
  UserStatus: ResolverTypeWrapper<DeepPartial<UserStatus>>;
  UserWhereInput: ResolverTypeWrapper<DeepPartial<UserWhereInput>>;
  UserWhereUniqueInput: ResolverTypeWrapper<
    DeepPartial<UserWhereUniqueInput>
  >;
  ViewerAuthInfo: ResolverTypeWrapper<DeepPartial<ViewerAuthInfo>>;
  ViewerDetailed: ResolverTypeWrapper<DeepPartial<ViewerDetailed>>;
  ViewerEntriesWhereInput: ResolverTypeWrapper<
    DeepPartial<ViewerEntriesWhereInput>
  >;
  ViewerFieldsPaginated: ResolverTypeWrapper<
    DeepPartial<ViewerFieldsPaginated>
  >;
  ViewerFieldsPaginatedConnection: ResolverTypeWrapper<
    DeepPartial<ViewerFieldsPaginatedConnection>
  >;
  ViewerFieldsPaginatedEdge: ResolverTypeWrapper<
    DeepPartial<ViewerFieldsPaginatedEdge>
  >;
  ViewerFieldsPaginatedInput: ResolverTypeWrapper<
    DeepPartial<ViewerFieldsPaginatedInput>
  >;
  ViewerFieldsSubConnectionInputs: ResolverTypeWrapper<
    DeepPartial<ViewerFieldsSubConnectionInputs>
  >;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Account: DeepPartial<Account>;
  AccountCreateManyUserInput: DeepPartial<AccountCreateManyUserInput>;
  AccountCreateManyUserInputEnvelope: DeepPartial<AccountCreateManyUserInputEnvelope>;
  AccountCreateNestedManyWithoutUserInput: DeepPartial<AccountCreateNestedManyWithoutUserInput>;
  AccountCreateOrConnectWithoutUserInput: DeepPartial<AccountCreateOrConnectWithoutUserInput>;
  AccountCreateWithoutUserInput: DeepPartial<AccountCreateWithoutUserInput>;
  AccountListRelationFilter: DeepPartial<AccountListRelationFilter>;
  AccountOrderByRelationAggregateInput: DeepPartial<AccountOrderByRelationAggregateInput>;
  AccountProviderProviderAccountIdCompoundUniqueInput: DeepPartial<AccountProviderProviderAccountIdCompoundUniqueInput>;
  AccountWhereInput: DeepPartial<AccountWhereInput>;
  AccountWhereUniqueInput: DeepPartial<AccountWhereUniqueInput>;
  Auth: DeepPartial<Auth>;
  AuthDetailed: DeepPartial<AuthDetailed>;
  BaseTypeNodes: DeepPartial<
    Omit<BaseTypeNodes, "nodes"> & {
      nodes: Array<ResolversParentTypes["TypesUnion"]>;
    }
  >;
  BaseTypesEdge: DeepPartial<
    Omit<BaseTypesEdge, "node"> & {
      node: ResolversParentTypes["TypesUnion"];
    }
  >;
  BigInt: DeepPartial<Scalars["BigInt"]>;
  BoolFilter: DeepPartial<BoolFilter>;
  Boolean: DeepPartial<Scalars["Boolean"]>;
  Category: DeepPartial<Category>;
  CategoryConnection: DeepPartial<CategoryConnection>;
  CategoryCount: DeepPartial<CategoryCount>;
  CategoryCreateManyCreatorInput: DeepPartial<CategoryCreateManyCreatorInput>;
  CategoryCreateManyCreatorInputEnvelope: DeepPartial<CategoryCreateManyCreatorInputEnvelope>;
  CategoryCreateNestedManyWithoutCreatorInput: DeepPartial<CategoryCreateNestedManyWithoutCreatorInput>;
  CategoryCreateNestedManyWithoutEntriesInput: DeepPartial<CategoryCreateNestedManyWithoutEntriesInput>;
  CategoryCreateOrConnectWithoutCreatorInput: DeepPartial<CategoryCreateOrConnectWithoutCreatorInput>;
  CategoryCreateOrConnectWithoutEntriesInput: DeepPartial<CategoryCreateOrConnectWithoutEntriesInput>;
  CategoryCreateWithoutCreatorInput: DeepPartial<CategoryCreateWithoutCreatorInput>;
  CategoryCreateWithoutEntriesInput: DeepPartial<CategoryCreateWithoutEntriesInput>;
  CategoryEdge: DeepPartial<CategoryEdge>;
  CategoryListRelationFilter: DeepPartial<CategoryListRelationFilter>;
  CategoryOrderByRelationAggregateInput: DeepPartial<CategoryOrderByRelationAggregateInput>;
  CategoryOrderByRelevanceInput: DeepPartial<CategoryOrderByRelevanceInput>;
  CategoryOrderByWithRelationAndSearchRelevanceInput: DeepPartial<CategoryOrderByWithRelationAndSearchRelevanceInput>;
  CategoryWhereInput: DeepPartial<CategoryWhereInput>;
  CategoryWhereUniqueInput: DeepPartial<CategoryWhereUniqueInput>;
  ChangePasswordInput: DeepPartial<ChangePasswordInput>;
  Comment: DeepPartial<Comment>;
  CommentAuthorIdEntryIdCompoundUniqueInput: DeepPartial<CommentAuthorIdEntryIdCompoundUniqueInput>;
  CommentConnection: DeepPartial<CommentConnection>;
  CommentCreateManyAuthorInput: DeepPartial<CommentCreateManyAuthorInput>;
  CommentCreateManyAuthorInputEnvelope: DeepPartial<CommentCreateManyAuthorInputEnvelope>;
  CommentCreateManyEntryInput: DeepPartial<CommentCreateManyEntryInput>;
  CommentCreateManyEntryInputEnvelope: DeepPartial<CommentCreateManyEntryInputEnvelope>;
  CommentCreateManyreactionsInput: DeepPartial<CommentCreateManyreactionsInput>;
  CommentCreateNestedManyWithoutAuthorInput: DeepPartial<CommentCreateNestedManyWithoutAuthorInput>;
  CommentCreateNestedManyWithoutEntryInput: DeepPartial<CommentCreateNestedManyWithoutEntryInput>;
  CommentCreateOrConnectWithoutAuthorInput: DeepPartial<CommentCreateOrConnectWithoutAuthorInput>;
  CommentCreateOrConnectWithoutEntryInput: DeepPartial<CommentCreateOrConnectWithoutEntryInput>;
  CommentCreateWithoutAuthorInput: DeepPartial<CommentCreateWithoutAuthorInput>;
  CommentCreateWithoutEntryInput: DeepPartial<CommentCreateWithoutEntryInput>;
  CommentCreatereactionsInput: DeepPartial<CommentCreatereactionsInput>;
  CommentEdge: DeepPartial<CommentEdge>;
  CommentListRelationFilter: DeepPartial<CommentListRelationFilter>;
  CommentOrderByRelationAggregateInput: DeepPartial<CommentOrderByRelationAggregateInput>;
  CommentOrderByRelevanceInput: DeepPartial<CommentOrderByRelevanceInput>;
  CommentOrderByWithRelationAndSearchRelevanceInput: DeepPartial<CommentOrderByWithRelationAndSearchRelevanceInput>;
  CommentWhereInput: DeepPartial<CommentWhereInput>;
  CommentWhereUniqueInput: DeepPartial<CommentWhereUniqueInput>;
  Connection: DeepPartial<Connection>;
  ConnectionConnection: DeepPartial<ConnectionConnection>;
  ConnectionCreateManyOwnerInput: DeepPartial<ConnectionCreateManyOwnerInput>;
  ConnectionCreateManyOwnerInputEnvelope: DeepPartial<ConnectionCreateManyOwnerInputEnvelope>;
  ConnectionCreateNestedManyWithoutOwnerInput: DeepPartial<ConnectionCreateNestedManyWithoutOwnerInput>;
  ConnectionCreateOrConnectWithoutOwnerInput: DeepPartial<ConnectionCreateOrConnectWithoutOwnerInput>;
  ConnectionCreateWithoutOwnerInput: DeepPartial<ConnectionCreateWithoutOwnerInput>;
  ConnectionEdge: DeepPartial<ConnectionEdge>;
  ConnectionListRelationFilter: DeepPartial<ConnectionListRelationFilter>;
  ConnectionOrderByRelationAggregateInput: DeepPartial<ConnectionOrderByRelationAggregateInput>;
  ConnectionOrderByRelevanceInput: DeepPartial<ConnectionOrderByRelevanceInput>;
  ConnectionOrderByWithRelationAndSearchRelevanceInput: DeepPartial<ConnectionOrderByWithRelationAndSearchRelevanceInput>;
  ConnectionWhereInput: DeepPartial<ConnectionWhereInput>;
  ConnectionWhereUniqueInput: DeepPartial<ConnectionWhereUniqueInput>;
  ContentNodes: DeepPartial<ContentNodes>;
  CreatNewCommentInput: DeepPartial<CreatNewCommentInput>;
  CreateNewProfileInput: DeepPartial<CreateNewProfileInput>;
  CreateOneProfile: DeepPartial<CreateOneProfile>;
  DateTime: DeepPartial<Scalars["DateTime"]>;
  DateTimeFilter: DeepPartial<DateTimeFilter>;
  DateTimeNullableFilter: DeepPartial<DateTimeNullableFilter>;
  Entry: DeepPartial<Entry>;
  EntryConnection: DeepPartial<EntryConnection>;
  EntryCount: DeepPartial<EntryCount>;
  EntryCreateManyAuthorInput: DeepPartial<EntryCreateManyAuthorInput>;
  EntryCreateManyAuthorInputEnvelope: DeepPartial<EntryCreateManyAuthorInputEnvelope>;
  EntryCreateNestedManyWithoutAuthorInput: DeepPartial<EntryCreateNestedManyWithoutAuthorInput>;
  EntryCreateNestedManyWithoutCategoriesInput: DeepPartial<EntryCreateNestedManyWithoutCategoriesInput>;
  EntryCreateNestedOneWithoutCommentsInput: DeepPartial<EntryCreateNestedOneWithoutCommentsInput>;
  EntryCreateOneInput: DeepPartial<EntryCreateOneInput>;
  EntryCreateOrConnectWithoutAuthorInput: DeepPartial<EntryCreateOrConnectWithoutAuthorInput>;
  EntryCreateOrConnectWithoutCategoriesInput: DeepPartial<EntryCreateOrConnectWithoutCategoriesInput>;
  EntryCreateOrConnectWithoutCommentsInput: DeepPartial<EntryCreateOrConnectWithoutCommentsInput>;
  EntryCreateWithoutAuthorInput: DeepPartial<EntryCreateWithoutAuthorInput>;
  EntryCreateWithoutCategoriesInput: DeepPartial<EntryCreateWithoutCategoriesInput>;
  EntryCreateWithoutCommentsInput: DeepPartial<EntryCreateWithoutCommentsInput>;
  EntryEdge: DeepPartial<EntryEdge>;
  EntryListRelationFilter: DeepPartial<EntryListRelationFilter>;
  EntryOrderByRelationAggregateInput: DeepPartial<EntryOrderByRelationAggregateInput>;
  EntryOrderByRelevanceInput: DeepPartial<EntryOrderByRelevanceInput>;
  EntryOrderByWithRelationAndSearchRelevanceInput: DeepPartial<EntryOrderByWithRelationAndSearchRelevanceInput>;
  EntryRelationFilter: DeepPartial<EntryRelationFilter>;
  EntryWhereInput: DeepPartial<EntryWhereInput>;
  EntryWhereUniqueInput: DeepPartial<EntryWhereUniqueInput>;
  EnumCommentReactionsNullableListFilter: DeepPartial<EnumCommentReactionsNullableListFilter>;
  EnumGenderNullableFilter: DeepPartial<EnumGenderNullableFilter>;
  EnumMediaItemDestinationNullableFilter: DeepPartial<EnumMediaItemDestinationNullableFilter>;
  EnumMimeTypesNullableFilter: DeepPartial<EnumMimeTypesNullableFilter>;
  EnumPronounsNullableFilter: DeepPartial<EnumPronounsNullableFilter>;
  EnumRoleNullableFilter: DeepPartial<EnumRoleNullableFilter>;
  EnumUserStatusNullableFilter: DeepPartial<EnumUserStatusNullableFilter>;
  FindManyCategoriesPaginatedInput: DeepPartial<FindManyCategoriesPaginatedInput>;
  FindManyCommentsPaginatedInput: DeepPartial<FindManyCommentsPaginatedInput>;
  FindManyConnectionsPaginatedInput: DeepPartial<FindManyConnectionsPaginatedInput>;
  FindManyEntriessPaginatedInput: DeepPartial<FindManyEntriessPaginatedInput>;
  FindManyMediaItemsPaginatedInput: DeepPartial<FindManyMediaItemsPaginatedInput>;
  FindManyProfilesPaginatedInput: DeepPartial<FindManyProfilesPaginatedInput>;
  FindManySessionsPaginatedInput: DeepPartial<FindManySessionsPaginatedInput>;
  FindManyUsersPaginatedInput: DeepPartial<FindManyUsersPaginatedInput>;
  FindViewerEntriesPaginatedInput: DeepPartial<FindViewerEntriesPaginatedInput>;
  Float: DeepPartial<Scalars["Float"]>;
  FloatNullableFilter: DeepPartial<FloatNullableFilter>;
  ID: DeepPartial<Scalars["ID"]>;
  Int: DeepPartial<Scalars["Int"]>;
  IntNullableFilter: DeepPartial<IntNullableFilter>;
  JwtDecoded: DeepPartial<JwtDecoded>;
  JwtHeaders: DeepPartial<JwtHeaders>;
  JwtPayload: DeepPartial<JwtPayload>;
  LoginInput: DeepPartial<LoginInput>;
  MediaItem: DeepPartial<MediaItem>;
  MediaItemConnection: DeepPartial<MediaItemConnection>;
  MediaItemCreateManyUserInput: DeepPartial<MediaItemCreateManyUserInput>;
  MediaItemCreateManyUserInputEnvelope: DeepPartial<MediaItemCreateManyUserInputEnvelope>;
  MediaItemCreateNestedManyWithoutUserInput: DeepPartial<MediaItemCreateNestedManyWithoutUserInput>;
  MediaItemCreateOrConnectWithoutUserInput: DeepPartial<MediaItemCreateOrConnectWithoutUserInput>;
  MediaItemCreateWithoutUserInput: DeepPartial<MediaItemCreateWithoutUserInput>;
  MediaItemEdge: DeepPartial<MediaItemEdge>;
  MediaItemListRelationFilter: DeepPartial<MediaItemListRelationFilter>;
  MediaItemNameUserIdCompoundUniqueInput: DeepPartial<MediaItemNameUserIdCompoundUniqueInput>;
  MediaItemOrderByRelationAggregateInput: DeepPartial<MediaItemOrderByRelationAggregateInput>;
  MediaItemOrderByRelevanceInput: DeepPartial<MediaItemOrderByRelevanceInput>;
  MediaItemOrderByWithRelationAndSearchRelevanceInput: DeepPartial<MediaItemOrderByWithRelationAndSearchRelevanceInput>;
  MediaItemWhereInput: DeepPartial<MediaItemWhereInput>;
  MediaItemWhereUniqueInput: DeepPartial<MediaItemWhereUniqueInput>;
  Mutation: {};
  NestedBoolFilter: DeepPartial<NestedBoolFilter>;
  NestedDateTimeFilter: DeepPartial<NestedDateTimeFilter>;
  NestedDateTimeNullableFilter: DeepPartial<NestedDateTimeNullableFilter>;
  NestedEnumGenderNullableFilter: DeepPartial<NestedEnumGenderNullableFilter>;
  NestedEnumMediaItemDestinationNullableFilter: DeepPartial<NestedEnumMediaItemDestinationNullableFilter>;
  NestedEnumMimeTypesNullableFilter: DeepPartial<NestedEnumMimeTypesNullableFilter>;
  NestedEnumPronounsNullableFilter: DeepPartial<NestedEnumPronounsNullableFilter>;
  NestedEnumRoleNullableFilter: DeepPartial<NestedEnumRoleNullableFilter>;
  NestedEnumUserStatusNullableFilter: DeepPartial<NestedEnumUserStatusNullableFilter>;
  NestedFloatNullableFilter: DeepPartial<NestedFloatNullableFilter>;
  NestedIntNullableFilter: DeepPartial<NestedIntNullableFilter>;
  NestedStringFilter: DeepPartial<NestedStringFilter>;
  NestedStringNullableFilter: DeepPartial<NestedStringNullableFilter>;
  Node:
    | ResolversParentTypes["Account"]
    | ResolversParentTypes["Category"]
    | ResolversParentTypes["Comment"]
    | ResolversParentTypes["Connection"]
    | ResolversParentTypes["Entry"]
    | ResolversParentTypes["MediaItem"]
    | ResolversParentTypes["Profile"]
    | ResolversParentTypes["Session"]
    | ResolversParentTypes["User"]
    | ResolversParentTypes["ViewerDetailed"]
    | ResolversParentTypes["ViewerFieldsPaginated"];
  NodeBaseFieldUnion: DeepPartial<
    | ResolversParentTypes["Account"]
    | ResolversParentTypes["Category"]
    | ResolversParentTypes["Comment"]
    | ResolversParentTypes["Connection"]
    | ResolversParentTypes["Entry"]
    | ResolversParentTypes["MediaItem"]
    | ResolversParentTypes["Profile"]
    | ResolversParentTypes["Session"]
    | ResolversParentTypes["User"]
  >;
  NodeUnion: DeepPartial<
    | ResolversParentTypes["CommentConnection"]
    | ResolversParentTypes["EntryConnection"]
    | ResolversParentTypes["MediaItemConnection"]
    | ResolversParentTypes["ProfileConnection"]
    | ResolversParentTypes["SessionConnection"]
    | ResolversParentTypes["UserConnection"]
  >;
  NodeUnionConnection: DeepPartial<NodeUnionConnection>;
  NodeUnionEdge: DeepPartial<
    Omit<NodeUnionEdge, "node"> & {
      node: ResolversParentTypes["NodeUnion"];
    }
  >;
  PageInfo: DeepPartial<PageInfo>;
  PaginationArgsInput: DeepPartial<PaginationArgsInput>;
  PhoneNumber: DeepPartial<Scalars["PhoneNumber"]>;
  Profile: DeepPartial<Profile>;
  ProfileConnection: DeepPartial<ProfileConnection>;
  ProfileCreateNestedOneWithoutUserInput: DeepPartial<ProfileCreateNestedOneWithoutUserInput>;
  ProfileCreateOrConnectWithoutUserInput: DeepPartial<ProfileCreateOrConnectWithoutUserInput>;
  ProfileCreateWithoutUserInput: DeepPartial<ProfileCreateWithoutUserInput>;
  ProfileEdge: DeepPartial<ProfileEdge>;
  ProfileOrderByRelevanceInput: DeepPartial<ProfileOrderByRelevanceInput>;
  ProfileOrderByWithRelationAndSearchRelevanceInput: DeepPartial<ProfileOrderByWithRelationAndSearchRelevanceInput>;
  ProfileRelationFilter: DeepPartial<ProfileRelationFilter>;
  ProfileWhereInput: DeepPartial<ProfileWhereInput>;
  ProfileWhereUniqueInput: DeepPartial<ProfileWhereUniqueInput>;
  Query: {};
  Session: DeepPartial<Session>;
  SessionConnection: DeepPartial<SessionConnection>;
  SessionCreateManyUserInput: DeepPartial<SessionCreateManyUserInput>;
  SessionCreateManyUserInputEnvelope: DeepPartial<SessionCreateManyUserInputEnvelope>;
  SessionCreateManyscopesInput: DeepPartial<SessionCreateManyscopesInput>;
  SessionCreateNestedManyWithoutUserInput: DeepPartial<SessionCreateNestedManyWithoutUserInput>;
  SessionCreateOrConnectWithoutUserInput: DeepPartial<SessionCreateOrConnectWithoutUserInput>;
  SessionCreateWithoutUserInput: DeepPartial<SessionCreateWithoutUserInput>;
  SessionCreatescopesInput: DeepPartial<SessionCreatescopesInput>;
  SessionEdge: DeepPartial<SessionEdge>;
  SessionListRelationFilter: DeepPartial<SessionListRelationFilter>;
  SessionOrderByRelationAggregateInput: DeepPartial<SessionOrderByRelationAggregateInput>;
  SessionOrderByRelevanceInput: DeepPartial<SessionOrderByRelevanceInput>;
  SessionOrderByWithRelationAndSearchRelevanceInput: DeepPartial<SessionOrderByWithRelationAndSearchRelevanceInput>;
  SessionWhereInput: DeepPartial<SessionWhereInput>;
  SessionWhereUniqueInput: DeepPartial<SessionWhereUniqueInput>;
  SignupInput: DeepPartial<SignupInput>;
  String: DeepPartial<Scalars["String"]>;
  StringFilter: DeepPartial<StringFilter>;
  StringNullableFilter: DeepPartial<StringNullableFilter>;
  StringNullableListFilter: DeepPartial<StringNullableListFilter>;
  Subscription: {};
  TypesUnion: DeepPartial<
    | ResolversParentTypes["Entry"]
    | ResolversParentTypes["MediaItem"]
    | ResolversParentTypes["User"]
  >;
  User: DeepPartial<User>;
  UserConnection: DeepPartial<UserConnection>;
  UserCount: DeepPartial<UserCount>;
  UserCreateNestedOneWithoutCategoriesInput: DeepPartial<UserCreateNestedOneWithoutCategoriesInput>;
  UserCreateNestedOneWithoutCommentsInput: DeepPartial<UserCreateNestedOneWithoutCommentsInput>;
  UserCreateNestedOneWithoutEntriesInput: DeepPartial<UserCreateNestedOneWithoutEntriesInput>;
  UserCreateOrConnectWithoutCategoriesInput: DeepPartial<UserCreateOrConnectWithoutCategoriesInput>;
  UserCreateOrConnectWithoutCommentsInput: DeepPartial<UserCreateOrConnectWithoutCommentsInput>;
  UserCreateOrConnectWithoutEntriesInput: DeepPartial<UserCreateOrConnectWithoutEntriesInput>;
  UserCreateWithoutCategoriesInput: DeepPartial<UserCreateWithoutCategoriesInput>;
  UserCreateWithoutCommentsInput: DeepPartial<UserCreateWithoutCommentsInput>;
  UserCreateWithoutEntriesInput: DeepPartial<UserCreateWithoutEntriesInput>;
  UserEdge: DeepPartial<UserEdge>;
  UserOrderByRelevanceInput: DeepPartial<UserOrderByRelevanceInput>;
  UserOrderByWithRelationAndSearchRelevanceInput: DeepPartial<UserOrderByWithRelationAndSearchRelevanceInput>;
  UserRelationFilter: DeepPartial<UserRelationFilter>;
  UserWhereInput: DeepPartial<UserWhereInput>;
  UserWhereUniqueInput: DeepPartial<UserWhereUniqueInput>;
  ViewerAuthInfo: DeepPartial<ViewerAuthInfo>;
  ViewerDetailed: DeepPartial<ViewerDetailed>;
  ViewerEntriesWhereInput: DeepPartial<ViewerEntriesWhereInput>;
  ViewerFieldsPaginated: DeepPartial<ViewerFieldsPaginated>;
  ViewerFieldsPaginatedConnection: DeepPartial<ViewerFieldsPaginatedConnection>;
  ViewerFieldsPaginatedEdge: DeepPartial<ViewerFieldsPaginatedEdge>;
  ViewerFieldsPaginatedInput: DeepPartial<ViewerFieldsPaginatedInput>;
  ViewerFieldsSubConnectionInputs: DeepPartial<ViewerFieldsSubConnectionInputs>;
}>;

export type AccountResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Account"] = ResolversParentTypes["Account"]
> = ResolversObject<{
  access_token?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  expires_at?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  id_token?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  oauth_token?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  oauth_token_secret?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  provider?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  providerAccountId?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  refresh_secret?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  refresh_token?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  scope?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  session_state?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  token_type?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Auth"] = ResolversParentTypes["Auth"]
> = ResolversObject<{
  accessToken?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  refreshToken?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  session?: Resolver<
    Maybe<ResolversTypes["Session"]>,
    ParentType,
    ContextType
  >;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthDetailedResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["AuthDetailed"] = ResolversParentTypes["AuthDetailed"]
> = ResolversObject<{
  auth?: Resolver<Maybe<ResolversTypes["Auth"]>, ParentType, ContextType>;
  jwt?: Resolver<
    Maybe<ResolversTypes["JwtDecoded"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BaseTypeNodesResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["BaseTypeNodes"] = ResolversParentTypes["BaseTypeNodes"]
> = ResolversObject<{
  nodes?: Resolver<
    Array<ResolversTypes["TypesUnion"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BaseTypesEdgeResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["BaseTypesEdge"] = ResolversParentTypes["BaseTypesEdge"]
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["TypesUnion"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["BigInt"], any> {
  name: "BigInt";
}

export type CategoryResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Category"] = ResolversParentTypes["Category"]
> = ResolversObject<{
  _count?: Resolver<
    ResolversTypes["CategoryCount"],
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  creator?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  creatorId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  entries?: Resolver<
    Maybe<Array<ResolversTypes["Entry"]>>,
    ParentType,
    ContextType
  >;
  entryId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryConnectionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["CategoryConnection"] = ResolversParentTypes["CategoryConnection"]
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes["CategoryEdge"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryCountResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["CategoryCount"] = ResolversParentTypes["CategoryCount"]
> = ResolversObject<{
  entries?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryEdgeResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["CategoryEdge"] = ResolversParentTypes["CategoryEdge"]
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["Category"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"]
> = ResolversObject<{
  author?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  authorId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  body?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<
    ResolversTypes["DateTime"],
    ParentType,
    ContextType
  >;
  entry?: Resolver<ResolversTypes["Entry"], ParentType, ContextType>;
  entryId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  position?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  reactions?: Resolver<
    Maybe<Array<ResolversTypes["CommentReactions"]>>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentConnectionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["CommentConnection"] = ResolversParentTypes["CommentConnection"]
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes["CommentEdge"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentEdgeResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["CommentEdge"] = ResolversParentTypes["CommentEdge"]
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["Comment"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConnectionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Connection"] = ResolversParentTypes["Connection"]
> = ResolversObject<{
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  firstName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  ip?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  lastModified?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  lastName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  owner?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  ownerId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  phoneNumber?: Resolver<
    Maybe<ResolversTypes["PhoneNumber"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConnectionConnectionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["ConnectionConnection"] = ResolversParentTypes["ConnectionConnection"]
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes["ConnectionEdge"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConnectionEdgeResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["ConnectionEdge"] = ResolversParentTypes["ConnectionEdge"]
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["Connection"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ContentNodesResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["ContentNodes"] = ResolversParentTypes["ContentNodes"]
> = ResolversObject<{
  contentNodes?: Resolver<
    ResolversTypes["BaseTypeNodes"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type EntryResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Entry"] = ResolversParentTypes["Entry"]
> = ResolversObject<{
  _count?: Resolver<ResolversTypes["EntryCount"], ParentType, ContextType>;
  author?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  authorId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  categories?: Resolver<
    Maybe<Array<ResolversTypes["Category"]>>,
    ParentType,
    ContextType
  >;
  categoryId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<
    Maybe<Array<ResolversTypes["Comment"]>>,
    ParentType,
    ContextType
  >;
  content?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<
    ResolversTypes["DateTime"],
    ParentType,
    ContextType
  >;
  featuredImage?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  published?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  title?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EntryConnectionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["EntryConnection"] = ResolversParentTypes["EntryConnection"]
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes["EntryEdge"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EntryCountResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["EntryCount"] = ResolversParentTypes["EntryCount"]
> = ResolversObject<{
  categories?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  comments?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EntryEdgeResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["EntryEdge"] = ResolversParentTypes["EntryEdge"]
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["Entry"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type JwtDecodedResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["JwtDecoded"] = ResolversParentTypes["JwtDecoded"]
> = ResolversObject<{
  header?: Resolver<ResolversTypes["JwtHeaders"], ParentType, ContextType>;
  payload?: Resolver<
    ResolversTypes["JwtPayload"],
    ParentType,
    ContextType
  >;
  signature?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type JwtHeadersResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["JwtHeaders"] = ResolversParentTypes["JwtHeaders"]
> = ResolversObject<{
  alg?: Resolver<ResolversTypes["AlgorithmType"], ParentType, ContextType>;
  typ?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type JwtPayloadResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["JwtPayload"] = ResolversParentTypes["JwtPayload"]
> = ResolversObject<{
  exp?: Resolver<Maybe<ResolversTypes["BigInt"]>, ParentType, ContextType>;
  iat?: Resolver<Maybe<ResolversTypes["BigInt"]>, ParentType, ContextType>;
  userId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MediaItemResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["MediaItem"] = ResolversParentTypes["MediaItem"]
> = ResolversObject<{
  fileLastModified?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  height?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  quality?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  size?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  src?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  srcSet?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    Maybe<ResolversTypes["MimeTypes"]>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  uploadedAt?: Resolver<
    ResolversTypes["DateTime"],
    ParentType,
    ContextType
  >;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  userId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  width?: Resolver<
    Maybe<ResolversTypes["Float"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MediaItemConnectionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["MediaItemConnection"] = ResolversParentTypes["MediaItemConnection"]
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes["MediaItemEdge"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MediaItemEdgeResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["MediaItemEdge"] = ResolversParentTypes["MediaItemEdge"]
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["MediaItem"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  changePassword?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationchangePasswordArgs, "changePasswordInput">
  >;
  createEntryWithAxios?: Resolver<
    ResolversTypes["Entry"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateEntryWithAxiosArgs, "createNew">
  >;
  createNewComment?: Resolver<
    ResolversTypes["Comment"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateNewCommentArgs, "commentCreateInput">
  >;
  createNewEntry?: Resolver<
    ResolversTypes["Entry"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateNewEntryArgs, "entryCreateInput">
  >;
  createNewProfile?: Resolver<
    ResolversTypes["Profile"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateNewProfileArgs, "createNewProfileInput">
  >;
  nuevoEntry?: Resolver<
    ResolversTypes["Entry"],
    ParentType,
    ContextType,
    RequireFields<MutationnuevoEntryArgs, "nuevoEntry">
  >;
  registerNewUser?: Resolver<
    ResolversTypes["AuthDetailed"],
    ParentType,
    ContextType,
    RequireFields<MutationregisterNewUserArgs, "userCreateInput">
  >;
  signin?: Resolver<
    ResolversTypes["AuthDetailed"],
    ParentType,
    ContextType,
    RequireFields<MutationsigninArgs, "userloginInput">
  >;
  updateUserPassword?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateUserPasswordArgs, "passwordInput">
  >;
}>;

export type NodeResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Node"] = ResolversParentTypes["Node"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    | "Account"
    | "Category"
    | "Comment"
    | "Connection"
    | "Entry"
    | "MediaItem"
    | "Profile"
    | "Session"
    | "User"
    | "ViewerDetailed"
    | "ViewerFieldsPaginated",
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
}>;

export type NodeBaseFieldUnionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["NodeBaseFieldUnion"] = ResolversParentTypes["NodeBaseFieldUnion"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    | "Account"
    | "Category"
    | "Comment"
    | "Connection"
    | "Entry"
    | "MediaItem"
    | "Profile"
    | "Session"
    | "User",
    ParentType,
    ContextType
  >;
}>;

export type NodeUnionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["NodeUnion"] = ResolversParentTypes["NodeUnion"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    | "CommentConnection"
    | "EntryConnection"
    | "MediaItemConnection"
    | "ProfileConnection"
    | "SessionConnection"
    | "UserConnection",
    ParentType,
    ContextType
  >;
}>;

export type NodeUnionConnectionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["NodeUnionConnection"] = ResolversParentTypes["NodeUnionConnection"]
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes["NodeUnionEdge"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NodeUnionEdgeResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["NodeUnionEdge"] = ResolversParentTypes["NodeUnionEdge"]
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["NodeUnion"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PageInfoResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["PageInfo"] = ResolversParentTypes["PageInfo"]
> = ResolversObject<{
  endCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  hasPreviousPage?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  startCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface PhoneNumberScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["PhoneNumber"], any> {
  name: "PhoneNumber";
}

export type ProfileResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Profile"] = ResolversParentTypes["Profile"]
> = ResolversObject<{
  activiyFeed?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  bio?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  city?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  country?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  coverPhoto?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  dob?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  gender?: Resolver<
    Maybe<ResolversTypes["Gender"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  lastSeen?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  memberSince?: Resolver<
    ResolversTypes["DateTime"],
    ParentType,
    ContextType
  >;
  occupation?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  phoneNumber?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  pronouns?: Resolver<
    Maybe<ResolversTypes["Pronouns"]>,
    ParentType,
    ContextType
  >;
  recentActivity?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  userId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  userInProfile?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileConnectionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["ProfileConnection"] = ResolversParentTypes["ProfileConnection"]
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes["ProfileEdge"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileEdgeResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["ProfileEdge"] = ResolversParentTypes["ProfileEdge"]
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["Profile"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  categoryByRelayId?: Resolver<
    ResolversTypes["Category"],
    ParentType,
    ContextType,
    RequireFields<QuerycategoryByRelayIdArgs, "cursor">
  >;
  commentByRelayId?: Resolver<
    ResolversTypes["Comment"],
    ParentType,
    ContextType,
    RequireFields<QuerycommentByRelayIdArgs, "cursor">
  >;
  comprehensiveConnectionUnion?: Resolver<
    Array<ResolversTypes["NodeUnion"]>,
    ParentType,
    ContextType
  >;
  connectionByRelayId?: Resolver<
    ResolversTypes["Connection"],
    ParentType,
    ContextType,
    RequireFields<QueryconnectionByRelayIdArgs, "connectionCursor">
  >;
  contentNodesUnion?: Resolver<
    ResolversTypes["ContentNodes"],
    ParentType,
    ContextType,
    RequireFields<
      QuerycontentNodesUnionArgs,
      "findManyEntriesPaginatedInput"
    >
  >;
  entryById?: Resolver<
    ResolversTypes["Entry"],
    ParentType,
    ContextType,
    RequireFields<QueryentryByIdArgs, "id">
  >;
  entryByRelayId?: Resolver<
    ResolversTypes["Entry"],
    ParentType,
    ContextType,
    RequireFields<QueryentryByRelayIdArgs, "entryCursor">
  >;
  findUniqueMediaItem?: Resolver<
    ResolversTypes["MediaItem"],
    ParentType,
    ContextType,
    RequireFields<QueryfindUniqueMediaItemArgs, "mediaItemId">
  >;
  getUserFromAccessToken?: Resolver<
    ResolversTypes["AuthDetailed"],
    ParentType,
    ContextType,
    RequireFields<QuerygetUserFromAccessTokenArgs, "token">
  >;
  getViewer?: Resolver<
    ResolversTypes["AuthDetailed"],
    ParentType,
    ContextType
  >;
  listCategories?: Resolver<
    ResolversTypes["CategoryConnection"],
    ParentType,
    ContextType,
    RequireFields<
      QuerylistCategoriesArgs,
      "findManyCategoriesPaginatedInput"
    >
  >;
  listComments?: Resolver<
    ResolversTypes["CommentConnection"],
    ParentType,
    ContextType,
    RequireFields<QuerylistCommentsArgs, "findManyCommentsPaginatedInput">
  >;
  listConnections?: Resolver<
    ResolversTypes["ConnectionConnection"],
    ParentType,
    ContextType,
    RequireFields<
      QuerylistConnectionsArgs,
      "findManyConnectionsPaginatedInput"
    >
  >;
  listEntries?: Resolver<
    ResolversTypes["EntryConnection"],
    ParentType,
    ContextType,
    RequireFields<QuerylistEntriesArgs, "findManyEntriesPaginatedInput">
  >;
  listMediaItems?: Resolver<
    ResolversTypes["MediaItemConnection"],
    ParentType,
    ContextType,
    Partial<QuerylistMediaItemsArgs>
  >;
  listProfiles?: Resolver<
    ResolversTypes["ProfileConnection"],
    ParentType,
    ContextType,
    RequireFields<QuerylistProfilesArgs, "profilesArgs">
  >;
  listSessions?: Resolver<
    ResolversTypes["SessionConnection"],
    ParentType,
    ContextType,
    RequireFields<QuerylistSessionsArgs, "findManySessionsPaginatedInput">
  >;
  listUsers?: Resolver<
    ResolversTypes["UserConnection"],
    ParentType,
    ContextType,
    Partial<QuerylistUsersArgs>
  >;
  me?: Resolver<ResolversTypes["AuthDetailed"], ParentType, ContextType>;
  node?: Resolver<
    Maybe<ResolversTypes["Node"]>,
    ParentType,
    ContextType,
    RequireFields<QuerynodeArgs, "id">
  >;
  nodeField?: Resolver<
    Array<ResolversTypes["NodeBaseFieldUnion"]>,
    ParentType,
    ContextType,
    RequireFields<QuerynodeFieldArgs, "cursor">
  >;
  nodeUnionResolver?: Resolver<
    ResolversTypes["NodeUnionConnection"],
    ParentType,
    ContextType,
    RequireFields<
      QuerynodeUnionResolverArgs,
      | "id"
      | "manyComments"
      | "manyEntries"
      | "manyMediaItems"
      | "manyProfiles"
      | "manySessions"
      | "manyUsers"
    >
  >;
  profileByRelayId?: Resolver<
    ResolversTypes["Profile"],
    ParentType,
    ContextType,
    RequireFields<QueryprofileByRelayIdArgs, "cursor">
  >;
  sessionByRelayId?: Resolver<
    ResolversTypes["Session"],
    ParentType,
    ContextType,
    RequireFields<QuerysessionByRelayIdArgs, "cursor">
  >;
  siftEntries?: Resolver<
    ResolversTypes["EntryConnection"],
    ParentType,
    ContextType,
    RequireFields<QuerysiftEntriesArgs, "entryFindManyInput">
  >;
  userById?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<QueryuserByIdArgs, "id">
  >;
  userByRelayId?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<QueryuserByRelayIdArgs, "cursor">
  >;
  viewer?: Resolver<
    ResolversTypes["ViewerDetailed"],
    ParentType,
    ContextType
  >;
  viewerAuthInfoFromContext?: Resolver<
    ResolversTypes["ViewerAuthInfo"],
    ParentType,
    ContextType
  >;
  viewerCommentsPaginated?: Resolver<
    ResolversTypes["CommentConnection"],
    ParentType,
    ContextType,
    RequireFields<
      QueryviewerCommentsPaginatedArgs,
      "viewerCommentsPaginatedInput"
    >
  >;
  viewerEntriesPaginated?: Resolver<
    ResolversTypes["EntryConnection"],
    ParentType,
    ContextType,
    RequireFields<
      QueryviewerEntriesPaginatedArgs,
      "viewerEntriesPaginatedInput"
    >
  >;
  viewerFieldsPaginated?: Resolver<
    ResolversTypes["ViewerFieldsPaginatedConnection"],
    ParentType,
    ContextType,
    RequireFields<
      QueryviewerFieldsPaginatedArgs,
      "viewerFieldsPaginatedInput"
    >
  >;
  viewerMediaItemsPaginated?: Resolver<
    ResolversTypes["MediaItemConnection"],
    ParentType,
    ContextType,
    RequireFields<
      QueryviewerMediaItemsPaginatedArgs,
      "viewerMediaItemsPaginatedInput"
    >
  >;
  viewerProfile?: Resolver<
    ResolversTypes["Profile"],
    ParentType,
    ContextType
  >;
  viewerSessionsPaginated?: Resolver<
    ResolversTypes["SessionConnection"],
    ParentType,
    ContextType,
    RequireFields<
      QueryviewerSessionsPaginatedArgs,
      "viewerSessionssPaginatedInput"
    >
  >;
}>;

export type SessionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Session"] = ResolversParentTypes["Session"]
> = ResolversObject<{
  accessToken?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  alg?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  exp?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  iat?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  lastVerified?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  provider?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  refreshToken?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  scopes?: Resolver<
    Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  signature?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  tokenState?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  userId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SessionConnectionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["SessionConnection"] = ResolversParentTypes["SessionConnection"]
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes["SessionEdge"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SessionEdgeResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["SessionEdge"] = ResolversParentTypes["SessionEdge"]
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["Session"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"]
> = ResolversObject<{
  commentCreated?: SubscriptionResolver<
    ResolversTypes["Comment"],
    "commentCreated",
    ParentType,
    ContextType
  >;
  entryCreated?: SubscriptionResolver<
    ResolversTypes["Entry"],
    "entryCreated",
    ParentType,
    ContextType
  >;
  profileCreated?: SubscriptionResolver<
    ResolversTypes["Profile"],
    "profileCreated",
    ParentType,
    ContextType
  >;
}>;

export type TypesUnionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["TypesUnion"] = ResolversParentTypes["TypesUnion"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    "Entry" | "MediaItem" | "User",
    ParentType,
    ContextType
  >;
}>;

export type UserResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
  _count?: Resolver<ResolversTypes["UserCount"], ParentType, ContextType>;
  accounts?: Resolver<
    Maybe<Array<ResolversTypes["Account"]>>,
    ParentType,
    ContextType
  >;
  categories?: Resolver<
    Maybe<Array<ResolversTypes["Category"]>>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<
    Maybe<Array<ResolversTypes["Comment"]>>,
    ParentType,
    ContextType
  >;
  connections?: Resolver<
    Maybe<Array<ResolversTypes["Connection"]>>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<
    ResolversTypes["DateTime"],
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  emailVerified?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  entries?: Resolver<
    Maybe<Array<ResolversTypes["Entry"]>>,
    ParentType,
    ContextType
  >;
  firstName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  image?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  lastName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  mediaItems?: Resolver<
    Maybe<Array<ResolversTypes["MediaItem"]>>,
    ParentType,
    ContextType
  >;
  password?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  profile?: Resolver<
    Maybe<ResolversTypes["Profile"]>,
    ParentType,
    ContextType
  >;
  role?: Resolver<Maybe<ResolversTypes["Role"]>, ParentType, ContextType>;
  sessions?: Resolver<
    Maybe<Array<ResolversTypes["Session"]>>,
    ParentType,
    ContextType
  >;
  status?: Resolver<ResolversTypes["UserStatus"], ParentType, ContextType>;
  updatedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserConnectionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["UserConnection"] = ResolversParentTypes["UserConnection"]
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes["UserEdge"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserCountResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["UserCount"] = ResolversParentTypes["UserCount"]
> = ResolversObject<{
  accounts?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  categories?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  comments?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  connections?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  entries?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  mediaItems?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  sessions?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserEdgeResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["UserEdge"] = ResolversParentTypes["UserEdge"]
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ViewerAuthInfoResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["ViewerAuthInfo"] = ResolversParentTypes["ViewerAuthInfo"]
> = ResolversObject<{
  accessToken?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  refreshToken?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  viewerJwt?: Resolver<
    ResolversTypes["JwtDecoded"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ViewerDetailedResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["ViewerDetailed"] = ResolversParentTypes["ViewerDetailed"]
> = ResolversObject<{
  _count?: Resolver<ResolversTypes["UserCount"], ParentType, ContextType>;
  accessToken?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  accounts?: Resolver<
    Maybe<Array<ResolversTypes["Account"]>>,
    ParentType,
    ContextType
  >;
  categories?: Resolver<
    Maybe<Array<ResolversTypes["Category"]>>,
    ParentType,
    ContextType
  >;
  comments?: Resolver<
    Maybe<Array<ResolversTypes["Comment"]>>,
    ParentType,
    ContextType
  >;
  connections?: Resolver<
    Maybe<Array<ResolversTypes["Connection"]>>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<
    ResolversTypes["DateTime"],
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  emailVerified?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  entries?: Resolver<
    Maybe<Array<ResolversTypes["Entry"]>>,
    ParentType,
    ContextType
  >;
  firstName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  image?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  lastName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  mediaItems?: Resolver<
    Maybe<Array<ResolversTypes["MediaItem"]>>,
    ParentType,
    ContextType
  >;
  password?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  profile?: Resolver<
    Maybe<ResolversTypes["Profile"]>,
    ParentType,
    ContextType
  >;
  refreshToken?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  role?: Resolver<Maybe<ResolversTypes["Role"]>, ParentType, ContextType>;
  secret?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  sessions?: Resolver<
    Maybe<Array<ResolversTypes["Session"]>>,
    ParentType,
    ContextType
  >;
  status?: Resolver<ResolversTypes["UserStatus"], ParentType, ContextType>;
  updatedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ViewerFieldsPaginatedResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["ViewerFieldsPaginated"] = ResolversParentTypes["ViewerFieldsPaginated"]
> = ResolversObject<{
  _count?: Resolver<ResolversTypes["UserCount"], ParentType, ContextType>;
  commentConnection?: Resolver<
    ResolversTypes["CommentConnection"],
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<
    ResolversTypes["DateTime"],
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  emailVerified?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  entryConnection?: Resolver<
    ResolversTypes["EntryConnection"],
    ParentType,
    ContextType
  >;
  firstName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  image?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  lastName?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  mediaItemConnection?: Resolver<
    ResolversTypes["MediaItemConnection"],
    ParentType,
    ContextType
  >;
  password?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  profile?: Resolver<
    Maybe<ResolversTypes["Profile"]>,
    ParentType,
    ContextType
  >;
  role?: Resolver<Maybe<ResolversTypes["Role"]>, ParentType, ContextType>;
  sessionConnection?: Resolver<
    ResolversTypes["SessionConnection"],
    ParentType,
    ContextType
  >;
  status?: Resolver<ResolversTypes["UserStatus"], ParentType, ContextType>;
  updatedAt?: Resolver<
    Maybe<ResolversTypes["DateTime"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ViewerFieldsPaginatedConnectionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["ViewerFieldsPaginatedConnection"] = ResolversParentTypes["ViewerFieldsPaginatedConnection"]
> = ResolversObject<{
  edges?: Resolver<
    Array<ResolversTypes["ViewerFieldsPaginatedEdge"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ViewerFieldsPaginatedEdgeResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["ViewerFieldsPaginatedEdge"] = ResolversParentTypes["ViewerFieldsPaginatedEdge"]
> = ResolversObject<{
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  node?: Resolver<
    ResolversTypes["ViewerFieldsPaginated"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ResolverContext> = ResolversObject<{
  Account?: AccountResolvers<ContextType>;
  Auth?: AuthResolvers<ContextType>;
  AuthDetailed?: AuthDetailedResolvers<ContextType>;
  BaseTypeNodes?: BaseTypeNodesResolvers<ContextType>;
  BaseTypesEdge?: BaseTypesEdgeResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Category?: CategoryResolvers<ContextType>;
  CategoryConnection?: CategoryConnectionResolvers<ContextType>;
  CategoryCount?: CategoryCountResolvers<ContextType>;
  CategoryEdge?: CategoryEdgeResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  CommentConnection?: CommentConnectionResolvers<ContextType>;
  CommentEdge?: CommentEdgeResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
  ConnectionConnection?: ConnectionConnectionResolvers<ContextType>;
  ConnectionEdge?: ConnectionEdgeResolvers<ContextType>;
  ContentNodes?: ContentNodesResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Entry?: EntryResolvers<ContextType>;
  EntryConnection?: EntryConnectionResolvers<ContextType>;
  EntryCount?: EntryCountResolvers<ContextType>;
  EntryEdge?: EntryEdgeResolvers<ContextType>;
  JwtDecoded?: JwtDecodedResolvers<ContextType>;
  JwtHeaders?: JwtHeadersResolvers<ContextType>;
  JwtPayload?: JwtPayloadResolvers<ContextType>;
  MediaItem?: MediaItemResolvers<ContextType>;
  MediaItemConnection?: MediaItemConnectionResolvers<ContextType>;
  MediaItemEdge?: MediaItemEdgeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  NodeBaseFieldUnion?: NodeBaseFieldUnionResolvers<ContextType>;
  NodeUnion?: NodeUnionResolvers<ContextType>;
  NodeUnionConnection?: NodeUnionConnectionResolvers<ContextType>;
  NodeUnionEdge?: NodeUnionEdgeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PhoneNumber?: GraphQLScalarType;
  Profile?: ProfileResolvers<ContextType>;
  ProfileConnection?: ProfileConnectionResolvers<ContextType>;
  ProfileEdge?: ProfileEdgeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  SessionConnection?: SessionConnectionResolvers<ContextType>;
  SessionEdge?: SessionEdgeResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TypesUnion?: TypesUnionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserCount?: UserCountResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  ViewerAuthInfo?: ViewerAuthInfoResolvers<ContextType>;
  ViewerDetailed?: ViewerDetailedResolvers<ContextType>;
  ViewerFieldsPaginated?: ViewerFieldsPaginatedResolvers<ContextType>;
  ViewerFieldsPaginatedConnection?: ViewerFieldsPaginatedConnectionResolvers<ContextType>;
  ViewerFieldsPaginatedEdge?: ViewerFieldsPaginatedEdgeResolvers<ContextType>;
}>;

export type AccountPartialFragment = {
  __typename: "Account";
  access_token?: string | null;
  expires_at?: number | null;
  id: string;
  id_token?: string | null;
  userId: string;
  oauth_token?: string | null;
  oauth_token_secret?: string | null;
  provider: string;
  providerAccountId: string;
  refresh_secret?: string | null;
  refresh_token?: string | null;
  scope?: string | null;
  session_state?: string | null;
  token_type?: string | null;
  type: string;
};

export type AuthPartialFragment = {
  __typename: "Auth";
  accessToken: string;
  refreshToken: string;
};

export type CategoryCountPartialFragment = {
  __typename: "CategoryCount";
  entries: number;
};

export type CategoryPartialFragment = {
  __typename: "Category";
  createdAt?: Date | null;
  creatorId: string;
  entryId?: string | null;
  id: string;
  name: string;
  updatedAt?: Date | null;
};

export type CategoryConnectionPartialFragment = {
  __typename: "CategoryConnection";
  totalCount: number;
};

export type CategoryEdgePartialFragment = {
  __typename: "CategoryEdge";
  cursor: string;
};

export type CommentPartialFragment = {
  __typename: "Comment";
  body?: string | null;
  updatedAt?: Date | null;
  createdAt: Date;
  entryId?: string | null;
  authorId?: string | null;
  id: string;
  position?: string | null;
  reactions?: Array<CommentReactions> | null;
};

export type CommentEdgePartialFragment = {
  __typename: "CommentEdge";
  cursor: string;
};

export type CommentConnectionPartialFragment = {
  __typename: "CommentConnection";
  totalCount: number;
};

export type ConnectionPartialFragment = {
  __typename: "Connection";
  firstName?: string | null;
  email: string;
  lastName?: string | null;
  id: string;
  ip?: string | null;
  lastModified?: Date | null;
  ownerId?: string | null;
  phoneNumber?: typeof String | null;
};

export type ConnectionConnectionPartialFragment = {
  __typename: "ConnectionConnection";
  totalCount: number;
};

export type ConnectionEdgePartialFragment = {
  __typename: "ConnectionEdge";
  cursor: string;
};

export type EntryCountPartialFragment = {
  __typename: "EntryCount";
  categories: number;
  comments: number;
};

export type EntryPartialFragment = {
  __typename: "Entry";
  authorId?: string | null;
  content?: string | null;
  createdAt: Date;
  featuredImage?: string | null;
  title?: string | null;
  published?: boolean | null;
  id: string;
};

export type EntryConnectionPartialFragment = {
  __typename: "EntryConnection";
  totalCount: number;
};

export type EntryEdgePartialFragment = {
  __typename: "EntryEdge";
  cursor: string;
};

export type JwtDecodedPartialFragment = {
  __typename: "JwtDecoded";
  signature: string;
};

export type JwtHeadersPartialFragment = {
  __typename: "JwtHeaders";
  alg: AlgorithmType;
  typ: string;
};

export type JwtPayloadPartialFragment = {
  __typename: "JwtPayload";
  exp?: typeof GraphQLBigInt | null;
  iat?: typeof GraphQLBigInt | null;
  userId?: string | null;
};

export type MediaItemPartialFragment = {
  __typename: "MediaItem";
  id: string;
  name?: string | null;
  width?: number | null;
  height?: number | null;
  quality?: number | null;
  size?: string | null;
  src?: string | null;
  type?: MimeTypes | null;
  uploadedAt: Date;
  userId?: string | null;
  fileLastModified?: Date | null;
};

export type MediaItemEdgePartialFragment = {
  __typename: "MediaItemEdge";
  cursor: string;
};

export type MediaItemConnectionPartialFragment = {
  __typename: "MediaItemConnection";
  totalCount: number;
};

export type PageInfoPartialFragment = {
  __typename: "PageInfo";
  startCursor?: string | null;
  endCursor?: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ProfileConnectionPartialFragment = {
  __typename: "ProfileConnection";
  totalCount: number;
};

export type ProfileEdgePartialFragment = {
  __typename: "ProfileEdge";
  cursor: string;
};

export type ProfilePartialFragment = {
  __typename: "Profile";
  activiyFeed?: string | null;
  bio?: string | null;
  city?: string | null;
  country?: string | null;
  coverPhoto?: string | null;
  dob?: string | null;
  gender?: Gender | null;
  id: string;
  lastSeen?: Date | null;
  memberSince: Date;
  occupation?: string | null;
  phoneNumber?: string | null;
  pronouns?: Pronouns | null;
  recentActivity?: string | null;
  userId?: string | null;
};

export type SessionPartialFragment = {
  __typename: "Session";
  accessToken?: string | null;
  alg?: string | null;
  exp?: number | null;
  iat?: number | null;
  id: string;
  lastVerified?: Date | null;
  provider?: string | null;
  refreshToken?: string | null;
  scopes?: Array<string> | null;
  signature?: string | null;
  tokenState?: string | null;
  userId?: string | null;
};

export type SessionConnectionPartialFragment = {
  __typename: "SessionConnection";
  totalCount: number;
};

export type SessionEdgePartialFragment = {
  __typename: "SessionEdge";
  cursor: string;
};

export type UserCountPartialFragment = {
  __typename: "UserCount";
  accounts: number;
  categories: number;
  comments: number;
  connections: number;
  mediaItems: number;
  entries: number;
  sessions: number;
};

export type UserPartialFragment = {
  __typename: "User";
  createdAt: Date;
  email: string;
  emailVerified?: Date | null;
  id: string;
  image?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  password: string;
  role?: Role | null;
  status: UserStatus;
  updatedAt?: Date | null;
};

export type UserConnectionPartialFragment = {
  __typename: "UserConnection";
  totalCount: number;
};

export type UserEdgePartialFragment = {
  __typename: "UserEdge";
  cursor: string;
};

export type ViewerAuthInfoPartialFragment = {
  __typename: "ViewerAuthInfo";
  accessToken: string;
  refreshToken: string;
};

export type ViewerFieldsPaginatedConnectionPartialFragment = {
  __typename: "ViewerFieldsPaginatedConnection";
  totalCount: number;
};

export type ViewerFieldsPaginatedEdgePartialFragment = {
  __typename: "ViewerFieldsPaginatedEdge";
  cursor: string;
};

export type ViewerFieldsPaginatedPartialFragment = {
  __typename: "ViewerFieldsPaginated";
  createdAt: Date;
  email: string;
  emailVerified?: Date | null;
  firstName?: string | null;
  lastName?: string | null;
  id: string;
  image?: string | null;
  password: string;
  role?: Role | null;
  status: UserStatus;
  updatedAt?: Date | null;
};

export type ViewerPartialFragment = {
  __typename: "ViewerDetailed";
  id: string;
  accessToken?: string | null;
  createdAt: Date;
  email: string;
  emailVerified?: Date | null;
  firstName?: string | null;
  lastName?: string | null;
  password: string;
  role?: Role | null;
  status: UserStatus;
  updatedAt?: Date | null;
};

export type changePasswordMutationVariables = Exact<{
  changePassword: ChangePasswordInput;
}>;

export type changePasswordMutation = {
  __typename?: "Mutation";
  changePassword: {
    __typename: "User";
    createdAt: Date;
    email: string;
    emailVerified?: Date | null;
    id: string;
    image?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    password: string;
    role?: Role | null;
    status: UserStatus;
    updatedAt?: Date | null;
  };
};

export type createNewCommentMutationVariables = Exact<{
  createNewCommentInput: CreatNewCommentInput;
}>;

export type createNewCommentMutation = {
  __typename?: "Mutation";
  createNewComment: {
    __typename: "Comment";
    body?: string | null;
    updatedAt?: Date | null;
    createdAt: Date;
    entryId?: string | null;
    authorId?: string | null;
    id: string;
    position?: string | null;
    reactions?: Array<CommentReactions> | null;
  };
};

export type createNewProfileMutationVariables = Exact<{
  newProfileInput: CreateOneProfile;
}>;

export type createNewProfileMutation = {
  __typename?: "Mutation";
  createNewProfile: {
    __typename: "Profile";
    activiyFeed?: string | null;
    bio?: string | null;
    city?: string | null;
    country?: string | null;
    coverPhoto?: string | null;
    dob?: string | null;
    gender?: Gender | null;
    id: string;
    lastSeen?: Date | null;
    memberSince: Date;
    occupation?: string | null;
    phoneNumber?: string | null;
    pronouns?: Pronouns | null;
    recentActivity?: string | null;
    userId?: string | null;
  };
};

export type createEntryMutationVariables = Exact<{
  createOneEntry: EntryCreateOneInput;
}>;

export type createEntryMutation = {
  __typename?: "Mutation";
  createNewEntry: {
    __typename: "Entry";
    authorId?: string | null;
    content?: string | null;
    createdAt: Date;
    featuredImage?: string | null;
    title?: string | null;
    published?: boolean | null;
    id: string;
  };
};

export type registerNewUserMutationVariables = Exact<{
  userCreateMutationInput: SignupInput;
}>;

export type registerNewUserMutation = {
  __typename?: "Mutation";
  registerNewUser: {
    __typename?: "AuthDetailed";
    auth?: {
      __typename: "Auth";
      accessToken: string;
      refreshToken: string;
      user: {
        __typename: "User";
        createdAt: Date;
        email: string;
        emailVerified?: Date | null;
        id: string;
        image?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        password: string;
        role?: Role | null;
        status: UserStatus;
        updatedAt?: Date | null;
        _count: {
          __typename: "UserCount";
          accounts: number;
          categories: number;
          comments: number;
          connections: number;
          mediaItems: number;
          entries: number;
          sessions: number;
        };
      };
      session?: {
        __typename: "Session";
        accessToken?: string | null;
        alg?: string | null;
        exp?: number | null;
        iat?: number | null;
        id: string;
        lastVerified?: Date | null;
        provider?: string | null;
        refreshToken?: string | null;
        scopes?: Array<string> | null;
        signature?: string | null;
        tokenState?: string | null;
        userId?: string | null;
      } | null;
    } | null;
    jwt?: {
      __typename: "JwtDecoded";
      signature: string;
      header: {
        __typename: "JwtHeaders";
        alg: AlgorithmType;
        typ: string;
      };
      payload: {
        __typename: "JwtPayload";
        exp?: typeof GraphQLBigInt | null;
        iat?: typeof GraphQLBigInt | null;
        userId?: string | null;
      };
    } | null;
  };
};

export type signInUserMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type signInUserMutation = {
  __typename?: "Mutation";
  signin: {
    __typename: "AuthDetailed";
    auth?: {
      __typename: "Auth";
      accessToken: string;
      refreshToken: string;
      user: {
        __typename: "User";
        createdAt: Date;
        email: string;
        emailVerified?: Date | null;
        id: string;
        image?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        password: string;
        role?: Role | null;
        status: UserStatus;
        updatedAt?: Date | null;
        _count: {
          __typename: "UserCount";
          accounts: number;
          categories: number;
          comments: number;
          connections: number;
          mediaItems: number;
          entries: number;
          sessions: number;
        };
      };
      session?: {
        __typename: "Session";
        accessToken?: string | null;
        alg?: string | null;
        exp?: number | null;
        iat?: number | null;
        id: string;
        lastVerified?: Date | null;
        provider?: string | null;
        refreshToken?: string | null;
        scopes?: Array<string> | null;
        signature?: string | null;
        tokenState?: string | null;
        userId?: string | null;
      } | null;
    } | null;
    jwt?: {
      __typename: "JwtDecoded";
      signature: string;
      header: {
        __typename: "JwtHeaders";
        alg: AlgorithmType;
        typ: string;
      };
      payload: {
        __typename: "JwtPayload";
        exp?: typeof GraphQLBigInt | null;
        iat?: typeof GraphQLBigInt | null;
        userId?: string | null;
      };
    } | null;
  };
};

export type categoryByEncodedCursorQueryVariables = Exact<{
  categoryCursor: Scalars["String"];
}>;

export type categoryByEncodedCursorQuery = {
  __typename?: "Query";
  categoryByRelayId: {
    __typename: "Category";
    createdAt?: Date | null;
    creatorId: string;
    entryId?: string | null;
    id: string;
    name: string;
    updatedAt?: Date | null;
  };
};

export type commentByEncodedCursorQueryVariables = Exact<{
  commentCursor: Scalars["String"];
}>;

export type commentByEncodedCursorQuery = {
  __typename?: "Query";
  commentByRelayId: {
    __typename: "Comment";
    body?: string | null;
    updatedAt?: Date | null;
    createdAt: Date;
    entryId?: string | null;
    authorId?: string | null;
    id: string;
    position?: string | null;
    reactions?: Array<CommentReactions> | null;
  };
};

export type connectionByEncodedCursorQueryVariables = Exact<{
  connectionCursor: Scalars["String"];
}>;

export type connectionByEncodedCursorQuery = {
  __typename?: "Query";
  connectionByRelayId: {
    __typename: "Connection";
    firstName?: string | null;
    email: string;
    lastName?: string | null;
    id: string;
    ip?: string | null;
    lastModified?: Date | null;
    ownerId?: string | null;
    phoneNumber?: typeof String | null;
  };
};

export type entryByEncodedCursorQueryVariables = Exact<{
  entryCursor: Scalars["String"];
}>;

export type entryByEncodedCursorQuery = {
  __typename?: "Query";
  entryByRelayId: {
    __typename: "Entry";
    authorId?: string | null;
    content?: string | null;
    createdAt: Date;
    featuredImage?: string | null;
    title?: string | null;
    published?: boolean | null;
    id: string;
  };
};

export type deriveUserDetailsFromTokenQueryVariables = Exact<{
  [key: string]: never;
}>;

export type deriveUserDetailsFromTokenQuery = {
  __typename: "Query";
  getViewer: {
    __typename: "AuthDetailed";
    auth?: {
      __typename: "Auth";
      accessToken: string;
      refreshToken: string;
      session?: {
        __typename: "Session";
        accessToken?: string | null;
        alg?: string | null;
        exp?: number | null;
        iat?: number | null;
        id: string;
        lastVerified?: Date | null;
        provider?: string | null;
        refreshToken?: string | null;
        scopes?: Array<string> | null;
        signature?: string | null;
        tokenState?: string | null;
        userId?: string | null;
      } | null;
      user: {
        __typename: "User";
        createdAt: Date;
        email: string;
        emailVerified?: Date | null;
        id: string;
        image?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        password: string;
        role?: Role | null;
        status: UserStatus;
        updatedAt?: Date | null;
        _count: {
          __typename: "UserCount";
          accounts: number;
          categories: number;
          comments: number;
          connections: number;
          mediaItems: number;
          entries: number;
          sessions: number;
        };
      };
    } | null;
    jwt?: {
      __typename: "JwtDecoded";
      signature: string;
      header: {
        __typename: "JwtHeaders";
        alg: AlgorithmType;
        typ: string;
      };
      payload: {
        __typename: "JwtPayload";
        exp?: typeof GraphQLBigInt | null;
        iat?: typeof GraphQLBigInt | null;
        userId?: string | null;
      };
    } | null;
  };
};

export type listCategoriesQueryVariables = Exact<{
  findManyCategoriesInput: FindManyCategoriesPaginatedInput;
}>;

export type listCategoriesQuery = {
  __typename?: "Query";
  listCategories: {
    __typename: "CategoryConnection";
    totalCount: number;
    pageInfo: {
      __typename: "PageInfo";
      startCursor?: string | null;
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename: "CategoryEdge";
      cursor: string;
      node: {
        __typename: "Category";
        createdAt?: Date | null;
        creatorId: string;
        entryId?: string | null;
        id: string;
        name: string;
        updatedAt?: Date | null;
        creator: {
          __typename: "User";
          createdAt: Date;
          email: string;
          emailVerified?: Date | null;
          id: string;
          image?: string | null;
          firstName?: string | null;
          lastName?: string | null;
          password: string;
          role?: Role | null;
          status: UserStatus;
          updatedAt?: Date | null;
        };
        entries?: Array<{
          __typename: "Entry";
          authorId?: string | null;
          content?: string | null;
          createdAt: Date;
          featuredImage?: string | null;
          title?: string | null;
          published?: boolean | null;
          id: string;
        }> | null;
        _count: { __typename: "CategoryCount"; entries: number };
      };
    }>;
  };
};

export type listCommentsQueryVariables = Exact<{
  findManyCommentsInput: FindManyCommentsPaginatedInput;
}>;

export type listCommentsQuery = {
  __typename?: "Query";
  listComments: {
    __typename: "CommentConnection";
    totalCount: number;
    pageInfo: {
      __typename: "PageInfo";
      startCursor?: string | null;
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename: "CommentEdge";
      cursor: string;
      node: {
        __typename: "Comment";
        body?: string | null;
        updatedAt?: Date | null;
        createdAt: Date;
        entryId?: string | null;
        authorId?: string | null;
        id: string;
        position?: string | null;
        reactions?: Array<CommentReactions> | null;
        author: {
          __typename: "User";
          createdAt: Date;
          email: string;
          emailVerified?: Date | null;
          id: string;
          image?: string | null;
          firstName?: string | null;
          lastName?: string | null;
          password: string;
          role?: Role | null;
          status: UserStatus;
          updatedAt?: Date | null;
        };
        entry: {
          __typename: "Entry";
          authorId?: string | null;
          content?: string | null;
          createdAt: Date;
          featuredImage?: string | null;
          title?: string | null;
          published?: boolean | null;
          id: string;
        };
      };
    }>;
  };
};

export type listConnectionsQueryVariables = Exact<{
  findManyConnectionsInput: FindManyConnectionsPaginatedInput;
}>;

export type listConnectionsQuery = {
  __typename?: "Query";
  listConnections: {
    __typename: "ConnectionConnection";
    totalCount: number;
    pageInfo: {
      __typename: "PageInfo";
      startCursor?: string | null;
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename: "ConnectionEdge";
      cursor: string;
      node: {
        __typename: "Connection";
        firstName?: string | null;
        email: string;
        lastName?: string | null;
        id: string;
        ip?: string | null;
        lastModified?: Date | null;
        ownerId?: string | null;
        phoneNumber?: typeof String | null;
      };
    }>;
  };
};

export type listEntriesQueryVariables = Exact<{
  findManyEntriesInput: FindManyEntriessPaginatedInput;
}>;

export type listEntriesQuery = {
  __typename?: "Query";
  listEntries: {
    __typename: "EntryConnection";
    totalCount: number;
    pageInfo: {
      __typename: "PageInfo";
      startCursor?: string | null;
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename: "EntryEdge";
      cursor: string;
      node: {
        __typename: "Entry";
        authorId?: string | null;
        content?: string | null;
        createdAt: Date;
        featuredImage?: string | null;
        title?: string | null;
        published?: boolean | null;
        id: string;
        _count: {
          __typename: "EntryCount";
          categories: number;
          comments: number;
        };
        author: {
          __typename: "User";
          createdAt: Date;
          email: string;
          emailVerified?: Date | null;
          id: string;
          image?: string | null;
          firstName?: string | null;
          lastName?: string | null;
          password: string;
          role?: Role | null;
          status: UserStatus;
          updatedAt?: Date | null;
        };
        comments?: Array<{
          __typename: "Comment";
          body?: string | null;
          updatedAt?: Date | null;
          createdAt: Date;
          entryId?: string | null;
          authorId?: string | null;
          id: string;
          position?: string | null;
          reactions?: Array<CommentReactions> | null;
        }> | null;
      };
    }>;
  };
};

export type listMediaItemsQueryVariables = Exact<{
  findManyMediaItemsPaginated: FindManyMediaItemsPaginatedInput;
}>;

export type listMediaItemsQuery = {
  __typename?: "Query";
  listMediaItems: {
    __typename: "MediaItemConnection";
    totalCount: number;
    pageInfo: {
      __typename: "PageInfo";
      startCursor?: string | null;
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename: "MediaItemEdge";
      cursor: string;
      node: {
        __typename: "MediaItem";
        id: string;
        name?: string | null;
        width?: number | null;
        height?: number | null;
        quality?: number | null;
        size?: string | null;
        src?: string | null;
        type?: MimeTypes | null;
        uploadedAt: Date;
        userId?: string | null;
        fileLastModified?: Date | null;
      };
    }>;
  };
};

export type listProfilesQueryVariables = Exact<{
  findManyProfilesInput: FindManyProfilesPaginatedInput;
}>;

export type listProfilesQuery = {
  __typename?: "Query";
  listProfiles: {
    __typename: "ProfileConnection";
    totalCount: number;
    pageInfo: {
      __typename: "PageInfo";
      startCursor?: string | null;
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename: "ProfileEdge";
      cursor: string;
      node: {
        __typename: "Profile";
        activiyFeed?: string | null;
        bio?: string | null;
        city?: string | null;
        country?: string | null;
        coverPhoto?: string | null;
        dob?: string | null;
        gender?: Gender | null;
        id: string;
        lastSeen?: Date | null;
        memberSince: Date;
        occupation?: string | null;
        phoneNumber?: string | null;
        pronouns?: Pronouns | null;
        recentActivity?: string | null;
        userId?: string | null;
        user: {
          __typename: "User";
          createdAt: Date;
          email: string;
          emailVerified?: Date | null;
          id: string;
          image?: string | null;
          firstName?: string | null;
          lastName?: string | null;
          password: string;
          role?: Role | null;
          status: UserStatus;
          updatedAt?: Date | null;
          _count: {
            __typename: "UserCount";
            accounts: number;
            categories: number;
            comments: number;
            connections: number;
            mediaItems: number;
            entries: number;
            sessions: number;
          };
        };
      };
    }>;
  };
};

export type listSessionsQueryVariables = Exact<{
  findManySessionsInput: FindManySessionsPaginatedInput;
}>;

export type listSessionsQuery = {
  __typename?: "Query";
  listSessions: {
    __typename: "SessionConnection";
    totalCount: number;
    pageInfo: {
      __typename: "PageInfo";
      startCursor?: string | null;
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename: "SessionEdge";
      cursor: string;
      node: {
        __typename: "Session";
        accessToken?: string | null;
        alg?: string | null;
        exp?: number | null;
        iat?: number | null;
        id: string;
        lastVerified?: Date | null;
        provider?: string | null;
        refreshToken?: string | null;
        scopes?: Array<string> | null;
        signature?: string | null;
        tokenState?: string | null;
        userId?: string | null;
        user?: {
          __typename: "User";
          createdAt: Date;
          email: string;
          emailVerified?: Date | null;
          id: string;
          image?: string | null;
          firstName?: string | null;
          lastName?: string | null;
          password: string;
          role?: Role | null;
          status: UserStatus;
          updatedAt?: Date | null;
          _count: {
            __typename: "UserCount";
            accounts: number;
            categories: number;
            comments: number;
            connections: number;
            mediaItems: number;
            entries: number;
            sessions: number;
          };
        } | null;
      };
    }>;
  };
};

export type allUsersQueryVariables = Exact<{
  findManyUsersPaginatedInput?: InputMaybe<FindManyUsersPaginatedInput>;
}>;

export type allUsersQuery = {
  __typename?: "Query";
  listUsers: {
    __typename: "UserConnection";
    totalCount: number;
    pageInfo: {
      __typename: "PageInfo";
      startCursor?: string | null;
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename: "UserEdge";
      cursor: string;
      node: {
        __typename: "User";
        createdAt: Date;
        email: string;
        emailVerified?: Date | null;
        id: string;
        image?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        password: string;
        role?: Role | null;
        status: UserStatus;
        updatedAt?: Date | null;
        profile?: {
          __typename: "Profile";
          activiyFeed?: string | null;
          bio?: string | null;
          city?: string | null;
          country?: string | null;
          coverPhoto?: string | null;
          dob?: string | null;
          gender?: Gender | null;
          id: string;
          lastSeen?: Date | null;
          memberSince: Date;
          occupation?: string | null;
          phoneNumber?: string | null;
          pronouns?: Pronouns | null;
          recentActivity?: string | null;
          userId?: string | null;
        } | null;
        mediaItems?: Array<{
          __typename: "MediaItem";
          id: string;
          name?: string | null;
          width?: number | null;
          height?: number | null;
          quality?: number | null;
          size?: string | null;
          src?: string | null;
          type?: MimeTypes | null;
          uploadedAt: Date;
          userId?: string | null;
          fileLastModified?: Date | null;
        }> | null;
        entries?: Array<{
          __typename: "Entry";
          authorId?: string | null;
          content?: string | null;
          createdAt: Date;
          featuredImage?: string | null;
          title?: string | null;
          published?: boolean | null;
          id: string;
        }> | null;
        _count: {
          __typename: "UserCount";
          accounts: number;
          categories: number;
          comments: number;
          connections: number;
          mediaItems: number;
          entries: number;
          sessions: number;
        };
      };
    }>;
  };
};

export type profileByEncodedCursorQueryVariables = Exact<{
  profileCursor: Scalars["String"];
}>;

export type profileByEncodedCursorQuery = {
  __typename?: "Query";
  profileByRelayId: {
    __typename: "Profile";
    activiyFeed?: string | null;
    bio?: string | null;
    city?: string | null;
    country?: string | null;
    coverPhoto?: string | null;
    dob?: string | null;
    gender?: Gender | null;
    id: string;
    lastSeen?: Date | null;
    memberSince: Date;
    occupation?: string | null;
    phoneNumber?: string | null;
    pronouns?: Pronouns | null;
    recentActivity?: string | null;
    userId?: string | null;
  };
};

export type sessionByEncodedCursorQueryVariables = Exact<{
  sessionCursor: Scalars["String"];
}>;

export type sessionByEncodedCursorQuery = {
  __typename?: "Query";
  sessionByRelayId: {
    __typename: "Session";
    accessToken?: string | null;
    alg?: string | null;
    exp?: number | null;
    iat?: number | null;
    id: string;
    lastVerified?: Date | null;
    provider?: string | null;
    refreshToken?: string | null;
    scopes?: Array<string> | null;
    signature?: string | null;
    tokenState?: string | null;
    userId?: string | null;
  };
};

export type userByEncodedCursorQueryVariables = Exact<{
  userCursor: Scalars["String"];
}>;

export type userByEncodedCursorQuery = {
  __typename?: "Query";
  userByRelayId: {
    __typename: "User";
    createdAt: Date;
    email: string;
    emailVerified?: Date | null;
    id: string;
    image?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    password: string;
    role?: Role | null;
    status: UserStatus;
    updatedAt?: Date | null;
  };
};

export type userDecodedFromTokenQueryVariables = Exact<{
  accessToken: Scalars["String"];
}>;

export type userDecodedFromTokenQuery = {
  __typename?: "Query";
  getUserFromAccessToken: {
    __typename: "AuthDetailed";
    auth?: {
      __typename: "Auth";
      accessToken: string;
      refreshToken: string;
      session?: {
        __typename: "Session";
        accessToken?: string | null;
        alg?: string | null;
        exp?: number | null;
        iat?: number | null;
        id: string;
        lastVerified?: Date | null;
        provider?: string | null;
        refreshToken?: string | null;
        scopes?: Array<string> | null;
        signature?: string | null;
        tokenState?: string | null;
        userId?: string | null;
      } | null;
      user: {
        __typename: "User";
        createdAt: Date;
        email: string;
        emailVerified?: Date | null;
        id: string;
        image?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        password: string;
        role?: Role | null;
        status: UserStatus;
        updatedAt?: Date | null;
        _count: {
          __typename: "UserCount";
          accounts: number;
          categories: number;
          comments: number;
          connections: number;
          mediaItems: number;
          entries: number;
          sessions: number;
        };
      };
    } | null;
    jwt?: {
      __typename: "JwtDecoded";
      signature: string;
      header: {
        __typename: "JwtHeaders";
        alg: AlgorithmType;
        typ: string;
      };
      payload: {
        __typename: "JwtPayload";
        exp?: typeof GraphQLBigInt | null;
        iat?: typeof GraphQLBigInt | null;
        userId?: string | null;
      };
    } | null;
  };
};

export type viewerCommentsViaContextQueryVariables = Exact<{
  viewerCommentsInput: FindManyCommentsPaginatedInput;
}>;

export type viewerCommentsViaContextQuery = {
  __typename?: "Query";
  viewerCommentsPaginated: {
    __typename: "CommentConnection";
    totalCount: number;
    pageInfo: {
      __typename: "PageInfo";
      startCursor?: string | null;
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename: "CommentEdge";
      cursor: string;
      node: {
        __typename: "Comment";
        body?: string | null;
        updatedAt?: Date | null;
        createdAt: Date;
        entryId?: string | null;
        authorId?: string | null;
        id: string;
        position?: string | null;
        reactions?: Array<CommentReactions> | null;
        author: {
          __typename: "User";
          createdAt: Date;
          email: string;
          emailVerified?: Date | null;
          id: string;
          image?: string | null;
          firstName?: string | null;
          lastName?: string | null;
          password: string;
          role?: Role | null;
          status: UserStatus;
          updatedAt?: Date | null;
          _count: {
            __typename: "UserCount";
            accounts: number;
            categories: number;
            comments: number;
            connections: number;
            mediaItems: number;
            entries: number;
            sessions: number;
          };
        };
      };
    }>;
  };
};

export type viewerEntriesViaContextQueryVariables = Exact<{
  findViewerEntriesPaginatedInput: FindViewerEntriesPaginatedInput;
}>;

export type viewerEntriesViaContextQuery = {
  __typename?: "Query";
  viewerEntriesPaginated: {
    __typename: "EntryConnection";
    totalCount: number;
    pageInfo: {
      __typename: "PageInfo";
      startCursor?: string | null;
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename: "EntryEdge";
      cursor: string;
      node: {
        __typename: "Entry";
        authorId?: string | null;
        content?: string | null;
        createdAt: Date;
        featuredImage?: string | null;
        title?: string | null;
        published?: boolean | null;
        id: string;
        _count: {
          __typename: "EntryCount";
          categories: number;
          comments: number;
        };
      };
    }>;
  };
};

export type viewerFieldsConnectionViaContextQueryVariables = Exact<{
  viewerFieldsPaginatedInput: ViewerFieldsPaginatedInput;
}>;

export type viewerFieldsConnectionViaContextQuery = {
  __typename?: "Query";
  viewerFieldsPaginated: {
    __typename: "ViewerFieldsPaginatedConnection";
    totalCount: number;
    pageInfo: {
      __typename: "PageInfo";
      startCursor?: string | null;
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename: "ViewerFieldsPaginatedEdge";
      cursor: string;
      node: {
        __typename: "ViewerFieldsPaginated";
        createdAt: Date;
        email: string;
        emailVerified?: Date | null;
        firstName?: string | null;
        lastName?: string | null;
        id: string;
        image?: string | null;
        password: string;
        role?: Role | null;
        status: UserStatus;
        updatedAt?: Date | null;
        _count: {
          __typename: "UserCount";
          accounts: number;
          categories: number;
          comments: number;
          connections: number;
          mediaItems: number;
          entries: number;
          sessions: number;
        };
        profile?: {
          __typename: "Profile";
          activiyFeed?: string | null;
          bio?: string | null;
          city?: string | null;
          country?: string | null;
          coverPhoto?: string | null;
          dob?: string | null;
          gender?: Gender | null;
          id: string;
          lastSeen?: Date | null;
          memberSince: Date;
          occupation?: string | null;
          phoneNumber?: string | null;
          pronouns?: Pronouns | null;
          recentActivity?: string | null;
          userId?: string | null;
        } | null;
        commentConnection: {
          __typename: "CommentConnection";
          totalCount: number;
          pageInfo: {
            __typename: "PageInfo";
            startCursor?: string | null;
            endCursor?: string | null;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
          };
          edges: Array<{
            __typename: "CommentEdge";
            cursor: string;
            node: {
              __typename: "Comment";
              body?: string | null;
              updatedAt?: Date | null;
              createdAt: Date;
              entryId?: string | null;
              authorId?: string | null;
              id: string;
              position?: string | null;
              reactions?: Array<CommentReactions> | null;
            };
          }>;
        };
        entryConnection: {
          __typename: "EntryConnection";
          totalCount: number;
          pageInfo: {
            __typename: "PageInfo";
            startCursor?: string | null;
            endCursor?: string | null;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
          };
          edges: Array<{
            __typename: "EntryEdge";
            cursor: string;
            node: {
              __typename: "Entry";
              authorId?: string | null;
              content?: string | null;
              createdAt: Date;
              featuredImage?: string | null;
              title?: string | null;
              published?: boolean | null;
              id: string;
              _count: {
                __typename: "EntryCount";
                categories: number;
                comments: number;
              };
            };
          }>;
        };
        sessionConnection: {
          __typename: "SessionConnection";
          totalCount: number;
          pageInfo: {
            __typename: "PageInfo";
            startCursor?: string | null;
            endCursor?: string | null;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
          };
          edges: Array<{
            __typename: "SessionEdge";
            cursor: string;
            node: {
              __typename: "Session";
              accessToken?: string | null;
              alg?: string | null;
              exp?: number | null;
              iat?: number | null;
              id: string;
              lastVerified?: Date | null;
              provider?: string | null;
              refreshToken?: string | null;
              scopes?: Array<string> | null;
              signature?: string | null;
              tokenState?: string | null;
              userId?: string | null;
            };
          }>;
        };
      };
    }>;
  };
};

export type viewerAuthFromContextQueryVariables = Exact<{
  [key: string]: never;
}>;

export type viewerAuthFromContextQuery = {
  __typename?: "Query";
  viewerAuthInfoFromContext: {
    __typename: "ViewerAuthInfo";
    accessToken: string;
    refreshToken: string;
    viewerJwt: {
      __typename: "JwtDecoded";
      signature: string;
      header: {
        __typename: "JwtHeaders";
        alg: AlgorithmType;
        typ: string;
      };
      payload: {
        __typename: "JwtPayload";
        exp?: typeof GraphQLBigInt | null;
        iat?: typeof GraphQLBigInt | null;
        userId?: string | null;
      };
    };
  };
};

export type viewerProfileViaContextQueryVariables = Exact<{
  [key: string]: never;
}>;

export type viewerProfileViaContextQuery = {
  __typename?: "Query";
  viewerProfile: {
    __typename: "Profile";
    activiyFeed?: string | null;
    bio?: string | null;
    city?: string | null;
    country?: string | null;
    coverPhoto?: string | null;
    dob?: string | null;
    gender?: Gender | null;
    id: string;
    lastSeen?: Date | null;
    memberSince: Date;
    occupation?: string | null;
    phoneNumber?: string | null;
    pronouns?: Pronouns | null;
    recentActivity?: string | null;
    userId?: string | null;
    user: {
      __typename: "User";
      createdAt: Date;
      email: string;
      emailVerified?: Date | null;
      id: string;
      image?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      password: string;
      role?: Role | null;
      status: UserStatus;
      updatedAt?: Date | null;
    };
  };
};

export type viewerSessionsViaContextQueryVariables = Exact<{
  findManySessionsInput: FindManySessionsPaginatedInput;
}>;

export type viewerSessionsViaContextQuery = {
  __typename?: "Query";
  viewerSessionsPaginated: {
    __typename: "SessionConnection";
    totalCount: number;
    pageInfo: {
      __typename: "PageInfo";
      startCursor?: string | null;
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename: "SessionEdge";
      cursor: string;
      node: {
        __typename: "Session";
        accessToken?: string | null;
        alg?: string | null;
        exp?: number | null;
        iat?: number | null;
        id: string;
        lastVerified?: Date | null;
        provider?: string | null;
        refreshToken?: string | null;
        scopes?: Array<string> | null;
        signature?: string | null;
        tokenState?: string | null;
        userId?: string | null;
      };
    }>;
  };
};

export type ViewerQueryVariables = Exact<{ [key: string]: never }>;

export type ViewerQuery = {
  __typename?: "Query";
  me: {
    __typename: "AuthDetailed";
    auth?: {
      __typename: "Auth";
      accessToken: string;
      refreshToken: string;
      user: {
        __typename: "User";
        createdAt: Date;
        email: string;
        emailVerified?: Date | null;
        id: string;
        image?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        password: string;
        role?: Role | null;
        status: UserStatus;
        updatedAt?: Date | null;
        entries?: Array<{
          __typename: "Entry";
          authorId?: string | null;
          content?: string | null;
          createdAt: Date;
          featuredImage?: string | null;
          title?: string | null;
          published?: boolean | null;
          id: string;
          comments?: Array<{
            __typename: "Comment";
            body?: string | null;
            updatedAt?: Date | null;
            createdAt: Date;
            entryId?: string | null;
            authorId?: string | null;
            id: string;
            position?: string | null;
            reactions?: Array<CommentReactions> | null;
          }> | null;
        }> | null;
      };
      session?: {
        __typename: "Session";
        accessToken?: string | null;
        alg?: string | null;
        exp?: number | null;
        iat?: number | null;
        id: string;
        lastVerified?: Date | null;
        provider?: string | null;
        refreshToken?: string | null;
        scopes?: Array<string> | null;
        signature?: string | null;
        tokenState?: string | null;
        userId?: string | null;
      } | null;
    } | null;
    jwt?: {
      __typename: "JwtDecoded";
      signature: string;
      header: {
        __typename: "JwtHeaders";
        alg: AlgorithmType;
        typ: string;
      };
      payload: {
        __typename: "JwtPayload";
        exp?: typeof GraphQLBigInt | null;
        iat?: typeof GraphQLBigInt | null;
        userId?: string | null;
      };
    } | null;
  };
};

export const AccountPartialFragmentDoc = gql`
  fragment AccountPartial on Account {
    access_token
    expires_at
    id
    id_token
    userId
    oauth_token
    oauth_token_secret
    provider
    providerAccountId
    refresh_secret
    refresh_token
    scope
    session_state
    token_type
    type
    __typename
  }
`;
export const AuthPartialFragmentDoc = gql`
  fragment AuthPartial on Auth {
    accessToken
    refreshToken
    __typename
  }
`;
export const CategoryCountPartialFragmentDoc = gql`
  fragment CategoryCountPartial on CategoryCount {
    __typename
    entries
  }
`;
export const CategoryPartialFragmentDoc = gql`
  fragment CategoryPartial on Category {
    createdAt
    creatorId
    entryId
    id
    name
    updatedAt
    __typename
  }
`;
export const CategoryConnectionPartialFragmentDoc = gql`
  fragment CategoryConnectionPartial on CategoryConnection {
    __typename
    totalCount
  }
`;
export const CategoryEdgePartialFragmentDoc = gql`
  fragment CategoryEdgePartial on CategoryEdge {
    __typename
    cursor
  }
`;
export const CommentPartialFragmentDoc = gql`
  fragment CommentPartial on Comment {
    __typename
    body
    updatedAt
    createdAt
    entryId
    authorId
    id
    position
    reactions
  }
`;
export const CommentEdgePartialFragmentDoc = gql`
  fragment CommentEdgePartial on CommentEdge {
    __typename
    cursor
  }
`;
export const CommentConnectionPartialFragmentDoc = gql`
  fragment CommentConnectionPartial on CommentConnection {
    __typename
    totalCount
  }
`;
export const ConnectionPartialFragmentDoc = gql`
  fragment ConnectionPartial on Connection {
    firstName
    email
    firstName
    lastName
    id
    ip
    lastModified
    lastName
    ownerId
    phoneNumber
    __typename
  }
`;
export const ConnectionConnectionPartialFragmentDoc = gql`
  fragment ConnectionConnectionPartial on ConnectionConnection {
    __typename
    totalCount
  }
`;
export const ConnectionEdgePartialFragmentDoc = gql`
  fragment ConnectionEdgePartial on ConnectionEdge {
    __typename
    cursor
  }
`;
export const EntryCountPartialFragmentDoc = gql`
  fragment EntryCountPartial on EntryCount {
    categories
    comments
    __typename
  }
`;
export const EntryPartialFragmentDoc = gql`
  fragment EntryPartial on Entry {
    authorId
    content
    createdAt
    featuredImage
    title
    published
    id
    __typename
  }
`;
export const EntryConnectionPartialFragmentDoc = gql`
  fragment EntryConnectionPartial on EntryConnection {
    totalCount
    __typename
  }
`;
export const EntryEdgePartialFragmentDoc = gql`
  fragment EntryEdgePartial on EntryEdge {
    cursor
    __typename
  }
`;
export const JwtDecodedPartialFragmentDoc = gql`
  fragment JwtDecodedPartial on JwtDecoded {
    signature
    __typename
  }
`;
export const JwtHeadersPartialFragmentDoc = gql`
  fragment JwtHeadersPartial on JwtHeaders {
    alg
    typ
    __typename
  }
`;
export const JwtPayloadPartialFragmentDoc = gql`
  fragment JwtPayloadPartial on JwtPayload {
    exp
    iat
    userId
    __typename
  }
`;
export const MediaItemPartialFragmentDoc = gql`
  fragment MediaItemPartial on MediaItem {
    id
    name
    width
    height
    quality
    size
    src
    type
    uploadedAt
    userId
    fileLastModified
    __typename
  }
`;
export const MediaItemEdgePartialFragmentDoc = gql`
  fragment MediaItemEdgePartial on MediaItemEdge {
    cursor
    __typename
  }
`;
export const MediaItemConnectionPartialFragmentDoc = gql`
  fragment MediaItemConnectionPartial on MediaItemConnection {
    totalCount
    __typename
  }
`;
export const PageInfoPartialFragmentDoc = gql`
  fragment PageInfoPartial on PageInfo {
    startCursor
    endCursor
    hasNextPage
    hasPreviousPage
    __typename
  }
`;
export const ProfileConnectionPartialFragmentDoc = gql`
  fragment ProfileConnectionPartial on ProfileConnection {
    totalCount
    __typename
  }
`;
export const ProfileEdgePartialFragmentDoc = gql`
  fragment ProfileEdgePartial on ProfileEdge {
    cursor
    __typename
  }
`;
export const ProfilePartialFragmentDoc = gql`
  fragment ProfilePartial on Profile {
    activiyFeed
    bio
    city
    country
    coverPhoto
    dob
    gender
    id
    lastSeen
    memberSince
    occupation
    phoneNumber
    pronouns
    recentActivity
    userId
    __typename
  }
`;
export const SessionPartialFragmentDoc = gql`
  fragment SessionPartial on Session {
    accessToken
    alg
    exp
    iat
    id
    lastVerified
    provider
    refreshToken
    scopes
    signature
    tokenState
    userId
    __typename
  }
`;
export const SessionConnectionPartialFragmentDoc = gql`
  fragment SessionConnectionPartial on SessionConnection {
    __typename
    totalCount
  }
`;
export const SessionEdgePartialFragmentDoc = gql`
  fragment SessionEdgePartial on SessionEdge {
    __typename
    cursor
  }
`;
export const UserCountPartialFragmentDoc = gql`
  fragment UserCountPartial on UserCount {
    accounts
    categories
    comments
    connections
    mediaItems
    entries
    sessions
    __typename
  }
`;
export const UserPartialFragmentDoc = gql`
  fragment UserPartial on User {
    createdAt
    email
    emailVerified
    id
    image
    firstName
    lastName
    password
    role
    status
    updatedAt
    __typename
  }
`;
export const UserConnectionPartialFragmentDoc = gql`
  fragment UserConnectionPartial on UserConnection {
    totalCount
    __typename
  }
`;
export const UserEdgePartialFragmentDoc = gql`
  fragment UserEdgePartial on UserEdge {
    cursor
    __typename
  }
`;
export const ViewerAuthInfoPartialFragmentDoc = gql`
  fragment ViewerAuthInfoPartial on ViewerAuthInfo {
    __typename
    accessToken
    refreshToken
  }
`;
export const ViewerFieldsPaginatedConnectionPartialFragmentDoc = gql`
  fragment ViewerFieldsPaginatedConnectionPartial on ViewerFieldsPaginatedConnection {
    __typename
    totalCount
  }
`;
export const ViewerFieldsPaginatedEdgePartialFragmentDoc = gql`
  fragment ViewerFieldsPaginatedEdgePartial on ViewerFieldsPaginatedEdge {
    __typename
    cursor
  }
`;
export const ViewerFieldsPaginatedPartialFragmentDoc = gql`
  fragment ViewerFieldsPaginatedPartial on ViewerFieldsPaginated {
    createdAt
    email
    emailVerified
    firstName
    lastName
    id
    image
    password
    role
    status
    updatedAt
    __typename
  }
`;
export const ViewerPartialFragmentDoc = gql`
  fragment ViewerPartial on ViewerDetailed {
    id
    accessToken
    createdAt
    email
    emailVerified
    firstName
    lastName
    password
    role
    status
    updatedAt
    __typename
  }
`;
export const changePasswordDocument = gql`
  mutation changePassword($changePassword: ChangePasswordInput!) {
    changePassword(changePasswordInput: $changePassword) {
      ...UserPartial
    }
  }
  ${UserPartialFragmentDoc}
`;
export type changePasswordMutationFn = Apollo.MutationFunction<
  changePasswordMutation,
  changePasswordMutationVariables
>;

/**
 * __usechangePasswordMutation__
 *
 * To run a mutation, you first call `usechangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usechangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = usechangePasswordMutation({
 *   variables: {
 *      changePassword: // value for 'changePassword'
 *   },
 * });
 */
export function usechangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    changePasswordMutation,
    changePasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    changePasswordMutation,
    changePasswordMutationVariables
  >(changePasswordDocument, options);
}
export type changePasswordMutationHookResult = ReturnType<
  typeof usechangePasswordMutation
>;
export type changePasswordMutationResult =
  Apollo.MutationResult<changePasswordMutation>;
export type changePasswordMutationOptions = Apollo.BaseMutationOptions<
  changePasswordMutation,
  changePasswordMutationVariables
>;
export const createNewCommentDocument = gql`
  mutation createNewComment(
    $createNewCommentInput: CreatNewCommentInput!
  ) {
    createNewComment(commentCreateInput: $createNewCommentInput) {
      ...CommentPartial
    }
  }
  ${CommentPartialFragmentDoc}
`;
export type createNewCommentMutationFn = Apollo.MutationFunction<
  createNewCommentMutation,
  createNewCommentMutationVariables
>;

/**
 * __usecreateNewCommentMutation__
 *
 * To run a mutation, you first call `usecreateNewCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usecreateNewCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewCommentMutation, { data, loading, error }] = usecreateNewCommentMutation({
 *   variables: {
 *      createNewCommentInput: // value for 'createNewCommentInput'
 *   },
 * });
 */
export function usecreateNewCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    createNewCommentMutation,
    createNewCommentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    createNewCommentMutation,
    createNewCommentMutationVariables
  >(createNewCommentDocument, options);
}
export type createNewCommentMutationHookResult = ReturnType<
  typeof usecreateNewCommentMutation
>;
export type createNewCommentMutationResult =
  Apollo.MutationResult<createNewCommentMutation>;
export type createNewCommentMutationOptions = Apollo.BaseMutationOptions<
  createNewCommentMutation,
  createNewCommentMutationVariables
>;
export const createNewProfileDocument = gql`
  mutation createNewProfile($newProfileInput: CreateOneProfile!) {
    createNewProfile(createNewProfileInput: $newProfileInput) {
      ...ProfilePartial
    }
  }
  ${ProfilePartialFragmentDoc}
`;
export type createNewProfileMutationFn = Apollo.MutationFunction<
  createNewProfileMutation,
  createNewProfileMutationVariables
>;

/**
 * __usecreateNewProfileMutation__
 *
 * To run a mutation, you first call `usecreateNewProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usecreateNewProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewProfileMutation, { data, loading, error }] = usecreateNewProfileMutation({
 *   variables: {
 *      newProfileInput: // value for 'newProfileInput'
 *   },
 * });
 */
export function usecreateNewProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    createNewProfileMutation,
    createNewProfileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    createNewProfileMutation,
    createNewProfileMutationVariables
  >(createNewProfileDocument, options);
}
export type createNewProfileMutationHookResult = ReturnType<
  typeof usecreateNewProfileMutation
>;
export type createNewProfileMutationResult =
  Apollo.MutationResult<createNewProfileMutation>;
export type createNewProfileMutationOptions = Apollo.BaseMutationOptions<
  createNewProfileMutation,
  createNewProfileMutationVariables
>;
export const createEntryDocument = gql`
  mutation createEntry($createOneEntry: EntryCreateOneInput!) {
    createNewEntry(entryCreateInput: $createOneEntry) {
      ...EntryPartial
    }
  }
  ${EntryPartialFragmentDoc}
`;
export type createEntryMutationFn = Apollo.MutationFunction<
  createEntryMutation,
  createEntryMutationVariables
>;

/**
 * __usecreateEntryMutation__
 *
 * To run a mutation, you first call `usecreateEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usecreateEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEntryMutation, { data, loading, error }] = usecreateEntryMutation({
 *   variables: {
 *      createOneEntry: // value for 'createOneEntry'
 *   },
 * });
 */
export function usecreateEntryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    createEntryMutation,
    createEntryMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    createEntryMutation,
    createEntryMutationVariables
  >(createEntryDocument, options);
}
export type createEntryMutationHookResult = ReturnType<
  typeof usecreateEntryMutation
>;
export type createEntryMutationResult =
  Apollo.MutationResult<createEntryMutation>;
export type createEntryMutationOptions = Apollo.BaseMutationOptions<
  createEntryMutation,
  createEntryMutationVariables
>;
export const registerNewUserDocument = gql`
  mutation registerNewUser($userCreateMutationInput: SignupInput!) {
    registerNewUser(userCreateInput: $userCreateMutationInput) {
      auth {
        ...AuthPartial
        user {
          _count {
            ...UserCountPartial
          }
          ...UserPartial
        }
        session {
          ...SessionPartial
        }
      }
      jwt {
        header {
          ...JwtHeadersPartial
        }
        payload {
          ...JwtPayloadPartial
        }
        ...JwtDecodedPartial
      }
    }
  }
  ${AuthPartialFragmentDoc}
  ${UserCountPartialFragmentDoc}
  ${UserPartialFragmentDoc}
  ${SessionPartialFragmentDoc}
  ${JwtHeadersPartialFragmentDoc}
  ${JwtPayloadPartialFragmentDoc}
  ${JwtDecodedPartialFragmentDoc}
`;
export type registerNewUserMutationFn = Apollo.MutationFunction<
  registerNewUserMutation,
  registerNewUserMutationVariables
>;

/**
 * __useregisterNewUserMutation__
 *
 * To run a mutation, you first call `useregisterNewUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useregisterNewUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerNewUserMutation, { data, loading, error }] = useregisterNewUserMutation({
 *   variables: {
 *      userCreateMutationInput: // value for 'userCreateMutationInput'
 *   },
 * });
 */
export function useregisterNewUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    registerNewUserMutation,
    registerNewUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    registerNewUserMutation,
    registerNewUserMutationVariables
  >(registerNewUserDocument, options);
}
export type registerNewUserMutationHookResult = ReturnType<
  typeof useregisterNewUserMutation
>;
export type registerNewUserMutationResult =
  Apollo.MutationResult<registerNewUserMutation>;
export type registerNewUserMutationOptions = Apollo.BaseMutationOptions<
  registerNewUserMutation,
  registerNewUserMutationVariables
>;
export const signInUserDocument = gql`
  mutation signInUser($loginInput: LoginInput!) {
    signin(userloginInput: $loginInput) {
      auth {
        ...AuthPartial
        user {
          ...UserPartial
          _count {
            ...UserCountPartial
          }
        }
        session {
          ...SessionPartial
        }
      }
      jwt {
        header {
          ...JwtHeadersPartial
        }
        payload {
          ...JwtPayloadPartial
        }
        ...JwtDecodedPartial
      }
      __typename
    }
  }
  ${AuthPartialFragmentDoc}
  ${UserPartialFragmentDoc}
  ${UserCountPartialFragmentDoc}
  ${SessionPartialFragmentDoc}
  ${JwtHeadersPartialFragmentDoc}
  ${JwtPayloadPartialFragmentDoc}
  ${JwtDecodedPartialFragmentDoc}
`;
export type signInUserMutationFn = Apollo.MutationFunction<
  signInUserMutation,
  signInUserMutationVariables
>;

/**
 * __usesignInUserMutation__
 *
 * To run a mutation, you first call `usesignInUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usesignInUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInUserMutation, { data, loading, error }] = usesignInUserMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function usesignInUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    signInUserMutation,
    signInUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    signInUserMutation,
    signInUserMutationVariables
  >(signInUserDocument, options);
}
export type signInUserMutationHookResult = ReturnType<
  typeof usesignInUserMutation
>;
export type signInUserMutationResult =
  Apollo.MutationResult<signInUserMutation>;
export type signInUserMutationOptions = Apollo.BaseMutationOptions<
  signInUserMutation,
  signInUserMutationVariables
>;
export const categoryByEncodedCursorDocument = gql`
  query categoryByEncodedCursor($categoryCursor: String!) {
    categoryByRelayId(cursor: $categoryCursor) {
      ...CategoryPartial
    }
  }
  ${CategoryPartialFragmentDoc}
`;

/**
 * __usecategoryByEncodedCursorQuery__
 *
 * To run a query within a React component, call `usecategoryByEncodedCursorQuery` and pass it any options that fit your needs.
 * When your component renders, `usecategoryByEncodedCursorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usecategoryByEncodedCursorQuery({
 *   variables: {
 *      categoryCursor: // value for 'categoryCursor'
 *   },
 * });
 */
export function usecategoryByEncodedCursorQuery(
  baseOptions: Apollo.QueryHookOptions<
    categoryByEncodedCursorQuery,
    categoryByEncodedCursorQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    categoryByEncodedCursorQuery,
    categoryByEncodedCursorQueryVariables
  >(categoryByEncodedCursorDocument, options);
}
export function usecategoryByEncodedCursorLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    categoryByEncodedCursorQuery,
    categoryByEncodedCursorQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    categoryByEncodedCursorQuery,
    categoryByEncodedCursorQueryVariables
  >(categoryByEncodedCursorDocument, options);
}
export type categoryByEncodedCursorQueryHookResult = ReturnType<
  typeof usecategoryByEncodedCursorQuery
>;
export type categoryByEncodedCursorLazyQueryHookResult = ReturnType<
  typeof usecategoryByEncodedCursorLazyQuery
>;
export type categoryByEncodedCursorQueryResult = Apollo.QueryResult<
  categoryByEncodedCursorQuery,
  categoryByEncodedCursorQueryVariables
>;
export function refetchcategoryByEncodedCursorQuery(
  variables: categoryByEncodedCursorQueryVariables
) {
  return { query: categoryByEncodedCursorDocument, variables: variables };
}
export const commentByEncodedCursorDocument = gql`
  query commentByEncodedCursor($commentCursor: String!) {
    commentByRelayId(cursor: $commentCursor) {
      ...CommentPartial
    }
  }
  ${CommentPartialFragmentDoc}
`;

/**
 * __usecommentByEncodedCursorQuery__
 *
 * To run a query within a React component, call `usecommentByEncodedCursorQuery` and pass it any options that fit your needs.
 * When your component renders, `usecommentByEncodedCursorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usecommentByEncodedCursorQuery({
 *   variables: {
 *      commentCursor: // value for 'commentCursor'
 *   },
 * });
 */
export function usecommentByEncodedCursorQuery(
  baseOptions: Apollo.QueryHookOptions<
    commentByEncodedCursorQuery,
    commentByEncodedCursorQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    commentByEncodedCursorQuery,
    commentByEncodedCursorQueryVariables
  >(commentByEncodedCursorDocument, options);
}
export function usecommentByEncodedCursorLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    commentByEncodedCursorQuery,
    commentByEncodedCursorQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    commentByEncodedCursorQuery,
    commentByEncodedCursorQueryVariables
  >(commentByEncodedCursorDocument, options);
}
export type commentByEncodedCursorQueryHookResult = ReturnType<
  typeof usecommentByEncodedCursorQuery
>;
export type commentByEncodedCursorLazyQueryHookResult = ReturnType<
  typeof usecommentByEncodedCursorLazyQuery
>;
export type commentByEncodedCursorQueryResult = Apollo.QueryResult<
  commentByEncodedCursorQuery,
  commentByEncodedCursorQueryVariables
>;
export function refetchcommentByEncodedCursorQuery(
  variables: commentByEncodedCursorQueryVariables
) {
  return { query: commentByEncodedCursorDocument, variables: variables };
}
export const connectionByEncodedCursorDocument = gql`
  query connectionByEncodedCursor($connectionCursor: String!) {
    connectionByRelayId(connectionCursor: $connectionCursor) {
      ...ConnectionPartial
    }
  }
  ${ConnectionPartialFragmentDoc}
`;

/**
 * __useconnectionByEncodedCursorQuery__
 *
 * To run a query within a React component, call `useconnectionByEncodedCursorQuery` and pass it any options that fit your needs.
 * When your component renders, `useconnectionByEncodedCursorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useconnectionByEncodedCursorQuery({
 *   variables: {
 *      connectionCursor: // value for 'connectionCursor'
 *   },
 * });
 */
export function useconnectionByEncodedCursorQuery(
  baseOptions: Apollo.QueryHookOptions<
    connectionByEncodedCursorQuery,
    connectionByEncodedCursorQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    connectionByEncodedCursorQuery,
    connectionByEncodedCursorQueryVariables
  >(connectionByEncodedCursorDocument, options);
}
export function useconnectionByEncodedCursorLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    connectionByEncodedCursorQuery,
    connectionByEncodedCursorQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    connectionByEncodedCursorQuery,
    connectionByEncodedCursorQueryVariables
  >(connectionByEncodedCursorDocument, options);
}
export type connectionByEncodedCursorQueryHookResult = ReturnType<
  typeof useconnectionByEncodedCursorQuery
>;
export type connectionByEncodedCursorLazyQueryHookResult = ReturnType<
  typeof useconnectionByEncodedCursorLazyQuery
>;
export type connectionByEncodedCursorQueryResult = Apollo.QueryResult<
  connectionByEncodedCursorQuery,
  connectionByEncodedCursorQueryVariables
>;
export function refetchconnectionByEncodedCursorQuery(
  variables: connectionByEncodedCursorQueryVariables
) {
  return {
    query: connectionByEncodedCursorDocument,
    variables: variables
  };
}
export const entryByEncodedCursorDocument = gql`
  query entryByEncodedCursor($entryCursor: String!) {
    entryByRelayId(entryCursor: $entryCursor) {
      ...EntryPartial
    }
  }
  ${EntryPartialFragmentDoc}
`;

/**
 * __useentryByEncodedCursorQuery__
 *
 * To run a query within a React component, call `useentryByEncodedCursorQuery` and pass it any options that fit your needs.
 * When your component renders, `useentryByEncodedCursorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useentryByEncodedCursorQuery({
 *   variables: {
 *      entryCursor: // value for 'entryCursor'
 *   },
 * });
 */
export function useentryByEncodedCursorQuery(
  baseOptions: Apollo.QueryHookOptions<
    entryByEncodedCursorQuery,
    entryByEncodedCursorQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    entryByEncodedCursorQuery,
    entryByEncodedCursorQueryVariables
  >(entryByEncodedCursorDocument, options);
}
export function useentryByEncodedCursorLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    entryByEncodedCursorQuery,
    entryByEncodedCursorQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    entryByEncodedCursorQuery,
    entryByEncodedCursorQueryVariables
  >(entryByEncodedCursorDocument, options);
}
export type entryByEncodedCursorQueryHookResult = ReturnType<
  typeof useentryByEncodedCursorQuery
>;
export type entryByEncodedCursorLazyQueryHookResult = ReturnType<
  typeof useentryByEncodedCursorLazyQuery
>;
export type entryByEncodedCursorQueryResult = Apollo.QueryResult<
  entryByEncodedCursorQuery,
  entryByEncodedCursorQueryVariables
>;
export function refetchentryByEncodedCursorQuery(
  variables: entryByEncodedCursorQueryVariables
) {
  return { query: entryByEncodedCursorDocument, variables: variables };
}
export const deriveUserDetailsFromTokenDocument = gql`
  query deriveUserDetailsFromToken {
    __typename
    getViewer {
      __typename
      auth {
        session {
          ...SessionPartial
        }
        user {
          _count {
            ...UserCountPartial
          }
          ...UserPartial
        }
        ...AuthPartial
      }
      jwt {
        header {
          ...JwtHeadersPartial
        }
        payload {
          ...JwtPayloadPartial
        }
        ...JwtDecodedPartial
      }
    }
  }
  ${SessionPartialFragmentDoc}
  ${UserCountPartialFragmentDoc}
  ${UserPartialFragmentDoc}
  ${AuthPartialFragmentDoc}
  ${JwtHeadersPartialFragmentDoc}
  ${JwtPayloadPartialFragmentDoc}
  ${JwtDecodedPartialFragmentDoc}
`;

/**
 * __usederiveUserDetailsFromTokenQuery__
 *
 * To run a query within a React component, call `usederiveUserDetailsFromTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `usederiveUserDetailsFromTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usederiveUserDetailsFromTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function usederiveUserDetailsFromTokenQuery(
  baseOptions?: Apollo.QueryHookOptions<
    deriveUserDetailsFromTokenQuery,
    deriveUserDetailsFromTokenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    deriveUserDetailsFromTokenQuery,
    deriveUserDetailsFromTokenQueryVariables
  >(deriveUserDetailsFromTokenDocument, options);
}
export function usederiveUserDetailsFromTokenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    deriveUserDetailsFromTokenQuery,
    deriveUserDetailsFromTokenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    deriveUserDetailsFromTokenQuery,
    deriveUserDetailsFromTokenQueryVariables
  >(deriveUserDetailsFromTokenDocument, options);
}
export type deriveUserDetailsFromTokenQueryHookResult = ReturnType<
  typeof usederiveUserDetailsFromTokenQuery
>;
export type deriveUserDetailsFromTokenLazyQueryHookResult = ReturnType<
  typeof usederiveUserDetailsFromTokenLazyQuery
>;
export type deriveUserDetailsFromTokenQueryResult = Apollo.QueryResult<
  deriveUserDetailsFromTokenQuery,
  deriveUserDetailsFromTokenQueryVariables
>;
export function refetchderiveUserDetailsFromTokenQuery(
  variables?: deriveUserDetailsFromTokenQueryVariables
) {
  return {
    query: deriveUserDetailsFromTokenDocument,
    variables: variables
  };
}
export const listCategoriesDocument = gql`
  query listCategories(
    $findManyCategoriesInput: FindManyCategoriesPaginatedInput!
  ) {
    listCategories(
      findManyCategoriesPaginatedInput: $findManyCategoriesInput
    ) {
      ...CategoryConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...CategoryEdgePartial
        node {
          ...CategoryPartial
          creator {
            ...UserPartial
          }
          entries {
            ...EntryPartial
          }
          _count {
            ...CategoryCountPartial
          }
        }
      }
    }
  }
  ${CategoryConnectionPartialFragmentDoc}
  ${PageInfoPartialFragmentDoc}
  ${CategoryEdgePartialFragmentDoc}
  ${CategoryPartialFragmentDoc}
  ${UserPartialFragmentDoc}
  ${EntryPartialFragmentDoc}
  ${CategoryCountPartialFragmentDoc}
`;

/**
 * __uselistCategoriesQuery__
 *
 * To run a query within a React component, call `uselistCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `uselistCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = uselistCategoriesQuery({
 *   variables: {
 *      findManyCategoriesInput: // value for 'findManyCategoriesInput'
 *   },
 * });
 */
export function uselistCategoriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    listCategoriesQuery,
    listCategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    listCategoriesQuery,
    listCategoriesQueryVariables
  >(listCategoriesDocument, options);
}
export function uselistCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    listCategoriesQuery,
    listCategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    listCategoriesQuery,
    listCategoriesQueryVariables
  >(listCategoriesDocument, options);
}
export type listCategoriesQueryHookResult = ReturnType<
  typeof uselistCategoriesQuery
>;
export type listCategoriesLazyQueryHookResult = ReturnType<
  typeof uselistCategoriesLazyQuery
>;
export type listCategoriesQueryResult = Apollo.QueryResult<
  listCategoriesQuery,
  listCategoriesQueryVariables
>;
export function refetchlistCategoriesQuery(
  variables: listCategoriesQueryVariables
) {
  return { query: listCategoriesDocument, variables: variables };
}
export const listCommentsDocument = gql`
  query listComments(
    $findManyCommentsInput: FindManyCommentsPaginatedInput!
  ) {
    listComments(findManyCommentsPaginatedInput: $findManyCommentsInput) {
      ...CommentConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...CommentEdgePartial
        node {
          ...CommentPartial
          author {
            ...UserPartial
          }
          entry {
            ...EntryPartial
          }
        }
      }
    }
  }
  ${CommentConnectionPartialFragmentDoc}
  ${PageInfoPartialFragmentDoc}
  ${CommentEdgePartialFragmentDoc}
  ${CommentPartialFragmentDoc}
  ${UserPartialFragmentDoc}
  ${EntryPartialFragmentDoc}
`;

/**
 * __uselistCommentsQuery__
 *
 * To run a query within a React component, call `uselistCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `uselistCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = uselistCommentsQuery({
 *   variables: {
 *      findManyCommentsInput: // value for 'findManyCommentsInput'
 *   },
 * });
 */
export function uselistCommentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    listCommentsQuery,
    listCommentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<listCommentsQuery, listCommentsQueryVariables>(
    listCommentsDocument,
    options
  );
}
export function uselistCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    listCommentsQuery,
    listCommentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    listCommentsQuery,
    listCommentsQueryVariables
  >(listCommentsDocument, options);
}
export type listCommentsQueryHookResult = ReturnType<
  typeof uselistCommentsQuery
>;
export type listCommentsLazyQueryHookResult = ReturnType<
  typeof uselistCommentsLazyQuery
>;
export type listCommentsQueryResult = Apollo.QueryResult<
  listCommentsQuery,
  listCommentsQueryVariables
>;
export function refetchlistCommentsQuery(
  variables: listCommentsQueryVariables
) {
  return { query: listCommentsDocument, variables: variables };
}
export const listConnectionsDocument = gql`
  query listConnections(
    $findManyConnectionsInput: FindManyConnectionsPaginatedInput!
  ) {
    listConnections(
      findManyConnectionsPaginatedInput: $findManyConnectionsInput
    ) {
      ...ConnectionConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...ConnectionEdgePartial
        node {
          ...ConnectionPartial
        }
      }
    }
  }
  ${ConnectionConnectionPartialFragmentDoc}
  ${PageInfoPartialFragmentDoc}
  ${ConnectionEdgePartialFragmentDoc}
  ${ConnectionPartialFragmentDoc}
`;

/**
 * __uselistConnectionsQuery__
 *
 * To run a query within a React component, call `uselistConnectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `uselistConnectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = uselistConnectionsQuery({
 *   variables: {
 *      findManyConnectionsInput: // value for 'findManyConnectionsInput'
 *   },
 * });
 */
export function uselistConnectionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    listConnectionsQuery,
    listConnectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    listConnectionsQuery,
    listConnectionsQueryVariables
  >(listConnectionsDocument, options);
}
export function uselistConnectionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    listConnectionsQuery,
    listConnectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    listConnectionsQuery,
    listConnectionsQueryVariables
  >(listConnectionsDocument, options);
}
export type listConnectionsQueryHookResult = ReturnType<
  typeof uselistConnectionsQuery
>;
export type listConnectionsLazyQueryHookResult = ReturnType<
  typeof uselistConnectionsLazyQuery
>;
export type listConnectionsQueryResult = Apollo.QueryResult<
  listConnectionsQuery,
  listConnectionsQueryVariables
>;
export function refetchlistConnectionsQuery(
  variables: listConnectionsQueryVariables
) {
  return { query: listConnectionsDocument, variables: variables };
}
export const listEntriesDocument = gql`
  query listEntries(
    $findManyEntriesInput: FindManyEntriessPaginatedInput!
  ) {
    listEntries(findManyEntriesPaginatedInput: $findManyEntriesInput) {
      ...EntryConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...EntryEdgePartial
        node {
          ...EntryPartial
          _count {
            ...EntryCountPartial
          }
          author {
            ...UserPartial
          }
          comments {
            ...CommentPartial
          }
        }
      }
    }
  }
  ${EntryConnectionPartialFragmentDoc}
  ${PageInfoPartialFragmentDoc}
  ${EntryEdgePartialFragmentDoc}
  ${EntryPartialFragmentDoc}
  ${EntryCountPartialFragmentDoc}
  ${UserPartialFragmentDoc}
  ${CommentPartialFragmentDoc}
`;

/**
 * __uselistEntriesQuery__
 *
 * To run a query within a React component, call `uselistEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `uselistEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = uselistEntriesQuery({
 *   variables: {
 *      findManyEntriesInput: // value for 'findManyEntriesInput'
 *   },
 * });
 */
export function uselistEntriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    listEntriesQuery,
    listEntriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<listEntriesQuery, listEntriesQueryVariables>(
    listEntriesDocument,
    options
  );
}
export function uselistEntriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    listEntriesQuery,
    listEntriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<listEntriesQuery, listEntriesQueryVariables>(
    listEntriesDocument,
    options
  );
}
export type listEntriesQueryHookResult = ReturnType<
  typeof uselistEntriesQuery
>;
export type listEntriesLazyQueryHookResult = ReturnType<
  typeof uselistEntriesLazyQuery
>;
export type listEntriesQueryResult = Apollo.QueryResult<
  listEntriesQuery,
  listEntriesQueryVariables
>;
export function refetchlistEntriesQuery(
  variables: listEntriesQueryVariables
) {
  return { query: listEntriesDocument, variables: variables };
}
export const listMediaItemsDocument = gql`
  query listMediaItems(
    $findManyMediaItemsPaginated: FindManyMediaItemsPaginatedInput!
  ) {
    listMediaItems(
      findManyMediaItemsPaginated: $findManyMediaItemsPaginated
    ) {
      ...MediaItemConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...MediaItemEdgePartial
        node {
          ...MediaItemPartial
        }
      }
    }
  }
  ${MediaItemConnectionPartialFragmentDoc}
  ${PageInfoPartialFragmentDoc}
  ${MediaItemEdgePartialFragmentDoc}
  ${MediaItemPartialFragmentDoc}
`;

/**
 * __uselistMediaItemsQuery__
 *
 * To run a query within a React component, call `uselistMediaItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `uselistMediaItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = uselistMediaItemsQuery({
 *   variables: {
 *      findManyMediaItemsPaginated: // value for 'findManyMediaItemsPaginated'
 *   },
 * });
 */
export function uselistMediaItemsQuery(
  baseOptions: Apollo.QueryHookOptions<
    listMediaItemsQuery,
    listMediaItemsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    listMediaItemsQuery,
    listMediaItemsQueryVariables
  >(listMediaItemsDocument, options);
}
export function uselistMediaItemsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    listMediaItemsQuery,
    listMediaItemsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    listMediaItemsQuery,
    listMediaItemsQueryVariables
  >(listMediaItemsDocument, options);
}
export type listMediaItemsQueryHookResult = ReturnType<
  typeof uselistMediaItemsQuery
>;
export type listMediaItemsLazyQueryHookResult = ReturnType<
  typeof uselistMediaItemsLazyQuery
>;
export type listMediaItemsQueryResult = Apollo.QueryResult<
  listMediaItemsQuery,
  listMediaItemsQueryVariables
>;
export function refetchlistMediaItemsQuery(
  variables: listMediaItemsQueryVariables
) {
  return { query: listMediaItemsDocument, variables: variables };
}
export const listProfilesDocument = gql`
  query listProfiles(
    $findManyProfilesInput: FindManyProfilesPaginatedInput!
  ) {
    listProfiles(profilesArgs: $findManyProfilesInput) {
      ...ProfileConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...ProfileEdgePartial
        node {
          ...ProfilePartial
          user {
            ...UserPartial
            _count {
              ...UserCountPartial
            }
          }
        }
      }
    }
  }
  ${ProfileConnectionPartialFragmentDoc}
  ${PageInfoPartialFragmentDoc}
  ${ProfileEdgePartialFragmentDoc}
  ${ProfilePartialFragmentDoc}
  ${UserPartialFragmentDoc}
  ${UserCountPartialFragmentDoc}
`;

/**
 * __uselistProfilesQuery__
 *
 * To run a query within a React component, call `uselistProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `uselistProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = uselistProfilesQuery({
 *   variables: {
 *      findManyProfilesInput: // value for 'findManyProfilesInput'
 *   },
 * });
 */
export function uselistProfilesQuery(
  baseOptions: Apollo.QueryHookOptions<
    listProfilesQuery,
    listProfilesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<listProfilesQuery, listProfilesQueryVariables>(
    listProfilesDocument,
    options
  );
}
export function uselistProfilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    listProfilesQuery,
    listProfilesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    listProfilesQuery,
    listProfilesQueryVariables
  >(listProfilesDocument, options);
}
export type listProfilesQueryHookResult = ReturnType<
  typeof uselistProfilesQuery
>;
export type listProfilesLazyQueryHookResult = ReturnType<
  typeof uselistProfilesLazyQuery
>;
export type listProfilesQueryResult = Apollo.QueryResult<
  listProfilesQuery,
  listProfilesQueryVariables
>;
export function refetchlistProfilesQuery(
  variables: listProfilesQueryVariables
) {
  return { query: listProfilesDocument, variables: variables };
}
export const listSessionsDocument = gql`
  query listSessions(
    $findManySessionsInput: FindManySessionsPaginatedInput!
  ) {
    listSessions(findManySessionsPaginatedInput: $findManySessionsInput) {
      ...SessionConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...SessionEdgePartial
        node {
          ...SessionPartial
          user {
            ...UserPartial
            _count {
              ...UserCountPartial
            }
          }
        }
      }
    }
  }
  ${SessionConnectionPartialFragmentDoc}
  ${PageInfoPartialFragmentDoc}
  ${SessionEdgePartialFragmentDoc}
  ${SessionPartialFragmentDoc}
  ${UserPartialFragmentDoc}
  ${UserCountPartialFragmentDoc}
`;

/**
 * __uselistSessionsQuery__
 *
 * To run a query within a React component, call `uselistSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `uselistSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = uselistSessionsQuery({
 *   variables: {
 *      findManySessionsInput: // value for 'findManySessionsInput'
 *   },
 * });
 */
export function uselistSessionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    listSessionsQuery,
    listSessionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<listSessionsQuery, listSessionsQueryVariables>(
    listSessionsDocument,
    options
  );
}
export function uselistSessionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    listSessionsQuery,
    listSessionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    listSessionsQuery,
    listSessionsQueryVariables
  >(listSessionsDocument, options);
}
export type listSessionsQueryHookResult = ReturnType<
  typeof uselistSessionsQuery
>;
export type listSessionsLazyQueryHookResult = ReturnType<
  typeof uselistSessionsLazyQuery
>;
export type listSessionsQueryResult = Apollo.QueryResult<
  listSessionsQuery,
  listSessionsQueryVariables
>;
export function refetchlistSessionsQuery(
  variables: listSessionsQueryVariables
) {
  return { query: listSessionsDocument, variables: variables };
}
export const allUsersDocument = gql`
  query allUsers(
    $findManyUsersPaginatedInput: FindManyUsersPaginatedInput
  ) {
    listUsers(findManyUsersPaginatedInput: $findManyUsersPaginatedInput) {
      ...UserConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...UserEdgePartial
        node {
          ...UserPartial
          profile {
            ...ProfilePartial
          }
          mediaItems {
            ...MediaItemPartial
          }
          entries {
            ...EntryPartial
          }
          _count {
            ...UserCountPartial
          }
        }
      }
    }
  }
  ${UserConnectionPartialFragmentDoc}
  ${PageInfoPartialFragmentDoc}
  ${UserEdgePartialFragmentDoc}
  ${UserPartialFragmentDoc}
  ${ProfilePartialFragmentDoc}
  ${MediaItemPartialFragmentDoc}
  ${EntryPartialFragmentDoc}
  ${UserCountPartialFragmentDoc}
`;

/**
 * __useallUsersQuery__
 *
 * To run a query within a React component, call `useallUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useallUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useallUsersQuery({
 *   variables: {
 *      findManyUsersPaginatedInput: // value for 'findManyUsersPaginatedInput'
 *   },
 * });
 */
export function useallUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    allUsersQuery,
    allUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<allUsersQuery, allUsersQueryVariables>(
    allUsersDocument,
    options
  );
}
export function useallUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    allUsersQuery,
    allUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<allUsersQuery, allUsersQueryVariables>(
    allUsersDocument,
    options
  );
}
export type allUsersQueryHookResult = ReturnType<typeof useallUsersQuery>;
export type allUsersLazyQueryHookResult = ReturnType<
  typeof useallUsersLazyQuery
>;
export type allUsersQueryResult = Apollo.QueryResult<
  allUsersQuery,
  allUsersQueryVariables
>;
export function refetchallUsersQuery(variables?: allUsersQueryVariables) {
  return { query: allUsersDocument, variables: variables };
}
export const profileByEncodedCursorDocument = gql`
  query profileByEncodedCursor($profileCursor: String!) {
    profileByRelayId(cursor: $profileCursor) {
      ...ProfilePartial
    }
  }
  ${ProfilePartialFragmentDoc}
`;

/**
 * __useprofileByEncodedCursorQuery__
 *
 * To run a query within a React component, call `useprofileByEncodedCursorQuery` and pass it any options that fit your needs.
 * When your component renders, `useprofileByEncodedCursorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useprofileByEncodedCursorQuery({
 *   variables: {
 *      profileCursor: // value for 'profileCursor'
 *   },
 * });
 */
export function useprofileByEncodedCursorQuery(
  baseOptions: Apollo.QueryHookOptions<
    profileByEncodedCursorQuery,
    profileByEncodedCursorQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    profileByEncodedCursorQuery,
    profileByEncodedCursorQueryVariables
  >(profileByEncodedCursorDocument, options);
}
export function useprofileByEncodedCursorLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    profileByEncodedCursorQuery,
    profileByEncodedCursorQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    profileByEncodedCursorQuery,
    profileByEncodedCursorQueryVariables
  >(profileByEncodedCursorDocument, options);
}
export type profileByEncodedCursorQueryHookResult = ReturnType<
  typeof useprofileByEncodedCursorQuery
>;
export type profileByEncodedCursorLazyQueryHookResult = ReturnType<
  typeof useprofileByEncodedCursorLazyQuery
>;
export type profileByEncodedCursorQueryResult = Apollo.QueryResult<
  profileByEncodedCursorQuery,
  profileByEncodedCursorQueryVariables
>;
export function refetchprofileByEncodedCursorQuery(
  variables: profileByEncodedCursorQueryVariables
) {
  return { query: profileByEncodedCursorDocument, variables: variables };
}
export const sessionByEncodedCursorDocument = gql`
  query sessionByEncodedCursor($sessionCursor: String!) {
    sessionByRelayId(cursor: $sessionCursor) {
      ...SessionPartial
    }
  }
  ${SessionPartialFragmentDoc}
`;

/**
 * __usesessionByEncodedCursorQuery__
 *
 * To run a query within a React component, call `usesessionByEncodedCursorQuery` and pass it any options that fit your needs.
 * When your component renders, `usesessionByEncodedCursorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usesessionByEncodedCursorQuery({
 *   variables: {
 *      sessionCursor: // value for 'sessionCursor'
 *   },
 * });
 */
export function usesessionByEncodedCursorQuery(
  baseOptions: Apollo.QueryHookOptions<
    sessionByEncodedCursorQuery,
    sessionByEncodedCursorQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    sessionByEncodedCursorQuery,
    sessionByEncodedCursorQueryVariables
  >(sessionByEncodedCursorDocument, options);
}
export function usesessionByEncodedCursorLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    sessionByEncodedCursorQuery,
    sessionByEncodedCursorQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    sessionByEncodedCursorQuery,
    sessionByEncodedCursorQueryVariables
  >(sessionByEncodedCursorDocument, options);
}
export type sessionByEncodedCursorQueryHookResult = ReturnType<
  typeof usesessionByEncodedCursorQuery
>;
export type sessionByEncodedCursorLazyQueryHookResult = ReturnType<
  typeof usesessionByEncodedCursorLazyQuery
>;
export type sessionByEncodedCursorQueryResult = Apollo.QueryResult<
  sessionByEncodedCursorQuery,
  sessionByEncodedCursorQueryVariables
>;
export function refetchsessionByEncodedCursorQuery(
  variables: sessionByEncodedCursorQueryVariables
) {
  return { query: sessionByEncodedCursorDocument, variables: variables };
}
export const userByEncodedCursorDocument = gql`
  query userByEncodedCursor($userCursor: String!) {
    userByRelayId(cursor: $userCursor) {
      ...UserPartial
    }
  }
  ${UserPartialFragmentDoc}
`;

/**
 * __useuserByEncodedCursorQuery__
 *
 * To run a query within a React component, call `useuserByEncodedCursorQuery` and pass it any options that fit your needs.
 * When your component renders, `useuserByEncodedCursorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useuserByEncodedCursorQuery({
 *   variables: {
 *      userCursor: // value for 'userCursor'
 *   },
 * });
 */
export function useuserByEncodedCursorQuery(
  baseOptions: Apollo.QueryHookOptions<
    userByEncodedCursorQuery,
    userByEncodedCursorQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    userByEncodedCursorQuery,
    userByEncodedCursorQueryVariables
  >(userByEncodedCursorDocument, options);
}
export function useuserByEncodedCursorLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    userByEncodedCursorQuery,
    userByEncodedCursorQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    userByEncodedCursorQuery,
    userByEncodedCursorQueryVariables
  >(userByEncodedCursorDocument, options);
}
export type userByEncodedCursorQueryHookResult = ReturnType<
  typeof useuserByEncodedCursorQuery
>;
export type userByEncodedCursorLazyQueryHookResult = ReturnType<
  typeof useuserByEncodedCursorLazyQuery
>;
export type userByEncodedCursorQueryResult = Apollo.QueryResult<
  userByEncodedCursorQuery,
  userByEncodedCursorQueryVariables
>;
export function refetchuserByEncodedCursorQuery(
  variables: userByEncodedCursorQueryVariables
) {
  return { query: userByEncodedCursorDocument, variables: variables };
}
export const userDecodedFromTokenDocument = gql`
  query userDecodedFromToken($accessToken: String!) {
    getUserFromAccessToken(token: $accessToken) {
      __typename
      auth {
        session {
          ...SessionPartial
        }
        user {
          _count {
            ...UserCountPartial
          }
          ...UserPartial
        }
        ...AuthPartial
      }
      jwt {
        header {
          ...JwtHeadersPartial
        }
        payload {
          ...JwtPayloadPartial
        }
        ...JwtDecodedPartial
      }
    }
  }
  ${SessionPartialFragmentDoc}
  ${UserCountPartialFragmentDoc}
  ${UserPartialFragmentDoc}
  ${AuthPartialFragmentDoc}
  ${JwtHeadersPartialFragmentDoc}
  ${JwtPayloadPartialFragmentDoc}
  ${JwtDecodedPartialFragmentDoc}
`;

/**
 * __useuserDecodedFromTokenQuery__
 *
 * To run a query within a React component, call `useuserDecodedFromTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useuserDecodedFromTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useuserDecodedFromTokenQuery({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *   },
 * });
 */
export function useuserDecodedFromTokenQuery(
  baseOptions: Apollo.QueryHookOptions<
    userDecodedFromTokenQuery,
    userDecodedFromTokenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    userDecodedFromTokenQuery,
    userDecodedFromTokenQueryVariables
  >(userDecodedFromTokenDocument, options);
}
export function useuserDecodedFromTokenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    userDecodedFromTokenQuery,
    userDecodedFromTokenQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    userDecodedFromTokenQuery,
    userDecodedFromTokenQueryVariables
  >(userDecodedFromTokenDocument, options);
}
export type userDecodedFromTokenQueryHookResult = ReturnType<
  typeof useuserDecodedFromTokenQuery
>;
export type userDecodedFromTokenLazyQueryHookResult = ReturnType<
  typeof useuserDecodedFromTokenLazyQuery
>;
export type userDecodedFromTokenQueryResult = Apollo.QueryResult<
  userDecodedFromTokenQuery,
  userDecodedFromTokenQueryVariables
>;
export function refetchuserDecodedFromTokenQuery(
  variables: userDecodedFromTokenQueryVariables
) {
  return { query: userDecodedFromTokenDocument, variables: variables };
}
export const viewerCommentsViaContextDocument = gql`
  query viewerCommentsViaContext(
    $viewerCommentsInput: FindManyCommentsPaginatedInput!
  ) {
    viewerCommentsPaginated(
      viewerCommentsPaginatedInput: $viewerCommentsInput
    ) {
      pageInfo {
        ...PageInfoPartial
      }
      ...CommentConnectionPartial
      edges {
        ...CommentEdgePartial
        node {
          ...CommentPartial
          author {
            _count {
              ...UserCountPartial
            }
            ...UserPartial
          }
        }
      }
    }
  }
  ${PageInfoPartialFragmentDoc}
  ${CommentConnectionPartialFragmentDoc}
  ${CommentEdgePartialFragmentDoc}
  ${CommentPartialFragmentDoc}
  ${UserCountPartialFragmentDoc}
  ${UserPartialFragmentDoc}
`;

/**
 * __useviewerCommentsViaContextQuery__
 *
 * To run a query within a React component, call `useviewerCommentsViaContextQuery` and pass it any options that fit your needs.
 * When your component renders, `useviewerCommentsViaContextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useviewerCommentsViaContextQuery({
 *   variables: {
 *      viewerCommentsInput: // value for 'viewerCommentsInput'
 *   },
 * });
 */
export function useviewerCommentsViaContextQuery(
  baseOptions: Apollo.QueryHookOptions<
    viewerCommentsViaContextQuery,
    viewerCommentsViaContextQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    viewerCommentsViaContextQuery,
    viewerCommentsViaContextQueryVariables
  >(viewerCommentsViaContextDocument, options);
}
export function useviewerCommentsViaContextLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    viewerCommentsViaContextQuery,
    viewerCommentsViaContextQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    viewerCommentsViaContextQuery,
    viewerCommentsViaContextQueryVariables
  >(viewerCommentsViaContextDocument, options);
}
export type viewerCommentsViaContextQueryHookResult = ReturnType<
  typeof useviewerCommentsViaContextQuery
>;
export type viewerCommentsViaContextLazyQueryHookResult = ReturnType<
  typeof useviewerCommentsViaContextLazyQuery
>;
export type viewerCommentsViaContextQueryResult = Apollo.QueryResult<
  viewerCommentsViaContextQuery,
  viewerCommentsViaContextQueryVariables
>;
export function refetchviewerCommentsViaContextQuery(
  variables: viewerCommentsViaContextQueryVariables
) {
  return { query: viewerCommentsViaContextDocument, variables: variables };
}
export const viewerEntriesViaContextDocument = gql`
  query viewerEntriesViaContext(
    $findViewerEntriesPaginatedInput: FindViewerEntriesPaginatedInput!
  ) {
    viewerEntriesPaginated(
      viewerEntriesPaginatedInput: $findViewerEntriesPaginatedInput
    ) {
      ...EntryConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...EntryEdgePartial
        node {
          ...EntryPartial
          _count {
            ...EntryCountPartial
          }
        }
      }
    }
  }
  ${EntryConnectionPartialFragmentDoc}
  ${PageInfoPartialFragmentDoc}
  ${EntryEdgePartialFragmentDoc}
  ${EntryPartialFragmentDoc}
  ${EntryCountPartialFragmentDoc}
`;

/**
 * __useviewerEntriesViaContextQuery__
 *
 * To run a query within a React component, call `useviewerEntriesViaContextQuery` and pass it any options that fit your needs.
 * When your component renders, `useviewerEntriesViaContextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useviewerEntriesViaContextQuery({
 *   variables: {
 *      findViewerEntriesPaginatedInput: // value for 'findViewerEntriesPaginatedInput'
 *   },
 * });
 */
export function useviewerEntriesViaContextQuery(
  baseOptions: Apollo.QueryHookOptions<
    viewerEntriesViaContextQuery,
    viewerEntriesViaContextQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    viewerEntriesViaContextQuery,
    viewerEntriesViaContextQueryVariables
  >(viewerEntriesViaContextDocument, options);
}
export function useviewerEntriesViaContextLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    viewerEntriesViaContextQuery,
    viewerEntriesViaContextQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    viewerEntriesViaContextQuery,
    viewerEntriesViaContextQueryVariables
  >(viewerEntriesViaContextDocument, options);
}
export type viewerEntriesViaContextQueryHookResult = ReturnType<
  typeof useviewerEntriesViaContextQuery
>;
export type viewerEntriesViaContextLazyQueryHookResult = ReturnType<
  typeof useviewerEntriesViaContextLazyQuery
>;
export type viewerEntriesViaContextQueryResult = Apollo.QueryResult<
  viewerEntriesViaContextQuery,
  viewerEntriesViaContextQueryVariables
>;
export function refetchviewerEntriesViaContextQuery(
  variables: viewerEntriesViaContextQueryVariables
) {
  return { query: viewerEntriesViaContextDocument, variables: variables };
}
export const viewerFieldsConnectionViaContextDocument = gql`
  query viewerFieldsConnectionViaContext(
    $viewerFieldsPaginatedInput: ViewerFieldsPaginatedInput!
  ) {
    viewerFieldsPaginated(
      viewerFieldsPaginatedInput: $viewerFieldsPaginatedInput
    ) {
      pageInfo {
        ...PageInfoPartial
      }
      ...ViewerFieldsPaginatedConnectionPartial
      edges {
        ...ViewerFieldsPaginatedEdgePartial
        node {
          _count {
            ...UserCountPartial
          }
          ...ViewerFieldsPaginatedPartial
          profile {
            ...ProfilePartial
          }
          commentConnection {
            pageInfo {
              ...PageInfoPartial
            }
            ...CommentConnectionPartial
            edges {
              ...CommentEdgePartial
              node {
                ...CommentPartial
              }
            }
          }
          entryConnection {
            pageInfo {
              ...PageInfoPartial
            }
            ...EntryConnectionPartial
            edges {
              ...EntryEdgePartial
              node {
                ...EntryPartial
                _count {
                  ...EntryCountPartial
                }
              }
            }
          }
          sessionConnection {
            pageInfo {
              ...PageInfoPartial
            }
            ...SessionConnectionPartial
            edges {
              ...SessionEdgePartial
              node {
                ...SessionPartial
              }
            }
          }
        }
      }
    }
  }
  ${PageInfoPartialFragmentDoc}
  ${ViewerFieldsPaginatedConnectionPartialFragmentDoc}
  ${ViewerFieldsPaginatedEdgePartialFragmentDoc}
  ${UserCountPartialFragmentDoc}
  ${ViewerFieldsPaginatedPartialFragmentDoc}
  ${ProfilePartialFragmentDoc}
  ${CommentConnectionPartialFragmentDoc}
  ${CommentEdgePartialFragmentDoc}
  ${CommentPartialFragmentDoc}
  ${EntryConnectionPartialFragmentDoc}
  ${EntryEdgePartialFragmentDoc}
  ${EntryPartialFragmentDoc}
  ${EntryCountPartialFragmentDoc}
  ${SessionConnectionPartialFragmentDoc}
  ${SessionEdgePartialFragmentDoc}
  ${SessionPartialFragmentDoc}
`;

/**
 * __useviewerFieldsConnectionViaContextQuery__
 *
 * To run a query within a React component, call `useviewerFieldsConnectionViaContextQuery` and pass it any options that fit your needs.
 * When your component renders, `useviewerFieldsConnectionViaContextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useviewerFieldsConnectionViaContextQuery({
 *   variables: {
 *      viewerFieldsPaginatedInput: // value for 'viewerFieldsPaginatedInput'
 *   },
 * });
 */
export function useviewerFieldsConnectionViaContextQuery(
  baseOptions: Apollo.QueryHookOptions<
    viewerFieldsConnectionViaContextQuery,
    viewerFieldsConnectionViaContextQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    viewerFieldsConnectionViaContextQuery,
    viewerFieldsConnectionViaContextQueryVariables
  >(viewerFieldsConnectionViaContextDocument, options);
}
export function useviewerFieldsConnectionViaContextLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    viewerFieldsConnectionViaContextQuery,
    viewerFieldsConnectionViaContextQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    viewerFieldsConnectionViaContextQuery,
    viewerFieldsConnectionViaContextQueryVariables
  >(viewerFieldsConnectionViaContextDocument, options);
}
export type viewerFieldsConnectionViaContextQueryHookResult = ReturnType<
  typeof useviewerFieldsConnectionViaContextQuery
>;
export type viewerFieldsConnectionViaContextLazyQueryHookResult =
  ReturnType<typeof useviewerFieldsConnectionViaContextLazyQuery>;
export type viewerFieldsConnectionViaContextQueryResult =
  Apollo.QueryResult<
    viewerFieldsConnectionViaContextQuery,
    viewerFieldsConnectionViaContextQueryVariables
  >;
export function refetchviewerFieldsConnectionViaContextQuery(
  variables: viewerFieldsConnectionViaContextQueryVariables
) {
  return {
    query: viewerFieldsConnectionViaContextDocument,
    variables: variables
  };
}
export const viewerAuthFromContextDocument = gql`
  query viewerAuthFromContext {
    viewerAuthInfoFromContext {
      viewerJwt {
        header {
          ...JwtHeadersPartial
        }
        payload {
          ...JwtPayloadPartial
        }
        ...JwtDecodedPartial
      }
      ...ViewerAuthInfoPartial
    }
  }
  ${JwtHeadersPartialFragmentDoc}
  ${JwtPayloadPartialFragmentDoc}
  ${JwtDecodedPartialFragmentDoc}
  ${ViewerAuthInfoPartialFragmentDoc}
`;

/**
 * __useviewerAuthFromContextQuery__
 *
 * To run a query within a React component, call `useviewerAuthFromContextQuery` and pass it any options that fit your needs.
 * When your component renders, `useviewerAuthFromContextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useviewerAuthFromContextQuery({
 *   variables: {
 *   },
 * });
 */
export function useviewerAuthFromContextQuery(
  baseOptions?: Apollo.QueryHookOptions<
    viewerAuthFromContextQuery,
    viewerAuthFromContextQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    viewerAuthFromContextQuery,
    viewerAuthFromContextQueryVariables
  >(viewerAuthFromContextDocument, options);
}
export function useviewerAuthFromContextLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    viewerAuthFromContextQuery,
    viewerAuthFromContextQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    viewerAuthFromContextQuery,
    viewerAuthFromContextQueryVariables
  >(viewerAuthFromContextDocument, options);
}
export type viewerAuthFromContextQueryHookResult = ReturnType<
  typeof useviewerAuthFromContextQuery
>;
export type viewerAuthFromContextLazyQueryHookResult = ReturnType<
  typeof useviewerAuthFromContextLazyQuery
>;
export type viewerAuthFromContextQueryResult = Apollo.QueryResult<
  viewerAuthFromContextQuery,
  viewerAuthFromContextQueryVariables
>;
export function refetchviewerAuthFromContextQuery(
  variables?: viewerAuthFromContextQueryVariables
) {
  return { query: viewerAuthFromContextDocument, variables: variables };
}
export const viewerProfileViaContextDocument = gql`
  query viewerProfileViaContext {
    viewerProfile {
      ...ProfilePartial
      user {
        ...UserPartial
      }
    }
  }
  ${ProfilePartialFragmentDoc}
  ${UserPartialFragmentDoc}
`;

/**
 * __useviewerProfileViaContextQuery__
 *
 * To run a query within a React component, call `useviewerProfileViaContextQuery` and pass it any options that fit your needs.
 * When your component renders, `useviewerProfileViaContextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useviewerProfileViaContextQuery({
 *   variables: {
 *   },
 * });
 */
export function useviewerProfileViaContextQuery(
  baseOptions?: Apollo.QueryHookOptions<
    viewerProfileViaContextQuery,
    viewerProfileViaContextQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    viewerProfileViaContextQuery,
    viewerProfileViaContextQueryVariables
  >(viewerProfileViaContextDocument, options);
}
export function useviewerProfileViaContextLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    viewerProfileViaContextQuery,
    viewerProfileViaContextQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    viewerProfileViaContextQuery,
    viewerProfileViaContextQueryVariables
  >(viewerProfileViaContextDocument, options);
}
export type viewerProfileViaContextQueryHookResult = ReturnType<
  typeof useviewerProfileViaContextQuery
>;
export type viewerProfileViaContextLazyQueryHookResult = ReturnType<
  typeof useviewerProfileViaContextLazyQuery
>;
export type viewerProfileViaContextQueryResult = Apollo.QueryResult<
  viewerProfileViaContextQuery,
  viewerProfileViaContextQueryVariables
>;
export function refetchviewerProfileViaContextQuery(
  variables?: viewerProfileViaContextQueryVariables
) {
  return { query: viewerProfileViaContextDocument, variables: variables };
}
export const viewerSessionsViaContextDocument = gql`
  query viewerSessionsViaContext(
    $findManySessionsInput: FindManySessionsPaginatedInput!
  ) {
    viewerSessionsPaginated(
      viewerSessionssPaginatedInput: $findManySessionsInput
    ) {
      pageInfo {
        ...PageInfoPartial
      }
      ...SessionConnectionPartial
      edges {
        ...SessionEdgePartial
        node {
          ...SessionPartial
        }
      }
    }
  }
  ${PageInfoPartialFragmentDoc}
  ${SessionConnectionPartialFragmentDoc}
  ${SessionEdgePartialFragmentDoc}
  ${SessionPartialFragmentDoc}
`;

/**
 * __useviewerSessionsViaContextQuery__
 *
 * To run a query within a React component, call `useviewerSessionsViaContextQuery` and pass it any options that fit your needs.
 * When your component renders, `useviewerSessionsViaContextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useviewerSessionsViaContextQuery({
 *   variables: {
 *      findManySessionsInput: // value for 'findManySessionsInput'
 *   },
 * });
 */
export function useviewerSessionsViaContextQuery(
  baseOptions: Apollo.QueryHookOptions<
    viewerSessionsViaContextQuery,
    viewerSessionsViaContextQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    viewerSessionsViaContextQuery,
    viewerSessionsViaContextQueryVariables
  >(viewerSessionsViaContextDocument, options);
}
export function useviewerSessionsViaContextLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    viewerSessionsViaContextQuery,
    viewerSessionsViaContextQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    viewerSessionsViaContextQuery,
    viewerSessionsViaContextQueryVariables
  >(viewerSessionsViaContextDocument, options);
}
export type viewerSessionsViaContextQueryHookResult = ReturnType<
  typeof useviewerSessionsViaContextQuery
>;
export type viewerSessionsViaContextLazyQueryHookResult = ReturnType<
  typeof useviewerSessionsViaContextLazyQuery
>;
export type viewerSessionsViaContextQueryResult = Apollo.QueryResult<
  viewerSessionsViaContextQuery,
  viewerSessionsViaContextQueryVariables
>;
export function refetchviewerSessionsViaContextQuery(
  variables: viewerSessionsViaContextQueryVariables
) {
  return { query: viewerSessionsViaContextDocument, variables: variables };
}
export const ViewerDocument = gql`
  query Viewer {
    me {
      auth {
        ...AuthPartial
        user {
          ...UserPartial
          entries {
            ...EntryPartial
            comments {
              ...CommentPartial
            }
          }
        }
        session {
          ...SessionPartial
        }
      }
      jwt {
        header {
          ...JwtHeadersPartial
        }
        payload {
          ...JwtPayloadPartial
        }
        ...JwtDecodedPartial
      }
      __typename
    }
  }
  ${AuthPartialFragmentDoc}
  ${UserPartialFragmentDoc}
  ${EntryPartialFragmentDoc}
  ${CommentPartialFragmentDoc}
  ${SessionPartialFragmentDoc}
  ${JwtHeadersPartialFragmentDoc}
  ${JwtPayloadPartialFragmentDoc}
  ${JwtDecodedPartialFragmentDoc}
`;

/**
 * __useViewerQuery__
 *
 * To run a query within a React component, call `useViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerQuery(
  baseOptions?: Apollo.QueryHookOptions<ViewerQuery, ViewerQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ViewerQuery, ViewerQueryVariables>(
    ViewerDocument,
    options
  );
}
export function useViewerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ViewerQuery,
    ViewerQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ViewerQuery, ViewerQueryVariables>(
    ViewerDocument,
    options
  );
}
export type ViewerQueryHookResult = ReturnType<typeof useViewerQuery>;
export type ViewerLazyQueryHookResult = ReturnType<
  typeof useViewerLazyQuery
>;
export type ViewerQueryResult = Apollo.QueryResult<
  ViewerQuery,
  ViewerQueryVariables
>;
export function refetchViewerQuery(variables?: ViewerQueryVariables) {
  return { query: ViewerDocument, variables: variables };
}
export const namedOperations = {
  Query: {
    categoryByEncodedCursor: "categoryByEncodedCursor",
    commentByEncodedCursor: "commentByEncodedCursor",
    connectionByEncodedCursor: "connectionByEncodedCursor",
    entryByEncodedCursor: "entryByEncodedCursor",
    deriveUserDetailsFromToken: "deriveUserDetailsFromToken",
    listCategories: "listCategories",
    listComments: "listComments",
    listConnections: "listConnections",
    listEntries: "listEntries",
    listMediaItems: "listMediaItems",
    listProfiles: "listProfiles",
    listSessions: "listSessions",
    allUsers: "allUsers",
    profileByEncodedCursor: "profileByEncodedCursor",
    sessionByEncodedCursor: "sessionByEncodedCursor",
    userByEncodedCursor: "userByEncodedCursor",
    userDecodedFromToken: "userDecodedFromToken",
    viewerCommentsViaContext: "viewerCommentsViaContext",
    viewerEntriesViaContext: "viewerEntriesViaContext",
    viewerFieldsConnectionViaContext: "viewerFieldsConnectionViaContext",
    viewerAuthFromContext: "viewerAuthFromContext",
    viewerProfileViaContext: "viewerProfileViaContext",
    viewerSessionsViaContext: "viewerSessionsViaContext",
    Viewer: "Viewer"
  },
  Mutation: {
    changePassword: "changePassword",
    createNewComment: "createNewComment",
    createNewProfile: "createNewProfile",
    createEntry: "createEntry",
    registerNewUser: "registerNewUser",
    signInUser: "signInUser"
  },
  Fragment: {
    AccountPartial: "AccountPartial",
    AuthPartial: "AuthPartial",
    CategoryCountPartial: "CategoryCountPartial",
    CategoryPartial: "CategoryPartial",
    CategoryConnectionPartial: "CategoryConnectionPartial",
    CategoryEdgePartial: "CategoryEdgePartial",
    CommentPartial: "CommentPartial",
    CommentEdgePartial: "CommentEdgePartial",
    CommentConnectionPartial: "CommentConnectionPartial",
    ConnectionPartial: "ConnectionPartial",
    ConnectionConnectionPartial: "ConnectionConnectionPartial",
    ConnectionEdgePartial: "ConnectionEdgePartial",
    EntryCountPartial: "EntryCountPartial",
    EntryPartial: "EntryPartial",
    EntryConnectionPartial: "EntryConnectionPartial",
    EntryEdgePartial: "EntryEdgePartial",
    JwtDecodedPartial: "JwtDecodedPartial",
    JwtHeadersPartial: "JwtHeadersPartial",
    JwtPayloadPartial: "JwtPayloadPartial",
    MediaItemPartial: "MediaItemPartial",
    MediaItemEdgePartial: "MediaItemEdgePartial",
    MediaItemConnectionPartial: "MediaItemConnectionPartial",
    PageInfoPartial: "PageInfoPartial",
    ProfileConnectionPartial: "ProfileConnectionPartial",
    ProfileEdgePartial: "ProfileEdgePartial",
    ProfilePartial: "ProfilePartial",
    SessionPartial: "SessionPartial",
    SessionConnectionPartial: "SessionConnectionPartial",
    SessionEdgePartial: "SessionEdgePartial",
    UserCountPartial: "UserCountPartial",
    UserPartial: "UserPartial",
    UserConnectionPartial: "UserConnectionPartial",
    UserEdgePartial: "UserEdgePartial",
    ViewerAuthInfoPartial: "ViewerAuthInfoPartial",
    ViewerFieldsPaginatedConnectionPartial:
      "ViewerFieldsPaginatedConnectionPartial",
    ViewerFieldsPaginatedEdgePartial: "ViewerFieldsPaginatedEdgePartial",
    ViewerFieldsPaginatedPartial: "ViewerFieldsPaginatedPartial",
    ViewerPartial: "ViewerPartial"
  }
};
