import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import { FindManyMediaItemsPaginatedInput } from "./inputs/find-many-media-items-paginated.input";
import { MediaItemConnection } from "./model/media-connection";
import { MediaItem } from "./model/media.model";
import { FindManyMediaItemArgs } from "src/.generated/prisma-nestjs-graphql/media-item/args/find-many-media-item.args";

@Injectable()
export class MediaItemService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async relayFindUniqueMediaItem(params: { id: string }) {
    const mediaItem = await this.prismaService.mediaItem.findUnique({
      where: { id: fromGlobalId(params.id).id }
    });
    if (!mediaItem) {
      throw new Error("could not find mediaItem with id " + params.id);
    }
    return mediaItem;
  }

  async listMediaItems(
    params: FindManyMediaItemsPaginatedInput
  ): Promise<MediaItemConnection> {
    return await findManyCursorConnection(
      args =>
        this.prismaService.mediaItem.findMany({
          include: { user: true },
          distinct: params.distinct,
          take: params.take,
          skip: params.skip,
          where: params.where,
          cursor: params.cursor,
          orderBy: params.orderBy,
          ...args
        }),
      () =>
        this.prismaService.mediaItem.count({
          orderBy: params.orderBy,
          take: params.take,
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


  async getViewerMediaItemsPaginated(
    params: FindManyMediaItemsPaginatedInput,
    viewerId: string
  ): Promise<MediaItemConnection> {
    return await this.prismaService.user
      .findUnique({
        where: { id: viewerId },
        include: { mediaItems: true, _count: true }
      })
      .then(async auth => {
        const user = auth as unknown as NonNullable<typeof auth>;
        return await findManyCursorConnection(
          args =>
            this.prismaService.mediaItem.findMany({
              include: {
                user: true
              },
              distinct: params.distinct,
              take: params.take,
              skip: params.skip,
              where: {
                userId: { equals: user.id },
                id: params.where?.id,
                ...params.where
              },
              cursor: {
                id: user?.mediaItems?.find(id => id)?.id ?? params.cursor?.id
              },
              orderBy: params.orderBy,
              ...args
            }),
          () =>
            this.prismaService.mediaItem.count({
              take: params.take,
              skip: params.skip,
              where: {
                userId: user.id,
                ...params.where
              },
              cursor: {
                id: user?.mediaItems?.find(id => id)?.id,
                ...params.cursor
              }
            }),
          {
            first: params.pagination.first,
            last: params.pagination.last,
            before: params.pagination.before,
            after: params.pagination.after
          },
          {
            getCursor: (record: { id: string }) => record,
            decodeCursor: (cursor: string) => fromGlobalId(cursor),
            encodeCursor: (cursor: { id: string }) =>
              toGlobalId(MediaItem.name, cursor.id)
          }
        );
      });
  }
}
