import { Injectable, Inject } from "@nestjs/common";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import { PrismaService } from "../prisma/prisma.service";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import {
  ViewerFieldsPaginated,
  ViewerFieldsPaginatedConnection
} from "./model/viewer-fields-paginated.model";
import { EntryService } from "src/entry/entry.service";
import { SessionService } from "src/session/session.service";
import { CommentService } from "src/comment/comment.service";
import { MediaItemService } from "src/media/media.service";
import { ViewerFieldsPaginatedInput } from "./inputs/viewer-fields-paginated.input";

@Injectable()
export class ViewerFieldsPaginatedService {
  constructor(
    @Inject(PrismaService)
    private prismaService: PrismaService,
    private readonly entryService: EntryService,
    private readonly sessionService: SessionService,
    private readonly commentService: CommentService,
    private readonly mediaItemService: MediaItemService
  ) {}

  async getViewerFieldsPaginated(
    input: ViewerFieldsPaginatedInput,
    viewerId: string
  ): Promise<ViewerFieldsPaginatedConnection> {
    const { params } = input;
    return await this.prismaService.user
      .findUnique({
        where: { id: viewerId },
        include: { sessions: true, _count: true }
      })
      .then(async auth => {
        const user = auth as unknown as NonNullable<typeof auth>;
        return await findManyCursorConnection(
          args =>
            this.prismaService.user.findMany({
              include: {
                _count: true,
                profile: true
              },
              distinct: params.distinct,
              take: params.take,
              skip: params.skip,
              where: {
                id: { equals: user.id },
                ...params.where
              },
              cursor: {
                id: user?.id
              },
              orderBy: params.orderBy,
              ...args
            }),
          () =>
            this.prismaService.user.count({
              distinct: params.distinct,
              take: params.take,
              skip: params.skip,
              where: {
                id: user.id,
                ...params.where
              },
              cursor: {
                id: user?.id,
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
              toGlobalId(ViewerFieldsPaginated.name, cursor.id)
          }
        );
      })
      .then(async userConnect => {
        return {
          pageInfo: {
            ...userConnect.pageInfo
          },
          totalCount: userConnect.totalCount,
          edges: [
            {
              cursor: userConnect.edges.find(cursor => cursor)?.cursor,
              node: {
                id: userConnect.edges.find(node => node)?.node.id,
                image: userConnect.edges.find(node => node)?.node.image,
                password: userConnect.edges.find(node => node)?.node.password,
                role: userConnect.edges.find(node => node)?.node.role,
                status: userConnect.edges.find(node => node)?.node.status,
                _count: userConnect.edges.find(node => node)?.node._count,
                profile: userConnect.edges.find(node => node)?.node.profile,
                email: userConnect.edges.find(node => node)?.node.email,
                emailVerified: userConnect.edges.find(node => node)?.node
                  .emailVerified,
                firstName: userConnect.edges.find(node => node)?.node.firstName,
                lastName: userConnect.edges.find(node => node)?.node.lastName,
                createdAt: userConnect.edges.find(node => node)?.node.createdAt,
                updatedAt: userConnect.edges.find(node => node)?.node.updatedAt,
                mediaItemConnection: input.connectionInputs
                  ?.findManyMediaItemsInput
                  ? await this.mediaItemService.getViewerMediaItemsPaginated(
                      input.connectionInputs.findManyMediaItemsInput,
                      viewerId
                    )
                  : undefined,
                entryConnection: input.connectionInputs?.findManyEntriesInput
                  ? await this.entryService.getViewerEntriesPaginated(
                      input.connectionInputs.findManyEntriesInput,
                      viewerId
                    )
                  : undefined,
                sessionConnection: input.connectionInputs?.findManySessionsInput
                  ? await this.sessionService.getViewerSessionsPaginated(
                      input.connectionInputs.findManySessionsInput,
                      viewerId
                    )
                  : undefined,
                commentConnection: input.connectionInputs?.findManyCommentsInput
                  ? await this.commentService.getViewerCommentsPaginatedService(
                      input.connectionInputs.findManyCommentsInput,
                      viewerId
                    )
                  : undefined
              } as ViewerFieldsPaginated
            }
          ]
        };
      });
  }
}
