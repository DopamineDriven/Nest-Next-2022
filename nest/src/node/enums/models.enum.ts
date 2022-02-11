import { EnumOptions, registerEnumType } from "@nestjs/graphql";

export enum ModelsEnum {
  MediaItem = "MediaItem",
  User = "User",
  Viewer = "Viewer",
  Profile = "Profile",
  Session = "Session",
  Comment = "Comment",
  Connection = "Connection",
  Entry = "Entry",
  Account = "Account",
  Category = "Category",
  VerificationToken = "VerificationToken"
}

registerEnumType<typeof ModelsEnum>(ModelsEnum, {
  name: "ModelsEnum"
} as EnumOptions<typeof ModelsEnum>);
