import {
  ArgsType,
  Field,
  ID,
  InputType,
  InterfaceType,
  ReturnTypeFuncValue
} from "@nestjs/graphql";
import { CategoryCreateNestedManyWithoutEntriesInput } from "src/.generated/prisma-nestjs-graphql/category/inputs/category-create-nested-many-without-entries.input";
import { UserCreateNestedOneWithoutEntriesInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-create-nested-one-without-entries.input";
import { CommentCreateNestedManyWithoutEntryInput } from "src/.generated/prisma-nestjs-graphql/comment/inputs/comment-create-nested-many-without-entry.input";
import { UserCreateOrConnectWithoutEntriesInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-create-or-connect-without-entries.input";
import { EntryCreatecontentInput } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/entry-createcontent.input";
import { GraphQLJSON, JSONObjectResolver } from "graphql-scalars";
import { EntryCreatefeaturedImageInput } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/entry-createfeatured-image.input";
import { IntersectionType, OmitType } from "@nestjs/mapped-types";
import { Constructor } from "src/common/types/helpers.type";

@InputType("EntryCreateOneInput")
export class EntryCreateOneInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => Boolean, { nullable: true })
  published?: boolean;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | string;

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => EntryCreatecontentInput, { nullable: true })
  content?: EntryCreatecontentInput;

  @Field(() => EntryCreatefeaturedImageInput, { nullable: true })
  featuredImage?: EntryCreatefeaturedImageInput;

  @Field(() => CategoryCreateNestedManyWithoutEntriesInput, { nullable: true })
  categories?: CategoryCreateNestedManyWithoutEntriesInput;
  @Field(() => UserCreateNestedOneWithoutEntriesInput, {nullable:false})
  author!: UserCreateNestedOneWithoutEntriesInput;
}

@InputType("TitleReaddedToEntry")
export class EntryCreateIntersectedTitle {
  @Field(() => String)
  title: string;
}

// WIP
// export const EntryMapping = <
//   T extends Constructor,
//   K extends ReturnTypeFuncValue,
//   U extends Constructor,
//   L extends ReturnTypeFuncValue
// >(
//   outerEntryInput: T,
//   innerEntryInput: U
// ): (outerEntryClassref: K, innerEntryClassRef: L) => Constructor => {

//   return (outerEntryClassref: K, innerEntryClassRef: L): Constructor => {
//     @InputType("EntryIntersected")

//     class EntryIntersected extends IntersectionType(
//       OmitType(EntryCreateOneInput, ["author", "title"] as const),
//       EntryCreateIntersectedTitle
//       ) { categories?: CategoryCreateNestedManyWithoutEntriesInput | undefined = this.categories;
//       }
//   return EntryIntersected
//   }
// };
