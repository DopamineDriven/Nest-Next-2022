import { InputType, Field } from "@nestjs/graphql";
import { FindManyCommentsPaginatedInput } from "src/comment/inputs/comment-paginated.input";
import { FindManyEntriesPaginatedInput } from "src/entry/inputs/entry-paginated.input";
import { FindManyMediaItemsPaginatedInput } from "src/media/inputs/find-many-media-items-paginated.input";
import { FindManySessionsPaginatedInput } from "src/session/inputs/sessions-paginated.input";
import { FindManyUsersPaginatedInput } from "./user-paginated-args.input";

@InputType("ViewerFieldsSubConnectionInputs")
export class ViewerFieldsSubConnectionInputs {
  @Field(() => FindManyEntriesPaginatedInput, { nullable: true })
  findManyEntriesInput: FindManyEntriesPaginatedInput | null;
  @Field(() => FindManySessionsPaginatedInput, { nullable: true })
  findManySessionsInput: FindManySessionsPaginatedInput | null;
  @Field(() => FindManyCommentsPaginatedInput, { nullable: true })
  findManyCommentsInput: FindManyCommentsPaginatedInput | null;
  @Field(() => FindManyMediaItemsPaginatedInput, { nullable: true })
  findManyMediaItemsInput: FindManyMediaItemsPaginatedInput | null;
}
@InputType("ViewerFieldsPaginatedInput")
export class ViewerFieldsPaginatedInput {
  @Field(() => FindManyUsersPaginatedInput)
  params: FindManyUsersPaginatedInput;
  @Field(() => ViewerFieldsSubConnectionInputs)
  connectionInputs?: ViewerFieldsSubConnectionInputs;
}
