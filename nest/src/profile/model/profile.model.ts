import {
  DateResolver,
  GraphQLJSONObject,
  JSONObjectResolver,
  JSONResolver,
  PhoneNumberResolver
} from "graphql-scalars";
import { User } from "../../user/model/user.model";
import { Field, ObjectType, ID } from "@nestjs/graphql";
import { Gender } from "../../.generated/prisma-nestjs-graphql/prisma/enums/gender.enum";
import { Pronouns } from "../../.generated/prisma-nestjs-graphql/prisma/enums/pronouns.enum";
import { Country } from "..";
import { JSONValue } from "src/common/types/json.type";
import { isInputObjectType } from "graphql";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { Node } from "src/node/model/node.model";

@ObjectType("Profile")
export class Profile implements Node {
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

  @Field(() => [JSONObjectResolver], {nullable:true})
  coverPhoto?: Array<any>

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

  @Field(() => [JSONObjectResolver], {nullable:true})
  bio!: Array<typeof JSONObjectResolver>

  @Field(() => [JSONObjectResolver], {nullable:true})
  activiyFeed!: Array<typeof JSONObjectResolver>

  @Field(() => User, { nullable: false })
  user!: User;

  @Field(() => [JSONObjectResolver], {nullable:true})
  recentActivity!: Array<typeof JSONObjectResolver>
}
