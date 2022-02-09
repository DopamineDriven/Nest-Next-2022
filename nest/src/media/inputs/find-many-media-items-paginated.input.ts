import { Field, InputType, Int } from '@nestjs/graphql';
import { MediaItemWhereInput } from 'src/.generated/prisma-nestjs-graphql/media-item/inputs/media-item-where.input';
import { MediaItemOrderByWithRelationAndSearchRelevanceInput } from 'src/.generated/prisma-nestjs-graphql/media-item/inputs/media-item-order-by-with-relation-and-search-relevance.input';
import { MediaItemWhereUniqueInput } from 'src/.generated/prisma-nestjs-graphql/media-item/inputs/media-item-where-unique.input';
import { MediaItemScalarFieldEnum } from 'src/.generated/prisma-nestjs-graphql/media-item/enums/media-item-scalar-field.enum';

@InputType("FindManyMediaItemsInput")
export class FindManyMediaItemsInput {

    @Field(() => MediaItemWhereInput, {nullable:true})
    where?: MediaItemWhereInput;

    @Field(() => [MediaItemOrderByWithRelationAndSearchRelevanceInput], {nullable:true})
    orderBy?: Array<MediaItemOrderByWithRelationAndSearchRelevanceInput>;

    @Field(() => MediaItemWhereUniqueInput, {nullable:true})
    cursor?: MediaItemWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [MediaItemScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof MediaItemScalarFieldEnum>;
}
