
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
    id = "id",
    title = "title"
}

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

export enum Gender {
    FEMALE = "FEMALE",
    MALE = "MALE",
    OTHER = "OTHER",
    UNCERTAIN = "UNCERTAIN"
}

export enum MediaItemDestination {
    AVATAR = "AVATAR",
    COMMENT_ATTACHMENT = "COMMENT_ATTACHMENT",
    COVER_IMAGE = "COVER_IMAGE",
    ENTRY_ATTACHMENT = "ENTRY_ATTACHMENT",
    FEATURED_IMAGE = "FEATURED_IMAGE"
}

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

export enum ProfileOrderByRelevanceFieldEnum {
    city = "city",
    country = "country",
    dob = "dob",
    id = "id",
    occupation = "occupation",
    phoneNumber = "phoneNumber",
    userId = "userId"
}

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

export enum Pronouns {
    HE_HIM_HIS = "HE_HIM_HIS",
    NOT_LISTED = "NOT_LISTED",
    PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
    SHE_HER_HERS = "SHE_HER_HERS",
    THEY_THEM_THEIRS = "THEY_THEM_THEIRS"
}

export enum QueryMode {
    "default" = "default",
    insensitive = "insensitive"
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
    lastName = "lastName",
    password = "password"
}

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

export class AccountListRelationFilter {
    every?: Nullable<AccountWhereInput>;
    none?: Nullable<AccountWhereInput>;
    some?: Nullable<AccountWhereInput>;
}

export class AccountOrderByRelationAggregateInput {
    _count?: Nullable<SortOrder>;
}

export class AccountProviderProviderAccountIdCompoundUniqueInput {
    provider: string;
    providerAccountId: string;
}

export class AccountWhereInput {
    AND?: Nullable<AccountWhereInput[]>;
    NOT?: Nullable<AccountWhereInput[]>;
    OR?: Nullable<AccountWhereInput[]>;
    access_token?: Nullable<StringNullableFilter>;
    expires_at?: Nullable<IntNullableFilter>;
    id?: Nullable<StringFilter>;
    id_token?: Nullable<StringNullableFilter>;
    oauth_token?: Nullable<StringNullableFilter>;
    oauth_token_secret?: Nullable<StringNullableFilter>;
    provider?: Nullable<StringFilter>;
    providerAccountId?: Nullable<StringFilter>;
    refresh_secret?: Nullable<StringNullableFilter>;
    refresh_token?: Nullable<StringNullableFilter>;
    scope?: Nullable<StringNullableFilter>;
    session_state?: Nullable<StringNullableFilter>;
    token_type?: Nullable<StringNullableFilter>;
    type?: Nullable<StringFilter>;
    user?: Nullable<UserRelationFilter>;
    userId?: Nullable<StringFilter>;
}

export class AccountWhereUniqueInput {
    id?: Nullable<string>;
    provider_providerAccountId?: Nullable<AccountProviderProviderAccountIdCompoundUniqueInput>;
}

export class BoolFilter {
    equals?: Nullable<boolean>;
    not?: Nullable<NestedBoolFilter>;
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

export class CategoryListRelationFilter {
    every?: Nullable<CategoryWhereInput>;
    none?: Nullable<CategoryWhereInput>;
    some?: Nullable<CategoryWhereInput>;
}

export class CategoryOrderByRelationAggregateInput {
    _count?: Nullable<SortOrder>;
}

export class CategoryWhereInput {
    AND?: Nullable<CategoryWhereInput[]>;
    NOT?: Nullable<CategoryWhereInput[]>;
    OR?: Nullable<CategoryWhereInput[]>;
    createdAt?: Nullable<DateTimeNullableFilter>;
    creator?: Nullable<UserRelationFilter>;
    creatorId?: Nullable<StringFilter>;
    entries?: Nullable<EntryListRelationFilter>;
    entryId?: Nullable<StringNullableFilter>;
    id?: Nullable<StringFilter>;
    name?: Nullable<StringFilter>;
    updatedAt?: Nullable<DateTimeNullableFilter>;
}

export class CategoryWhereUniqueInput {
    id?: Nullable<string>;
    name?: Nullable<string>;
}

export class ChangePasswordInput {
    newPassword: string;
    oldPassword: string;
}

export class CommentAuthorIdEntryIdCompoundUniqueInput {
    authorId: string;
    entryId: string;
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

export class CommentListRelationFilter {
    every?: Nullable<CommentWhereInput>;
    none?: Nullable<CommentWhereInput>;
    some?: Nullable<CommentWhereInput>;
}

export class CommentOrderByRelationAggregateInput {
    _count?: Nullable<SortOrder>;
}

export class CommentWhereInput {
    AND?: Nullable<CommentWhereInput[]>;
    NOT?: Nullable<CommentWhereInput[]>;
    OR?: Nullable<CommentWhereInput[]>;
    author?: Nullable<UserRelationFilter>;
    authorId?: Nullable<StringFilter>;
    body?: Nullable<JsonNullableFilter>;
    createdAt?: Nullable<DateTimeFilter>;
    entry?: Nullable<EntryRelationFilter>;
    entryId?: Nullable<StringFilter>;
    id?: Nullable<StringFilter>;
    position?: Nullable<StringNullableFilter>;
    reactions?: Nullable<EnumCommentReactionsNullableListFilter>;
    updatedAt?: Nullable<DateTimeNullableFilter>;
}

export class CommentWhereUniqueInput {
    authorId_entryId?: Nullable<CommentAuthorIdEntryIdCompoundUniqueInput>;
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

export class ConnectionListRelationFilter {
    every?: Nullable<ConnectionWhereInput>;
    none?: Nullable<ConnectionWhereInput>;
    some?: Nullable<ConnectionWhereInput>;
}

export class ConnectionOrderByRelationAggregateInput {
    _count?: Nullable<SortOrder>;
}

export class ConnectionWhereInput {
    AND?: Nullable<ConnectionWhereInput[]>;
    NOT?: Nullable<ConnectionWhereInput[]>;
    OR?: Nullable<ConnectionWhereInput[]>;
    email?: Nullable<StringFilter>;
    firstName?: Nullable<StringNullableFilter>;
    id?: Nullable<StringFilter>;
    ip?: Nullable<StringNullableFilter>;
    lastModified?: Nullable<DateTimeNullableFilter>;
    lastName?: Nullable<StringNullableFilter>;
    owner?: Nullable<UserRelationFilter>;
    ownerId?: Nullable<StringFilter>;
    phoneNumber?: Nullable<StringNullableFilter>;
}

export class ConnectionWhereUniqueInput {
    id?: Nullable<string>;
}

export class DateTimeFilter {
    equals?: Nullable<DateTime>;
    gt?: Nullable<DateTime>;
    gte?: Nullable<DateTime>;
    in?: Nullable<DateTime[]>;
    lt?: Nullable<DateTime>;
    lte?: Nullable<DateTime>;
    not?: Nullable<NestedDateTimeFilter>;
    notIn?: Nullable<DateTime[]>;
}

export class DateTimeNullableFilter {
    equals?: Nullable<DateTime>;
    gt?: Nullable<DateTime>;
    gte?: Nullable<DateTime>;
    in?: Nullable<DateTime[]>;
    lt?: Nullable<DateTime>;
    lte?: Nullable<DateTime>;
    not?: Nullable<NestedDateTimeNullableFilter>;
    notIn?: Nullable<DateTime[]>;
}

export class EntryCreateInput {
    author: UserCreateNestedOneWithoutEntriesInput;
    categories?: Nullable<CategoryCreateNestedManyWithoutEntriesInput>;
    categoryId?: Nullable<string>;
    comments?: Nullable<CommentCreateNestedManyWithoutEntryInput>;
    content?: Nullable<EntryCreatecontentInput>;
    createdAt?: Nullable<DateTime>;
    featuredImage?: Nullable<EntryCreatefeaturedImageInput>;
    id?: Nullable<string>;
    published?: Nullable<boolean>;
    title: string;
    updatedAt?: Nullable<DateTime>;
}

export class EntryCreateManyAuthorInput {
    categoryId?: Nullable<string>;
    content?: Nullable<EntryCreateManycontentInput>;
    createdAt?: Nullable<DateTime>;
    featuredImage?: Nullable<EntryCreateManyfeaturedImageInput>;
    id?: Nullable<string>;
    published?: Nullable<boolean>;
    title: string;
    updatedAt?: Nullable<DateTime>;
}

export class EntryCreateManyAuthorInputEnvelope {
    data: EntryCreateManyAuthorInput[];
    skipDuplicates?: Nullable<boolean>;
}

export class EntryCreateManycontentInput {
    set: JSON[];
}

export class EntryCreateManyfeaturedImageInput {
    set: JSON[];
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
    content?: Nullable<EntryCreatecontentInput>;
    createdAt?: Nullable<DateTime>;
    featuredImage?: Nullable<EntryCreatefeaturedImageInput>;
    id?: Nullable<string>;
    published?: Nullable<boolean>;
    title: string;
    updatedAt?: Nullable<DateTime>;
}

export class EntryCreateWithoutCategoriesInput {
    author: UserCreateNestedOneWithoutEntriesInput;
    categoryId?: Nullable<string>;
    comments?: Nullable<CommentCreateNestedManyWithoutEntryInput>;
    content?: Nullable<EntryCreatecontentInput>;
    createdAt?: Nullable<DateTime>;
    featuredImage?: Nullable<EntryCreatefeaturedImageInput>;
    id?: Nullable<string>;
    published?: Nullable<boolean>;
    title: string;
    updatedAt?: Nullable<DateTime>;
}

export class EntryCreateWithoutCommentsInput {
    author: UserCreateNestedOneWithoutEntriesInput;
    categories?: Nullable<CategoryCreateNestedManyWithoutEntriesInput>;
    categoryId?: Nullable<string>;
    content?: Nullable<EntryCreatecontentInput>;
    createdAt?: Nullable<DateTime>;
    featuredImage?: Nullable<EntryCreatefeaturedImageInput>;
    id?: Nullable<string>;
    published?: Nullable<boolean>;
    title: string;
    updatedAt?: Nullable<DateTime>;
}

export class EntryCreatecontentInput {
    set: JSON[];
}

export class EntryCreatefeaturedImageInput {
    set: JSON[];
}

export class EntryListRelationFilter {
    every?: Nullable<EntryWhereInput>;
    none?: Nullable<EntryWhereInput>;
    some?: Nullable<EntryWhereInput>;
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

export class EntryRelationFilter {
    is?: Nullable<EntryWhereInput>;
    isNot?: Nullable<EntryWhereInput>;
}

export class EntryWhereInput {
    AND?: Nullable<EntryWhereInput[]>;
    NOT?: Nullable<EntryWhereInput[]>;
    OR?: Nullable<EntryWhereInput[]>;
    author?: Nullable<UserRelationFilter>;
    authorId?: Nullable<StringFilter>;
    categories?: Nullable<CategoryListRelationFilter>;
    categoryId?: Nullable<StringNullableFilter>;
    comments?: Nullable<CommentListRelationFilter>;
    content?: Nullable<JsonNullableListFilter>;
    createdAt?: Nullable<DateTimeFilter>;
    featuredImage?: Nullable<JsonNullableListFilter>;
    id?: Nullable<StringFilter>;
    published?: Nullable<BoolFilter>;
    title?: Nullable<StringFilter>;
    updatedAt?: Nullable<DateTimeNullableFilter>;
}

export class EntryWhereUniqueInput {
    authorId?: Nullable<string>;
    id?: Nullable<string>;
}

export class EnumCommentReactionsNullableListFilter {
    equals?: Nullable<CommentReactions[]>;
    has?: Nullable<CommentReactions>;
    hasEvery?: Nullable<CommentReactions[]>;
    hasSome?: Nullable<CommentReactions[]>;
    isEmpty?: Nullable<boolean>;
}

export class EnumGenderNullableFilter {
    equals?: Nullable<Gender>;
    in?: Nullable<Gender[]>;
    not?: Nullable<NestedEnumGenderNullableFilter>;
    notIn?: Nullable<Gender[]>;
}

export class EnumMediaItemDestinationNullableFilter {
    equals?: Nullable<MediaItemDestination>;
    in?: Nullable<MediaItemDestination[]>;
    not?: Nullable<NestedEnumMediaItemDestinationNullableFilter>;
    notIn?: Nullable<MediaItemDestination[]>;
}

export class EnumMimeTypesNullableFilter {
    equals?: Nullable<MimeTypes>;
    in?: Nullable<MimeTypes[]>;
    not?: Nullable<NestedEnumMimeTypesNullableFilter>;
    notIn?: Nullable<MimeTypes[]>;
}

export class EnumPronounsNullableFilter {
    equals?: Nullable<Pronouns>;
    in?: Nullable<Pronouns[]>;
    not?: Nullable<NestedEnumPronounsNullableFilter>;
    notIn?: Nullable<Pronouns[]>;
}

export class EnumRoleNullableFilter {
    equals?: Nullable<Role>;
    in?: Nullable<Role[]>;
    not?: Nullable<NestedEnumRoleNullableFilter>;
    notIn?: Nullable<Role[]>;
}

export class EnumUserStatusNullableFilter {
    equals?: Nullable<UserStatus>;
    in?: Nullable<UserStatus[]>;
    not?: Nullable<NestedEnumUserStatusNullableFilter>;
    notIn?: Nullable<UserStatus[]>;
}

export class FindManyEntriessPaginatedInput {
    cursor?: Nullable<EntryWhereUniqueInput>;
    distinct?: Nullable<EntryScalarFieldEnum[]>;
    orderBy?: Nullable<EntryOrderByWithRelationAndSearchRelevanceInput[]>;
    pagination: PaginationArgsInput;
    skip?: Nullable<number>;
    take?: Nullable<number>;
    where?: Nullable<EntryWhereInput>;
}

export class FindManyMediaItemsInput {
    cursor?: Nullable<MediaItemWhereUniqueInput>;
    distinct?: Nullable<MediaItemScalarFieldEnum[]>;
    orderBy?: Nullable<MediaItemOrderByWithRelationAndSearchRelevanceInput[]>;
    pagination?: Nullable<PaginationArgsInput>;
    skip?: Nullable<number>;
    take?: Nullable<number>;
    where?: Nullable<MediaItemWhereInput>;
}

export class FindManyProfilesPaginatedInput {
    cursor?: Nullable<ProfileWhereUniqueInput>;
    distinct?: Nullable<ProfileScalarFieldEnum[]>;
    orderBy?: Nullable<ProfileOrderByWithRelationAndSearchRelevanceInput[]>;
    pagination: PaginationArgsInput;
    skip?: Nullable<number>;
    take?: Nullable<number>;
    where?: Nullable<ProfileWhereInput>;
}

export class FindManyUsersPaginatedInput {
    cursor?: Nullable<UserWhereUniqueInput>;
    distinct?: Nullable<UserScalarFieldEnum[]>;
    orderBy?: Nullable<UserOrderByWithRelationAndSearchRelevanceInput[]>;
    pagination?: Nullable<PaginationArgsInput>;
    skip?: Nullable<number>;
    take?: Nullable<number>;
    where?: Nullable<UserWhereInput>;
}

export class FloatNullableFilter {
    equals?: Nullable<number>;
    gt?: Nullable<number>;
    gte?: Nullable<number>;
    in?: Nullable<number[]>;
    lt?: Nullable<number>;
    lte?: Nullable<number>;
    not?: Nullable<NestedFloatNullableFilter>;
    notIn?: Nullable<number[]>;
}

export class IntNullableFilter {
    equals?: Nullable<number>;
    gt?: Nullable<number>;
    gte?: Nullable<number>;
    in?: Nullable<number[]>;
    lt?: Nullable<number>;
    lte?: Nullable<number>;
    not?: Nullable<NestedIntNullableFilter>;
    notIn?: Nullable<number[]>;
}

export class JsonNullableFilter {
    array_contains?: Nullable<JSON>;
    array_ends_with?: Nullable<JSON>;
    array_starts_with?: Nullable<JSON>;
    equals?: Nullable<JSON>;
    gt?: Nullable<JSON>;
    gte?: Nullable<JSON>;
    lt?: Nullable<JSON>;
    lte?: Nullable<JSON>;
    not?: Nullable<JSON>;
    path?: Nullable<string[]>;
    string_contains?: Nullable<string>;
    string_ends_with?: Nullable<string>;
    string_starts_with?: Nullable<string>;
}

export class JsonNullableListFilter {
    equals?: Nullable<JSON[]>;
    has?: Nullable<JSON>;
    hasEvery?: Nullable<JSON[]>;
    hasSome?: Nullable<JSON[]>;
    isEmpty?: Nullable<boolean>;
}

export class LoginInput {
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export class MediaItemCreateManyUserInput {
    ariaLabel?: Nullable<string>;
    caption?: Nullable<string>;
    destination?: Nullable<MediaItemDestination>;
    fileLastModified?: Nullable<DateTime>;
    height?: Nullable<number>;
    id?: Nullable<string>;
    name?: Nullable<string>;
    quality?: Nullable<number>;
    size?: Nullable<string>;
    src?: Nullable<string>;
    srcSet?: Nullable<string>;
    title?: Nullable<string>;
    type?: Nullable<MimeTypes>;
    updatedAt?: Nullable<DateTime>;
    uploadedAt?: Nullable<DateTime>;
    width?: Nullable<number>;
}

export class MediaItemCreateManyUserInputEnvelope {
    data: MediaItemCreateManyUserInput[];
    skipDuplicates?: Nullable<boolean>;
}

export class MediaItemCreateNestedManyWithoutUserInput {
    connect?: Nullable<MediaItemWhereUniqueInput[]>;
    connectOrCreate?: Nullable<MediaItemCreateOrConnectWithoutUserInput[]>;
    create?: Nullable<MediaItemCreateWithoutUserInput[]>;
    createMany?: Nullable<MediaItemCreateManyUserInputEnvelope>;
}

export class MediaItemCreateOrConnectWithoutUserInput {
    create: MediaItemCreateWithoutUserInput;
    where: MediaItemWhereUniqueInput;
}

export class MediaItemCreateWithoutUserInput {
    ariaLabel?: Nullable<string>;
    caption?: Nullable<string>;
    destination?: Nullable<MediaItemDestination>;
    fileLastModified?: Nullable<DateTime>;
    height?: Nullable<number>;
    id?: Nullable<string>;
    name?: Nullable<string>;
    quality?: Nullable<number>;
    size?: Nullable<string>;
    src?: Nullable<string>;
    srcSet?: Nullable<string>;
    title?: Nullable<string>;
    type?: Nullable<MimeTypes>;
    updatedAt?: Nullable<DateTime>;
    uploadedAt?: Nullable<DateTime>;
    width?: Nullable<number>;
}

export class MediaItemListRelationFilter {
    every?: Nullable<MediaItemWhereInput>;
    none?: Nullable<MediaItemWhereInput>;
    some?: Nullable<MediaItemWhereInput>;
}

export class MediaItemNameUserIdCompoundUniqueInput {
    name: string;
    userId: string;
}

export class MediaItemOrderByRelationAggregateInput {
    _count?: Nullable<SortOrder>;
}

export class MediaItemOrderByRelevanceInput {
    fields: MediaItemOrderByRelevanceFieldEnum[];
    search: string;
    sort: SortOrder;
}

export class MediaItemOrderByWithRelationAndSearchRelevanceInput {
    _relevance?: Nullable<MediaItemOrderByRelevanceInput>;
    ariaLabel?: Nullable<SortOrder>;
    caption?: Nullable<SortOrder>;
    destination?: Nullable<SortOrder>;
    fileLastModified?: Nullable<SortOrder>;
    height?: Nullable<SortOrder>;
    id?: Nullable<SortOrder>;
    name?: Nullable<SortOrder>;
    quality?: Nullable<SortOrder>;
    size?: Nullable<SortOrder>;
    src?: Nullable<SortOrder>;
    srcSet?: Nullable<SortOrder>;
    title?: Nullable<SortOrder>;
    type?: Nullable<SortOrder>;
    updatedAt?: Nullable<SortOrder>;
    uploadedAt?: Nullable<SortOrder>;
    user?: Nullable<UserOrderByWithRelationAndSearchRelevanceInput>;
    userId?: Nullable<SortOrder>;
    width?: Nullable<SortOrder>;
}

export class MediaItemWhereInput {
    AND?: Nullable<MediaItemWhereInput[]>;
    NOT?: Nullable<MediaItemWhereInput[]>;
    OR?: Nullable<MediaItemWhereInput[]>;
    ariaLabel?: Nullable<StringNullableFilter>;
    caption?: Nullable<StringNullableFilter>;
    destination?: Nullable<EnumMediaItemDestinationNullableFilter>;
    fileLastModified?: Nullable<DateTimeNullableFilter>;
    height?: Nullable<FloatNullableFilter>;
    id?: Nullable<StringFilter>;
    name?: Nullable<StringNullableFilter>;
    quality?: Nullable<IntNullableFilter>;
    size?: Nullable<StringNullableFilter>;
    src?: Nullable<StringNullableFilter>;
    srcSet?: Nullable<StringNullableFilter>;
    title?: Nullable<StringNullableFilter>;
    type?: Nullable<EnumMimeTypesNullableFilter>;
    updatedAt?: Nullable<DateTimeNullableFilter>;
    uploadedAt?: Nullable<DateTimeFilter>;
    user?: Nullable<UserRelationFilter>;
    userId?: Nullable<StringFilter>;
    width?: Nullable<FloatNullableFilter>;
}

export class MediaItemWhereUniqueInput {
    id?: Nullable<string>;
    name_userId?: Nullable<MediaItemNameUserIdCompoundUniqueInput>;
}

export class NestedBoolFilter {
    equals?: Nullable<boolean>;
    not?: Nullable<NestedBoolFilter>;
}

export class NestedDateTimeFilter {
    equals?: Nullable<DateTime>;
    gt?: Nullable<DateTime>;
    gte?: Nullable<DateTime>;
    in?: Nullable<DateTime[]>;
    lt?: Nullable<DateTime>;
    lte?: Nullable<DateTime>;
    not?: Nullable<NestedDateTimeFilter>;
    notIn?: Nullable<DateTime[]>;
}

export class NestedDateTimeNullableFilter {
    equals?: Nullable<DateTime>;
    gt?: Nullable<DateTime>;
    gte?: Nullable<DateTime>;
    in?: Nullable<DateTime[]>;
    lt?: Nullable<DateTime>;
    lte?: Nullable<DateTime>;
    not?: Nullable<NestedDateTimeNullableFilter>;
    notIn?: Nullable<DateTime[]>;
}

export class NestedEnumGenderNullableFilter {
    equals?: Nullable<Gender>;
    in?: Nullable<Gender[]>;
    not?: Nullable<NestedEnumGenderNullableFilter>;
    notIn?: Nullable<Gender[]>;
}

export class NestedEnumMediaItemDestinationNullableFilter {
    equals?: Nullable<MediaItemDestination>;
    in?: Nullable<MediaItemDestination[]>;
    not?: Nullable<NestedEnumMediaItemDestinationNullableFilter>;
    notIn?: Nullable<MediaItemDestination[]>;
}

export class NestedEnumMimeTypesNullableFilter {
    equals?: Nullable<MimeTypes>;
    in?: Nullable<MimeTypes[]>;
    not?: Nullable<NestedEnumMimeTypesNullableFilter>;
    notIn?: Nullable<MimeTypes[]>;
}

export class NestedEnumPronounsNullableFilter {
    equals?: Nullable<Pronouns>;
    in?: Nullable<Pronouns[]>;
    not?: Nullable<NestedEnumPronounsNullableFilter>;
    notIn?: Nullable<Pronouns[]>;
}

export class NestedEnumRoleNullableFilter {
    equals?: Nullable<Role>;
    in?: Nullable<Role[]>;
    not?: Nullable<NestedEnumRoleNullableFilter>;
    notIn?: Nullable<Role[]>;
}

export class NestedEnumUserStatusNullableFilter {
    equals?: Nullable<UserStatus>;
    in?: Nullable<UserStatus[]>;
    not?: Nullable<NestedEnumUserStatusNullableFilter>;
    notIn?: Nullable<UserStatus[]>;
}

export class NestedFloatNullableFilter {
    equals?: Nullable<number>;
    gt?: Nullable<number>;
    gte?: Nullable<number>;
    in?: Nullable<number[]>;
    lt?: Nullable<number>;
    lte?: Nullable<number>;
    not?: Nullable<NestedFloatNullableFilter>;
    notIn?: Nullable<number[]>;
}

export class NestedIntNullableFilter {
    equals?: Nullable<number>;
    gt?: Nullable<number>;
    gte?: Nullable<number>;
    in?: Nullable<number[]>;
    lt?: Nullable<number>;
    lte?: Nullable<number>;
    not?: Nullable<NestedIntNullableFilter>;
    notIn?: Nullable<number[]>;
}

export class NestedStringFilter {
    contains?: Nullable<string>;
    endsWith?: Nullable<string>;
    equals?: Nullable<string>;
    gt?: Nullable<string>;
    gte?: Nullable<string>;
    in?: Nullable<string[]>;
    lt?: Nullable<string>;
    lte?: Nullable<string>;
    not?: Nullable<NestedStringFilter>;
    notIn?: Nullable<string[]>;
    search?: Nullable<string>;
    startsWith?: Nullable<string>;
}

export class NestedStringNullableFilter {
    contains?: Nullable<string>;
    endsWith?: Nullable<string>;
    equals?: Nullable<string>;
    gt?: Nullable<string>;
    gte?: Nullable<string>;
    in?: Nullable<string[]>;
    lt?: Nullable<string>;
    lte?: Nullable<string>;
    not?: Nullable<NestedStringNullableFilter>;
    notIn?: Nullable<string[]>;
    search?: Nullable<string>;
    startsWith?: Nullable<string>;
}

export class PaginationArgsInput {
    after?: Nullable<string>;
    before?: Nullable<string>;
    first?: Nullable<number>;
    last?: Nullable<number>;
}

export class ProfileCreateInput {
    activiyFeed?: Nullable<ProfileCreateactiviyFeedInput>;
    bio?: Nullable<ProfileCreatebioInput>;
    city?: Nullable<string>;
    country?: Nullable<string>;
    coverPhoto?: Nullable<ProfileCreatecoverPhotoInput>;
    dob?: Nullable<string>;
    gender?: Nullable<Gender>;
    id?: Nullable<string>;
    lastSeen?: Nullable<DateTime>;
    memberSince?: Nullable<DateTime>;
    occupation?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    pronouns?: Nullable<Pronouns>;
    recentActivity?: Nullable<ProfileCreaterecentActivityInput>;
    user: UserCreateNestedOneWithoutProfileInput;
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
    coverPhoto?: Nullable<ProfileCreatecoverPhotoInput>;
    dob?: Nullable<string>;
    gender?: Nullable<Gender>;
    id?: Nullable<string>;
    lastSeen?: Nullable<DateTime>;
    memberSince?: Nullable<DateTime>;
    occupation?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    pronouns?: Nullable<Pronouns>;
    recentActivity?: Nullable<ProfileCreaterecentActivityInput>;
}

export class ProfileCreateactiviyFeedInput {
    set: JSON[];
}

export class ProfileCreatebioInput {
    set: JSON[];
}

export class ProfileCreatecoverPhotoInput {
    set: JSON[];
}

export class ProfileCreaterecentActivityInput {
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

export class ProfileRelationFilter {
    is?: Nullable<ProfileWhereInput>;
    isNot?: Nullable<ProfileWhereInput>;
}

export class ProfileWhereInput {
    AND?: Nullable<ProfileWhereInput[]>;
    NOT?: Nullable<ProfileWhereInput[]>;
    OR?: Nullable<ProfileWhereInput[]>;
    activiyFeed?: Nullable<JsonNullableListFilter>;
    bio?: Nullable<JsonNullableListFilter>;
    city?: Nullable<StringNullableFilter>;
    country?: Nullable<StringNullableFilter>;
    coverPhoto?: Nullable<JsonNullableListFilter>;
    dob?: Nullable<StringNullableFilter>;
    gender?: Nullable<EnumGenderNullableFilter>;
    id?: Nullable<StringFilter>;
    lastSeen?: Nullable<DateTimeNullableFilter>;
    memberSince?: Nullable<DateTimeFilter>;
    occupation?: Nullable<StringNullableFilter>;
    phoneNumber?: Nullable<StringNullableFilter>;
    pronouns?: Nullable<EnumPronounsNullableFilter>;
    recentActivity?: Nullable<JsonNullableListFilter>;
    user?: Nullable<UserRelationFilter>;
    userId?: Nullable<StringFilter>;
}

export class ProfileWhereUniqueInput {
    id?: Nullable<string>;
    userId?: Nullable<string>;
}

export class ProfilesInput {
    bioFilter?: Nullable<JsonNullableFilter>;
    dobFilter?: Nullable<StringNullableFilter>;
    genderFilter?: Nullable<EnumGenderNullableFilter>;
    orderBy?: Nullable<ProfileOrderByWithRelationAndSearchRelevanceInput>;
    paginationArgs?: Nullable<PaginationArgsInput>;
    pronounsFilter?: Nullable<EnumPronounsNullableFilter>;
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

export class SessionListRelationFilter {
    every?: Nullable<SessionWhereInput>;
    none?: Nullable<SessionWhereInput>;
    some?: Nullable<SessionWhereInput>;
}

export class SessionOrderByRelationAggregateInput {
    _count?: Nullable<SortOrder>;
}

export class SessionWhereInput {
    AND?: Nullable<SessionWhereInput[]>;
    NOT?: Nullable<SessionWhereInput[]>;
    OR?: Nullable<SessionWhereInput[]>;
    accessToken?: Nullable<StringNullableFilter>;
    alg?: Nullable<StringNullableFilter>;
    exp?: Nullable<IntNullableFilter>;
    iat?: Nullable<IntNullableFilter>;
    id?: Nullable<StringFilter>;
    lastVerified?: Nullable<DateTimeNullableFilter>;
    provider?: Nullable<StringNullableFilter>;
    refreshToken?: Nullable<StringNullableFilter>;
    scopes?: Nullable<StringNullableListFilter>;
    signature?: Nullable<StringNullableFilter>;
    tokenState?: Nullable<StringNullableFilter>;
    user?: Nullable<UserRelationFilter>;
    userId?: Nullable<StringFilter>;
}

export class SessionWhereUniqueInput {
    userId?: Nullable<string>;
}

export class SignupInput {
    email: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    password: string;
}

export class StringFilter {
    contains?: Nullable<string>;
    endsWith?: Nullable<string>;
    equals?: Nullable<string>;
    gt?: Nullable<string>;
    gte?: Nullable<string>;
    in?: Nullable<string[]>;
    lt?: Nullable<string>;
    lte?: Nullable<string>;
    mode?: Nullable<QueryMode>;
    not?: Nullable<NestedStringFilter>;
    notIn?: Nullable<string[]>;
    search?: Nullable<string>;
    startsWith?: Nullable<string>;
}

export class StringNullableFilter {
    contains?: Nullable<string>;
    endsWith?: Nullable<string>;
    equals?: Nullable<string>;
    gt?: Nullable<string>;
    gte?: Nullable<string>;
    in?: Nullable<string[]>;
    lt?: Nullable<string>;
    lte?: Nullable<string>;
    mode?: Nullable<QueryMode>;
    not?: Nullable<NestedStringNullableFilter>;
    notIn?: Nullable<string[]>;
    search?: Nullable<string>;
    startsWith?: Nullable<string>;
}

export class StringNullableListFilter {
    equals?: Nullable<string[]>;
    has?: Nullable<string>;
    hasEvery?: Nullable<string[]>;
    hasSome?: Nullable<string[]>;
    isEmpty?: Nullable<boolean>;
}

export class UserCreateMutationInput {
    accounts?: Nullable<AccountCreateNestedManyWithoutUserInput>;
    categories?: Nullable<CategoryCreateNestedManyWithoutCreatorInput>;
    comments?: Nullable<CommentCreateNestedManyWithoutAuthorInput>;
    connections?: Nullable<ConnectionCreateNestedManyWithoutOwnerInput>;
    createdAt?: Nullable<DateTime>;
    email: string;
    emailVerified?: Nullable<DateTime>;
    entries?: Nullable<EntryCreateNestedManyWithoutAuthorInput>;
    firstName?: Nullable<string>;
    id?: Nullable<string>;
    image?: Nullable<UserCreateimageInput>;
    lastName?: Nullable<string>;
    mediaItems?: Nullable<MediaItemCreateNestedManyWithoutUserInput>;
    password?: Nullable<string>;
    profile?: Nullable<ProfileCreateNestedOneWithoutUserInput>;
    role?: Nullable<Role>;
    sessions?: Nullable<SessionCreateNestedManyWithoutUserInput>;
    status?: Nullable<UserStatus>;
    updatedAt?: Nullable<DateTime>;
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

export class UserCreateNestedOneWithoutProfileInput {
    connect?: Nullable<UserWhereUniqueInput>;
    connectOrCreate?: Nullable<UserCreateOrConnectWithoutProfileInput>;
    create?: Nullable<UserCreateWithoutProfileInput>;
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

export class UserCreateOrConnectWithoutProfileInput {
    create: UserCreateWithoutProfileInput;
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
    image?: Nullable<UserCreateimageInput>;
    lastName?: Nullable<string>;
    mediaItems?: Nullable<MediaItemCreateNestedManyWithoutUserInput>;
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
    image?: Nullable<UserCreateimageInput>;
    lastName?: Nullable<string>;
    mediaItems?: Nullable<MediaItemCreateNestedManyWithoutUserInput>;
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
    image?: Nullable<UserCreateimageInput>;
    lastName?: Nullable<string>;
    mediaItems?: Nullable<MediaItemCreateNestedManyWithoutUserInput>;
    password?: Nullable<string>;
    profile?: Nullable<ProfileCreateNestedOneWithoutUserInput>;
    role?: Nullable<Role>;
    sessions?: Nullable<SessionCreateNestedManyWithoutUserInput>;
    status?: Nullable<UserStatus>;
    updatedAt?: Nullable<DateTime>;
}

export class UserCreateWithoutProfileInput {
    accounts?: Nullable<AccountCreateNestedManyWithoutUserInput>;
    categories?: Nullable<CategoryCreateNestedManyWithoutCreatorInput>;
    comments?: Nullable<CommentCreateNestedManyWithoutAuthorInput>;
    connections?: Nullable<ConnectionCreateNestedManyWithoutOwnerInput>;
    createdAt?: Nullable<DateTime>;
    email: string;
    emailVerified?: Nullable<DateTime>;
    entries?: Nullable<EntryCreateNestedManyWithoutAuthorInput>;
    firstName?: Nullable<string>;
    id?: Nullable<string>;
    image?: Nullable<UserCreateimageInput>;
    lastName?: Nullable<string>;
    mediaItems?: Nullable<MediaItemCreateNestedManyWithoutUserInput>;
    password?: Nullable<string>;
    role?: Nullable<Role>;
    sessions?: Nullable<SessionCreateNestedManyWithoutUserInput>;
    status?: Nullable<UserStatus>;
    updatedAt?: Nullable<DateTime>;
}

export class UserCreateimageInput {
    set: JSON[];
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
    mediaItems?: Nullable<MediaItemOrderByRelationAggregateInput>;
    password?: Nullable<SortOrder>;
    profile?: Nullable<ProfileOrderByWithRelationAndSearchRelevanceInput>;
    role?: Nullable<SortOrder>;
    sessions?: Nullable<SessionOrderByRelationAggregateInput>;
    status?: Nullable<SortOrder>;
    updatedAt?: Nullable<SortOrder>;
}

export class UserRelationFilter {
    is?: Nullable<UserWhereInput>;
    isNot?: Nullable<UserWhereInput>;
}

export class UserWhereInput {
    AND?: Nullable<UserWhereInput[]>;
    NOT?: Nullable<UserWhereInput[]>;
    OR?: Nullable<UserWhereInput[]>;
    accounts?: Nullable<AccountListRelationFilter>;
    categories?: Nullable<CategoryListRelationFilter>;
    comments?: Nullable<CommentListRelationFilter>;
    connections?: Nullable<ConnectionListRelationFilter>;
    createdAt?: Nullable<DateTimeFilter>;
    email?: Nullable<StringFilter>;
    emailVerified?: Nullable<DateTimeNullableFilter>;
    entries?: Nullable<EntryListRelationFilter>;
    firstName?: Nullable<StringNullableFilter>;
    id?: Nullable<StringFilter>;
    image?: Nullable<JsonNullableListFilter>;
    lastName?: Nullable<StringNullableFilter>;
    mediaItems?: Nullable<MediaItemListRelationFilter>;
    password?: Nullable<StringFilter>;
    profile?: Nullable<ProfileRelationFilter>;
    role?: Nullable<EnumRoleNullableFilter>;
    sessions?: Nullable<SessionListRelationFilter>;
    status?: Nullable<EnumUserStatusNullableFilter>;
    updatedAt?: Nullable<DateTimeNullableFilter>;
}

export class UserWhereUniqueInput {
    email?: Nullable<string>;
    id?: Nullable<string>;
}

export interface Node {
    id: string;
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
    accessToken?: Nullable<string>;
    refreshToken?: Nullable<string>;
    session?: Nullable<Session>;
    user: User;
}

export class AuthDetailed {
    __typename?: 'AuthDetailed';
    auth?: Nullable<Auth>;
    jwt?: Nullable<JwtDecoded>;
}

export class AuthSansSession {
    __typename?: 'AuthSansSession';
    accessToken?: Nullable<string>;
    refreshToken?: Nullable<string>;
    user?: Nullable<User>;
}

export class BaseTypeNodes {
    __typename?: 'BaseTypeNodes';
    nodes: TypesUnion[];
    pageInfo?: Nullable<PageInfo>;
    totalCount: number;
}

export class BaseTypesEdge {
    __typename?: 'BaseTypesEdge';
    cursor: string;
    node: TypesUnion;
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

export class ContentNodes {
    __typename?: 'ContentNodes';
    contentNodes: BaseTypeNodes;
}

export class Entry {
    __typename?: 'Entry';
    _count: EntryCount;
    author: User;
    authorId: string;
    categories?: Nullable<Category[]>;
    categoryId?: Nullable<string>;
    comments?: Nullable<Comment[]>;
    content?: Nullable<JSONObject[]>;
    createdAt: DateTime;
    featuredImage?: Nullable<JSONObject[]>;
    id: string;
    published?: Nullable<boolean>;
    title?: Nullable<string>;
    updatedAt?: Nullable<DateTime>;
}

export class EntryConnection {
    __typename?: 'EntryConnection';
    edges: EntryEdge[];
    pageInfo: PageInfo;
    totalCount: number;
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

export class MediaItem {
    __typename?: 'MediaItem';
    fileLastModified?: Nullable<DateTime>;
    height?: Nullable<number>;
    id: string;
    name?: Nullable<string>;
    quality?: Nullable<number>;
    size?: Nullable<string>;
    src?: Nullable<string>;
    srcSet?: Nullable<string>;
    type?: Nullable<MimeTypes>;
    updatedAt?: Nullable<DateTime>;
    uploadedAt: DateTime;
    user: User;
    userId: string;
    width?: Nullable<number>;
}

export class MediaItemConnection {
    __typename?: 'MediaItemConnection';
    edges: MediaItemEdge[];
    pageInfo: PageInfo;
    totalCount: number;
}

export class MediaItemEdge {
    __typename?: 'MediaItemEdge';
    cursor: string;
    node: MediaItem;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract changePassword(changePasswordInput: ChangePasswordInput): User | Promise<User>;

    abstract createEntry(createInput: EntryCreateInput): Entry | Promise<Entry>;

    abstract createProfile(data: ProfileCreateInput, userId: string): Profile | Promise<Profile>;

    abstract getUserFromAccessToken(token: string): User | Promise<User>;

    abstract login(data: LoginInput): Token | Promise<Token>;

    abstract refreshToken(token: string): Token | Promise<Token>;

    abstract register(dataRegister: SignupInput): AuthSansSession | Promise<AuthSansSession>;

    abstract registerNewUser(userCreateInput: UserCreateMutationInput): AuthDetailed | Promise<AuthDetailed>;

    abstract signin(userloginInput: LoginInput): AuthDetailed | Promise<AuthDetailed>;

    abstract signup(data: SignupInput): Token | Promise<Token>;

    abstract updateUserPassword(passwordInput: ChangePasswordInput): User | Promise<User>;

    abstract userFromAccessTokenDecoded(token: string): AuthDetailed | Promise<AuthDetailed>;
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
    coverPhoto?: Nullable<JSONObject[]>;
    dob?: Nullable<string>;
    gender?: Nullable<Gender>;
    id: string;
    lastSeen?: Nullable<DateTime>;
    memberSince: DateTime;
    occupation?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    pronouns?: Nullable<Pronouns>;
    recentActivity?: Nullable<JSONObject[]>;
    user: User;
    userId: string;
    userInProfile: User;
}

export class ProfileConnection {
    __typename?: 'ProfileConnection';
    edges: ProfileEdge[];
    pageInfo: PageInfo;
    totalCount: number;
}

export class ProfileEdge {
    __typename?: 'ProfileEdge';
    cursor: string;
    node: Profile;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract contentNodesUnion(findManyEntriesPaginatedInput: FindManyEntriessPaginatedInput, findManyMediaItemsPaginated?: Nullable<FindManyMediaItemsInput>, findManyUsersPaginatedInput?: Nullable<FindManyUsersPaginatedInput>): ContentNodes | Promise<ContentNodes>;

    abstract entryById(id: string): Entry | Promise<Entry>;

    abstract findUniqueMediaItem(mediaItemId: string): MediaItem | Promise<MediaItem>;

    abstract getViewer(): AuthDetailed | Promise<AuthDetailed>;

    abstract hello(name: string): string | Promise<string>;

    abstract helloWorld(): string | Promise<string>;

    abstract listEntries(findManyEntriesPaginatedInput: FindManyEntriessPaginatedInput): EntryConnection | Promise<EntryConnection>;

    abstract listMediaItems(findManyMediaItemsPaginated?: Nullable<FindManyMediaItemsInput>): MediaItemConnection | Promise<MediaItemConnection>;

    abstract listProfiles(findManyProfilesPaginatedInput: FindManyProfilesPaginatedInput): ProfileConnection | Promise<ProfileConnection>;

    abstract listUsers(findManyUsersPaginatedInput?: Nullable<FindManyUsersPaginatedInput>): UserConnection | Promise<UserConnection>;

    abstract me(): AuthDetailed | Promise<AuthDetailed>;

    abstract node(id: string): Nullable<Node> | Promise<Nullable<Node>>;

    abstract profileByRelayId(): Profile | Promise<Profile>;

    abstract profiles(profilesArgs: ProfilesInput): ProfileConnection | Promise<ProfileConnection>;

    abstract userById(id: string): User | Promise<User>;

    abstract userByRelayId(cursor: string): User | Promise<User>;

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

    abstract profileCreated(): Profile | Promise<Profile>;
}

export class Token {
    __typename?: 'Token';
    accessToken?: Nullable<string>;
    refreshToken?: Nullable<string>;
}

export class User {
    __typename?: 'User';
    _count?: Nullable<UserCount>;
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
    image: JSONObject[];
    lastName?: Nullable<string>;
    mediaItems?: Nullable<MediaItem[]>;
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
    totalCount: number;
}

export class UserCount {
    __typename?: 'UserCount';
    accounts: number;
    categories: number;
    comments: number;
    connections: number;
    entries: number;
    mediaItems: number;
    sessions: number;
}

export class UserEdge {
    __typename?: 'UserEdge';
    cursor: string;
    node: User;
}

export type BigInt = any;
export type DateTime = any;
export type JSON = any;
export type JSONObject = any;
export type PhoneNumber = any;
export type TypesUnion = Entry | MediaItem | User;
type Nullable<T> = T | null;
