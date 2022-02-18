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
export class EntryConnection {
}

// const EntryUnion = (func: ResolveTypeFn<EntryOpsUnion, ExecutionContext>) =>
//   createUnionType({
//     name: "EntryUnion",
//     types: () => [AuthDetailedExtended, EntryConnectionExtended],
//     resolveType: (
//       value: EntryOpsUnion,
//       context: ExecutionContext,
//       info: GraphQLResolveInfo,
//       abstracType: GraphQLAbstractType
//     ) =>
//       ({ ...func(value, context, info, abstracType) } as ResolveTypeFn<
//         EntryOpsUnion,
//         ExecutionContext
//       >)
//   });
// type Unionn<T extends any[]> = ArrayElement<T> extends abstract new (
//   ...args: any
// ) => infer R
//   ? R
//   : any;
// type ResolveTypeFn<TSource = EntryOpsUnion, TContext = ExecutionContext> = (
//   ...args: Parameters<GraphQLTypeResolver<TSource, TContext>>
// ) => any;
