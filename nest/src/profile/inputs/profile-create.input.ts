import { InputType, Field } from "@nestjs/graphql";
import { Gender } from "src/.generated/prisma-nestjs-graphql/prisma/enums/gender.enum";
import { Pronouns } from "src/.generated/prisma-nestjs-graphql/prisma/enums/pronouns.enum";
import { Country } from "../enums/country.enum";
import { JSONObjectResolver, PhoneNumberResolver } from "graphql-scalars";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { UserCreateNestedOneWithoutProfileInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-create-nested-one-without-profile.input";

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

@InputType("CreateNewProfileInput")
export class CreateNewProfileInput {
  @Field(() => Gender, { nullable: true })
  gender?: keyof typeof Gender;

  @Field(() => Pronouns, { nullable: true })
  pronouns?: keyof typeof Pronouns;

  @Field(() => String, { nullable: true })
  coverPhoto?: string;

  @Field(() => String, { nullable: true })
  dob?: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Field(() => String, { nullable: true })
  occupation?: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  bio?: string;
}
@InputType("CreateOneProfile")
export class CreateOneProfile {
  @Field(() => CreateNewProfileInput, { nullable: false })
  data!: CreateNewProfileInput;
}
