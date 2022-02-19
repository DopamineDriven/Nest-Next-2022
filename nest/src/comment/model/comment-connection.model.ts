import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType,
  ConnectionNodesObjectType
} from "../../common/pagination/pagination";
import { Comment } from "./comment.model";
import { EntryOrderByWithRelationAndSearchRelevanceInput } from "../../.generated/prisma-nestjs-graphql/entry/inputs/entry-order-by-with-relation-and-search-relevance.input";
import { EntryRelationFilter } from "../../.generated/prisma-nestjs-graphql/entry/inputs/entry-relation-filter.input";
import { CommentOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/comment/inputs/comment-order-by-with-relation-and-search-relevance.input";
import { CommentListRelationFilter } from "src/.generated/prisma-nestjs-graphql/comment/inputs/comment-list-relation-filter.input";
@ConnectionFilterArgsType(CommentListRelationFilter)
export class CommentFilter {}

@ConnectionOrderingInputType(CommentOrderByWithRelationAndSearchRelevanceInput)
export class CommentOrderBy {}

@ConnectionNodesObjectType(Comment)
export class CommentNodes {}

@ConnectionEdgeObjectType(Comment, { id: new Comment().id })
export class CommentEdge extends Comment {
  constructor() {
    super();
  }
}

@ConnectionObjectType(CommentEdge)
export class CommentConnection extends CommentEdge {
  constructor() {
    super();
  }
}
