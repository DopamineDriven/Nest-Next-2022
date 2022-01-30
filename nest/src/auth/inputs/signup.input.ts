import { UserStatus } from "../../.generated/prisma-nestjs-graphql/prisma/enums/user-status.enum";
import { Role } from "../../.generated/prisma-nestjs-graphql/prisma/enums/role.enum";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { InputType, Field } from "@nestjs/graphql";
import { ProfileCreateNestedOneWithoutUserInput } from "../../.generated/prisma-nestjs-graphql/profile/inputs/profile-create-nested-one-without-user.input";
@InputType()
export class SignupInput {
  @Field(_type => String)
  @IsEmail()
  email!: string;

  @Field(_type => String)
  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @Field(_type => String, { nullable: true })
  firstName?: string;
  @Field(_type => String, { nullable: true })
  lastName?: string;
  @Field(_type => String, { nullable: true })
  image?: string;

  // @Field(() => ProfileCreateNestedOneWithoutUserInput, {nullable:true})
  // profile?: ProfileCreateNestedOneWithoutUserInput;
}
