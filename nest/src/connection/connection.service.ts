import { PrismaService } from "src/prisma/prisma.service";
import { FindManyConnectionsPaginatedInput } from "./inputs/find-many-connections-paginated.input";
import { Injectable } from "@nestjs/common";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import { Connection } from "./model";


@Injectable()
export class ConnectionService {
  constructor(private prismaService: PrismaService) { }

  async relayFindUniqueConnection(params: { id: string }) {
    const connection = await this.prismaService.connection.findUnique({
      where: { id: fromGlobalId(params.id).id }
    });
    if (!connection) {
      throw new Error("could not find Connection with id " + params.id);
    }
    return connection;
  }
  async listConnections(params: FindManyConnectionsPaginatedInput) {
    return await findManyCursorConnection(
      args =>
        this.prismaService.connection.findMany({
          include: {
            owner: true
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
        this.prismaService.connection.count({
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
          toGlobalId(Connection.name, cursor.id)
      }
    );
  }
}
