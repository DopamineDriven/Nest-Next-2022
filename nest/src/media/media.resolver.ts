import { Resolver, Query, Args, Context } from "@nestjs/graphql";
import { MediaItemConnection } from "./model/media-connection";
import { FindManyMediaItemsPaginatedInput } from "./inputs/find-many-media-items-paginated.input";
import { MediaItem } from "./model/media.model";
import { PrismaService } from "src/prisma";
import { AuthService } from "src/auth/auth-jwt.service";
import { Inject, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/common/guards/gql-context.guard";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { MediaItemService } from "./media.service";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import { AppContext } from "src/gql-config.service";

@Resolver(() => MediaItem)
export class MediaResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    @Inject(MediaItemService)
    private readonly mediaItemService: MediaItemService
  ) {}

  @Query(() => MediaItemConnection)
  async listMediaItems(
    @Args("findManyMediaItemsPaginated", {
      type: () => FindManyMediaItemsPaginatedInput,
      nullable: true
    })
    params: FindManyMediaItemsPaginatedInput
  ) {
    return await findManyCursorConnection(
      args =>
        this.prismaService.mediaItem.findMany({
          take: params.take,
          include: { user: true },
          skip: params.skip,
          distinct: params.distinct,
          where: params.where,
          orderBy: params.orderBy,
          ...args
        }),
      () =>
        this.prismaService.mediaItem.count({
          orderBy: params.orderBy,
          distinct: params.distinct,
          skip: params.skip,
          where: params.where,
          cursor: params.cursor
        }),
      {
        first: params.pagination.first ?? 10,
        last: params.pagination.last,
        before: params.pagination.before,
        after: params.pagination.after
      },
      {
        getCursor: (record: { id: string }) => {
          return record;
        },
        decodeCursor: (cursor: string) => fromGlobalId(cursor),
        encodeCursor: (cursor: { id: string }) =>
          toGlobalId(MediaItem.name, cursor.id)
      }
    );
  }
  @Query(() => MediaItem)
  findUniqueMediaItem(@Args("mediaItemId") mediaItemId: string) {
    return this.mediaItemService.relayFindUniqueMediaItem({ id: mediaItemId });
  }

  @Query(() => MediaItemConnection)
  async viewerMediaItemsPaginated(
    @Args("viewerMediaItemsPaginatedInput", {
      type: () => FindManyMediaItemsPaginatedInput
    })
    params: FindManyMediaItemsPaginatedInput,
    @Context() { viewerId }: AppContext
  ): Promise<MediaItemConnection | null> {
    return viewerId ? await this.mediaItemService.getViewerMediaItemsPaginated(
      params,
      viewerId as string
    ) : null;
  }
}
