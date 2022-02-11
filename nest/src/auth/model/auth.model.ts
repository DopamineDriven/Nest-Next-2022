import { ObjectType, Field, InputType } from "@nestjs/graphql";
import { User } from "../../user/model/user.model";
import { Session } from "../../session/model";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";
import { InstanceOf } from "ts-morph";

@ObjectType("Auth")
export class Auth {
  @Field(() => User)
  user!: User;
  @Field(() => Session, { nullable: true })
  session: Session | null;

  @Field(_type => String, { nullable: true })
  accessToken!: string | null;

  @Field(_type => String, { nullable: true })
  refreshToken!: string | null;
}

@ObjectType("AuthSansSession")
export class AuthSansSession {
  @Field(() => User, { nullable: true })
  user!: User | null;

  @Field(_type => String, { nullable: true })
  accessToken!: string | null;

  @Field(_type => String, { nullable: true })
  refreshToken!: string | null;
}

