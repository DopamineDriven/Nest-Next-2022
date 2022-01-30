import { ArgsType, Field, ID } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class UserIdArgs {
  @Field(() => ID)
  @IsNotEmpty()
  userId?: string;
}
