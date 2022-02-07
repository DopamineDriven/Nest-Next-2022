import { InputType, Field } from '@nestjs/graphql';
import { EntryWhereUniqueInput } from 'src/.generated/prisma-nestjs-graphql/entry/inputs/entry-where-unique.input';
import { EntryUpdateWithoutAuthorInput } from 'src/.generated/prisma-nestjs-graphql/entry/inputs/entry-update-without-author.input';
import { EntryCreateWithoutAuthorInput } from 'src/.generated/prisma-nestjs-graphql/entry/inputs/entry-create-without-author.input';


@InputType("EntryUpsertInput")
export class EntryUpsertInput {

  @Field(() => EntryWhereUniqueInput, {nullable:false})
  where!: EntryWhereUniqueInput;

  @Field(() => EntryUpdateWithoutAuthorInput, {nullable:true})
  update?: EntryUpdateWithoutAuthorInput;

  @Field(() => EntryCreateWithoutAuthorInput, {nullable:true})
  create?: EntryCreateWithoutAuthorInput;
}
