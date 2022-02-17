import { Field, HideField } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from 'src/.generated/prisma-nestjs-graphql/prisma/inputs/string-filter.input';
import { BoolFilter } from 'src/.generated/prisma-nestjs-graphql/prisma/inputs/bool-filter.input';
import { JsonNullableListFilter } from 'src/.generated/prisma-nestjs-graphql/prisma/inputs/json-nullable-list-filter.input';
import { DateTimeFilter } from 'src/.generated/prisma-nestjs-graphql/prisma/inputs/date-time-filter.input';
import { DateTimeNullableFilter } from 'src/.generated/prisma-nestjs-graphql/prisma/inputs/date-time-nullable-filter.input';
import { CategoryListRelationFilter } from 'src/.generated/prisma-nestjs-graphql/category/inputs/category-list-relation-filter.input';
import { UserRelationFilter } from 'src/.generated/prisma-nestjs-graphql/user/inputs/user-relation-filter.input';
import { CommentListRelationFilter } from 'src/.generated/prisma-nestjs-graphql/comment/inputs/comment-list-relation-filter.input';
import { StringNullableFilter } from 'src/.generated/prisma-nestjs-graphql/prisma/inputs/string-nullable-filter.input';


@InputType("ViewerEntriesWhereInput")
export class ViewerEntriesWhereInput {

  @Field(() => [ViewerEntriesWhereInput], {nullable:true})
  AND?: Array<ViewerEntriesWhereInput>;

  @Field(() => [ViewerEntriesWhereInput], {nullable:true})
  OR?: Array<ViewerEntriesWhereInput>;

  @Field(() => [ViewerEntriesWhereInput], {nullable:true})
  NOT?: Array<ViewerEntriesWhereInput>;


  @Field(() => StringFilter, {nullable:true})
  id?: StringFilter;

  @Field(() => StringFilter, {nullable:true})
  title?: StringFilter;

  @Field(() => BoolFilter, {nullable:true})
  published?: BoolFilter;


  @Field(() => StringNullableFilter, {nullable:true})
  content?: StringNullableFilter;

  @Field(() => DateTimeFilter, {nullable:true})
  createdAt?: DateTimeFilter;

  @Field(() => DateTimeNullableFilter, {nullable:true})
  updatedAt?: DateTimeNullableFilter;

  @Field(() => StringNullableFilter, {nullable:true})
  featuredImage?: StringNullableFilter;

  @Field(() => CategoryListRelationFilter, {nullable:true})
  categories?: CategoryListRelationFilter;


  @Field(() => CommentListRelationFilter, {nullable:true})
  comments?: CommentListRelationFilter;

  @Field(() => StringNullableFilter, {nullable:true})
  categoryId?: StringNullableFilter;
}
