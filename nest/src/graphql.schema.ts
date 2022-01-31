
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
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

export enum EntryOrderByRelevanceFieldEnum {
    authorId = "authorId",
    categoryId = "categoryId",
    content = "content",
    featuredImage = "featuredImage",
    id = "id",
    title = "title"
}

export enum Gender {
    FEMALE = "FEMALE",
    MALE = "MALE",
    OTHER = "OTHER",
    UNCERTAIN = "UNCERTAIN"
}

export enum ProfileOrderByRelevanceFieldEnum {
    city = "city",
    country = "country",
    coverPhoto = "coverPhoto",
    dob = "dob",
    id = "id",
    occupation = "occupation",
    phoneNumber = "phoneNumber",
    userId = "userId"
}

export enum Pronouns {
    HE_HIM_HIS = "HE_HIM_HIS",
    NOT_LISTED = "NOT_LISTED",
    PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
    SHE_HER_HERS = "SHE_HER_HERS",
    THEY_THEM_THEIRS = "THEY_THEM_THEIRS"
}

export enum Role {
    ADMIN = "ADMIN",
    MAINTAINER = "MAINTAINER",
    SUPERADMIN = "SUPERADMIN",
    USER = "USER"
}

export enum SortOrder {
    asc = "asc",
    desc = "desc"
}

export enum UserOrderByRelevanceFieldEnum {
    email = "email",
    firstName = "firstName",
    id = "id",
    image = "image",
    lastName = "lastName",
    password = "password"
}

export enum UserStatus {
    BANNED = "BANNED",
    DEACTIVATED = "DEACTIVATED",
    DELETED = "DELETED",
    OFFLINE = "OFFLINE",
    ONLINE = "ONLINE",
    SUSPENDED = "SUSPENDED"
}

export class AccountCreateManyUserInput {
    access_token?: Nullable<string>;
    expires_at?: Nullable<number>;
    id?: Nullable<string>;
    id_token?: Nullable<string>;
    oauth_token?: Nullable<string>;
    oauth_token_secret?: Nullable<string>;
    provider: string;
    providerAccountId: string;
    refresh_secret?: Nullable<string>;
    refresh_token?: Nullable<string>;
    scope?: Nullable<string>;
    session_state?: Nullable<string>;
    token_type?: Nullable<string>;
    type: string;
}

export class AccountCreateManyUserInputEnvelope {
    data: AccountCreateManyUserInput[];
    skipDuplicates?: Nullable<boolean>;
}

export class AccountCreateNestedManyWithoutUserInput {
    connect?: Nullable<AccountWhereUniqueInput[]>;
    connectOrCreate?: Nullable<AccountCreateOrConnectWithoutUserInput[]>;
    create?: Nullable<AccountCreateWithoutUserInput[]>;
    createMany?: Nullable<AccountCreateManyUserInputEnvelope>;
}

export class AccountCreateOrConnectWithoutUserInput {
    create: AccountCreateWithoutUserInput;
    where: AccountWhereUniqueInput;
}

export class AccountCreateWithoutUserInput {
    access_token?: Nullable<string>;
    expires_at?: Nullable<number>;
    id?: Nullable<string>;
    id_token?: Nullable<string>;
    oauth_token?: Nullable<string>;
    oauth_token_secret?: Nullable<string>;
    provider: string;
    providerAccountId: string;
    refresh_secret?: Nullable<string>;
    refresh_token?: Nullable<string>;
    scope?: Nullable<string>;
    session_state?: Nullable<string>;
    token_type?: Nullable<string>;
    type: string;
}

export class AccountOrderByRelationAggregateInput {
    _count?: Nullable<SortOrder>;
}

export class AccountProviderProviderAccountIdCompoundUniqueInput {
    provider: string;
    providerAccountId: string;
}

export class AccountWhereUniqueInput {
    id?: Nullable<string>;
    provider_providerAccountId?: Nullable<AccountProviderProviderAccountIdCompoundUniqueInput>;
}

export class CategoryCreateManyCreatorInput {
    createdAt?: Nullable<DateTime>;
    entryId?: Nullable<string>;
    id?: Nullable<string>;
    name: string;
    updatedAt?: Nullable<DateTime>;
}

export class CategoryCreateManyCreatorInputEnvelope {
    data: CategoryCreateManyCreatorInput[];
    skipDuplicates?: Nullable<boolean>;
}

export class CategoryCreateNestedManyWithoutCreatorInput {
    connect?: Nullable<CategoryWhereUniqueInput[]>;
    connectOrCreate?: Nullable<CategoryCreateOrConnectWithoutCreatorInput[]>;
    create?: Nullable<CategoryCreateWithoutCreatorInput[]>;
    createMany?: Nullable<CategoryCreateManyCreatorInputEnvelope>;
}

export class CategoryCreateNestedManyWithoutEntriesInput {
    connect?: Nullable<CategoryWhereUniqueInput[]>;
    connectOrCreate?: Nullable<CategoryCreateOrConnectWithoutEntriesInput[]>;
    create?: Nullable<CategoryCreateWithoutEntriesInput[]>;
}

export class CategoryCreateOrConnectWithoutCreatorInput {
    create: CategoryCreateWithoutCreatorInput;
    where: CategoryWhereUniqueInput;
}

export class CategoryCreateOrConnectWithoutEntriesInput {
    create: CategoryCreateWithoutEntriesInput;
    where: CategoryWhereUniqueInput;
}

export class CategoryCreateWithoutCreatorInput {
    createdAt?: Nullable<DateTime>;
    entries?: Nullable<EntryCreateNestedManyWithoutCategoriesInput>;
    entryId?: Nullable<string>;
    id?: Nullable<string>;
    name: string;
    updatedAt?: Nullable<DateTime>;
}

export class CategoryCreateWithoutEntriesInput {
    createdAt?: Nullable<DateTime>;
    creator: UserCreateNestedOneWithoutCategoriesInput;
    entryId?: Nullable<string>;
    id?: Nullable<string>;
    name: string;
    updatedAt?: Nullable<DateTime>;
}

export class CategoryOrderByRelationAggregateInput {
    _count?: Nullable<SortOrder>;
}

export class CategoryWhereUniqueInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
}

export class ChangePasswordInput {
    newPassword: string;
    oldPassword: string;
}

export class CommentCreateManyAuthorInput {
    body?: Nullable<JSON>;
    createdAt?: Nullable<DateTime>;
    entryId: string;
    id?: Nullable<string>;
    position?: Nullable<string>;
    reactions?: Nullable<CommentCreateManyreactionsInput>;
    updatedAt?: Nullable<DateTime>;
}

export class CommentCreateManyAuthorInputEnvelope {
    data: CommentCreateManyAuthorInput[];
    skipDuplicates?: Nullable<boolean>;
}

export class CommentCreateManyEntryInput {
    authorId: string;
    body?: Nullable<JSON>;
    createdAt?: Nullable<DateTime>;
    id?: Nullable<string>;
    position?: Nullable<string>;
    reactions?: Nullable<CommentCreateManyreactionsInput>;
    updatedAt?: Nullable<DateTime>;
}

export class CommentCreateManyEntryInputEnvelope {
    data: CommentCreateManyEntryInput[];
    skipDuplicates?: Nullable<boolean>;
}

export class CommentCreateManyreactionsInput {
    set: CommentReactions[];
}

export class CommentCreateNestedManyWithoutAuthorInput {
    connect?: Nullable<CommentWhereUniqueInput[]>;
    connectOrCreate?: Nullable<CommentCreateOrConnectWithoutAuthorInput[]>;
    create?: Nullable<CommentCreateWithoutAuthorInput[]>;
    createMany?: Nullable<CommentCreateManyAuthorInputEnvelope>;
}

export class CommentCreateNestedManyWithoutEntryInput {
    connect?: Nullable<CommentWhereUniqueInput[]>;
    connectOrCreate?: Nullable<CommentCreateOrConnectWithoutEntryInput[]>;
    create?: Nullable<CommentCreateWithoutEntryInput[]>;
    createMany?: Nullable<CommentCreateManyEntryInputEnvelope>;
}

export class CommentCreateOrConnectWithoutAuthorInput {
    create: CommentCreateWithoutAuthorInput;
    where: CommentWhereUniqueInput;
}

export class CommentCreateOrConnectWithoutEntryInput {
    create: CommentCreateWithoutEntryInput;
    where: CommentWhereUniqueInput;
}

export class CommentCreateWithoutAuthorInput {
    body?: Nullable<JSON>;
    createdAt?: Nullable<DateTime>;
    entry: EntryCreateNestedOneWithoutCommentsInput;
    id?: Nullable<string>;
    position?: Nullable<string>;
    reactions?: Nullable<CommentCreatereactionsInput>;
    updatedAt?: Nullable<DateTime>;
}

export class CommentCreateWithoutEntryInput {
    author: UserCreateNestedOneWithoutCommentsInput;
    body?: Nullable<JSON>;
    createdAt?: Nullable<DateTime>;
    id?: Nullable<string>;
    position?: Nullable<string>;
    reactions?: Nullable<CommentCreatereactionsInput>;
    updatedAt?: Nullable<DateTime>;
}

export class CommentCreatereactionsInput {
    set: CommentReactions[];
}

export class CommentOrderByRelationAggregateInput {
    _count?: Nullable<SortOrder>;
}

export class CommentWhereUniqueInput {
    id?: Nullable<string>;
}

export class ConnectionCreateManyOwnerInput {
    email: string;
    firstName?: Nullable<string>;
    id?: Nullable<string>;
    ip?: Nullable<string>;
    lastModified?: Nullable<DateTime>;
    lastName?: Nullable<string>;
    phoneNumber?: Nullable<string>;
}

export class ConnectionCreateManyOwnerInputEnvelope {
    data: ConnectionCreateManyOwnerInput[];
    skipDuplicates?: Nullable<boolean>;
}

export class ConnectionCreateNestedManyWithoutOwnerInput {
    connect?: Nullable<ConnectionWhereUniqueInput[]>;
    connectOrCreate?: Nullable<ConnectionCreateOrConnectWithoutOwnerInput[]>;
    create?: Nullable<ConnectionCreateWithoutOwnerInput[]>;
    createMany?: Nullable<ConnectionCreateManyOwnerInputEnvelope>;
}

export class ConnectionCreateOrConnectWithoutOwnerInput {
    create: ConnectionCreateWithoutOwnerInput;
    where: ConnectionWhereUniqueInput;
}

export class ConnectionCreateWithoutOwnerInput {
    email: string;
    firstName?: Nullable<string>;
    id?: Nullable<string>;
    ip?: Nullable<string>;
    lastModified?: Nullable<DateTime>;
    lastName?: Nullable<string>;
    phoneNumber?: Nullable<string>;
}

export class ConnectionOrderByRelationAggregateInput {
    _count?: Nullable<SortOrder>;
}

export class ConnectionWhereUniqueInput {
    id?: Nullable<string>;
}

export class EntryCreateInput {
    author: UserCreateNestedOneWithoutEntriesInput;
    categories?: Nullable<CategoryCreateNestedManyWithoutEntriesInput>;
    categoryId?: Nullable<string>;
    comments?: Nullable<CommentCreateNestedManyWithoutEntryInput>;
    content?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    featuredImage?: Nullable<string>;
    id?: Nullable<string>;
    published?: Nullable<boolean>;
    title: string;
    updatedAt?: Nullable<DateTime>;
}

export class EntryCreateManyAuthorInput {
    categoryId?: Nullable<string>;
    content?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    featuredImage?: Nullable<string>;
    id?: Nullable<string>;
    published?: Nullable<boolean>;
    title: string;
    updatedAt?: Nullable<DateTime>;
}

export class EntryCreateManyAuthorInputEnvelope {
    data: EntryCreateManyAuthorInput[];
    skipDuplicates?: Nullable<boolean>;
}

export class EntryCreateNestedManyWithoutAuthorInput {
    connect?: Nullable<EntryWhereUniqueInput[]>;
    connectOrCreate?: Nullable<EntryCreateOrConnectWithoutAuthorInput[]>;
    create?: Nullable<EntryCreateWithoutAuthorInput[]>;
    createMany?: Nullable<EntryCreateManyAuthorInputEnvelope>;
}

export class EntryCreateNestedManyWithoutCategoriesInput {
    connect?: Nullable<EntryWhereUniqueInput[]>;
    connectOrCreate?: Nullable<EntryCreateOrConnectWithoutCategoriesInput[]>;
    create?: Nullable<EntryCreateWithoutCategoriesInput[]>;
}

export class EntryCreateNestedOneWithoutCommentsInput {
    connect?: Nullable<EntryWhereUniqueInput>;
    connectOrCreate?: Nullable<EntryCreateOrConnectWithoutCommentsInput>;
    create?: Nullable<EntryCreateWithoutCommentsInput>;
}

export class EntryCreateOrConnectWithoutAuthorInput {
    create: EntryCreateWithoutAuthorInput;
    where: EntryWhereUniqueInput;
}

export class EntryCreateOrConnectWithoutCategoriesInput {
    create: EntryCreateWithoutCategoriesInput;
    where: EntryWhereUniqueInput;
}

export class EntryCreateOrConnectWithoutCommentsInput {
    create: EntryCreateWithoutCommentsInput;
    where: EntryWhereUniqueInput;
}

export class EntryCreateWithoutAuthorInput {
    categories?: Nullable<CategoryCreateNestedManyWithoutEntriesInput>;
    categoryId?: Nullable<string>;
    comments?: Nullable<CommentCreateNestedManyWithoutEntryInput>;
    content?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    featuredImage?: Nullable<string>;
    id?: Nullable<string>;
    published?: Nullable<boolean>;
    title: string;
    updatedAt?: Nullable<DateTime>;
}

export class EntryCreateWithoutCategoriesInput {
    author: UserCreateNestedOneWithoutEntriesInput;
    categoryId?: Nullable<string>;
    comments?: Nullable<CommentCreateNestedManyWithoutEntryInput>;
    content?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    featuredImage?: Nullable<string>;
    id?: Nullable<string>;
    published?: Nullable<boolean>;
    title: string;
    updatedAt?: Nullable<DateTime>;
}

export class EntryCreateWithoutCommentsInput {
    author: UserCreateNestedOneWithoutEntriesInput;
    categories?: Nullable<CategoryCreateNestedManyWithoutEntriesInput>;
    categoryId?: Nullable<string>;
    content?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    featuredImage?: Nullable<string>;
    id?: Nullable<string>;
    published?: Nullable<boolean>;
    title: string;
    updatedAt?: Nullable<DateTime>;
}

export class EntryOrderByRelationAggregateInput {
    _count?: Nullable<SortOrder>;
}

export class EntryOrderByRelevanceInput {
    fields: EntryOrderByRelevanceFieldEnum[];
    search: string;
    sort: SortOrder;
}

export class EntryOrderByWithRelationAndSearchRelevanceInput {
    _relevance?: Nullable<EntryOrderByRelevanceInput>;
    author?: Nullable<UserOrderByWithRelationAndSearchRelevanceInput>;
    authorId?: Nullable<SortOrder>;
    categories?: Nullable<CategoryOrderByRelationAggregateInput>;
    categoryId?: Nullable<SortOrder>;
    comments?: Nullable<CommentOrderByRelationAggregateInput>;
    content?: Nullable<SortOrder>;
    createdAt?: Nullable<SortOrder>;
    featuredImage?: Nullable<SortOrder>;
    id?: Nullable<SortOrder>;
    published?: Nullable<SortOrder>;
    title?: Nullable<SortOrder>;
    updatedAt?: Nullable<SortOrder>;
}

export class EntryWhereUniqueInput {
    id?: Nullable<string>;
    title?: Nullable<string>;
}

export class EnumRoleNullableFilter {
    equals?: Nullable<Role>;
    in?: Nullable<Role[]>;
    not?: Nullable<NestedEnumRoleNullableFilter>;
    notIn?: Nullable<Role[]>;
}

export class LoginInput {
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export class NestedEnumRoleNullableFilter {
    equals?: Nullable<Role>;
    in?: Nullable<Role[]>;
    not?: Nullable<NestedEnumRoleNullableFilter>;
    notIn?: Nullable<Role[]>;
}

export class ProfileCreateNestedOneWithoutUserInput {
    connect?: Nullable<ProfileWhereUniqueInput>;
    connectOrCreate?: Nullable<ProfileCreateOrConnectWithoutUserInput>;
    create?: Nullable<ProfileCreateWithoutUserInput>;
}

export class ProfileCreateOrConnectWithoutUserInput {
    create: ProfileCreateWithoutUserInput;
    where: ProfileWhereUniqueInput;
}

export class ProfileCreateWithoutUserInput {
    activiyFeed?: Nullable<ProfileCreateactiviyFeedInput>;
    bio?: Nullable<ProfileCreatebioInput>;
    city?: Nullable<string>;
    country?: Nullable<string>;
    coverPhoto?: Nullable<string>;
    dob?: Nullable<string>;
    gender?: Nullable<Gender>;
    id?: Nullable<string>;
    lastSeen?: Nullable<DateTime>;
    memberSince?: Nullable<DateTime>;
    occupation?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    pronouns?: Nullable<Pronouns>;
    recentActivity?: Nullable<JSON>;
}

export class ProfileCreateactiviyFeedInput {
    set: JSON[];
}

export class ProfileCreatebioInput {
    set: JSON[];
}

export class ProfileOrderByRelevanceInput {
    fields: ProfileOrderByRelevanceFieldEnum[];
    search: string;
    sort: SortOrder;
}

export class ProfileOrderByWithRelationAndSearchRelevanceInput {
    _relevance?: Nullable<ProfileOrderByRelevanceInput>;
    activiyFeed?: Nullable<SortOrder>;
    bio?: Nullable<SortOrder>;
    city?: Nullable<SortOrder>;
    country?: Nullable<SortOrder>;
    coverPhoto?: Nullable<SortOrder>;
    dob?: Nullable<SortOrder>;
    gender?: Nullable<SortOrder>;
    id?: Nullable<SortOrder>;
    lastSeen?: Nullable<SortOrder>;
    memberSince?: Nullable<SortOrder>;
    occupation?: Nullable<SortOrder>;
    phoneNumber?: Nullable<SortOrder>;
    pronouns?: Nullable<SortOrder>;
    recentActivity?: Nullable<SortOrder>;
    user?: Nullable<UserOrderByWithRelationAndSearchRelevanceInput>;
    userId?: Nullable<SortOrder>;
}

export class ProfileWhereUniqueInput {
    id?: Nullable<string>;
    userId?: Nullable<string>;
}

export class SessionCreateManyUserInput {
    accessToken?: Nullable<string>;
    alg?: Nullable<string>;
    exp?: Nullable<number>;
    iat?: Nullable<number>;
    id?: Nullable<string>;
    lastVerified?: Nullable<DateTime>;
    provider?: Nullable<string>;
    refreshToken?: Nullable<string>;
    scopes?: Nullable<SessionCreateManyscopesInput>;
    signature?: Nullable<string>;
    tokenState?: Nullable<string>;
}

export class SessionCreateManyUserInputEnvelope {
    data: SessionCreateManyUserInput[];
    skipDuplicates?: Nullable<boolean>;
}

export class SessionCreateManyscopesInput {
    set: string[];
}

export class SessionCreateNestedManyWithoutUserInput {
    connect?: Nullable<SessionWhereUniqueInput[]>;
    connectOrCreate?: Nullable<SessionCreateOrConnectWithoutUserInput[]>;
    create?: Nullable<SessionCreateWithoutUserInput[]>;
    createMany?: Nullable<SessionCreateManyUserInputEnvelope>;
}

export class SessionCreateOrConnectWithoutUserInput {
    create: SessionCreateWithoutUserInput;
    where: SessionWhereUniqueInput;
}

export class SessionCreateWithoutUserInput {
    accessToken?: Nullable<string>;
    alg?: Nullable<string>;
    exp?: Nullable<number>;
    iat?: Nullable<number>;
    id?: Nullable<string>;
    lastVerified?: Nullable<DateTime>;
    provider?: Nullable<string>;
    refreshToken?: Nullable<string>;
    scopes?: Nullable<SessionCreatescopesInput>;
    signature?: Nullable<string>;
    tokenState?: Nullable<string>;
}

export class SessionCreatescopesInput {
    set: string[];
}

export class SessionOrderByRelationAggregateInput {
    _count?: Nullable<SortOrder>;
}

export class SessionWhereUniqueInput {
    userId?: Nullable<string>;
}

export class SignupInput {
    email: string;
    firstName?: Nullable<string>;
    image?: Nullable<string>;
    lastName?: Nullable<string>;
    password: string;
}

export class UserCreateNestedOneWithoutCategoriesInput {
    connect?: Nullable<UserWhereUniqueInput>;
    connectOrCreate?: Nullable<UserCreateOrConnectWithoutCategoriesInput>;
    create?: Nullable<UserCreateWithoutCategoriesInput>;
}

export class UserCreateNestedOneWithoutCommentsInput {
    connect?: Nullable<UserWhereUniqueInput>;
    connectOrCreate?: Nullable<UserCreateOrConnectWithoutCommentsInput>;
    create?: Nullable<UserCreateWithoutCommentsInput>;
}

export class UserCreateNestedOneWithoutEntriesInput {
    connect?: Nullable<UserWhereUniqueInput>;
    connectOrCreate?: Nullable<UserCreateOrConnectWithoutEntriesInput>;
    create?: Nullable<UserCreateWithoutEntriesInput>;
}

export class UserCreateOrConnectWithoutCategoriesInput {
    create: UserCreateWithoutCategoriesInput;
    where: UserWhereUniqueInput;
}

export class UserCreateOrConnectWithoutCommentsInput {
    create: UserCreateWithoutCommentsInput;
    where: UserWhereUniqueInput;
}

export class UserCreateOrConnectWithoutEntriesInput {
    create: UserCreateWithoutEntriesInput;
    where: UserWhereUniqueInput;
}

export class UserCreateWithoutCategoriesInput {
    accounts?: Nullable<AccountCreateNestedManyWithoutUserInput>;
    comments?: Nullable<CommentCreateNestedManyWithoutAuthorInput>;
    connections?: Nullable<ConnectionCreateNestedManyWithoutOwnerInput>;
    createdAt?: Nullable<DateTime>;
    email: string;
    emailVerified?: Nullable<DateTime>;
    entries?: Nullable<EntryCreateNestedManyWithoutAuthorInput>;
    firstName?: Nullable<string>;
    id?: Nullable<string>;
    image?: Nullable<string>;
    lastName?: Nullable<string>;
    password?: Nullable<string>;
    profile?: Nullable<ProfileCreateNestedOneWithoutUserInput>;
    role?: Nullable<Role>;
    sessions?: Nullable<SessionCreateNestedManyWithoutUserInput>;
    status?: Nullable<UserStatus>;
    updatedAt?: Nullable<DateTime>;
}

export class UserCreateWithoutCommentsInput {
    accounts?: Nullable<AccountCreateNestedManyWithoutUserInput>;
    categories?: Nullable<CategoryCreateNestedManyWithoutCreatorInput>;
    connections?: Nullable<ConnectionCreateNestedManyWithoutOwnerInput>;
    createdAt?: Nullable<DateTime>;
    email: string;
    emailVerified?: Nullable<DateTime>;
    entries?: Nullable<EntryCreateNestedManyWithoutAuthorInput>;
    firstName?: Nullable<string>;
    id?: Nullable<string>;
    image?: Nullable<string>;
    lastName?: Nullable<string>;
    password?: Nullable<string>;
    profile?: Nullable<ProfileCreateNestedOneWithoutUserInput>;
    role?: Nullable<Role>;
    sessions?: Nullable<SessionCreateNestedManyWithoutUserInput>;
    status?: Nullable<UserStatus>;
    updatedAt?: Nullable<DateTime>;
}

export class UserCreateWithoutEntriesInput {
    accounts?: Nullable<AccountCreateNestedManyWithoutUserInput>;
    categories?: Nullable<CategoryCreateNestedManyWithoutCreatorInput>;
    comments?: Nullable<CommentCreateNestedManyWithoutAuthorInput>;
    connections?: Nullable<ConnectionCreateNestedManyWithoutOwnerInput>;
    createdAt?: Nullable<DateTime>;
    email: string;
    emailVerified?: Nullable<DateTime>;
    firstName?: Nullable<string>;
    id?: Nullable<string>;
    image?: Nullable<string>;
    lastName?: Nullable<string>;
    password?: Nullable<string>;
    profile?: Nullable<ProfileCreateNestedOneWithoutUserInput>;
    role?: Nullable<Role>;
    sessions?: Nullable<SessionCreateNestedManyWithoutUserInput>;
    status?: Nullable<UserStatus>;
    updatedAt?: Nullable<DateTime>;
}

export class UserOrderByRelevanceInput {
    fields: UserOrderByRelevanceFieldEnum[];
    search: string;
    sort: SortOrder;
}

export class UserOrderByWithRelationAndSearchRelevanceInput {
    _relevance?: Nullable<UserOrderByRelevanceInput>;
    accounts?: Nullable<AccountOrderByRelationAggregateInput>;
    categories?: Nullable<CategoryOrderByRelationAggregateInput>;
    comments?: Nullable<CommentOrderByRelationAggregateInput>;
    connections?: Nullable<ConnectionOrderByRelationAggregateInput>;
    createdAt?: Nullable<SortOrder>;
    email?: Nullable<SortOrder>;
    emailVerified?: Nullable<SortOrder>;
    entries?: Nullable<EntryOrderByRelationAggregateInput>;
    firstName?: Nullable<SortOrder>;
    id?: Nullable<SortOrder>;
    image?: Nullable<SortOrder>;
    lastName?: Nullable<SortOrder>;
    password?: Nullable<SortOrder>;
    profile?: Nullable<ProfileOrderByWithRelationAndSearchRelevanceInput>;
    role?: Nullable<SortOrder>;
    sessions?: Nullable<SessionOrderByRelationAggregateInput>;
    status?: Nullable<SortOrder>;
    updatedAt?: Nullable<SortOrder>;
}

export class UserWhereUniqueInput {
    email?: Nullable<string>;
    id?: Nullable<string>;
}

export class Account {
    __typename?: 'Account';
    access_token?: Nullable<string>;
    expires_at?: Nullable<number>;
    id: string;
    id_token?: Nullable<string>;
    oauth_token?: Nullable<string>;
    oauth_token_secret?: Nullable<string>;
    provider: string;
    providerAccountId: string;
    refresh_secret?: Nullable<string>;
    refresh_token?: Nullable<string>;
    scope?: Nullable<string>;
    session_state?: Nullable<string>;
    token_type?: Nullable<string>;
    type: string;
    user: User;
    userId: string;
}

export class AuthSansSession {
    __typename?: 'AuthSansSession';
    accessToken?: Nullable<string>;
    refreshToken?: Nullable<string>;
    user?: Nullable<User>;
}

export class Category {
    __typename?: 'Category';
    _count: CategoryCount;
    createdAt?: Nullable<DateTime>;
    creator: User;
    creatorId: string;
    entries?: Nullable<Entry[]>;
    entryId?: Nullable<string>;
    id: string;
    name: string;
    updatedAt?: Nullable<DateTime>;
}

export class CategoryCount {
    __typename?: 'CategoryCount';
    entries: number;
}

export class Comment {
    __typename?: 'Comment';
    author: User;
    authorId: string;
    body?: Nullable<JSONObject>;
    createdAt: DateTime;
    entry: Entry;
    entryId: string;
    id: string;
    position?: Nullable<string>;
    reactions?: Nullable<CommentReactions[]>;
    updatedAt?: Nullable<DateTime>;
}

export class Connection {
    __typename?: 'Connection';
    email: string;
    firstName?: Nullable<string>;
    id: string;
    ip?: Nullable<string>;
    lastModified?: Nullable<DateTime>;
    lastName?: Nullable<string>;
    owner: User;
    ownerId: string;
    phoneNumber?: Nullable<PhoneNumber>;
}

export class Entry {
    __typename?: 'Entry';
    _count: EntryCount;
    author: User;
    authorId: string;
    categories?: Nullable<Category[]>;
    categoryId?: Nullable<string>;
    comments?: Nullable<Comment[]>;
    content?: Nullable<string>;
    createdAt: DateTime;
    featuredImage?: Nullable<string>;
    id: string;
    published?: Nullable<boolean>;
    title?: Nullable<string>;
    updatedAt?: Nullable<DateTime>;
}

export class EntryConnection {
    __typename?: 'EntryConnection';
    edges: EntryEdge[];
    pageInfo: PageInfo;
}

export class EntryCount {
    __typename?: 'EntryCount';
    categories: number;
    comments: number;
}

export class EntryEdge {
    __typename?: 'EntryEdge';
    cursor: string;
    node: Entry;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract changePassword(accessToken: string, data: ChangePasswordInput): User | Promise<User>;

    abstract createEntry(data: EntryCreateInput): Entry | Promise<Entry>;

    abstract getUserFromAccessToken(token: string): User | Promise<User>;

    abstract login(data: LoginInput): Token | Promise<Token>;

    abstract refreshToken(token: string): Token | Promise<Token>;

    abstract register(dataRegister: SignupInput): AuthSansSession | Promise<AuthSansSession>;

    abstract signup(data: SignupInput): Token | Promise<Token>;
}

export class PageInfo {
    __typename?: 'PageInfo';
    endCursor?: Nullable<string>;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: Nullable<string>;
}

export class Profile {
    __typename?: 'Profile';
    activiyFeed?: Nullable<JSONObject[]>;
    bio?: Nullable<JSONObject[]>;
    city?: Nullable<string>;
    country?: Nullable<string>;
    coverPhoto?: Nullable<string>;
    dob?: Nullable<Date>;
    gender?: Nullable<Gender>;
    id: string;
    lastSeen?: Nullable<DateTime>;
    memberSince: DateTime;
    occupation?: Nullable<string>;
    phoneNumber?: Nullable<PhoneNumber>;
    pronouns?: Nullable<Pronouns>;
    recentActivity?: Nullable<JSONObject>;
    user: User;
    userId: string;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract entryById(id: string): Entry | Promise<Entry>;

    abstract entryCursorConnection(after?: Nullable<string>, before?: Nullable<string>, first?: Nullable<number>, last?: Nullable<number>, orderBy?: Nullable<EntryOrderByWithRelationAndSearchRelevanceInput>, query?: Nullable<string>, skip?: Nullable<number>): EntryConnection | Promise<EntryConnection>;

    abstract getViewer(id: string): Viewer | Promise<Viewer>;

    abstract hello(name: string): string | Promise<string>;

    abstract helloWorld(): string | Promise<string>;

    abstract listUsers(after?: Nullable<string>, before?: Nullable<string>, first?: Nullable<number>, last?: Nullable<number>, orderBy?: Nullable<UserOrderByWithRelationAndSearchRelevanceInput>, query?: Nullable<string>, roles?: Nullable<EnumRoleNullableFilter>, skip?: Nullable<number>): UserConnection | Promise<UserConnection>;

    abstract me(): User | Promise<User>;

    abstract userById(id: string): User | Promise<User>;

    abstract userByRelayId(): User | Promise<User>;

    abstract userPosts(userId: string): Entry[] | Promise<Entry[]>;
}

export class Session {
    __typename?: 'Session';
    accessToken?: Nullable<string>;
    alg?: Nullable<string>;
    exp?: Nullable<number>;
    iat?: Nullable<number>;
    id: string;
    lastVerified?: Nullable<DateTime>;
    provider?: Nullable<string>;
    refreshToken?: Nullable<string>;
    scopes?: Nullable<string[]>;
    signature?: Nullable<string>;
    tokenState?: Nullable<string>;
    user?: Nullable<User>;
    userId: string;
}

export abstract class ISubscription {
    __typename?: 'ISubscription';

    abstract entryCreated(): Entry | Promise<Entry>;
}

export class Token {
    __typename?: 'Token';
    accessToken?: Nullable<string>;
    refreshToken?: Nullable<string>;
}

export class User {
    __typename?: 'User';
    accounts?: Nullable<Account[]>;
    categories?: Nullable<Category[]>;
    comments?: Nullable<Comment[]>;
    connections?: Nullable<Connection[]>;
    createdAt: DateTime;
    email: string;
    emailVerified?: Nullable<DateTime>;
    entries?: Nullable<Entry[]>;
    firstName?: Nullable<string>;
    id: string;
    image?: Nullable<string>;
    lastName?: Nullable<string>;
    password: string;
    profile?: Nullable<Profile>;
    role?: Nullable<Role>;
    sessions?: Nullable<Session[]>;
    status: UserStatus;
    updatedAt?: Nullable<DateTime>;
}

export class UserConnection {
    __typename?: 'UserConnection';
    edges: UserEdge[];
    pageInfo: PageInfo;
}

export class UserEdge {
    __typename?: 'UserEdge';
    cursor: string;
    node: User;
}

export class Viewer {
    __typename?: 'Viewer';
    accessToken?: Nullable<string>;
    accounts?: Nullable<Account[]>;
    categories?: Nullable<Category[]>;
    comments?: Nullable<Comment[]>;
    connections?: Nullable<Connection[]>;
    createdAt: DateTime;
    email: string;
    emailVerified?: Nullable<DateTime>;
    entries?: Nullable<Entry[]>;
    firstName?: Nullable<string>;
    id: string;
    image?: Nullable<string>;
    lastName?: Nullable<string>;
    password: string;
    profile?: Nullable<Profile>;
    role?: Nullable<Role>;
    sessions?: Nullable<Session[]>;
    status: UserStatus;
    updatedAt?: Nullable<DateTime>;
}

export type DateTime = any;
export type JSON = any;
export type JSONObject = any;
export type PhoneNumber = any;
type Nullable<T> = T | null;
