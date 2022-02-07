import { Field, InputType } from "@nestjs/graphql";
import { FindManyEntriesPaginatedInput } from "src/entry/inputs/entry-paginated.input";
import { FindManyUsersPaginatedInput } from "./user-paginated-args.input";


@InputType("UsersToEntriesPaginatedInput")
export class UsersToEntriesPaginatedInput {
  @Field(() => FindManyUsersPaginatedInput)
  findManyUsersPaginatedInput: FindManyUsersPaginatedInput;

  @Field(() => FindManyEntriesPaginatedInput)
  findManyEntriesPaginatedInput: FindManyEntriesPaginatedInput;
}
