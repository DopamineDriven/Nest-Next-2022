import { InputType, Field } from "@nestjs/graphql";

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

@InputType("ChangePasswordInput")
export class ChangePasswordInput implements ChangePasswordDto {
  @Field(() => String, { nullable: false, name: "oldPassword" })
  oldPassword!: string;

  @Field(() => String, { nullable: false, name: "newPassword" })
  newPassword!: string;
}
