import { Field, InputType, Int } from "@nestjs/graphql";
import { PaginationArgsInput } from "src/common/pagination/pagination.args";
import { EntryWhereInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-where.input";
import { EntryOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-order-by-with-relation-and-search-relevance.input";
import { EntryWhereUniqueInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-where-unique.input";
import { EntryScalarFieldEnum } from "src/.generated/prisma-nestjs-graphql/entry/enums/entry-scalar-field.enum";
import { EntryMinAggregateInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-min-aggregate.input";
import { EntryMaxAggregateInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-max-aggregate.input";
import { EntryCountAggregateInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-count-aggregate.input";
import { MappedType } from "@nestjs/mapped-types";

@InputType("EntryAggregate")
export class EntryAggregate {
  @Field(() => EntryWhereInput, { nullable: true })
  where?: EntryWhereInput;

  @Field(() => [EntryOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true
  })
  orderBy?: Array<EntryOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => EntryWhereUniqueInput, { nullable: true })
  cursor?: EntryWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => EntryCountAggregateInput, { nullable: true })
  _count?: EntryCountAggregateInput;

  @Field(() => EntryMinAggregateInput, { nullable: true })
  _min?: EntryMinAggregateInput;

  @Field(() => EntryMaxAggregateInput, { nullable: true })
  _max?: EntryMaxAggregateInput;
}

@InputType("ViewerEntriesInput")
export class ViewerEntriesInput {
  @Field(() => EntryWhereInput)
  where: EntryWhereInput;

  @Field(() => [EntryOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true
  })
  orderBy?: Array<EntryOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => EntryWhereUniqueInput, { nullable: true })
  cursor?: EntryWhereUniqueInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [EntryScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof EntryScalarFieldEnum>;
  @Field(() => PaginationArgsInput)
  pagination: PaginationArgsInput;

  // @Field(() => EntryAggregate)
  // aggregateInput?: EntryAggregate;
}
