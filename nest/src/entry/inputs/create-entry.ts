import { ObjectType, InputType, Field } from "@nestjs/graphql";

@InputType("")
export class CreateEntry {
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

  // @Field(() => EntryCreatecontentInput, { nullable: true })
  // content?: EntryCreatecontentInput;

  // @Field(() => EntryCreatefeaturedImageInput, { nullable: true })
  // featuredImage?: EntryCreatefeaturedImageInput;

  // @Field(() => CategoryCreateNestedManyWithoutEntriesInput, { nullable: true })
  // categories?: CategoryCreateNestedManyWithoutEntriesInput;
  // @Field(() => UserCreateNestedOneWithoutEntriesInput, {nullable:false})
  // author!: UserCreateNestedOneWithoutEntriesInput;
}
