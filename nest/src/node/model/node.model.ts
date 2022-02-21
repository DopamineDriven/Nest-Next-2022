import { User } from "src/user/model/user.model";
import { Entry } from "src/entry/model/entry.model";
import { MediaItem } from "src/media/model/media.model";
import { Comment } from "src/comment/model/comment.model";
import { Connection } from "src/connection/model/connection.model";
import { Category } from "src/category/model/category.model";
import { Account } from "src/account/model/account.model";
import { Session } from "src/session/model/session.model";
import { Profile } from "src/profile/model/profile.model";
import { Field, ID, InterfaceType } from "@nestjs/graphql";

export type NodeImplementedUnion =
  | User
  | Entry
  | MediaItem
  | Session
  | Comment
  | Connection
  | Category
  | Account
  | Profile;
export interface RootTypes<T extends NodeImplementedUnion> {
  __typename:
    | typeof User.name
    | typeof Entry.name
    | typeof Connection.name
    | typeof Account.name
    | typeof Category.name
    | typeof MediaItem.name
    | typeof Comment.name
    | typeof Session.name
    | typeof Profile.name;
  node(id: string): RootTypes<T>;
  id:
    | User["id"]
    | Entry["id"]
    | MediaItem["id"]
    | Session["id"]
    | Comment["id"]
    | Connection["id"]
    | Category["id"]
    | Account["id"]
    | Profile["id"];
}
@InterfaceType("Node", {
  resolveType({ id, nombre }: Node) {
    return id in User && nombre === User.name
      ? User
      : id in Entry && nombre === Entry.name
      ? Entry
      : id in Account && nombre === Account.name
      ? Account
      : id in Connection && nombre === Connection.name
      ? Connection
      : id in Category && nombre === Category.name
      ? Category
      : id in Comment && nombre === Comment.name
      ? Comment
      : id in Session && nombre === Session.name
      ? Session
      : id in Profile && nombre === Profile.name
      ? Profile
      : User ||
        Entry ||
        MediaItem ||
        Session ||
        Comment ||
        Connection ||
        Category ||
        Profile ||
        Account;
  }
})
export class Node {
  nombre?: string | undefined;
  @Field(_type => ID, { name: "id", nullable: false })
  id: string;
}
