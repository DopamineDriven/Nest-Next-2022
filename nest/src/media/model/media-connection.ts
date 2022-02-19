import { MediaItem } from "./media.model";
import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType,
  ConnectionNodesObjectType
} from "../../common/pagination/pagination";
import { MediaItemListRelationFilter } from "src/.generated/prisma-nestjs-graphql/media-item/inputs/media-item-list-relation-filter.input";
import { MediaItemOrderByRelevanceInput } from "src/.generated/prisma-nestjs-graphql/media-item/inputs/media-item-order-by-relevance.input";

@ConnectionFilterArgsType(MediaItemListRelationFilter)
export class MediaItemFilter {}

@ConnectionOrderingInputType(MediaItemOrderByRelevanceInput)
export class MediaItemOrderBy {}

@ConnectionNodesObjectType(MediaItem)
export class MediaItemNodes {}

@ConnectionEdgeObjectType(MediaItem, { id: new MediaItem().id })
export class MediaItemEdge extends MediaItem {
  constructor() {
    super();
  }
}

@ConnectionObjectType(MediaItemEdge)
export class MediaItemConnection {}
