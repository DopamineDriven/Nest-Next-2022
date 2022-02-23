import { User } from "../../user/model/user.model";
import { Field, ObjectType, ID } from "@nestjs/graphql";
import { Gender } from "../../.generated/prisma-nestjs-graphql/prisma/enums/gender.enum";
import { Pronouns } from "../../.generated/prisma-nestjs-graphql/prisma/enums/pronouns.enum";
import { Node } from "src/node/model/node.model";

@ObjectType("Profile", { implements: () => [Node] })
export class Profile implements Node {
  nombre?: string | undefined = Profile.name;
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  userId!: string | null;

  @Field(() => Date, { nullable: false })
  memberSince!: Date;

  @Field(() => Gender, { nullable: true, defaultValue: "OTHER" })
  gender?: keyof typeof Gender | null;

  @Field(() => Pronouns, { nullable: true, defaultValue: "NOT_LISTED" })
  pronouns?: keyof typeof Pronouns | null;

  @Field(() => String, { nullable: true })
  coverPhoto: string | null;

  @Field(() => Date, { nullable: true })
  lastSeen?: Date | null;

  @Field(() => String, { nullable: true })
  dob: string | null;

  @Field(() => String, { nullable: true })
  phoneNumber?: string | null;

  @Field(() => String, { nullable: true })
  occupation?: string | null;

  @Field(() => String, { nullable: true })
  city?: string | null;

  @Field(() => String, { nullable: true })
  country?: string | null;

  @Field(() => String, { nullable: true })
  bio: string | null;

  @Field(() => String, { nullable: true })
  activiyFeed: string | null;

  @Field(() => User, { nullable: false })
  user?: User;

  @Field(() => String, { nullable: true })
  recentActivity: string | null;
}
