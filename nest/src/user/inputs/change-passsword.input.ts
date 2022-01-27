import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, MinLength } from "class-validator";

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

@InputType()
export class ChangePasswordInput {
  @Field({ nullable: false })
  @IsNotEmpty()
  oldPassword!: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @MinLength(8)
  newPassword!: string;
}
