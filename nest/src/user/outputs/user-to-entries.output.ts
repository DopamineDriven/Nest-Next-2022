import { UserConnection } from "../model/user-connection.model";
import { EntryConnection } from "src/entry/model/entry-connection.model";
import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType("UsersToEntriesOutput")
export class UsersToEntriesOutput extends UserConnection {
  constructor() {
    super();
  }
  @Field(() => EntryConnection)
  entries: EntryConnection;
}
