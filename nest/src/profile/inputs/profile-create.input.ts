import { InputType, Field } from "@nestjs/graphql";
import { Gender } from "src/.generated/prisma-nestjs-graphql/prisma/enums/gender.enum";
import { Pronouns } from "src/.generated/prisma-nestjs-graphql/prisma/enums/pronouns.enum";
import { Country } from "../enums/country.enum";
import { JSONObjectResolver, PhoneNumberResolver } from "graphql-scalars";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";

@InputType("ProfileCreateInput")
export class ProfileCreateInput {
  @Field(() => [GraphQLJSON], { nullable: true })
  bio: Prisma.Enumerable<Prisma.JsonValue> | null;

  @Field(() => PhoneNumberResolver, { nullable: true })
  phoneNumber: typeof PhoneNumberResolver | null;

  @Field(() => Gender, { nullable: true })
  gender: keyof typeof Gender | null;

  @Field(() => Pronouns, { nullable: true })
  pronouns: keyof typeof Pronouns | null;

  @Field(() => String, { nullable: true })
  city: string | null;

  @Field(() => String, { nullable: true })
  country: keyof typeof Country | null;

  @Field(() => String, { nullable: true })
  occupation: string | null;

  @Field(() => String, { nullable: true })
  coverPhoto: string | null;
}
