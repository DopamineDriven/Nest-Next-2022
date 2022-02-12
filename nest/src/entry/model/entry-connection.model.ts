import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType,
  ConnectionNodesObjectType
} from "../../common/pagination/pagination";
import { Entry } from "./entry.model";
import { EntryOrderByWithRelationAndSearchRelevanceInput } from "../../.generated/prisma-nestjs-graphql/entry/inputs/entry-order-by-with-relation-and-search-relevance.input";
import { EntryRelationFilter } from "../../.generated/prisma-nestjs-graphql/entry/inputs/entry-relation-filter.input";
@ConnectionFilterArgsType(EntryRelationFilter)
export class EntryFilter {}

@ConnectionOrderingInputType(EntryOrderByWithRelationAndSearchRelevanceInput)
export class EntryOrderBy {}

@ConnectionNodesObjectType(Entry)
export class EntryNodes {}

@ConnectionEdgeObjectType(Entry, {id: new Entry().id})
export class EntryEdge extends Entry {
  constructor() {
    super();
  }

}

@ConnectionObjectType(EntryEdge)
export class EntryConnection extends EntryEdge {
  constructor() {
    super();
  }
}

