import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType,
  ConnectionNodesObjectType
} from "../../common/pagination/pagination";
import { Category } from "./category.model";
import { CategoryOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/category/inputs/category-order-by-with-relation-and-search-relevance.input";
import { CategoryListRelationFilter } from "src/.generated/prisma-nestjs-graphql/category/inputs/category-list-relation-filter.input";

@ConnectionFilterArgsType(CategoryListRelationFilter)
export class CategoryFilter {}

@ConnectionOrderingInputType(CategoryOrderByWithRelationAndSearchRelevanceInput)
export class CategoryOrderBy {}

@ConnectionNodesObjectType(Category)
export class CategoryNodes {}

@ConnectionEdgeObjectType(Category, { id: new Category().id })
export class CategoryEdge extends Category {
  constructor() {
    super();
  }
}

@ConnectionObjectType(CategoryEdge)
export class CategoryConnection extends CategoryEdge {
  constructor() {
    super();
  }
}
