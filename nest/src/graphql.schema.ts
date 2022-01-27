
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

export enum Gender {
    FEMALE = "FEMALE",
    MALE = "MALE",
    OTHER = "OTHER",
    UNCERTAIN = "UNCERTAIN"
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

export enum UserStatus {
    BANNED = "BANNED",
    DEACTIVATED = "DEACTIVATED",
    DELETED = "DELETED",
    OFFLINE = "OFFLINE",
    ONLINE = "ONLINE",
    SUSPENDED = "SUSPENDED"
}

export class ChangePasswordInput {
    newPassword: string;
    oldPassword: string;
}

export class LoginInput {
    email?: Nullable<string>;
    password?: Nullable<string>;
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
    user: User;
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

export class EntryCount {
    __typename?: 'EntryCount';
    categories: number;
    comments: number;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract changePassword(data: ChangePasswordInput): User | Promise<User>;

    abstract getUserFromAccessToken(token: string): User | Promise<User>;

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

    abstract entriesByStatus(isPublished: boolean): User[] | Promise<User[]>;

    abstract hello(name: string): string | Promise<string>;

    abstract helloWorld(): string | Promise<string>;

    abstract listUsers(after?: Nullable<string>, before?: Nullable<string>, first?: Nullable<number>, last?: Nullable<number>, orderBy?: Nullable<UserOrder>, query?: Nullable<string>, role?: Nullable<Role>, skip?: Nullable<number>): UserConnection | Promise<UserConnection>;

    abstract me(accessToken: string): User | Promise<User>;

    abstract userById(id: string): User | Promise<User>;

    abstract userByRelayId(): User | Promise<User>;
}

export class Session {
    __typename?: 'Session';
    expires?: Nullable<DateTime>;
    iat?: Nullable<DateTime>;
    id: string;
    sessionToken?: Nullable<string>;
    user: User;
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

export type DateTime = any;
export type JSONObject = any;
export type PhoneNumber = any;
type Nullable<T> = T | null;
