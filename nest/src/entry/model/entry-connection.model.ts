import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType
} from "../../common/pagination/pagination";
import { Field, Int } from "@nestjs/graphql";
import { Entry } from "./entry.model";
import { EntryOrderByWithRelationAndSearchRelevanceInput } from "../../.generated/prisma-nestjs-graphql/entry/inputs/entry-order-by-with-relation-and-search-relevance.input";

@ConnectionFilterArgsType()
export class EntryFilter {
  @Field(_type => String, { nullable: true })
  type!: string;
}

@ConnectionOrderingInputType()
export class EntryOrderBy {
  @Field(_type => EntryOrderByWithRelationAndSearchRelevanceInput, {
    nullable: true
  })
  sort: EntryOrderByWithRelationAndSearchRelevanceInput;
}

@ConnectionEdgeObjectType(Entry)
export class EntryEdge {}

@ConnectionObjectType(EntryEdge)
export class EntryConnection {
  @Field(() => Int, { defaultValue: 0 })
  entryCount!: number;
}
