//// ------------------------------------------------------
//// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
//// ------------------------------------------------------

Project "2022 Nesting" {
  database_type: 'PostgreSQL'
  Note: ''
}

Table MediaItem {
  id String [pk]
  userId String [not null]
  uploadedAt DateTime [default: `now()`, not null]
  updatedAt DateTime
  user User [not null]
  name String
  size String
  type MimeTypes
  destination MediaItemDestination
  fileLastModified DateTime
  width Float
  height Float
  quality Int
  src String
  srcSet String
  ariaLabel String
  title String
  caption String

  indexes {
    (name, userId) [unique]
  }
}

Table User {
  id String [pk]
  firstName String
  lastName String
  email String [unique, not null]
  image Json [not null]
  role Role [default: 'USER']
  status UserStatus [default: 'OFFLINE']
  password String [not null, default: '']
  createdAt DateTime [default: `now()`, not null]
  updatedAt DateTime
  emailVerified DateTime
  profile Profile
  accounts Account [not null]
  entries Entry [not null]
  connections Connection [not null]
  categories Category [not null]
  comments Comment [not null]
  sessions Session [not null]
  mediaItems MediaItem [not null]
}

Table Profile {
  id String [pk]
  userId String [unique, not null]
  memberSince DateTime [default: `now()`, not null]
  gender Gender [default: 'OTHER']
  pronouns Pronouns [default: 'NOT_LISTED']
  coverPhoto Json [not null]
  lastSeen DateTime
  dob String
  phoneNumber String
  occupation String
  city String
  country String
  bio Json [not null]
  activiyFeed Json [not null]
  user User [not null]
  recentActivity Json [not null]
}

Table Session {
  id String [not null]
  userId String [unique, not null]
  accessToken String
  alg String
  refreshToken String
  signature String
  scopes String [not null]
  provider String
  tokenState String
  lastVerified DateTime
  iat Int
  exp Int
  user User [not null]
}

Table Comment {
  id String [pk]
  authorId String [not null]
  entryId String [not null]
  body Json
  position String
  createdAt DateTime [default: `now()`, not null]
  updatedAt DateTime
  reactions CommentReactions [not null]
  entry Entry [not null]
  author User [not null]

  indexes {
    (authorId, entryId) [unique]
  }
}

Table Connection {
  id String [pk]
  ownerId String [not null]
  firstName String
  lastName String
  email String [not null]
  phoneNumber String
  ip String
  lastModified DateTime
  owner User [not null]
}

Table Entry {
  id String [pk]
  title String [not null]
  published Boolean [not null, default: false]
  authorId String [unique, not null]
  content Json [not null]
  createdAt DateTime [default: `now()`, not null]
  updatedAt DateTime
  featuredImage Json [not null]
  categories Category [not null]
  author User [not null]
  comments Comment [not null]
  categoryId String
}

Table Account {
  id String [pk]
  userId String [not null]
  type String [not null]
  provider String [not null]
  providerAccountId String [not null]
  scope String
  access_token String
  expires_at Int
  id_token String
  token_type String
  oauth_token String
  oauth_token_secret String
  refresh_token String
  refresh_secret String
  session_state String
  user User [not null]

  indexes {
    (provider, providerAccountId) [unique]
  }
}

Table Category {
  id String [pk]
  creatorId String [not null]
  createdAt DateTime [default: `now()`]
  updatedAt DateTime
  name String [unique, not null]
  entries Entry [not null]
  entryId String
  creator User [not null]
}

Table VerificationToken {
  id String [pk]
  identifier String [not null]
  token String [unique, not null]
  expires DateTime [not null]

  indexes {
    (identifier, token) [unique]
  }

  Note: 'Passwordless login for email providers'
}

Enum Role {
  SUPERADMIN
  ADMIN
  MAINTAINER
  USER
}

Enum CommentReactions {
  LIKE
  LOVE
  LAUGH
  TEARS
  DISLIKE
  ANGRY
  CONFUSED
  CARE
  WOW
  PARROT
  ROCKET
}

Enum Pronouns {
  HE_HIM_HIS
  SHE_HER_HERS
  NOT_LISTED
  PREFER_NOT_TO_SAY
  THEY_THEM_THEIRS
}

Enum Gender {
  MALE
  FEMALE
  OTHER
  UNCERTAIN
}

Enum UserStatus {
  ONLINE
  OFFLINE
  SUSPENDED
  DELETED
  BANNED
  DEACTIVATED
}

Enum MimeTypes {
  GIF
  JPEG
  WEBP
  AVIF
  PNG
  SVG
  TIFF
  BMP
}

Enum MediaItemDestination {
  COVER_IMAGE
  AVATAR
  COMMENT_ATTACHMENT
  ENTRY_ATTACHMENT
  FEATURED_IMAGE
}

Ref: MediaItem.userId > User.id [delete: Cascade]

Ref: Profile.userId - User.id [delete: Cascade]

Ref: Session.userId > User.id [delete: Cascade]

Ref: Comment.entryId > Entry.id [delete: Cascade]

Ref: Comment.authorId > User.id [delete: Cascade]

Ref: Connection.ownerId > User.id [delete: Cascade]

Ref: Entry.categoryId > Category.id

Ref: Entry.authorId > User.id [delete: Cascade]

Ref: Account.userId > User.id [delete: Cascade]

Ref: Category.entryId > Entry.id

Ref: Category.creatorId > User.id [delete: Cascade]