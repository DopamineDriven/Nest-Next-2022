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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: typeof GraphQLJSON;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: typeof GraphQLJSONObject;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: typeof String;
};

export type Account = {
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
  accessToken?: Maybe<FieldWrapper<Scalars["String"]>>;
  refreshToken?: Maybe<FieldWrapper<Scalars["String"]>>;
  session?: Maybe<FieldWrapper<Session>>;
  user: FieldWrapper<User>;
};

export type AuthDetailed = {
  __typename?: "AuthDetailed";
  auth?: Maybe<FieldWrapper<Auth>>;
  jwt?: Maybe<FieldWrapper<JwtDecoded>>;
};

export type AuthSansSession = {
  __typename?: "AuthSansSession";
  accessToken?: Maybe<FieldWrapper<Scalars["String"]>>;
  refreshToken?: Maybe<FieldWrapper<Scalars["String"]>>;
  user?: Maybe<FieldWrapper<User>>;
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

export type Category = {
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
  creator: UserCreateNestedOneWithoutCategoriesInput;
  entryId?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type CategoryListRelationFilter = {
  every?: InputMaybe<CategoryWhereInput>;
  none?: InputMaybe<CategoryWhereInput>;
  some?: InputMaybe<CategoryWhereInput>;
};

export type CategoryOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CategoryWhereInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  creator?: InputMaybe<UserRelationFilter>;
  creatorId?: InputMaybe<StringFilter>;
  entries?: InputMaybe<EntryListRelationFilter>;
  entryId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type CategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type ChangePasswordInput = {
  newPassword: Scalars["String"];
  oldPassword: Scalars["String"];
};

export type Comment = {
  __typename?: "Comment";
  author: FieldWrapper<User>;
  authorId: FieldWrapper<Scalars["String"]>;
  body?: Maybe<FieldWrapper<Scalars["JSONObject"]>>;
  createdAt: FieldWrapper<Scalars["DateTime"]>;
  entry: FieldWrapper<Entry>;
  entryId: FieldWrapper<Scalars["String"]>;
  id: FieldWrapper<Scalars["ID"]>;
  position?: Maybe<FieldWrapper<Scalars["String"]>>;
  reactions?: Maybe<Array<FieldWrapper<CommentReactions>>>;
  updatedAt?: Maybe<FieldWrapper<Scalars["DateTime"]>>;
};

export type CommentAuthorIdEntryIdCompoundUniqueInput = {
  authorId: Scalars["String"];
  entryId: Scalars["String"];
};

export type CommentCreateManyAuthorInput = {
  body?: InputMaybe<Scalars["JSON"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  entryId: Scalars["String"];
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
  authorId: Scalars["String"];
  body?: InputMaybe<Scalars["JSON"]>;
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
  body?: InputMaybe<Scalars["JSON"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  entry: EntryCreateNestedOneWithoutCommentsInput;
  id?: InputMaybe<Scalars["String"]>;
  position?: InputMaybe<Scalars["String"]>;
  reactions?: InputMaybe<CommentCreatereactionsInput>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type CommentCreateWithoutEntryInput = {
  author: UserCreateNestedOneWithoutCommentsInput;
  body?: InputMaybe<Scalars["JSON"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  id?: InputMaybe<Scalars["String"]>;
  position?: InputMaybe<Scalars["String"]>;
  reactions?: InputMaybe<CommentCreatereactionsInput>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type CommentCreatereactionsInput = {
  set: Array<CommentReactions>;
};

export type CommentListRelationFilter = {
  every?: InputMaybe<CommentWhereInput>;
  none?: InputMaybe<CommentWhereInput>;
  some?: InputMaybe<CommentWhereInput>;
};

export type CommentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
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

export type CommentWhereInput = {
  AND?: InputMaybe<Array<CommentWhereInput>>;
  NOT?: InputMaybe<Array<CommentWhereInput>>;
  OR?: InputMaybe<Array<CommentWhereInput>>;
  author?: InputMaybe<UserRelationFilter>;
  authorId?: InputMaybe<StringFilter>;
  body?: InputMaybe<JsonNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  entry?: InputMaybe<EntryRelationFilter>;
  entryId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  position?: InputMaybe<StringNullableFilter>;
  reactions?: InputMaybe<EnumCommentReactionsNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type CommentWhereUniqueInput = {
  authorId_entryId?: InputMaybe<CommentAuthorIdEntryIdCompoundUniqueInput>;
  id?: InputMaybe<Scalars["String"]>;
};

export type Connection = {
  __typename?: "Connection";
  email: FieldWrapper<Scalars["String"]>;
  firstName?: Maybe<FieldWrapper<Scalars["String"]>>;
  id: FieldWrapper<Scalars["ID"]>;
  ip?: Maybe<FieldWrapper<Scalars["String"]>>;
  lastModified?: Maybe<FieldWrapper<Scalars["DateTime"]>>;
  lastName?: Maybe<FieldWrapper<Scalars["String"]>>;
  owner: FieldWrapper<User>;
  ownerId: FieldWrapper<Scalars["String"]>;
  phoneNumber?: Maybe<FieldWrapper<Scalars["PhoneNumber"]>>;
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

export type ConnectionListRelationFilter = {
  every?: InputMaybe<ConnectionWhereInput>;
  none?: InputMaybe<ConnectionWhereInput>;
  some?: InputMaybe<ConnectionWhereInput>;
};

export type ConnectionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

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
  ownerId?: InputMaybe<StringFilter>;
  phoneNumber?: InputMaybe<StringNullableFilter>;
};

export type ConnectionWhereUniqueInput = {
  id?: InputMaybe<Scalars["String"]>;
};

export type ContentNodes = {
  __typename?: "ContentNodes";
  contentNodes: FieldWrapper<BaseTypeNodes>;
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

export type Entry = {
  __typename?: "Entry";
  _count: FieldWrapper<EntryCount>;
  author: FieldWrapper<User>;
  authorId: FieldWrapper<Scalars["String"]>;
  categories?: Maybe<Array<FieldWrapper<Category>>>;
  categoryId?: Maybe<FieldWrapper<Scalars["String"]>>;
  comments?: Maybe<Array<FieldWrapper<Comment>>>;
  content?: Maybe<Array<FieldWrapper<Scalars["JSONObject"]>>>;
  createdAt: FieldWrapper<Scalars["DateTime"]>;
  featuredImage?: Maybe<Array<FieldWrapper<Scalars["JSONObject"]>>>;
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
  content?: InputMaybe<EntryCreateManycontentInput>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  featuredImage?: InputMaybe<EntryCreateManyfeaturedImageInput>;
  id?: InputMaybe<Scalars["String"]>;
  published?: InputMaybe<Scalars["Boolean"]>;
  title: Scalars["String"];
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type EntryCreateManyAuthorInputEnvelope = {
  data: Array<EntryCreateManyAuthorInput>;
  skipDuplicates?: InputMaybe<Scalars["Boolean"]>;
};

export type EntryCreateManycontentInput = {
  set: Array<Scalars["JSON"]>;
};

export type EntryCreateManyfeaturedImageInput = {
  set: Array<Scalars["JSON"]>;
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
  content?: InputMaybe<EntryCreatecontentInput>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  featuredImage?: InputMaybe<EntryCreatefeaturedImageInput>;
  id?: InputMaybe<Scalars["String"]>;
  published?: InputMaybe<Scalars["Boolean"]>;
  title: Scalars["String"];
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type EntryCreateWithoutCategoriesInput = {
  author: UserCreateNestedOneWithoutEntriesInput;
  categoryId?: InputMaybe<Scalars["String"]>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutEntryInput>;
  content?: InputMaybe<EntryCreatecontentInput>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  featuredImage?: InputMaybe<EntryCreatefeaturedImageInput>;
  id?: InputMaybe<Scalars["String"]>;
  published?: InputMaybe<Scalars["Boolean"]>;
  title: Scalars["String"];
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type EntryCreateWithoutCommentsInput = {
  author: UserCreateNestedOneWithoutEntriesInput;
  categories?: InputMaybe<CategoryCreateNestedManyWithoutEntriesInput>;
  categoryId?: InputMaybe<Scalars["String"]>;
  content?: InputMaybe<EntryCreatecontentInput>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  featuredImage?: InputMaybe<EntryCreatefeaturedImageInput>;
  id?: InputMaybe<Scalars["String"]>;
  published?: InputMaybe<Scalars["Boolean"]>;
  title: Scalars["String"];
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type EntryCreatecontentInput = {
  set: Array<Scalars["JSON"]>;
};

export type EntryCreatefeaturedImageInput = {
  set: Array<Scalars["JSON"]>;
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

export type EntryUncheckedCreateNestedManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<EntryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<
    Array<EntryCreateOrConnectWithoutAuthorInput>
  >;
  create?: InputMaybe<Array<EntryCreateWithoutAuthorInput>>;
  createMany?: InputMaybe<EntryCreateManyAuthorInputEnvelope>;
};

export type EntryWhereInput = {
  AND?: InputMaybe<Array<EntryWhereInput>>;
  NOT?: InputMaybe<Array<EntryWhereInput>>;
  OR?: InputMaybe<Array<EntryWhereInput>>;
  author?: InputMaybe<UserRelationFilter>;
  authorId?: InputMaybe<StringFilter>;
  categories?: InputMaybe<CategoryListRelationFilter>;
  categoryId?: InputMaybe<StringNullableFilter>;
  comments?: InputMaybe<CommentListRelationFilter>;
  content?: InputMaybe<JsonNullableListFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  featuredImage?: InputMaybe<JsonNullableListFilter>;
  id?: InputMaybe<StringFilter>;
  published?: InputMaybe<BoolFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type EntryWhereUniqueInput = {
  authorId?: InputMaybe<Scalars["String"]>;
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

export type FindManyMediaItemsInput = {
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

export type FindManyUsersPaginatedInput = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<
    Array<UserOrderByWithRelationAndSearchRelevanceInput>
  >;
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

export type JsonNullableFilter = {
  array_contains?: InputMaybe<Scalars["JSON"]>;
  array_ends_with?: InputMaybe<Scalars["JSON"]>;
  array_starts_with?: InputMaybe<Scalars["JSON"]>;
  equals?: InputMaybe<Scalars["JSON"]>;
  gt?: InputMaybe<Scalars["JSON"]>;
  gte?: InputMaybe<Scalars["JSON"]>;
  lt?: InputMaybe<Scalars["JSON"]>;
  lte?: InputMaybe<Scalars["JSON"]>;
  not?: InputMaybe<Scalars["JSON"]>;
  path?: InputMaybe<Array<Scalars["String"]>>;
  string_contains?: InputMaybe<Scalars["String"]>;
  string_ends_with?: InputMaybe<Scalars["String"]>;
  string_starts_with?: InputMaybe<Scalars["String"]>;
};

export type JsonNullableListFilter = {
  equals?: InputMaybe<Array<Scalars["JSON"]>>;
  has?: InputMaybe<Scalars["JSON"]>;
  hasEvery?: InputMaybe<Array<Scalars["JSON"]>>;
  hasSome?: InputMaybe<Array<Scalars["JSON"]>>;
  isEmpty?: InputMaybe<Scalars["Boolean"]>;
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

export type MediaItem = {
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
  userId: FieldWrapper<Scalars["String"]>;
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
  userId?: InputMaybe<StringFilter>;
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
  createEntry: FieldWrapper<Entry>;
  createNewEntry: FieldWrapper<Entry>;
  createProfile: FieldWrapper<Profile>;
  getUserFromAccessToken: FieldWrapper<User>;
  login: FieldWrapper<Token>;
  register: FieldWrapper<AuthSansSession>;
  registerNewUser: FieldWrapper<AuthDetailed>;
  signin: FieldWrapper<AuthDetailed>;
  signup: FieldWrapper<Token>;
  updateUserPassword: FieldWrapper<User>;
  userFromAccessTokenDecoded: FieldWrapper<AuthDetailed>;
  viewerAuthInfoFromContext: FieldWrapper<ViewerAuthInfo>;
  viewerCreateEntry: FieldWrapper<Entry>;
};

export type MutationchangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};

export type MutationcreateEntryArgs = {
  EntryInput: EntryUncheckedCreateNestedManyWithoutAuthorInput;
};

export type MutationcreateNewEntryArgs = {
  createNewEntryInput: EntryUncheckedCreateNestedManyWithoutAuthorInput;
};

export type MutationcreateProfileArgs = {
  data: ProfileCreateInput;
  userId: Scalars["String"];
};

export type MutationgetUserFromAccessTokenArgs = {
  token: Scalars["String"];
};

export type MutationloginArgs = {
  data: LoginInput;
};

export type MutationregisterArgs = {
  dataRegister: SignupInput;
};

export type MutationregisterNewUserArgs = {
  userCreateInput: UserCreateMutationInput;
};

export type MutationsigninArgs = {
  userloginInput: LoginInput;
};

export type MutationsignupArgs = {
  data: SignupInput;
};

export type MutationupdateUserPasswordArgs = {
  passwordInput: ChangePasswordInput;
};

export type MutationuserFromAccessTokenDecodedArgs = {
  token: Scalars["String"];
};

export type MutationviewerCreateEntryArgs = {
  viewerEntryCreateInput: EntryCreateWithoutAuthorInput;
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

export type Profile = {
  __typename?: "Profile";
  activiyFeed?: Maybe<Array<FieldWrapper<Scalars["JSONObject"]>>>;
  bio?: Maybe<Array<FieldWrapper<Scalars["JSONObject"]>>>;
  city?: Maybe<FieldWrapper<Scalars["String"]>>;
  country?: Maybe<FieldWrapper<Scalars["String"]>>;
  coverPhoto?: Maybe<Array<FieldWrapper<Scalars["JSONObject"]>>>;
  dob?: Maybe<FieldWrapper<Scalars["String"]>>;
  gender?: Maybe<FieldWrapper<Gender>>;
  id: FieldWrapper<Scalars["ID"]>;
  lastSeen?: Maybe<FieldWrapper<Scalars["DateTime"]>>;
  memberSince: FieldWrapper<Scalars["DateTime"]>;
  occupation?: Maybe<FieldWrapper<Scalars["String"]>>;
  phoneNumber?: Maybe<FieldWrapper<Scalars["String"]>>;
  pronouns?: Maybe<FieldWrapper<Pronouns>>;
  recentActivity?: Maybe<Array<FieldWrapper<Scalars["JSONObject"]>>>;
  user: FieldWrapper<User>;
  userId: FieldWrapper<Scalars["String"]>;
  userInProfile: FieldWrapper<User>;
};

export type ProfileConnection = {
  __typename?: "ProfileConnection";
  edges: Array<FieldWrapper<ProfileEdge>>;
  pageInfo: FieldWrapper<PageInfo>;
  totalCount: FieldWrapper<Scalars["Int"]>;
};

export type ProfileCreateInput = {
  activiyFeed?: InputMaybe<ProfileCreateactiviyFeedInput>;
  bio?: InputMaybe<ProfileCreatebioInput>;
  city?: InputMaybe<Scalars["String"]>;
  country?: InputMaybe<Scalars["String"]>;
  coverPhoto?: InputMaybe<ProfileCreatecoverPhotoInput>;
  dob?: InputMaybe<Scalars["String"]>;
  gender?: InputMaybe<Gender>;
  id?: InputMaybe<Scalars["String"]>;
  lastSeen?: InputMaybe<Scalars["DateTime"]>;
  memberSince?: InputMaybe<Scalars["DateTime"]>;
  occupation?: InputMaybe<Scalars["String"]>;
  phoneNumber?: InputMaybe<Scalars["String"]>;
  pronouns?: InputMaybe<Pronouns>;
  recentActivity?: InputMaybe<ProfileCreaterecentActivityInput>;
  user: UserCreateNestedOneWithoutProfileInput;
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
  activiyFeed?: InputMaybe<ProfileCreateactiviyFeedInput>;
  bio?: InputMaybe<ProfileCreatebioInput>;
  city?: InputMaybe<Scalars["String"]>;
  country?: InputMaybe<Scalars["String"]>;
  coverPhoto?: InputMaybe<ProfileCreatecoverPhotoInput>;
  dob?: InputMaybe<Scalars["String"]>;
  gender?: InputMaybe<Gender>;
  id?: InputMaybe<Scalars["String"]>;
  lastSeen?: InputMaybe<Scalars["DateTime"]>;
  memberSince?: InputMaybe<Scalars["DateTime"]>;
  occupation?: InputMaybe<Scalars["String"]>;
  phoneNumber?: InputMaybe<Scalars["String"]>;
  pronouns?: InputMaybe<Pronouns>;
  recentActivity?: InputMaybe<ProfileCreaterecentActivityInput>;
};

export type ProfileCreateactiviyFeedInput = {
  set: Array<Scalars["JSON"]>;
};

export type ProfileCreatebioInput = {
  set: Array<Scalars["JSON"]>;
};

export type ProfileCreatecoverPhotoInput = {
  set: Array<Scalars["JSON"]>;
};

export type ProfileCreaterecentActivityInput = {
  set: Array<Scalars["JSON"]>;
};

export type ProfileEdge = {
  __typename?: "ProfileEdge";
  cursor: FieldWrapper<Scalars["String"]>;
  node: FieldWrapper<Profile>;
};

export enum ProfileOrderByRelevanceFieldEnum {
  city = "city",
  country = "country",
  dob = "dob",
  id = "id",
  occupation = "occupation",
  phoneNumber = "phoneNumber",
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
  activiyFeed?: InputMaybe<JsonNullableListFilter>;
  bio?: InputMaybe<JsonNullableListFilter>;
  city?: InputMaybe<StringNullableFilter>;
  country?: InputMaybe<StringNullableFilter>;
  coverPhoto?: InputMaybe<JsonNullableListFilter>;
  dob?: InputMaybe<StringNullableFilter>;
  gender?: InputMaybe<EnumGenderNullableFilter>;
  id?: InputMaybe<StringFilter>;
  lastSeen?: InputMaybe<DateTimeNullableFilter>;
  memberSince?: InputMaybe<DateTimeFilter>;
  occupation?: InputMaybe<StringNullableFilter>;
  phoneNumber?: InputMaybe<StringNullableFilter>;
  pronouns?: InputMaybe<EnumPronounsNullableFilter>;
  recentActivity?: InputMaybe<JsonNullableListFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ProfileWhereUniqueInput = {
  id?: InputMaybe<Scalars["String"]>;
  userId?: InputMaybe<Scalars["String"]>;
};

export type ProfilesInput = {
  bioFilter?: InputMaybe<JsonNullableFilter>;
  dobFilter?: InputMaybe<StringNullableFilter>;
  genderFilter?: InputMaybe<EnumGenderNullableFilter>;
  orderBy?: InputMaybe<ProfileOrderByWithRelationAndSearchRelevanceInput>;
  paginationArgs?: InputMaybe<PaginationArgsInput>;
  pronounsFilter?: InputMaybe<EnumPronounsNullableFilter>;
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
  contentNodesUnion: FieldWrapper<ContentNodes>;
  entryById: FieldWrapper<Entry>;
  findUniqueMediaItem: FieldWrapper<MediaItem>;
  getViewer: FieldWrapper<AuthDetailed>;
  hello: FieldWrapper<Scalars["String"]>;
  helloWorld: FieldWrapper<Scalars["String"]>;
  listEntries: FieldWrapper<EntryConnection>;
  listMediaItems: FieldWrapper<MediaItemConnection>;
  listProfiles: FieldWrapper<ProfileConnection>;
  listUsers: FieldWrapper<UserConnection>;
  me: FieldWrapper<AuthDetailed>;
  node?: Maybe<FieldWrapper<Node>>;
  profileByRelayId: FieldWrapper<Profile>;
  profiles: FieldWrapper<ProfileConnection>;
  siftEntries: FieldWrapper<EntryConnection>;
  userById: FieldWrapper<User>;
  userByRelayId: FieldWrapper<User>;
  viewer: FieldWrapper<ViewerDetailed>;
  viewerEntriesPaginated: FieldWrapper<EntryConnection>;
};

export type QuerycontentNodesUnionArgs = {
  findManyEntriesPaginatedInput: FindManyEntriessPaginatedInput;
  findManyMediaItemsPaginated?: InputMaybe<FindManyMediaItemsInput>;
  findManyUsersPaginatedInput?: InputMaybe<FindManyUsersPaginatedInput>;
};

export type QueryentryByIdArgs = {
  id: Scalars["String"];
};

export type QueryfindUniqueMediaItemArgs = {
  mediaItemId: Scalars["String"];
};

export type QueryhelloArgs = {
  name: Scalars["String"];
};

export type QuerylistEntriesArgs = {
  findManyEntriesPaginatedInput: FindManyEntriessPaginatedInput;
};

export type QuerylistMediaItemsArgs = {
  findManyMediaItemsPaginated?: InputMaybe<FindManyMediaItemsInput>;
};

export type QuerylistProfilesArgs = {
  findManyProfilesPaginatedInput: FindManyProfilesPaginatedInput;
};

export type QuerylistUsersArgs = {
  findManyUsersPaginatedInput?: InputMaybe<FindManyUsersPaginatedInput>;
};

export type QuerynodeArgs = {
  id: Scalars["ID"];
};

export type QueryprofilesArgs = {
  profilesArgs: ProfilesInput;
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

export type QueryviewerEntriesPaginatedArgs = {
  viewerEntriesPaginatedInput: FindViewerEntriesPaginatedInput;
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

export type Session = {
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
  userId: FieldWrapper<Scalars["String"]>;
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

export type SessionListRelationFilter = {
  every?: InputMaybe<SessionWhereInput>;
  none?: InputMaybe<SessionWhereInput>;
  some?: InputMaybe<SessionWhereInput>;
};

export type SessionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

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
  userId?: InputMaybe<StringFilter>;
};

export type SessionWhereUniqueInput = {
  userId?: InputMaybe<Scalars["String"]>;
};

export type SignupInput = {
  email: Scalars["String"];
  firstName?: InputMaybe<Scalars["String"]>;
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
  entryCreated: FieldWrapper<Entry>;
  profileCreated: FieldWrapper<Profile>;
};

export type Token = {
  __typename?: "Token";
  /** JWT access token */
  accessToken?: Maybe<FieldWrapper<Scalars["String"]>>;
  /** JWT refresh token */
  refreshToken?: Maybe<FieldWrapper<Scalars["String"]>>;
};

export type TypesUnion = Entry | MediaItem | User;

export type User = {
  __typename?: "User";
  _count?: Maybe<FieldWrapper<UserCount>>;
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
  image: Array<FieldWrapper<Scalars["JSONObject"]>>;
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

export type UserCreateMutationInput = {
  accounts?: InputMaybe<AccountCreateNestedManyWithoutUserInput>;
  categories?: InputMaybe<CategoryCreateNestedManyWithoutCreatorInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutAuthorInput>;
  connections?: InputMaybe<ConnectionCreateNestedManyWithoutOwnerInput>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  email: Scalars["String"];
  emailVerified?: InputMaybe<Scalars["DateTime"]>;
  entries?: InputMaybe<EntryCreateNestedManyWithoutAuthorInput>;
  firstName?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  image?: InputMaybe<UserCreateimageInput>;
  lastName?: InputMaybe<Scalars["String"]>;
  mediaItems?: InputMaybe<MediaItemCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars["String"]>;
  profile?: InputMaybe<ProfileCreateNestedOneWithoutUserInput>;
  role?: InputMaybe<Role>;
  sessions?: InputMaybe<SessionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
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

export type UserCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<UserCreateWithoutProfileInput>;
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

export type UserCreateOrConnectWithoutProfileInput = {
  create: UserCreateWithoutProfileInput;
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
  image?: InputMaybe<UserCreateimageInput>;
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
  image?: InputMaybe<UserCreateimageInput>;
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
  image?: InputMaybe<UserCreateimageInput>;
  lastName?: InputMaybe<Scalars["String"]>;
  mediaItems?: InputMaybe<MediaItemCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars["String"]>;
  profile?: InputMaybe<ProfileCreateNestedOneWithoutUserInput>;
  role?: InputMaybe<Role>;
  sessions?: InputMaybe<SessionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type UserCreateWithoutProfileInput = {
  accounts?: InputMaybe<AccountCreateNestedManyWithoutUserInput>;
  categories?: InputMaybe<CategoryCreateNestedManyWithoutCreatorInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutAuthorInput>;
  connections?: InputMaybe<ConnectionCreateNestedManyWithoutOwnerInput>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  email: Scalars["String"];
  emailVerified?: InputMaybe<Scalars["DateTime"]>;
  entries?: InputMaybe<EntryCreateNestedManyWithoutAuthorInput>;
  firstName?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  image?: InputMaybe<UserCreateimageInput>;
  lastName?: InputMaybe<Scalars["String"]>;
  mediaItems?: InputMaybe<MediaItemCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<Role>;
  sessions?: InputMaybe<SessionCreateNestedManyWithoutUserInput>;
  status?: InputMaybe<UserStatus>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type UserCreateimageInput = {
  set: Array<Scalars["JSON"]>;
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
  image?: InputMaybe<JsonNullableListFilter>;
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

export type ViewerDetailed = {
  __typename?: "ViewerDetailed";
  _count?: Maybe<FieldWrapper<UserCount>>;
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
  image: Array<FieldWrapper<Scalars["JSONObject"]>>;
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
  content?: InputMaybe<JsonNullableListFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  featuredImage?: InputMaybe<JsonNullableListFilter>;
  id?: InputMaybe<StringFilter>;
  published?: InputMaybe<BoolFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
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
export const AuthSansSessionPartial = gql`
  fragment AuthSansSessionPartial on AuthSansSession {
    accessToken
    refreshToken
    __typename
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
export const CommentPartial = gql`
  fragment CommentPartial on Comment {
    authorId
    body
    createdAt
    updatedAt
    entryId
    id
    position
    reactions
    __typename
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
export const TokenPartial = gql`
  fragment TokenPartial on Token {
    accessToken
    refreshToken
    __typename
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
export const createUser = gql`
  mutation createUser($createUserInput: SignupInput!) {
    signup(data: $createUserInput) {
      ...TokenPartial
    }
  }
  ${TokenPartial}
`;
export const deriveUserDetailsFromToken = gql`
  mutation deriveUserDetailsFromToken($token: String!) {
    userFromAccessTokenDecoded(token: $token) {
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
export const getUserFromTokenBasic = gql`
  mutation getUserFromTokenBasic($userToken: String!) {
    getUserFromAccessToken(token: $userToken) {
      _count {
        ...UserCountPartial
      }
      ...UserPartial
    }
  }
  ${UserCountPartial}
  ${UserPartial}
`;
export const loginUser = gql`
  mutation loginUser($data: LoginInput!) {
    login(data: $data) {
      ...TokenPartial
    }
  }
  ${TokenPartial}
`;
export const registerUser = gql`
  mutation registerUser($userCreateInput: UserCreateMutationInput!) {
    registerNewUser(userCreateInput: $userCreateInput) {
      auth {
        user {
          profile {
            ...ProfilePartial
          }
          mediaItems {
            ...MediaItemPartial
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
  ${ProfilePartial}
  ${MediaItemPartial}
  ${UserPartial}
  ${AuthPartial}
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
export const viewerAuthFromContext = gql`
  mutation viewerAuthFromContext {
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
export const listEntries = gql`
  query listEntries(
    $findManyEntriesPaginatedInput: FindManyEntriessPaginatedInput!
  ) {
    listEntries(
      findManyEntriesPaginatedInput: $findManyEntriesPaginatedInput
    ) {
      ...EntryConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...EntryEdgePartial
        node {
          ...EntryPartial
        }
      }
    }
  }
  ${EntryConnectionPartial}
  ${PageInfoPartial}
  ${EntryEdgePartial}
  ${EntryPartial}
`;
export const getProfiles = gql`
  query getProfiles($findManyProfiles: FindManyProfilesPaginatedInput!) {
    listProfiles(findManyProfilesPaginatedInput: $findManyProfiles) {
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
`;
export const getMediaItems = gql`
  query getMediaItems(
    $findManyMediaItemsPaginated: FindManyMediaItemsInput!
  ) {
    listMediaItems(
      findManyMediaItemsPaginated: $findManyMediaItemsPaginated
    ) {
      totalCount
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        cursor
        node {
          ...MediaItemPartial
        }
      }
    }
  }
  ${PageInfoPartial}
  ${MediaItemPartial}
`;
export const userByEncodedCursor = gql`
  query userByEncodedCursor($cursor: String!) {
    userByRelayId(cursor: $cursor) {
      ...UserPartial
    }
  }
  ${UserPartial}
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
          entries {
            ...EntryPartial
          }
          profile {
            ...ProfilePartial
          }
          mediaItems {
            ...MediaItemPartial
          }
          ...UserPartial
        }
      }
    }
  }
  ${UserConnectionPartial}
  ${PageInfoPartial}
  ${UserEdgePartial}
  ${EntryPartial}
  ${ProfilePartial}
  ${MediaItemPartial}
  ${UserPartial}
`;
export const Viewer = gql`
  query Viewer {
    me {
      auth {
        ...AuthPartial
        user {
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
      __typename
    }
  }
  ${AuthPartial}
  ${UserPartial}
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
  AuthSansSession: ResolverTypeWrapper<DeepPartial<AuthSansSession>>;
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
  CategoryListRelationFilter: ResolverTypeWrapper<
    DeepPartial<CategoryListRelationFilter>
  >;
  CategoryOrderByRelationAggregateInput: ResolverTypeWrapper<
    DeepPartial<CategoryOrderByRelationAggregateInput>
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
  CommentListRelationFilter: ResolverTypeWrapper<
    DeepPartial<CommentListRelationFilter>
  >;
  CommentOrderByRelationAggregateInput: ResolverTypeWrapper<
    DeepPartial<CommentOrderByRelationAggregateInput>
  >;
  CommentReactions: ResolverTypeWrapper<DeepPartial<CommentReactions>>;
  CommentWhereInput: ResolverTypeWrapper<DeepPartial<CommentWhereInput>>;
  CommentWhereUniqueInput: ResolverTypeWrapper<
    DeepPartial<CommentWhereUniqueInput>
  >;
  Connection: ResolverTypeWrapper<DeepPartial<Connection>>;
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
  ConnectionListRelationFilter: ResolverTypeWrapper<
    DeepPartial<ConnectionListRelationFilter>
  >;
  ConnectionOrderByRelationAggregateInput: ResolverTypeWrapper<
    DeepPartial<ConnectionOrderByRelationAggregateInput>
  >;
  ConnectionWhereInput: ResolverTypeWrapper<
    DeepPartial<ConnectionWhereInput>
  >;
  ConnectionWhereUniqueInput: ResolverTypeWrapper<
    DeepPartial<ConnectionWhereUniqueInput>
  >;
  ContentNodes: ResolverTypeWrapper<DeepPartial<ContentNodes>>;
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
  EntryCreateManycontentInput: ResolverTypeWrapper<
    DeepPartial<EntryCreateManycontentInput>
  >;
  EntryCreateManyfeaturedImageInput: ResolverTypeWrapper<
    DeepPartial<EntryCreateManyfeaturedImageInput>
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
  EntryCreatecontentInput: ResolverTypeWrapper<
    DeepPartial<EntryCreatecontentInput>
  >;
  EntryCreatefeaturedImageInput: ResolverTypeWrapper<
    DeepPartial<EntryCreatefeaturedImageInput>
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
  EntryUncheckedCreateNestedManyWithoutAuthorInput: ResolverTypeWrapper<
    DeepPartial<EntryUncheckedCreateNestedManyWithoutAuthorInput>
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
  FindManyEntriessPaginatedInput: ResolverTypeWrapper<
    DeepPartial<FindManyEntriessPaginatedInput>
  >;
  FindManyMediaItemsInput: ResolverTypeWrapper<
    DeepPartial<FindManyMediaItemsInput>
  >;
  FindManyProfilesPaginatedInput: ResolverTypeWrapper<
    DeepPartial<FindManyProfilesPaginatedInput>
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
  JSON: ResolverTypeWrapper<DeepPartial<Scalars["JSON"]>>;
  JSONObject: ResolverTypeWrapper<DeepPartial<Scalars["JSONObject"]>>;
  JsonNullableFilter: ResolverTypeWrapper<DeepPartial<JsonNullableFilter>>;
  JsonNullableListFilter: ResolverTypeWrapper<
    DeepPartial<JsonNullableListFilter>
  >;
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
  Node: never;
  PageInfo: ResolverTypeWrapper<DeepPartial<PageInfo>>;
  PaginationArgsInput: ResolverTypeWrapper<
    DeepPartial<PaginationArgsInput>
  >;
  PhoneNumber: ResolverTypeWrapper<DeepPartial<Scalars["PhoneNumber"]>>;
  Profile: ResolverTypeWrapper<DeepPartial<Profile>>;
  ProfileConnection: ResolverTypeWrapper<DeepPartial<ProfileConnection>>;
  ProfileCreateInput: ResolverTypeWrapper<DeepPartial<ProfileCreateInput>>;
  ProfileCreateNestedOneWithoutUserInput: ResolverTypeWrapper<
    DeepPartial<ProfileCreateNestedOneWithoutUserInput>
  >;
  ProfileCreateOrConnectWithoutUserInput: ResolverTypeWrapper<
    DeepPartial<ProfileCreateOrConnectWithoutUserInput>
  >;
  ProfileCreateWithoutUserInput: ResolverTypeWrapper<
    DeepPartial<ProfileCreateWithoutUserInput>
  >;
  ProfileCreateactiviyFeedInput: ResolverTypeWrapper<
    DeepPartial<ProfileCreateactiviyFeedInput>
  >;
  ProfileCreatebioInput: ResolverTypeWrapper<
    DeepPartial<ProfileCreatebioInput>
  >;
  ProfileCreatecoverPhotoInput: ResolverTypeWrapper<
    DeepPartial<ProfileCreatecoverPhotoInput>
  >;
  ProfileCreaterecentActivityInput: ResolverTypeWrapper<
    DeepPartial<ProfileCreaterecentActivityInput>
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
  ProfilesInput: ResolverTypeWrapper<DeepPartial<ProfilesInput>>;
  Pronouns: ResolverTypeWrapper<DeepPartial<Pronouns>>;
  Query: ResolverTypeWrapper<{}>;
  QueryMode: ResolverTypeWrapper<DeepPartial<QueryMode>>;
  Role: ResolverTypeWrapper<DeepPartial<Role>>;
  Session: ResolverTypeWrapper<DeepPartial<Session>>;
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
  SessionListRelationFilter: ResolverTypeWrapper<
    DeepPartial<SessionListRelationFilter>
  >;
  SessionOrderByRelationAggregateInput: ResolverTypeWrapper<
    DeepPartial<SessionOrderByRelationAggregateInput>
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
  Token: ResolverTypeWrapper<DeepPartial<Token>>;
  TypesUnion: DeepPartial<
    | ResolversTypes["Entry"]
    | ResolversTypes["MediaItem"]
    | ResolversTypes["User"]
  >;
  User: ResolverTypeWrapper<DeepPartial<User>>;
  UserConnection: ResolverTypeWrapper<DeepPartial<UserConnection>>;
  UserCount: ResolverTypeWrapper<DeepPartial<UserCount>>;
  UserCreateMutationInput: ResolverTypeWrapper<
    DeepPartial<UserCreateMutationInput>
  >;
  UserCreateNestedOneWithoutCategoriesInput: ResolverTypeWrapper<
    DeepPartial<UserCreateNestedOneWithoutCategoriesInput>
  >;
  UserCreateNestedOneWithoutCommentsInput: ResolverTypeWrapper<
    DeepPartial<UserCreateNestedOneWithoutCommentsInput>
  >;
  UserCreateNestedOneWithoutEntriesInput: ResolverTypeWrapper<
    DeepPartial<UserCreateNestedOneWithoutEntriesInput>
  >;
  UserCreateNestedOneWithoutProfileInput: ResolverTypeWrapper<
    DeepPartial<UserCreateNestedOneWithoutProfileInput>
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
  UserCreateOrConnectWithoutProfileInput: ResolverTypeWrapper<
    DeepPartial<UserCreateOrConnectWithoutProfileInput>
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
  UserCreateWithoutProfileInput: ResolverTypeWrapper<
    DeepPartial<UserCreateWithoutProfileInput>
  >;
  UserCreateimageInput: ResolverTypeWrapper<
    DeepPartial<UserCreateimageInput>
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
  AuthSansSession: DeepPartial<AuthSansSession>;
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
  CategoryCount: DeepPartial<CategoryCount>;
  CategoryCreateManyCreatorInput: DeepPartial<CategoryCreateManyCreatorInput>;
  CategoryCreateManyCreatorInputEnvelope: DeepPartial<CategoryCreateManyCreatorInputEnvelope>;
  CategoryCreateNestedManyWithoutCreatorInput: DeepPartial<CategoryCreateNestedManyWithoutCreatorInput>;
  CategoryCreateNestedManyWithoutEntriesInput: DeepPartial<CategoryCreateNestedManyWithoutEntriesInput>;
  CategoryCreateOrConnectWithoutCreatorInput: DeepPartial<CategoryCreateOrConnectWithoutCreatorInput>;
  CategoryCreateOrConnectWithoutEntriesInput: DeepPartial<CategoryCreateOrConnectWithoutEntriesInput>;
  CategoryCreateWithoutCreatorInput: DeepPartial<CategoryCreateWithoutCreatorInput>;
  CategoryCreateWithoutEntriesInput: DeepPartial<CategoryCreateWithoutEntriesInput>;
  CategoryListRelationFilter: DeepPartial<CategoryListRelationFilter>;
  CategoryOrderByRelationAggregateInput: DeepPartial<CategoryOrderByRelationAggregateInput>;
  CategoryWhereInput: DeepPartial<CategoryWhereInput>;
  CategoryWhereUniqueInput: DeepPartial<CategoryWhereUniqueInput>;
  ChangePasswordInput: DeepPartial<ChangePasswordInput>;
  Comment: DeepPartial<Comment>;
  CommentAuthorIdEntryIdCompoundUniqueInput: DeepPartial<CommentAuthorIdEntryIdCompoundUniqueInput>;
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
  CommentListRelationFilter: DeepPartial<CommentListRelationFilter>;
  CommentOrderByRelationAggregateInput: DeepPartial<CommentOrderByRelationAggregateInput>;
  CommentWhereInput: DeepPartial<CommentWhereInput>;
  CommentWhereUniqueInput: DeepPartial<CommentWhereUniqueInput>;
  Connection: DeepPartial<Connection>;
  ConnectionCreateManyOwnerInput: DeepPartial<ConnectionCreateManyOwnerInput>;
  ConnectionCreateManyOwnerInputEnvelope: DeepPartial<ConnectionCreateManyOwnerInputEnvelope>;
  ConnectionCreateNestedManyWithoutOwnerInput: DeepPartial<ConnectionCreateNestedManyWithoutOwnerInput>;
  ConnectionCreateOrConnectWithoutOwnerInput: DeepPartial<ConnectionCreateOrConnectWithoutOwnerInput>;
  ConnectionCreateWithoutOwnerInput: DeepPartial<ConnectionCreateWithoutOwnerInput>;
  ConnectionListRelationFilter: DeepPartial<ConnectionListRelationFilter>;
  ConnectionOrderByRelationAggregateInput: DeepPartial<ConnectionOrderByRelationAggregateInput>;
  ConnectionWhereInput: DeepPartial<ConnectionWhereInput>;
  ConnectionWhereUniqueInput: DeepPartial<ConnectionWhereUniqueInput>;
  ContentNodes: DeepPartial<ContentNodes>;
  DateTime: DeepPartial<Scalars["DateTime"]>;
  DateTimeFilter: DeepPartial<DateTimeFilter>;
  DateTimeNullableFilter: DeepPartial<DateTimeNullableFilter>;
  Entry: DeepPartial<Entry>;
  EntryConnection: DeepPartial<EntryConnection>;
  EntryCount: DeepPartial<EntryCount>;
  EntryCreateManyAuthorInput: DeepPartial<EntryCreateManyAuthorInput>;
  EntryCreateManyAuthorInputEnvelope: DeepPartial<EntryCreateManyAuthorInputEnvelope>;
  EntryCreateManycontentInput: DeepPartial<EntryCreateManycontentInput>;
  EntryCreateManyfeaturedImageInput: DeepPartial<EntryCreateManyfeaturedImageInput>;
  EntryCreateNestedManyWithoutAuthorInput: DeepPartial<EntryCreateNestedManyWithoutAuthorInput>;
  EntryCreateNestedManyWithoutCategoriesInput: DeepPartial<EntryCreateNestedManyWithoutCategoriesInput>;
  EntryCreateNestedOneWithoutCommentsInput: DeepPartial<EntryCreateNestedOneWithoutCommentsInput>;
  EntryCreateOrConnectWithoutAuthorInput: DeepPartial<EntryCreateOrConnectWithoutAuthorInput>;
  EntryCreateOrConnectWithoutCategoriesInput: DeepPartial<EntryCreateOrConnectWithoutCategoriesInput>;
  EntryCreateOrConnectWithoutCommentsInput: DeepPartial<EntryCreateOrConnectWithoutCommentsInput>;
  EntryCreateWithoutAuthorInput: DeepPartial<EntryCreateWithoutAuthorInput>;
  EntryCreateWithoutCategoriesInput: DeepPartial<EntryCreateWithoutCategoriesInput>;
  EntryCreateWithoutCommentsInput: DeepPartial<EntryCreateWithoutCommentsInput>;
  EntryCreatecontentInput: DeepPartial<EntryCreatecontentInput>;
  EntryCreatefeaturedImageInput: DeepPartial<EntryCreatefeaturedImageInput>;
  EntryEdge: DeepPartial<EntryEdge>;
  EntryListRelationFilter: DeepPartial<EntryListRelationFilter>;
  EntryOrderByRelationAggregateInput: DeepPartial<EntryOrderByRelationAggregateInput>;
  EntryOrderByRelevanceInput: DeepPartial<EntryOrderByRelevanceInput>;
  EntryOrderByWithRelationAndSearchRelevanceInput: DeepPartial<EntryOrderByWithRelationAndSearchRelevanceInput>;
  EntryRelationFilter: DeepPartial<EntryRelationFilter>;
  EntryUncheckedCreateNestedManyWithoutAuthorInput: DeepPartial<EntryUncheckedCreateNestedManyWithoutAuthorInput>;
  EntryWhereInput: DeepPartial<EntryWhereInput>;
  EntryWhereUniqueInput: DeepPartial<EntryWhereUniqueInput>;
  EnumCommentReactionsNullableListFilter: DeepPartial<EnumCommentReactionsNullableListFilter>;
  EnumGenderNullableFilter: DeepPartial<EnumGenderNullableFilter>;
  EnumMediaItemDestinationNullableFilter: DeepPartial<EnumMediaItemDestinationNullableFilter>;
  EnumMimeTypesNullableFilter: DeepPartial<EnumMimeTypesNullableFilter>;
  EnumPronounsNullableFilter: DeepPartial<EnumPronounsNullableFilter>;
  EnumRoleNullableFilter: DeepPartial<EnumRoleNullableFilter>;
  EnumUserStatusNullableFilter: DeepPartial<EnumUserStatusNullableFilter>;
  FindManyEntriessPaginatedInput: DeepPartial<FindManyEntriessPaginatedInput>;
  FindManyMediaItemsInput: DeepPartial<FindManyMediaItemsInput>;
  FindManyProfilesPaginatedInput: DeepPartial<FindManyProfilesPaginatedInput>;
  FindManyUsersPaginatedInput: DeepPartial<FindManyUsersPaginatedInput>;
  FindViewerEntriesPaginatedInput: DeepPartial<FindViewerEntriesPaginatedInput>;
  Float: DeepPartial<Scalars["Float"]>;
  FloatNullableFilter: DeepPartial<FloatNullableFilter>;
  ID: DeepPartial<Scalars["ID"]>;
  Int: DeepPartial<Scalars["Int"]>;
  IntNullableFilter: DeepPartial<IntNullableFilter>;
  JSON: DeepPartial<Scalars["JSON"]>;
  JSONObject: DeepPartial<Scalars["JSONObject"]>;
  JsonNullableFilter: DeepPartial<JsonNullableFilter>;
  JsonNullableListFilter: DeepPartial<JsonNullableListFilter>;
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
  Node: never;
  PageInfo: DeepPartial<PageInfo>;
  PaginationArgsInput: DeepPartial<PaginationArgsInput>;
  PhoneNumber: DeepPartial<Scalars["PhoneNumber"]>;
  Profile: DeepPartial<Profile>;
  ProfileConnection: DeepPartial<ProfileConnection>;
  ProfileCreateInput: DeepPartial<ProfileCreateInput>;
  ProfileCreateNestedOneWithoutUserInput: DeepPartial<ProfileCreateNestedOneWithoutUserInput>;
  ProfileCreateOrConnectWithoutUserInput: DeepPartial<ProfileCreateOrConnectWithoutUserInput>;
  ProfileCreateWithoutUserInput: DeepPartial<ProfileCreateWithoutUserInput>;
  ProfileCreateactiviyFeedInput: DeepPartial<ProfileCreateactiviyFeedInput>;
  ProfileCreatebioInput: DeepPartial<ProfileCreatebioInput>;
  ProfileCreatecoverPhotoInput: DeepPartial<ProfileCreatecoverPhotoInput>;
  ProfileCreaterecentActivityInput: DeepPartial<ProfileCreaterecentActivityInput>;
  ProfileEdge: DeepPartial<ProfileEdge>;
  ProfileOrderByRelevanceInput: DeepPartial<ProfileOrderByRelevanceInput>;
  ProfileOrderByWithRelationAndSearchRelevanceInput: DeepPartial<ProfileOrderByWithRelationAndSearchRelevanceInput>;
  ProfileRelationFilter: DeepPartial<ProfileRelationFilter>;
  ProfileWhereInput: DeepPartial<ProfileWhereInput>;
  ProfileWhereUniqueInput: DeepPartial<ProfileWhereUniqueInput>;
  ProfilesInput: DeepPartial<ProfilesInput>;
  Query: {};
  Session: DeepPartial<Session>;
  SessionCreateManyUserInput: DeepPartial<SessionCreateManyUserInput>;
  SessionCreateManyUserInputEnvelope: DeepPartial<SessionCreateManyUserInputEnvelope>;
  SessionCreateManyscopesInput: DeepPartial<SessionCreateManyscopesInput>;
  SessionCreateNestedManyWithoutUserInput: DeepPartial<SessionCreateNestedManyWithoutUserInput>;
  SessionCreateOrConnectWithoutUserInput: DeepPartial<SessionCreateOrConnectWithoutUserInput>;
  SessionCreateWithoutUserInput: DeepPartial<SessionCreateWithoutUserInput>;
  SessionCreatescopesInput: DeepPartial<SessionCreatescopesInput>;
  SessionListRelationFilter: DeepPartial<SessionListRelationFilter>;
  SessionOrderByRelationAggregateInput: DeepPartial<SessionOrderByRelationAggregateInput>;
  SessionWhereInput: DeepPartial<SessionWhereInput>;
  SessionWhereUniqueInput: DeepPartial<SessionWhereUniqueInput>;
  SignupInput: DeepPartial<SignupInput>;
  String: DeepPartial<Scalars["String"]>;
  StringFilter: DeepPartial<StringFilter>;
  StringNullableFilter: DeepPartial<StringNullableFilter>;
  StringNullableListFilter: DeepPartial<StringNullableListFilter>;
  Subscription: {};
  Token: DeepPartial<Token>;
  TypesUnion: DeepPartial<
    | ResolversParentTypes["Entry"]
    | ResolversParentTypes["MediaItem"]
    | ResolversParentTypes["User"]
  >;
  User: DeepPartial<User>;
  UserConnection: DeepPartial<UserConnection>;
  UserCount: DeepPartial<UserCount>;
  UserCreateMutationInput: DeepPartial<UserCreateMutationInput>;
  UserCreateNestedOneWithoutCategoriesInput: DeepPartial<UserCreateNestedOneWithoutCategoriesInput>;
  UserCreateNestedOneWithoutCommentsInput: DeepPartial<UserCreateNestedOneWithoutCommentsInput>;
  UserCreateNestedOneWithoutEntriesInput: DeepPartial<UserCreateNestedOneWithoutEntriesInput>;
  UserCreateNestedOneWithoutProfileInput: DeepPartial<UserCreateNestedOneWithoutProfileInput>;
  UserCreateOrConnectWithoutCategoriesInput: DeepPartial<UserCreateOrConnectWithoutCategoriesInput>;
  UserCreateOrConnectWithoutCommentsInput: DeepPartial<UserCreateOrConnectWithoutCommentsInput>;
  UserCreateOrConnectWithoutEntriesInput: DeepPartial<UserCreateOrConnectWithoutEntriesInput>;
  UserCreateOrConnectWithoutProfileInput: DeepPartial<UserCreateOrConnectWithoutProfileInput>;
  UserCreateWithoutCategoriesInput: DeepPartial<UserCreateWithoutCategoriesInput>;
  UserCreateWithoutCommentsInput: DeepPartial<UserCreateWithoutCommentsInput>;
  UserCreateWithoutEntriesInput: DeepPartial<UserCreateWithoutEntriesInput>;
  UserCreateWithoutProfileInput: DeepPartial<UserCreateWithoutProfileInput>;
  UserCreateimageInput: DeepPartial<UserCreateimageInput>;
  UserEdge: DeepPartial<UserEdge>;
  UserOrderByRelevanceInput: DeepPartial<UserOrderByRelevanceInput>;
  UserOrderByWithRelationAndSearchRelevanceInput: DeepPartial<UserOrderByWithRelationAndSearchRelevanceInput>;
  UserRelationFilter: DeepPartial<UserRelationFilter>;
  UserWhereInput: DeepPartial<UserWhereInput>;
  UserWhereUniqueInput: DeepPartial<UserWhereUniqueInput>;
  ViewerAuthInfo: DeepPartial<ViewerAuthInfo>;
  ViewerDetailed: DeepPartial<ViewerDetailed>;
  ViewerEntriesWhereInput: DeepPartial<ViewerEntriesWhereInput>;
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
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  refreshToken?: Resolver<
    Maybe<ResolversTypes["String"]>,
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

export type AuthSansSessionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["AuthSansSession"] = ResolversParentTypes["AuthSansSession"]
> = ResolversObject<{
  accessToken?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  refreshToken?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
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

export type CategoryCountResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["CategoryCount"] = ResolversParentTypes["CategoryCount"]
> = ResolversObject<{
  entries?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"]
> = ResolversObject<{
  author?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  body?: Resolver<
    Maybe<ResolversTypes["JSONObject"]>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<
    ResolversTypes["DateTime"],
    ParentType,
    ContextType
  >;
  entry?: Resolver<ResolversTypes["Entry"], ParentType, ContextType>;
  entryId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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
  ownerId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  phoneNumber?: Resolver<
    Maybe<ResolversTypes["PhoneNumber"]>,
    ParentType,
    ContextType
  >;
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
  authorId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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
    Maybe<Array<ResolversTypes["JSONObject"]>>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<
    ResolversTypes["DateTime"],
    ParentType,
    ContextType
  >;
  featuredImage?: Resolver<
    Maybe<Array<ResolversTypes["JSONObject"]>>,
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

export interface JSONScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSON"], any> {
  name: "JSON";
}

export interface JSONObjectScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSONObject"], any> {
  name: "JSONObject";
}

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
  userId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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
  createEntry?: Resolver<
    ResolversTypes["Entry"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateEntryArgs, "EntryInput">
  >;
  createNewEntry?: Resolver<
    ResolversTypes["Entry"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateNewEntryArgs, "createNewEntryInput">
  >;
  createProfile?: Resolver<
    ResolversTypes["Profile"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateProfileArgs, "data" | "userId">
  >;
  getUserFromAccessToken?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationgetUserFromAccessTokenArgs, "token">
  >;
  login?: Resolver<
    ResolversTypes["Token"],
    ParentType,
    ContextType,
    RequireFields<MutationloginArgs, "data">
  >;
  register?: Resolver<
    ResolversTypes["AuthSansSession"],
    ParentType,
    ContextType,
    RequireFields<MutationregisterArgs, "dataRegister">
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
  signup?: Resolver<
    ResolversTypes["Token"],
    ParentType,
    ContextType,
    RequireFields<MutationsignupArgs, "data">
  >;
  updateUserPassword?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateUserPasswordArgs, "passwordInput">
  >;
  userFromAccessTokenDecoded?: Resolver<
    ResolversTypes["AuthDetailed"],
    ParentType,
    ContextType,
    RequireFields<MutationuserFromAccessTokenDecodedArgs, "token">
  >;
  viewerAuthInfoFromContext?: Resolver<
    ResolversTypes["ViewerAuthInfo"],
    ParentType,
    ContextType
  >;
  viewerCreateEntry?: Resolver<
    ResolversTypes["Entry"],
    ParentType,
    ContextType,
    RequireFields<MutationviewerCreateEntryArgs, "viewerEntryCreateInput">
  >;
}>;

export type NodeResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Node"] = ResolversParentTypes["Node"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
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
    Maybe<Array<ResolversTypes["JSONObject"]>>,
    ParentType,
    ContextType
  >;
  bio?: Resolver<
    Maybe<Array<ResolversTypes["JSONObject"]>>,
    ParentType,
    ContextType
  >;
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
    Maybe<Array<ResolversTypes["JSONObject"]>>,
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
    Maybe<Array<ResolversTypes["JSONObject"]>>,
    ParentType,
    ContextType
  >;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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
  findUniqueMediaItem?: Resolver<
    ResolversTypes["MediaItem"],
    ParentType,
    ContextType,
    RequireFields<QueryfindUniqueMediaItemArgs, "mediaItemId">
  >;
  getViewer?: Resolver<
    ResolversTypes["AuthDetailed"],
    ParentType,
    ContextType
  >;
  hello?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    RequireFields<QueryhelloArgs, "name">
  >;
  helloWorld?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
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
    RequireFields<QuerylistProfilesArgs, "findManyProfilesPaginatedInput">
  >;
  listUsers?: Resolver<
    ResolversTypes["UserConnection"],
    ParentType,
    ContextType,
    RequireFields<QuerylistUsersArgs, "findManyUsersPaginatedInput">
  >;
  me?: Resolver<ResolversTypes["AuthDetailed"], ParentType, ContextType>;
  node?: Resolver<
    Maybe<ResolversTypes["Node"]>,
    ParentType,
    ContextType,
    RequireFields<QuerynodeArgs, "id">
  >;
  profileByRelayId?: Resolver<
    ResolversTypes["Profile"],
    ParentType,
    ContextType
  >;
  profiles?: Resolver<
    ResolversTypes["ProfileConnection"],
    ParentType,
    ContextType,
    RequireFields<QueryprofilesArgs, "profilesArgs">
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
  viewerEntriesPaginated?: Resolver<
    ResolversTypes["EntryConnection"],
    ParentType,
    ContextType,
    RequireFields<
      QueryviewerEntriesPaginatedArgs,
      "viewerEntriesPaginatedInput"
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
  userId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"]
> = ResolversObject<{
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

export type TokenResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Token"] = ResolversParentTypes["Token"]
> = ResolversObject<{
  accessToken?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  refreshToken?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  _count?: Resolver<
    Maybe<ResolversTypes["UserCount"]>,
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
    Array<ResolversTypes["JSONObject"]>,
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
  _count?: Resolver<
    Maybe<ResolversTypes["UserCount"]>,
    ParentType,
    ContextType
  >;
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
    Array<ResolversTypes["JSONObject"]>,
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

export type Resolvers<ContextType = ResolverContext> = ResolversObject<{
  Account?: AccountResolvers<ContextType>;
  Auth?: AuthResolvers<ContextType>;
  AuthDetailed?: AuthDetailedResolvers<ContextType>;
  AuthSansSession?: AuthSansSessionResolvers<ContextType>;
  BaseTypeNodes?: BaseTypeNodesResolvers<ContextType>;
  BaseTypesEdge?: BaseTypesEdgeResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Category?: CategoryResolvers<ContextType>;
  CategoryCount?: CategoryCountResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
  ContentNodes?: ContentNodesResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Entry?: EntryResolvers<ContextType>;
  EntryConnection?: EntryConnectionResolvers<ContextType>;
  EntryCount?: EntryCountResolvers<ContextType>;
  EntryEdge?: EntryEdgeResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  JwtDecoded?: JwtDecodedResolvers<ContextType>;
  JwtHeaders?: JwtHeadersResolvers<ContextType>;
  JwtPayload?: JwtPayloadResolvers<ContextType>;
  MediaItem?: MediaItemResolvers<ContextType>;
  MediaItemConnection?: MediaItemConnectionResolvers<ContextType>;
  MediaItemEdge?: MediaItemEdgeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PhoneNumber?: GraphQLScalarType;
  Profile?: ProfileResolvers<ContextType>;
  ProfileConnection?: ProfileConnectionResolvers<ContextType>;
  ProfileEdge?: ProfileEdgeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  TypesUnion?: TypesUnionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserCount?: UserCountResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  ViewerAuthInfo?: ViewerAuthInfoResolvers<ContextType>;
  ViewerDetailed?: ViewerDetailedResolvers<ContextType>;
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
  accessToken?: string | null;
  refreshToken?: string | null;
};

export type AuthSansSessionPartialFragment = {
  __typename: "AuthSansSession";
  accessToken?: string | null;
  refreshToken?: string | null;
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

export type CommentPartialFragment = {
  __typename: "Comment";
  authorId: string;
  body?: typeof GraphQLJSONObject | null;
  createdAt: Date;
  updatedAt?: Date | null;
  entryId: string;
  id: string;
  position?: string | null;
  reactions?: Array<CommentReactions> | null;
};

export type ConnectionPartialFragment = {
  __typename: "Connection";
  firstName?: string | null;
  email: string;
  lastName?: string | null;
  id: string;
  ip?: string | null;
  lastModified?: Date | null;
  ownerId: string;
  phoneNumber?: typeof String | null;
};

export type EntryPartialFragment = {
  __typename: "Entry";
  authorId: string;
  content?: Array<typeof GraphQLJSONObject> | null;
  createdAt: Date;
  featuredImage?: Array<typeof GraphQLJSONObject> | null;
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
  userId: string;
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
  activiyFeed?: Array<typeof GraphQLJSONObject> | null;
  bio?: Array<typeof GraphQLJSONObject> | null;
  city?: string | null;
  country?: string | null;
  coverPhoto?: Array<typeof GraphQLJSONObject> | null;
  dob?: string | null;
  gender?: Gender | null;
  id: string;
  lastSeen?: Date | null;
  memberSince: Date;
  occupation?: string | null;
  phoneNumber?: string | null;
  pronouns?: Pronouns | null;
  recentActivity?: Array<typeof GraphQLJSONObject> | null;
  userId: string;
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
  userId: string;
};

export type TokenPartialFragment = {
  __typename: "Token";
  accessToken?: string | null;
  refreshToken?: string | null;
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
  image: Array<typeof GraphQLJSONObject>;
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

export type createUserMutationVariables = Exact<{
  createUserInput: SignupInput;
}>;

export type createUserMutation = {
  __typename?: "Mutation";
  signup: {
    __typename: "Token";
    accessToken?: string | null;
    refreshToken?: string | null;
  };
};

export type deriveUserDetailsFromTokenMutationVariables = Exact<{
  token: Scalars["String"];
}>;

export type deriveUserDetailsFromTokenMutation = {
  __typename?: "Mutation";
  userFromAccessTokenDecoded: {
    __typename: "AuthDetailed";
    auth?: {
      __typename: "Auth";
      accessToken?: string | null;
      refreshToken?: string | null;
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
        userId: string;
      } | null;
      user: {
        __typename: "User";
        createdAt: Date;
        email: string;
        emailVerified?: Date | null;
        id: string;
        image: Array<typeof GraphQLJSONObject>;
        firstName?: string | null;
        lastName?: string | null;
        password: string;
        role?: Role | null;
        status: UserStatus;
        updatedAt?: Date | null;
        _count?: {
          __typename: "UserCount";
          accounts: number;
          categories: number;
          comments: number;
          connections: number;
          mediaItems: number;
          entries: number;
          sessions: number;
        } | null;
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

export type getUserFromTokenBasicMutationVariables = Exact<{
  userToken: Scalars["String"];
}>;

export type getUserFromTokenBasicMutation = {
  __typename?: "Mutation";
  getUserFromAccessToken: {
    __typename: "User";
    createdAt: Date;
    email: string;
    emailVerified?: Date | null;
    id: string;
    image: Array<typeof GraphQLJSONObject>;
    firstName?: string | null;
    lastName?: string | null;
    password: string;
    role?: Role | null;
    status: UserStatus;
    updatedAt?: Date | null;
    _count?: {
      __typename: "UserCount";
      accounts: number;
      categories: number;
      comments: number;
      connections: number;
      mediaItems: number;
      entries: number;
      sessions: number;
    } | null;
  };
};

export type loginUserMutationVariables = Exact<{
  data: LoginInput;
}>;

export type loginUserMutation = {
  __typename?: "Mutation";
  login: {
    __typename: "Token";
    accessToken?: string | null;
    refreshToken?: string | null;
  };
};

export type registerUserMutationVariables = Exact<{
  userCreateInput: UserCreateMutationInput;
}>;

export type registerUserMutation = {
  __typename?: "Mutation";
  registerNewUser: {
    __typename?: "AuthDetailed";
    auth?: {
      __typename: "Auth";
      accessToken?: string | null;
      refreshToken?: string | null;
      user: {
        __typename: "User";
        createdAt: Date;
        email: string;
        emailVerified?: Date | null;
        id: string;
        image: Array<typeof GraphQLJSONObject>;
        firstName?: string | null;
        lastName?: string | null;
        password: string;
        role?: Role | null;
        status: UserStatus;
        updatedAt?: Date | null;
        profile?: {
          __typename: "Profile";
          activiyFeed?: Array<typeof GraphQLJSONObject> | null;
          bio?: Array<typeof GraphQLJSONObject> | null;
          city?: string | null;
          country?: string | null;
          coverPhoto?: Array<typeof GraphQLJSONObject> | null;
          dob?: string | null;
          gender?: Gender | null;
          id: string;
          lastSeen?: Date | null;
          memberSince: Date;
          occupation?: string | null;
          phoneNumber?: string | null;
          pronouns?: Pronouns | null;
          recentActivity?: Array<typeof GraphQLJSONObject> | null;
          userId: string;
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
          userId: string;
          fileLastModified?: Date | null;
        }> | null;
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

export type signInUserMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type signInUserMutation = {
  __typename?: "Mutation";
  signin: {
    __typename: "AuthDetailed";
    auth?: {
      __typename: "Auth";
      accessToken?: string | null;
      refreshToken?: string | null;
      user: {
        __typename: "User";
        createdAt: Date;
        email: string;
        emailVerified?: Date | null;
        id: string;
        image: Array<typeof GraphQLJSONObject>;
        firstName?: string | null;
        lastName?: string | null;
        password: string;
        role?: Role | null;
        status: UserStatus;
        updatedAt?: Date | null;
        _count?: {
          __typename: "UserCount";
          accounts: number;
          categories: number;
          comments: number;
          connections: number;
          mediaItems: number;
          entries: number;
          sessions: number;
        } | null;
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
        userId: string;
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

export type viewerAuthFromContextMutationVariables = Exact<{
  [key: string]: never;
}>;

export type viewerAuthFromContextMutation = {
  __typename?: "Mutation";
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

export type listEntriesQueryVariables = Exact<{
  findManyEntriesPaginatedInput: FindManyEntriessPaginatedInput;
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
        authorId: string;
        content?: Array<typeof GraphQLJSONObject> | null;
        createdAt: Date;
        featuredImage?: Array<typeof GraphQLJSONObject> | null;
        title?: string | null;
        published?: boolean | null;
        id: string;
      };
    }>;
  };
};

export type getProfilesQueryVariables = Exact<{
  findManyProfiles: FindManyProfilesPaginatedInput;
}>;

export type getProfilesQuery = {
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
        activiyFeed?: Array<typeof GraphQLJSONObject> | null;
        bio?: Array<typeof GraphQLJSONObject> | null;
        city?: string | null;
        country?: string | null;
        coverPhoto?: Array<typeof GraphQLJSONObject> | null;
        dob?: string | null;
        gender?: Gender | null;
        id: string;
        lastSeen?: Date | null;
        memberSince: Date;
        occupation?: string | null;
        phoneNumber?: string | null;
        pronouns?: Pronouns | null;
        recentActivity?: Array<typeof GraphQLJSONObject> | null;
        userId: string;
        user: {
          __typename: "User";
          createdAt: Date;
          email: string;
          emailVerified?: Date | null;
          id: string;
          image: Array<typeof GraphQLJSONObject>;
          firstName?: string | null;
          lastName?: string | null;
          password: string;
          role?: Role | null;
          status: UserStatus;
          updatedAt?: Date | null;
        };
      };
    }>;
  };
};

export type getMediaItemsQueryVariables = Exact<{
  findManyMediaItemsPaginated: FindManyMediaItemsInput;
}>;

export type getMediaItemsQuery = {
  __typename?: "Query";
  listMediaItems: {
    __typename?: "MediaItemConnection";
    totalCount: number;
    pageInfo: {
      __typename: "PageInfo";
      startCursor?: string | null;
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Array<{
      __typename?: "MediaItemEdge";
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
        userId: string;
        fileLastModified?: Date | null;
      };
    }>;
  };
};

export type userByEncodedCursorQueryVariables = Exact<{
  cursor: Scalars["String"];
}>;

export type userByEncodedCursorQuery = {
  __typename?: "Query";
  userByRelayId: {
    __typename: "User";
    createdAt: Date;
    email: string;
    emailVerified?: Date | null;
    id: string;
    image: Array<typeof GraphQLJSONObject>;
    firstName?: string | null;
    lastName?: string | null;
    password: string;
    role?: Role | null;
    status: UserStatus;
    updatedAt?: Date | null;
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
        image: Array<typeof GraphQLJSONObject>;
        firstName?: string | null;
        lastName?: string | null;
        password: string;
        role?: Role | null;
        status: UserStatus;
        updatedAt?: Date | null;
        entries?: Array<{
          __typename: "Entry";
          authorId: string;
          content?: Array<typeof GraphQLJSONObject> | null;
          createdAt: Date;
          featuredImage?: Array<typeof GraphQLJSONObject> | null;
          title?: string | null;
          published?: boolean | null;
          id: string;
        }> | null;
        profile?: {
          __typename: "Profile";
          activiyFeed?: Array<typeof GraphQLJSONObject> | null;
          bio?: Array<typeof GraphQLJSONObject> | null;
          city?: string | null;
          country?: string | null;
          coverPhoto?: Array<typeof GraphQLJSONObject> | null;
          dob?: string | null;
          gender?: Gender | null;
          id: string;
          lastSeen?: Date | null;
          memberSince: Date;
          occupation?: string | null;
          phoneNumber?: string | null;
          pronouns?: Pronouns | null;
          recentActivity?: Array<typeof GraphQLJSONObject> | null;
          userId: string;
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
          userId: string;
          fileLastModified?: Date | null;
        }> | null;
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
      accessToken?: string | null;
      refreshToken?: string | null;
      user: {
        __typename: "User";
        createdAt: Date;
        email: string;
        emailVerified?: Date | null;
        id: string;
        image: Array<typeof GraphQLJSONObject>;
        firstName?: string | null;
        lastName?: string | null;
        password: string;
        role?: Role | null;
        status: UserStatus;
        updatedAt?: Date | null;
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
        userId: string;
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
export const AuthSansSessionPartialFragmentDoc = gql`
  fragment AuthSansSessionPartial on AuthSansSession {
    accessToken
    refreshToken
    __typename
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
export const CommentPartialFragmentDoc = gql`
  fragment CommentPartial on Comment {
    authorId
    body
    createdAt
    updatedAt
    entryId
    id
    position
    reactions
    __typename
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
export const TokenPartialFragmentDoc = gql`
  fragment TokenPartial on Token {
    accessToken
    refreshToken
    __typename
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
export const createUserDocument = gql`
  mutation createUser($createUserInput: SignupInput!) {
    signup(data: $createUserInput) {
      ...TokenPartial
    }
  }
  ${TokenPartialFragmentDoc}
`;
export type createUserMutationFn = Apollo.MutationFunction<
  createUserMutation,
  createUserMutationVariables
>;

/**
 * __usecreateUserMutation__
 *
 * To run a mutation, you first call `usecreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usecreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = usecreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function usecreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    createUserMutation,
    createUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    createUserMutation,
    createUserMutationVariables
  >(createUserDocument, options);
}
export type createUserMutationHookResult = ReturnType<
  typeof usecreateUserMutation
>;
export type createUserMutationResult =
  Apollo.MutationResult<createUserMutation>;
export type createUserMutationOptions = Apollo.BaseMutationOptions<
  createUserMutation,
  createUserMutationVariables
>;
export const deriveUserDetailsFromTokenDocument = gql`
  mutation deriveUserDetailsFromToken($token: String!) {
    userFromAccessTokenDecoded(token: $token) {
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
export type deriveUserDetailsFromTokenMutationFn = Apollo.MutationFunction<
  deriveUserDetailsFromTokenMutation,
  deriveUserDetailsFromTokenMutationVariables
>;

/**
 * __usederiveUserDetailsFromTokenMutation__
 *
 * To run a mutation, you first call `usederiveUserDetailsFromTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usederiveUserDetailsFromTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deriveUserDetailsFromTokenMutation, { data, loading, error }] = usederiveUserDetailsFromTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function usederiveUserDetailsFromTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    deriveUserDetailsFromTokenMutation,
    deriveUserDetailsFromTokenMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    deriveUserDetailsFromTokenMutation,
    deriveUserDetailsFromTokenMutationVariables
  >(deriveUserDetailsFromTokenDocument, options);
}
export type deriveUserDetailsFromTokenMutationHookResult = ReturnType<
  typeof usederiveUserDetailsFromTokenMutation
>;
export type deriveUserDetailsFromTokenMutationResult =
  Apollo.MutationResult<deriveUserDetailsFromTokenMutation>;
export type deriveUserDetailsFromTokenMutationOptions =
  Apollo.BaseMutationOptions<
    deriveUserDetailsFromTokenMutation,
    deriveUserDetailsFromTokenMutationVariables
  >;
export const getUserFromTokenBasicDocument = gql`
  mutation getUserFromTokenBasic($userToken: String!) {
    getUserFromAccessToken(token: $userToken) {
      _count {
        ...UserCountPartial
      }
      ...UserPartial
    }
  }
  ${UserCountPartialFragmentDoc}
  ${UserPartialFragmentDoc}
`;
export type getUserFromTokenBasicMutationFn = Apollo.MutationFunction<
  getUserFromTokenBasicMutation,
  getUserFromTokenBasicMutationVariables
>;

/**
 * __usegetUserFromTokenBasicMutation__
 *
 * To run a mutation, you first call `usegetUserFromTokenBasicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usegetUserFromTokenBasicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getUserFromTokenBasicMutation, { data, loading, error }] = usegetUserFromTokenBasicMutation({
 *   variables: {
 *      userToken: // value for 'userToken'
 *   },
 * });
 */
export function usegetUserFromTokenBasicMutation(
  baseOptions?: Apollo.MutationHookOptions<
    getUserFromTokenBasicMutation,
    getUserFromTokenBasicMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    getUserFromTokenBasicMutation,
    getUserFromTokenBasicMutationVariables
  >(getUserFromTokenBasicDocument, options);
}
export type getUserFromTokenBasicMutationHookResult = ReturnType<
  typeof usegetUserFromTokenBasicMutation
>;
export type getUserFromTokenBasicMutationResult =
  Apollo.MutationResult<getUserFromTokenBasicMutation>;
export type getUserFromTokenBasicMutationOptions =
  Apollo.BaseMutationOptions<
    getUserFromTokenBasicMutation,
    getUserFromTokenBasicMutationVariables
  >;
export const loginUserDocument = gql`
  mutation loginUser($data: LoginInput!) {
    login(data: $data) {
      ...TokenPartial
    }
  }
  ${TokenPartialFragmentDoc}
`;
export type loginUserMutationFn = Apollo.MutationFunction<
  loginUserMutation,
  loginUserMutationVariables
>;

/**
 * __useloginUserMutation__
 *
 * To run a mutation, you first call `useloginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useloginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useloginUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useloginUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    loginUserMutation,
    loginUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<loginUserMutation, loginUserMutationVariables>(
    loginUserDocument,
    options
  );
}
export type loginUserMutationHookResult = ReturnType<
  typeof useloginUserMutation
>;
export type loginUserMutationResult =
  Apollo.MutationResult<loginUserMutation>;
export type loginUserMutationOptions = Apollo.BaseMutationOptions<
  loginUserMutation,
  loginUserMutationVariables
>;
export const registerUserDocument = gql`
  mutation registerUser($userCreateInput: UserCreateMutationInput!) {
    registerNewUser(userCreateInput: $userCreateInput) {
      auth {
        user {
          profile {
            ...ProfilePartial
          }
          mediaItems {
            ...MediaItemPartial
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
  ${ProfilePartialFragmentDoc}
  ${MediaItemPartialFragmentDoc}
  ${UserPartialFragmentDoc}
  ${AuthPartialFragmentDoc}
  ${JwtHeadersPartialFragmentDoc}
  ${JwtPayloadPartialFragmentDoc}
  ${JwtDecodedPartialFragmentDoc}
`;
export type registerUserMutationFn = Apollo.MutationFunction<
  registerUserMutation,
  registerUserMutationVariables
>;

/**
 * __useregisterUserMutation__
 *
 * To run a mutation, you first call `useregisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useregisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useregisterUserMutation({
 *   variables: {
 *      userCreateInput: // value for 'userCreateInput'
 *   },
 * });
 */
export function useregisterUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    registerUserMutation,
    registerUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    registerUserMutation,
    registerUserMutationVariables
  >(registerUserDocument, options);
}
export type registerUserMutationHookResult = ReturnType<
  typeof useregisterUserMutation
>;
export type registerUserMutationResult =
  Apollo.MutationResult<registerUserMutation>;
export type registerUserMutationOptions = Apollo.BaseMutationOptions<
  registerUserMutation,
  registerUserMutationVariables
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
export const viewerAuthFromContextDocument = gql`
  mutation viewerAuthFromContext {
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
export type viewerAuthFromContextMutationFn = Apollo.MutationFunction<
  viewerAuthFromContextMutation,
  viewerAuthFromContextMutationVariables
>;

/**
 * __useviewerAuthFromContextMutation__
 *
 * To run a mutation, you first call `useviewerAuthFromContextMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useviewerAuthFromContextMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [viewerAuthFromContextMutation, { data, loading, error }] = useviewerAuthFromContextMutation({
 *   variables: {
 *   },
 * });
 */
export function useviewerAuthFromContextMutation(
  baseOptions?: Apollo.MutationHookOptions<
    viewerAuthFromContextMutation,
    viewerAuthFromContextMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    viewerAuthFromContextMutation,
    viewerAuthFromContextMutationVariables
  >(viewerAuthFromContextDocument, options);
}
export type viewerAuthFromContextMutationHookResult = ReturnType<
  typeof useviewerAuthFromContextMutation
>;
export type viewerAuthFromContextMutationResult =
  Apollo.MutationResult<viewerAuthFromContextMutation>;
export type viewerAuthFromContextMutationOptions =
  Apollo.BaseMutationOptions<
    viewerAuthFromContextMutation,
    viewerAuthFromContextMutationVariables
  >;
export const listEntriesDocument = gql`
  query listEntries(
    $findManyEntriesPaginatedInput: FindManyEntriessPaginatedInput!
  ) {
    listEntries(
      findManyEntriesPaginatedInput: $findManyEntriesPaginatedInput
    ) {
      ...EntryConnectionPartial
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        ...EntryEdgePartial
        node {
          ...EntryPartial
        }
      }
    }
  }
  ${EntryConnectionPartialFragmentDoc}
  ${PageInfoPartialFragmentDoc}
  ${EntryEdgePartialFragmentDoc}
  ${EntryPartialFragmentDoc}
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
 *      findManyEntriesPaginatedInput: // value for 'findManyEntriesPaginatedInput'
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
export const getProfilesDocument = gql`
  query getProfiles($findManyProfiles: FindManyProfilesPaginatedInput!) {
    listProfiles(findManyProfilesPaginatedInput: $findManyProfiles) {
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
`;

/**
 * __usegetProfilesQuery__
 *
 * To run a query within a React component, call `usegetProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `usegetProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usegetProfilesQuery({
 *   variables: {
 *      findManyProfiles: // value for 'findManyProfiles'
 *   },
 * });
 */
export function usegetProfilesQuery(
  baseOptions: Apollo.QueryHookOptions<
    getProfilesQuery,
    getProfilesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<getProfilesQuery, getProfilesQueryVariables>(
    getProfilesDocument,
    options
  );
}
export function usegetProfilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    getProfilesQuery,
    getProfilesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<getProfilesQuery, getProfilesQueryVariables>(
    getProfilesDocument,
    options
  );
}
export type getProfilesQueryHookResult = ReturnType<
  typeof usegetProfilesQuery
>;
export type getProfilesLazyQueryHookResult = ReturnType<
  typeof usegetProfilesLazyQuery
>;
export type getProfilesQueryResult = Apollo.QueryResult<
  getProfilesQuery,
  getProfilesQueryVariables
>;
export function refetchgetProfilesQuery(
  variables: getProfilesQueryVariables
) {
  return { query: getProfilesDocument, variables: variables };
}
export const getMediaItemsDocument = gql`
  query getMediaItems(
    $findManyMediaItemsPaginated: FindManyMediaItemsInput!
  ) {
    listMediaItems(
      findManyMediaItemsPaginated: $findManyMediaItemsPaginated
    ) {
      totalCount
      pageInfo {
        ...PageInfoPartial
      }
      edges {
        cursor
        node {
          ...MediaItemPartial
        }
      }
    }
  }
  ${PageInfoPartialFragmentDoc}
  ${MediaItemPartialFragmentDoc}
`;

/**
 * __usegetMediaItemsQuery__
 *
 * To run a query within a React component, call `usegetMediaItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `usegetMediaItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usegetMediaItemsQuery({
 *   variables: {
 *      findManyMediaItemsPaginated: // value for 'findManyMediaItemsPaginated'
 *   },
 * });
 */
export function usegetMediaItemsQuery(
  baseOptions: Apollo.QueryHookOptions<
    getMediaItemsQuery,
    getMediaItemsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<getMediaItemsQuery, getMediaItemsQueryVariables>(
    getMediaItemsDocument,
    options
  );
}
export function usegetMediaItemsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    getMediaItemsQuery,
    getMediaItemsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    getMediaItemsQuery,
    getMediaItemsQueryVariables
  >(getMediaItemsDocument, options);
}
export type getMediaItemsQueryHookResult = ReturnType<
  typeof usegetMediaItemsQuery
>;
export type getMediaItemsLazyQueryHookResult = ReturnType<
  typeof usegetMediaItemsLazyQuery
>;
export type getMediaItemsQueryResult = Apollo.QueryResult<
  getMediaItemsQuery,
  getMediaItemsQueryVariables
>;
export function refetchgetMediaItemsQuery(
  variables: getMediaItemsQueryVariables
) {
  return { query: getMediaItemsDocument, variables: variables };
}
export const userByEncodedCursorDocument = gql`
  query userByEncodedCursor($cursor: String!) {
    userByRelayId(cursor: $cursor) {
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
 *      cursor: // value for 'cursor'
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
          entries {
            ...EntryPartial
          }
          profile {
            ...ProfilePartial
          }
          mediaItems {
            ...MediaItemPartial
          }
          ...UserPartial
        }
      }
    }
  }
  ${UserConnectionPartialFragmentDoc}
  ${PageInfoPartialFragmentDoc}
  ${UserEdgePartialFragmentDoc}
  ${EntryPartialFragmentDoc}
  ${ProfilePartialFragmentDoc}
  ${MediaItemPartialFragmentDoc}
  ${UserPartialFragmentDoc}
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
export const ViewerDocument = gql`
  query Viewer {
    me {
      auth {
        ...AuthPartial
        user {
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
      __typename
    }
  }
  ${AuthPartialFragmentDoc}
  ${UserPartialFragmentDoc}
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
    listEntries: "listEntries",
    getProfiles: "getProfiles",
    getMediaItems: "getMediaItems",
    userByEncodedCursor: "userByEncodedCursor",
    allUsers: "allUsers",
    Viewer: "Viewer"
  },
  Mutation: {
    createUser: "createUser",
    deriveUserDetailsFromToken: "deriveUserDetailsFromToken",
    getUserFromTokenBasic: "getUserFromTokenBasic",
    loginUser: "loginUser",
    registerUser: "registerUser",
    signInUser: "signInUser",
    viewerAuthFromContext: "viewerAuthFromContext"
  },
  Fragment: {
    AccountPartial: "AccountPartial",
    AuthPartial: "AuthPartial",
    AuthSansSessionPartial: "AuthSansSessionPartial",
    CategoryPartial: "CategoryPartial",
    CommentPartial: "CommentPartial",
    ConnectionPartial: "ConnectionPartial",
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
    TokenPartial: "TokenPartial",
    UserCountPartial: "UserCountPartial",
    UserPartial: "UserPartial",
    UserConnectionPartial: "UserConnectionPartial",
    UserEdgePartial: "UserEdgePartial",
    ViewerAuthInfoPartial: "ViewerAuthInfoPartial",
    ViewerPartial: "ViewerPartial"
  }
};