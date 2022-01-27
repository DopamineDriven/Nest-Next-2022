
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
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
    accessToken = "accessToken",
    email = "email",
    id = "id",
    image = "image",
    name = "name",
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

export class AccountOrderByRelationAggregateInput {
    _count?: Nullable<SortOrder>;
}

export class CategoryOrderByRelationAggregateInput {
    _count?: Nullable<SortOrder>;
}

export class ChangePasswordInput {
    newPassword: string;
    oldPassword: string;
}

export class CommentOrderByRelationAggregateInput {
    _count?: Nullable<SortOrder>;
}

export class ConnectionOrderByRelationAggregateInput {
    _count?: Nullable<SortOrder>;
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

export class LoginInput {
    email?: Nullable<string>;
    password?: Nullable<string>;
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

export class SessionOrderByRelationAggregateInput {
    _count?: Nullable<SortOrder>;
}

export class SignupInput {
    accessToken?: Nullable<string>;
    email: string;
    image?: Nullable<string>;
    name?: Nullable<string>;
    password: string;
    role?: Nullable<Role>;
    status?: Nullable<UserStatus>;
}

export class UserOrder {
    direction: SortOrder;
}

export class UserOrderByRelevanceInput {
    fields: UserOrderByRelevanceFieldEnum[];
    search: string;
    sort: SortOrder;
}

export class UserOrderByWithRelationAndSearchRelevanceInput {
    _relevance?: Nullable<UserOrderByRelevanceInput>;
    accessToken?: Nullable<SortOrder>;
    accounts?: Nullable<AccountOrderByRelationAggregateInput>;
    categories?: Nullable<CategoryOrderByRelationAggregateInput>;
    comments?: Nullable<CommentOrderByRelationAggregateInput>;
    connections?: Nullable<ConnectionOrderByRelationAggregateInput>;
    createdAt?: Nullable<SortOrder>;
    email?: Nullable<SortOrder>;
    emailVerified?: Nullable<SortOrder>;
    entries?: Nullable<EntryOrderByRelationAggregateInput>;
    id?: Nullable<SortOrder>;
    image?: Nullable<SortOrder>;
    name?: Nullable<SortOrder>;
    password?: Nullable<SortOrder>;
    profile?: Nullable<ProfileOrderByWithRelationAndSearchRelevanceInput>;
    role?: Nullable<SortOrder>;
    sessions?: Nullable<SessionOrderByRelationAggregateInput>;
    status?: Nullable<SortOrder>;
    updatedAt?: Nullable<SortOrder>;
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

export class Auth {
    __typename?: 'Auth';
    accessToken: string;
    refreshToken: string;
    session?: Nullable<Session[]>;
    user?: Nullable<User>;
}

export class AuthDetailed {
    __typename?: 'AuthDetailed';
    auth?: Nullable<Auth>;
    jwt?: Nullable<JwtDecoded>;
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

export class JwtDecoded {
    __typename?: 'JwtDecoded';
    header: JwtHeaders;
    payload: JwtPayload;
    signature: string;
}

export class JwtHeaders {
    __typename?: 'JwtHeaders';
    alg: AlgorithmType;
    typ: string;
}

export class JwtPayload {
    __typename?: 'JwtPayload';
    exp?: Nullable<BigInt>;
    iat?: Nullable<BigInt>;
    userId?: Nullable<string>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract changePassword(data: ChangePasswordInput): User | Promise<User>;

    abstract getUserFromAccessToken(token: string): AuthDetailed | Promise<AuthDetailed>;

    abstract login(data: LoginInput): Auth | Promise<Auth>;

    abstract refreshToken(token: string): Token | Promise<Token>;

    abstract signup(data: SignupInput): Auth | Promise<Auth>;
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

    abstract entriesByStatus(isPublished: boolean): EntryConnection[] | Promise<EntryConnection[]>;

    abstract hello(name: string): string | Promise<string>;

    abstract helloWorld(): string | Promise<string>;

    abstract listUsers(after?: Nullable<string>, before?: Nullable<string>, first?: Nullable<number>, last?: Nullable<number>, orderBy?: Nullable<UserOrder>, query?: Nullable<string>, role?: Nullable<Role>, skip?: Nullable<number>): UserConnection | Promise<UserConnection>;

    abstract me(accessToken: string): User | Promise<User>;

    abstract userById(id: string): User | Promise<User>;

    abstract userByRelayId(): User | Promise<User>;

    abstract userToEntryConnection(after?: Nullable<string>, before?: Nullable<string>, filterByAuthor?: Nullable<string>, first?: Nullable<number>, last?: Nullable<number>, orderBy?: Nullable<EntryOrderByWithRelationAndSearchRelevanceInput>, skip?: Nullable<number>): EntryConnection | Promise<EntryConnection>;
}

export class Session {
    __typename?: 'Session';
    accessToken: string;
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

export class Token {
    __typename?: 'Token';
    accessToken: string;
    refreshToken: string;
}

export class User {
    __typename?: 'User';
    _count: UserCount;
    accessToken?: Nullable<string>;
    accounts?: Nullable<Account[]>;
    categories?: Nullable<Category[]>;
    comments?: Nullable<Comment[]>;
    connections?: Nullable<Connection[]>;
    createdAt: DateTime;
    email?: Nullable<string>;
    emailVerified?: Nullable<DateTime>;
    entries?: Nullable<Entry[]>;
    id: string;
    image?: Nullable<string>;
    name?: Nullable<string>;
    password: string;
    profile?: Nullable<Profile>;
    role: Role;
    sessions?: Nullable<Session[]>;
    status: UserStatus;
    updatedAt?: Nullable<DateTime>;
}

export class UserConnection {
    __typename?: 'UserConnection';
    edges: UserEdge[];
    pageInfo: PageInfo;
}

export class UserCount {
    __typename?: 'UserCount';
    accounts: number;
    categories: number;
    comments: number;
    connections: number;
    entries: number;
    sessions: number;
}

export class UserEdge {
    __typename?: 'UserEdge';
    cursor: string;
    node: User;
}

export type BigInt = any;
export type DateTime = any;
export type JSONObject = any;
export type PhoneNumber = any;
type Nullable<T> = T | null;
