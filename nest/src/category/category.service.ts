import { PrismaService } from "src/prisma/prisma.service";
import { FindManyCategoriesPaginatedInput } from "./inputs/find-many-categories-paginated.input";
import { Injectable } from "@nestjs/common";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import { Category } from "./model/category.model";

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async relayFindUniqueCategory(params: { id: string }) {
    const category = await this.prismaService.category.findUnique({
      where: { id: fromGlobalId(params.id).id }
    });
    if (!category) {
      throw new Error("could not find category with id " + params.id);
    }
    return category;
  }
  async listCategories(params: FindManyCategoriesPaginatedInput) {
    return await findManyCursorConnection(
      args =>
        this.prismaService.category.findMany({
          include: {
            entries: true
          },
          distinct: params.distinct,
          take: params.take,
          skip: params.skip,
          where: params.where,
          cursor: params.cursor,
          orderBy: params.orderBy,
          ...args
        }),
      () =>
        this.prismaService.category.count({
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
          toGlobalId(Category.name, cursor.id)
      }
    );
  }
}
