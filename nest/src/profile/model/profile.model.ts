import {
  DateResolver,
  JSONObjectResolver,
  JSONResolver,
  PhoneNumberResolver
} from "graphql-scalars";
import { User } from "../../user/model/user.model";
import { Field, ObjectType, ID } from "@nestjs/graphql";
import { Gender } from "../../.generated/prisma-nestjs-graphql/prisma/enums/gender.enum";
import { Pronouns } from "../../.generated/prisma-nestjs-graphql/prisma/enums/pronouns.enum";
import { Country } from "..";
@ObjectType("Profile")
export class Profile {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => Date, { nullable: false })
  memberSince!: Date;

  @Field(() => Gender, { nullable: true, defaultValue: "OTHER" })
  gender?: keyof typeof Gender | null;

  @Field(() => Pronouns, { nullable: true, defaultValue: "NOT_LISTED" })
  pronouns?: keyof typeof Pronouns | null;

  @Field(() => String, { nullable: true })
  coverPhoto?: string | null;

  @Field(() => Date, { nullable: true })
  lastSeen?: Date | null;

  @Field(() => DateResolver, { nullable: true })
  dob?: typeof DateResolver | null;

  @Field(() => PhoneNumberResolver, { nullable: true })
  phoneNumber?: typeof PhoneNumberResolver | null;

  @Field(() => String, { nullable: true })
  occupation?: string | null;

  @Field(() => String, { nullable: true })
  city?: string | null;

  @Field(() => String, { nullable: true })
  country?: keyof typeof Country | null;

  @Field(() => [JSONObjectResolver], { nullable: true })
  bio?: Array<typeof JSONObjectResolver>;

  @Field(() => [JSONObjectResolver], { nullable: true })
  activiyFeed?: Array<typeof JSONObjectResolver>;

  @Field(() => User, { nullable: false })
  user!: User;

  @Field(() => JSONObjectResolver, { nullable: true })
  recentActivity?: typeof JSONObjectResolver | null;
}
