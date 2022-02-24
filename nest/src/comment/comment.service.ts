import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FindManyCommentsPaginatedInput } from "./inputs/comment-paginated.input";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { Comment } from ".";
import { __Type } from "graphql";
import { CreateNewCommentInput } from "./inputs/create-comment.input";
import { PubSub } from "graphql-subscriptions";

@Injectable()
export class CommentService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}
  async siftComments(params: FindManyCommentsPaginatedInput) {
    return await findManyCursorConnection(
      args =>
        this.prismaService.comment.findMany({
          include: {
            author: true,
            entry: true
          },
          distinct: params.distinct,
          take: params.take,
          skip: params.skip,
          where: params.where,
          cursor: args.cursor,
          orderBy: params.orderBy,
          ...args
        }),
      () =>
        this.prismaService.comment.count({
          distinct: params.distinct,
          take: params.take,
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
          toGlobalId(Comment.name, cursor.id)
      }
    );
  }
  async getViewerCommentsPaginatedService(
    params: FindManyCommentsPaginatedInput,
    viewerId: string
  ) {
    return await this.prismaService.user
      .findUnique({
        where: { id: viewerId },
        include: { comments: true, _count: true }
      })
      .then(async auth => {
        const user = auth as unknown as NonNullable<typeof auth>;
        return await findManyCursorConnection(
          args =>
            this.prismaService.comment.findMany({
              include: {
                author: true,
                entry: true
              },
              distinct: params.distinct,
              take: params.take,
              skip: params.skip,
              where: {
                authorId: { equals: user.id },
                id: params.where?.id,
                ...params.where
              },
              cursor: {
                id: auth?.comments?.find(id => id)?.id,
                ...params.cursor
              },
              orderBy: params.orderBy,
              ...args
            }),
          () =>
            this.prismaService.comment.count({
              distinct: params.distinct,
              orderBy: params.orderBy,
              take: params.take,
              skip: params.skip,
              where: {
                authorId: {equals: user.id},
                ...params.where
              },
              cursor: {
                id: auth?.comments?.find(id => id)?.id,
                ...params.cursor
              }
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
              toGlobalId(Comment.name, cursor.id)
          }
        );
      });
  }
  async relayFindUniqueComment(params: { id: string }) {
    const comment = await this.prismaService.comment.findUnique({
      where: { id: fromGlobalId(params.id).id }
    });
    if (!comment) {
      throw new Error("could not find comment with id " + params.id);
    }
    return comment;
  }

  async createComment(
    params: CreateNewCommentInput,
    viewerId: string
  ): Promise<Comment> {
    return this.prismaService.comment.create({
      data: {
        author: { connect: { id: viewerId } },
        entry: { connect: { id: params.entryId } },
        body: params.body,
        position: params.position,
        reactions: params.reactions
      }
    });
  }
}
