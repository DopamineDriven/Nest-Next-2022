import { PrismaService } from "src/prisma/prisma.service";
import { PaginationService } from "src/pagination/pagination.service";
import { FindManySessionsPaginatedInput } from "./inputs/sessions-paginated.input";
import { Injectable, Inject } from "@nestjs/common";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { SessionWhereUniqueInput } from "src/.generated/prisma-nestjs-graphql/session/inputs/session-where-unique.input";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import { Session } from "./model";


@Injectable()
export class SessionService {
  constructor(private prismaService: PrismaService) { }

  async relayFindUniqueSession(params: { id: string }) {
    const session = await this.prismaService.session.findUnique({
      where: { id: fromGlobalId(params.id).id }
    });
    if (!session) {
      throw new Error("could not find session with id " + params.id);
    }
    return session;
  }
  async listSessions(params: FindManySessionsPaginatedInput) {
    return await findManyCursorConnection(
      args =>
        this.prismaService.session.findMany({
          include: {
            user: true
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
        this.prismaService.session.count({
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
          toGlobalId(Session.name, cursor.id)
      }
    );
  }
}
