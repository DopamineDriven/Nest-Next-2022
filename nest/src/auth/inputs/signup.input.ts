import { UserStatus } from "../../.generated/prisma-nestjs-graphql/prisma/enums/user-status.enum";
import { Role } from "../../.generated/prisma-nestjs-graphql/prisma/enums/role.enum";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { InputType, Field } from "@nestjs/graphql";

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
  name?: string;

  @Field(_type => UserStatus, {
    nullable: true,
    defaultValue: UserStatus.OFFLINE
  })
  status?: keyof typeof UserStatus;

  @Field(_type => Role, { nullable: true, defaultValue: Role.USER })
  role?: keyof typeof Role;

  @Field(_type => String, { nullable: true })
  image?: string;

  @Field(_type => String, { nullable: true })
  accessToken?: string;
}
