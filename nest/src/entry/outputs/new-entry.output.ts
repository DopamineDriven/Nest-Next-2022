import { Entry } from "../model/entry.model";
import { User } from "src/user/model/user.model";
import { ObjectType } from "@nestjs/graphql";


@ObjectType("NewEntryOutput")
export class NewEntryOutput extends Entry {
  constructor() {
    super();
  }
}
