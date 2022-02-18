import {
  FieldPolicy,
  FieldReadFunction,
  TypePolicies,
  TypePolicy
} from "@apollo/client/cache";
export type AccountKeySpecifier = (
  | "access_token"
  | "expires_at"
  | "id"
  | "id_token"
  | "oauth_token"
  | "oauth_token_secret"
  | "provider"
  | "providerAccountId"
  | "refresh_secret"
  | "refresh_token"
  | "scope"
  | "session_state"
  | "token_type"
  | "type"
  | "user"
  | "userId"
  | AccountKeySpecifier
)[];
export type AccountFieldPolicy = {
  access_token?: FieldPolicy<any> | FieldReadFunction<any>;
  expires_at?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  id_token?: FieldPolicy<any> | FieldReadFunction<any>;
  oauth_token?: FieldPolicy<any> | FieldReadFunction<any>;
  oauth_token_secret?: FieldPolicy<any> | FieldReadFunction<any>;
  provider?: FieldPolicy<any> | FieldReadFunction<any>;
  providerAccountId?: FieldPolicy<any> | FieldReadFunction<any>;
  refresh_secret?: FieldPolicy<any> | FieldReadFunction<any>;
  refresh_token?: FieldPolicy<any> | FieldReadFunction<any>;
  scope?: FieldPolicy<any> | FieldReadFunction<any>;
  session_state?: FieldPolicy<any> | FieldReadFunction<any>;
  token_type?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  userId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuthKeySpecifier = (
  | "accessToken"
  | "refreshToken"
  | "session"
  | "user"
  | AuthKeySpecifier
)[];
export type AuthFieldPolicy = {
  accessToken?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshToken?: FieldPolicy<any> | FieldReadFunction<any>;
  session?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuthDetailedKeySpecifier = (
  | "auth"
  | "jwt"
  | AuthDetailedKeySpecifier
)[];
export type AuthDetailedFieldPolicy = {
  auth?: FieldPolicy<any> | FieldReadFunction<any>;
  jwt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuthSansSessionKeySpecifier = (
  | "accessToken"
  | "refreshToken"
  | "user"
  | AuthSansSessionKeySpecifier
)[];
export type AuthSansSessionFieldPolicy = {
  accessToken?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshToken?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BaseTypeNodesKeySpecifier = (
  | "nodes"
  | "pageInfo"
  | "totalCount"
  | BaseTypeNodesKeySpecifier
)[];
export type BaseTypeNodesFieldPolicy = {
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BaseTypesEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | BaseTypesEdgeKeySpecifier
)[];
export type BaseTypesEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CategoryKeySpecifier = (
  | "_count"
  | "createdAt"
  | "creator"
  | "creatorId"
  | "entries"
  | "entryId"
  | "id"
  | "name"
  | "updatedAt"
  | CategoryKeySpecifier
)[];
export type CategoryFieldPolicy = {
  _count?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  creator?: FieldPolicy<any> | FieldReadFunction<any>;
  creatorId?: FieldPolicy<any> | FieldReadFunction<any>;
  entries?: FieldPolicy<any> | FieldReadFunction<any>;
  entryId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CategoryConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | CategoryConnectionKeySpecifier
)[];
export type CategoryConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CategoryCountKeySpecifier = (
  | "entries"
  | CategoryCountKeySpecifier
)[];
export type CategoryCountFieldPolicy = {
  entries?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CategoryEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | CategoryEdgeKeySpecifier
)[];
export type CategoryEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CommentKeySpecifier = (
  | "author"
  | "authorId"
  | "body"
  | "createdAt"
  | "entry"
  | "entryId"
  | "id"
  | "position"
  | "reactions"
  | "updatedAt"
  | CommentKeySpecifier
)[];
export type CommentFieldPolicy = {
  author?: FieldPolicy<any> | FieldReadFunction<any>;
  authorId?: FieldPolicy<any> | FieldReadFunction<any>;
  body?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  entry?: FieldPolicy<any> | FieldReadFunction<any>;
  entryId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  position?: FieldPolicy<any> | FieldReadFunction<any>;
  reactions?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CommentConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | CommentConnectionKeySpecifier
)[];
export type CommentConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CommentEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | CommentEdgeKeySpecifier
)[];
export type CommentEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ConnectionKeySpecifier = (
  | "email"
  | "firstName"
  | "id"
  | "ip"
  | "lastModified"
  | "lastName"
  | "owner"
  | "ownerId"
  | "phoneNumber"
  | ConnectionKeySpecifier
)[];
export type ConnectionFieldPolicy = {
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  firstName?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  ip?: FieldPolicy<any> | FieldReadFunction<any>;
  lastModified?: FieldPolicy<any> | FieldReadFunction<any>;
  lastName?: FieldPolicy<any> | FieldReadFunction<any>;
  owner?: FieldPolicy<any> | FieldReadFunction<any>;
  ownerId?: FieldPolicy<any> | FieldReadFunction<any>;
  phoneNumber?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ConnectionConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | ConnectionConnectionKeySpecifier
)[];
export type ConnectionConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ConnectionEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | ConnectionEdgeKeySpecifier
)[];
export type ConnectionEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ContentNodesKeySpecifier = (
  | "contentNodes"
  | ContentNodesKeySpecifier
)[];
export type ContentNodesFieldPolicy = {
  contentNodes?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EntryKeySpecifier = (
  | "_count"
  | "author"
  | "authorId"
  | "categories"
  | "categoryId"
  | "comments"
  | "content"
  | "createdAt"
  | "featuredImage"
  | "id"
  | "published"
  | "title"
  | "updatedAt"
  | EntryKeySpecifier
)[];
export type EntryFieldPolicy = {
  _count?: FieldPolicy<any> | FieldReadFunction<any>;
  author?: FieldPolicy<any> | FieldReadFunction<any>;
  authorId?: FieldPolicy<any> | FieldReadFunction<any>;
  categories?: FieldPolicy<any> | FieldReadFunction<any>;
  categoryId?: FieldPolicy<any> | FieldReadFunction<any>;
  comments?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  featuredImage?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  published?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EntryConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | EntryConnectionKeySpecifier
)[];
export type EntryConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EntryCountKeySpecifier = (
  | "categories"
  | "comments"
  | EntryCountKeySpecifier
)[];
export type EntryCountFieldPolicy = {
  categories?: FieldPolicy<any> | FieldReadFunction<any>;
  comments?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EntryEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | EntryEdgeKeySpecifier
)[];
export type EntryEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JwtDecodedKeySpecifier = (
  | "header"
  | "payload"
  | "signature"
  | JwtDecodedKeySpecifier
)[];
export type JwtDecodedFieldPolicy = {
  header?: FieldPolicy<any> | FieldReadFunction<any>;
  payload?: FieldPolicy<any> | FieldReadFunction<any>;
  signature?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JwtHeadersKeySpecifier = (
  | "alg"
  | "typ"
  | JwtHeadersKeySpecifier
)[];
export type JwtHeadersFieldPolicy = {
  alg?: FieldPolicy<any> | FieldReadFunction<any>;
  typ?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JwtPayloadKeySpecifier = (
  | "exp"
  | "iat"
  | "userId"
  | JwtPayloadKeySpecifier
)[];
export type JwtPayloadFieldPolicy = {
  exp?: FieldPolicy<any> | FieldReadFunction<any>;
  iat?: FieldPolicy<any> | FieldReadFunction<any>;
  userId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MediaItemKeySpecifier = (
  | "fileLastModified"
  | "height"
  | "id"
  | "name"
  | "quality"
  | "size"
  | "src"
  | "srcSet"
  | "type"
  | "updatedAt"
  | "uploadedAt"
  | "user"
  | "userId"
  | "width"
  | MediaItemKeySpecifier
)[];
export type MediaItemFieldPolicy = {
  fileLastModified?: FieldPolicy<any> | FieldReadFunction<any>;
  height?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  quality?: FieldPolicy<any> | FieldReadFunction<any>;
  size?: FieldPolicy<any> | FieldReadFunction<any>;
  src?: FieldPolicy<any> | FieldReadFunction<any>;
  srcSet?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  uploadedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  userId?: FieldPolicy<any> | FieldReadFunction<any>;
  width?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MediaItemConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | MediaItemConnectionKeySpecifier
)[];
export type MediaItemConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MediaItemEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | MediaItemEdgeKeySpecifier
)[];
export type MediaItemEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | "changePassword"
  | "createEntry"
  | "createNewEntry"
  | "createProfile"
  | "login"
  | "register"
  | "registerNewUser"
  | "signin"
  | "signup"
  | "updateUserPassword"
  | "upsertComment"
  | "viewerCreateEntry"
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  changePassword?: FieldPolicy<any> | FieldReadFunction<any>;
  createEntry?: FieldPolicy<any> | FieldReadFunction<any>;
  createNewEntry?: FieldPolicy<any> | FieldReadFunction<any>;
  createProfile?: FieldPolicy<any> | FieldReadFunction<any>;
  login?: FieldPolicy<any> | FieldReadFunction<any>;
  register?: FieldPolicy<any> | FieldReadFunction<any>;
  registerNewUser?: FieldPolicy<any> | FieldReadFunction<any>;
  signin?: FieldPolicy<any> | FieldReadFunction<any>;
  signup?: FieldPolicy<any> | FieldReadFunction<any>;
  updateUserPassword?: FieldPolicy<any> | FieldReadFunction<any>;
  upsertComment?: FieldPolicy<any> | FieldReadFunction<any>;
  viewerCreateEntry?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NodeKeySpecifier = ("id" | NodeKeySpecifier)[];
export type NodeFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NodeUnionConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | NodeUnionConnectionKeySpecifier
)[];
export type NodeUnionConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PageInfoKeySpecifier = (
  | "endCursor"
  | "hasNextPage"
  | "hasPreviousPage"
  | "startCursor"
  | PageInfoKeySpecifier
)[];
export type PageInfoFieldPolicy = {
  endCursor?: FieldPolicy<any> | FieldReadFunction<any>;
  hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>;
  hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>;
  startCursor?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileKeySpecifier = (
  | "activiyFeed"
  | "bio"
  | "city"
  | "country"
  | "coverPhoto"
  | "dob"
  | "gender"
  | "id"
  | "lastSeen"
  | "memberSince"
  | "occupation"
  | "phoneNumber"
  | "pronouns"
  | "recentActivity"
  | "user"
  | "userId"
  | "userInProfile"
  | ProfileKeySpecifier
)[];
export type ProfileFieldPolicy = {
  activiyFeed?: FieldPolicy<any> | FieldReadFunction<any>;
  bio?: FieldPolicy<any> | FieldReadFunction<any>;
  city?: FieldPolicy<any> | FieldReadFunction<any>;
  country?: FieldPolicy<any> | FieldReadFunction<any>;
  coverPhoto?: FieldPolicy<any> | FieldReadFunction<any>;
  dob?: FieldPolicy<any> | FieldReadFunction<any>;
  gender?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastSeen?: FieldPolicy<any> | FieldReadFunction<any>;
  memberSince?: FieldPolicy<any> | FieldReadFunction<any>;
  occupation?: FieldPolicy<any> | FieldReadFunction<any>;
  phoneNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  pronouns?: FieldPolicy<any> | FieldReadFunction<any>;
  recentActivity?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  userId?: FieldPolicy<any> | FieldReadFunction<any>;
  userInProfile?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | ProfileConnectionKeySpecifier
)[];
export type ProfileConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProfileEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | ProfileEdgeKeySpecifier
)[];
export type ProfileEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | "categoryByRelayId"
  | "commentByRelayId"
  | "comprehensiveConnectionUnion"
  | "connectionByRelayId"
  | "contentNodesUnion"
  | "decodeViewerTokenFromContext"
  | "entryById"
  | "findUniqueMediaItem"
  | "getUserFromAccessToken"
  | "getViewer"
  | "hello"
  | "helloWorld"
  | "listCategories"
  | "listComments"
  | "listConnections"
  | "listEntries"
  | "listMediaItems"
  | "listProfiles"
  | "listSessions"
  | "listUsers"
  | "me"
  | "node"
  | "nodeUnionResolver"
  | "profileByRelayId"
  | "sessionByRelayId"
  | "siftEntries"
  | "userById"
  | "userByRelayId"
  | "userFromAccessTokenDecoded"
  | "viewer"
  | "viewerAuthInfoFromContext"
  | "viewerEntriesPaginated"
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  categoryByRelayId?: FieldPolicy<any> | FieldReadFunction<any>;
  commentByRelayId?: FieldPolicy<any> | FieldReadFunction<any>;
  comprehensiveConnectionUnion?: FieldPolicy<any> | FieldReadFunction<any>;
  connectionByRelayId?: FieldPolicy<any> | FieldReadFunction<any>;
  contentNodesUnion?: FieldPolicy<any> | FieldReadFunction<any>;
  decodeViewerTokenFromContext?: FieldPolicy<any> | FieldReadFunction<any>;
  entryById?: FieldPolicy<any> | FieldReadFunction<any>;
  findUniqueMediaItem?: FieldPolicy<any> | FieldReadFunction<any>;
  getUserFromAccessToken?: FieldPolicy<any> | FieldReadFunction<any>;
  getViewer?: FieldPolicy<any> | FieldReadFunction<any>;
  hello?: FieldPolicy<any> | FieldReadFunction<any>;
  helloWorld?: FieldPolicy<any> | FieldReadFunction<any>;
  listCategories?: FieldPolicy<any> | FieldReadFunction<any>;
  listComments?: FieldPolicy<any> | FieldReadFunction<any>;
  listConnections?: FieldPolicy<any> | FieldReadFunction<any>;
  listEntries?: FieldPolicy<any> | FieldReadFunction<any>;
  listMediaItems?: FieldPolicy<any> | FieldReadFunction<any>;
  listProfiles?: FieldPolicy<any> | FieldReadFunction<any>;
  listSessions?: FieldPolicy<any> | FieldReadFunction<any>;
  listUsers?: FieldPolicy<any> | FieldReadFunction<any>;
  me?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  nodeUnionResolver?: FieldPolicy<any> | FieldReadFunction<any>;
  profileByRelayId?: FieldPolicy<any> | FieldReadFunction<any>;
  sessionByRelayId?: FieldPolicy<any> | FieldReadFunction<any>;
  siftEntries?: FieldPolicy<any> | FieldReadFunction<any>;
  userById?: FieldPolicy<any> | FieldReadFunction<any>;
  userByRelayId?: FieldPolicy<any> | FieldReadFunction<any>;
  userFromAccessTokenDecoded?: FieldPolicy<any> | FieldReadFunction<any>;
  viewer?: FieldPolicy<any> | FieldReadFunction<any>;
  viewerAuthInfoFromContext?: FieldPolicy<any> | FieldReadFunction<any>;
  viewerEntriesPaginated?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SessionKeySpecifier = (
  | "accessToken"
  | "alg"
  | "exp"
  | "iat"
  | "id"
  | "lastVerified"
  | "provider"
  | "refreshToken"
  | "scopes"
  | "signature"
  | "tokenState"
  | "user"
  | "userId"
  | SessionKeySpecifier
)[];
export type SessionFieldPolicy = {
  accessToken?: FieldPolicy<any> | FieldReadFunction<any>;
  alg?: FieldPolicy<any> | FieldReadFunction<any>;
  exp?: FieldPolicy<any> | FieldReadFunction<any>;
  iat?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastVerified?: FieldPolicy<any> | FieldReadFunction<any>;
  provider?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshToken?: FieldPolicy<any> | FieldReadFunction<any>;
  scopes?: FieldPolicy<any> | FieldReadFunction<any>;
  signature?: FieldPolicy<any> | FieldReadFunction<any>;
  tokenState?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  userId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SessionConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | SessionConnectionKeySpecifier
)[];
export type SessionConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SessionEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | SessionEdgeKeySpecifier
)[];
export type SessionEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SubscriptionKeySpecifier = (
  | "entryCreated"
  | "profileCreated"
  | SubscriptionKeySpecifier
)[];
export type SubscriptionFieldPolicy = {
  entryCreated?: FieldPolicy<any> | FieldReadFunction<any>;
  profileCreated?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TokenKeySpecifier = (
  | "accessToken"
  | "refreshToken"
  | TokenKeySpecifier
)[];
export type TokenFieldPolicy = {
  accessToken?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshToken?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserKeySpecifier = (
  | "_count"
  | "accounts"
  | "categories"
  | "comments"
  | "connections"
  | "createdAt"
  | "email"
  | "emailVerified"
  | "entries"
  | "firstName"
  | "id"
  | "image"
  | "lastName"
  | "mediaItems"
  | "password"
  | "profile"
  | "role"
  | "sessions"
  | "status"
  | "updatedAt"
  | UserKeySpecifier
)[];
export type UserFieldPolicy = {
  _count?: FieldPolicy<any> | FieldReadFunction<any>;
  accounts?: FieldPolicy<any> | FieldReadFunction<any>;
  categories?: FieldPolicy<any> | FieldReadFunction<any>;
  comments?: FieldPolicy<any> | FieldReadFunction<any>;
  connections?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  emailVerified?: FieldPolicy<any> | FieldReadFunction<any>;
  entries?: FieldPolicy<any> | FieldReadFunction<any>;
  firstName?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
  lastName?: FieldPolicy<any> | FieldReadFunction<any>;
  mediaItems?: FieldPolicy<any> | FieldReadFunction<any>;
  password?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  role?: FieldPolicy<any> | FieldReadFunction<any>;
  sessions?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | UserConnectionKeySpecifier
)[];
export type UserConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserCountKeySpecifier = (
  | "accounts"
  | "categories"
  | "comments"
  | "connections"
  | "entries"
  | "mediaItems"
  | "sessions"
  | UserCountKeySpecifier
)[];
export type UserCountFieldPolicy = {
  accounts?: FieldPolicy<any> | FieldReadFunction<any>;
  categories?: FieldPolicy<any> | FieldReadFunction<any>;
  comments?: FieldPolicy<any> | FieldReadFunction<any>;
  connections?: FieldPolicy<any> | FieldReadFunction<any>;
  entries?: FieldPolicy<any> | FieldReadFunction<any>;
  mediaItems?: FieldPolicy<any> | FieldReadFunction<any>;
  sessions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | UserEdgeKeySpecifier
)[];
export type UserEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ViewerAuthInfoKeySpecifier = (
  | "accessToken"
  | "refreshToken"
  | "viewerJwt"
  | ViewerAuthInfoKeySpecifier
)[];
export type ViewerAuthInfoFieldPolicy = {
  accessToken?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshToken?: FieldPolicy<any> | FieldReadFunction<any>;
  viewerJwt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ViewerDetailedKeySpecifier = (
  | "_count"
  | "accessToken"
  | "accounts"
  | "categories"
  | "comments"
  | "connections"
  | "createdAt"
  | "email"
  | "emailVerified"
  | "entries"
  | "firstName"
  | "id"
  | "image"
  | "lastName"
  | "mediaItems"
  | "password"
  | "profile"
  | "refreshToken"
  | "role"
  | "secret"
  | "sessions"
  | "status"
  | "updatedAt"
  | ViewerDetailedKeySpecifier
)[];
export type ViewerDetailedFieldPolicy = {
  _count?: FieldPolicy<any> | FieldReadFunction<any>;
  accessToken?: FieldPolicy<any> | FieldReadFunction<any>;
  accounts?: FieldPolicy<any> | FieldReadFunction<any>;
  categories?: FieldPolicy<any> | FieldReadFunction<any>;
  comments?: FieldPolicy<any> | FieldReadFunction<any>;
  connections?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  emailVerified?: FieldPolicy<any> | FieldReadFunction<any>;
  entries?: FieldPolicy<any> | FieldReadFunction<any>;
  firstName?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
  lastName?: FieldPolicy<any> | FieldReadFunction<any>;
  mediaItems?: FieldPolicy<any> | FieldReadFunction<any>;
  password?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshToken?: FieldPolicy<any> | FieldReadFunction<any>;
  role?: FieldPolicy<any> | FieldReadFunction<any>;
  secret?: FieldPolicy<any> | FieldReadFunction<any>;
  sessions?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type StrictTypedTypePolicies = {
  Account?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | AccountKeySpecifier
      | (() => undefined | AccountKeySpecifier);
    fields?: AccountFieldPolicy;
  };
  Auth?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | AuthKeySpecifier
      | (() => undefined | AuthKeySpecifier);
    fields?: AuthFieldPolicy;
  };
  AuthDetailed?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | AuthDetailedKeySpecifier
      | (() => undefined | AuthDetailedKeySpecifier);
    fields?: AuthDetailedFieldPolicy;
  };
  AuthSansSession?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | AuthSansSessionKeySpecifier
      | (() => undefined | AuthSansSessionKeySpecifier);
    fields?: AuthSansSessionFieldPolicy;
  };
  BaseTypeNodes?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | BaseTypeNodesKeySpecifier
      | (() => undefined | BaseTypeNodesKeySpecifier);
    fields?: BaseTypeNodesFieldPolicy;
  };
  BaseTypesEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | BaseTypesEdgeKeySpecifier
      | (() => undefined | BaseTypesEdgeKeySpecifier);
    fields?: BaseTypesEdgeFieldPolicy;
  };
  Category?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CategoryKeySpecifier
      | (() => undefined | CategoryKeySpecifier);
    fields?: CategoryFieldPolicy;
  };
  CategoryConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CategoryConnectionKeySpecifier
      | (() => undefined | CategoryConnectionKeySpecifier);
    fields?: CategoryConnectionFieldPolicy;
  };
  CategoryCount?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CategoryCountKeySpecifier
      | (() => undefined | CategoryCountKeySpecifier);
    fields?: CategoryCountFieldPolicy;
  };
  CategoryEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CategoryEdgeKeySpecifier
      | (() => undefined | CategoryEdgeKeySpecifier);
    fields?: CategoryEdgeFieldPolicy;
  };
  Comment?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CommentKeySpecifier
      | (() => undefined | CommentKeySpecifier);
    fields?: CommentFieldPolicy;
  };
  CommentConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CommentConnectionKeySpecifier
      | (() => undefined | CommentConnectionKeySpecifier);
    fields?: CommentConnectionFieldPolicy;
  };
  CommentEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CommentEdgeKeySpecifier
      | (() => undefined | CommentEdgeKeySpecifier);
    fields?: CommentEdgeFieldPolicy;
  };
  Connection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ConnectionKeySpecifier
      | (() => undefined | ConnectionKeySpecifier);
    fields?: ConnectionFieldPolicy;
  };
  ConnectionConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ConnectionConnectionKeySpecifier
      | (() => undefined | ConnectionConnectionKeySpecifier);
    fields?: ConnectionConnectionFieldPolicy;
  };
  ConnectionEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ConnectionEdgeKeySpecifier
      | (() => undefined | ConnectionEdgeKeySpecifier);
    fields?: ConnectionEdgeFieldPolicy;
  };
  ContentNodes?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ContentNodesKeySpecifier
      | (() => undefined | ContentNodesKeySpecifier);
    fields?: ContentNodesFieldPolicy;
  };
  Entry?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | EntryKeySpecifier
      | (() => undefined | EntryKeySpecifier);
    fields?: EntryFieldPolicy;
  };
  EntryConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | EntryConnectionKeySpecifier
      | (() => undefined | EntryConnectionKeySpecifier);
    fields?: EntryConnectionFieldPolicy;
  };
  EntryCount?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | EntryCountKeySpecifier
      | (() => undefined | EntryCountKeySpecifier);
    fields?: EntryCountFieldPolicy;
  };
  EntryEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | EntryEdgeKeySpecifier
      | (() => undefined | EntryEdgeKeySpecifier);
    fields?: EntryEdgeFieldPolicy;
  };
  JwtDecoded?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | JwtDecodedKeySpecifier
      | (() => undefined | JwtDecodedKeySpecifier);
    fields?: JwtDecodedFieldPolicy;
  };
  JwtHeaders?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | JwtHeadersKeySpecifier
      | (() => undefined | JwtHeadersKeySpecifier);
    fields?: JwtHeadersFieldPolicy;
  };
  JwtPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | JwtPayloadKeySpecifier
      | (() => undefined | JwtPayloadKeySpecifier);
    fields?: JwtPayloadFieldPolicy;
  };
  MediaItem?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | MediaItemKeySpecifier
      | (() => undefined | MediaItemKeySpecifier);
    fields?: MediaItemFieldPolicy;
  };
  MediaItemConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | MediaItemConnectionKeySpecifier
      | (() => undefined | MediaItemConnectionKeySpecifier);
    fields?: MediaItemConnectionFieldPolicy;
  };
  MediaItemEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | MediaItemEdgeKeySpecifier
      | (() => undefined | MediaItemEdgeKeySpecifier);
    fields?: MediaItemEdgeFieldPolicy;
  };
  Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | MutationKeySpecifier
      | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  Node?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | NodeKeySpecifier
      | (() => undefined | NodeKeySpecifier);
    fields?: NodeFieldPolicy;
  };
  NodeUnionConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | NodeUnionConnectionKeySpecifier
      | (() => undefined | NodeUnionConnectionKeySpecifier);
    fields?: NodeUnionConnectionFieldPolicy;
  };
  PageInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | PageInfoKeySpecifier
      | (() => undefined | PageInfoKeySpecifier);
    fields?: PageInfoFieldPolicy;
  };
  Profile?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ProfileKeySpecifier
      | (() => undefined | ProfileKeySpecifier);
    fields?: ProfileFieldPolicy;
  };
  ProfileConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ProfileConnectionKeySpecifier
      | (() => undefined | ProfileConnectionKeySpecifier);
    fields?: ProfileConnectionFieldPolicy;
  };
  ProfileEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ProfileEdgeKeySpecifier
      | (() => undefined | ProfileEdgeKeySpecifier);
    fields?: ProfileEdgeFieldPolicy;
  };
  Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | QueryKeySpecifier
      | (() => undefined | QueryKeySpecifier);
    fields?: QueryFieldPolicy;
  };
  Session?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | SessionKeySpecifier
      | (() => undefined | SessionKeySpecifier);
    fields?: SessionFieldPolicy;
  };
  SessionConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | SessionConnectionKeySpecifier
      | (() => undefined | SessionConnectionKeySpecifier);
    fields?: SessionConnectionFieldPolicy;
  };
  SessionEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | SessionEdgeKeySpecifier
      | (() => undefined | SessionEdgeKeySpecifier);
    fields?: SessionEdgeFieldPolicy;
  };
  Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | SubscriptionKeySpecifier
      | (() => undefined | SubscriptionKeySpecifier);
    fields?: SubscriptionFieldPolicy;
  };
  Token?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | TokenKeySpecifier
      | (() => undefined | TokenKeySpecifier);
    fields?: TokenFieldPolicy;
  };
  User?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | UserKeySpecifier
      | (() => undefined | UserKeySpecifier);
    fields?: UserFieldPolicy;
  };
  UserConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | UserConnectionKeySpecifier
      | (() => undefined | UserConnectionKeySpecifier);
    fields?: UserConnectionFieldPolicy;
  };
  UserCount?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | UserCountKeySpecifier
      | (() => undefined | UserCountKeySpecifier);
    fields?: UserCountFieldPolicy;
  };
  UserEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | UserEdgeKeySpecifier
      | (() => undefined | UserEdgeKeySpecifier);
    fields?: UserEdgeFieldPolicy;
  };
  ViewerAuthInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ViewerAuthInfoKeySpecifier
      | (() => undefined | ViewerAuthInfoKeySpecifier);
    fields?: ViewerAuthInfoFieldPolicy;
  };
  ViewerDetailed?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ViewerDetailedKeySpecifier
      | (() => undefined | ViewerDetailedKeySpecifier);
    fields?: ViewerDetailedFieldPolicy;
  };
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
