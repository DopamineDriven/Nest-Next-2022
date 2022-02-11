import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { User } from "src/user/model/user.model";
import { PaginationService } from "src/pagination";
import { PaginationArgsInput } from "src/common/pagination/pagination.args";
import { ResolveTypeFactory } from "@nestjs/graphql/dist/schema-builder/factories/resolve-type.factory";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import { MediaItem } from "./model/media.model";

@Injectable()
export class MediaItemService {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService
  ) {}

  async relayFindUniqueMediaItem(params: { id: string }) {
    const user = await this.prismaService.mediaItem.findUnique({
      where: { id: fromGlobalId(params.id).id }
    });
    if (!user) {
      throw new Error("could not find user with id " + params.id);
    }
    return user;
  }
}
