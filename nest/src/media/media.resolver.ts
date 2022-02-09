import { Resolver, Query, Args } from "@nestjs/graphql";
import { MediaItemConnection } from "./model/media-connection";
import { FindManyMediaItemsInput } from "./inputs/find-many-media-items-paginated.input";
import { MediaItem } from "./model/media.model";
import { PrismaService } from "src/prisma";
import { AuthService } from "src/auth/auth-jwt.service";
import { Inject, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/common/guards/gql-context.guard";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";

@Resolver(() => MediaItem)
export class MediaResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @Query(() => MediaItemConnection)
  async listMediaItems(
    @Args("findManyMediaItemsPaginated", {
      type: () => FindManyMediaItemsInput,
      nullable: true
    })
    params: FindManyMediaItemsInput
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
      }
    );
  }
}
