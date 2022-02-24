import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import {
  PaginationService,
  PaginationArgs
} from "../pagination/pagination.service";
import { Entry } from "./model/entry.model";
import { EntryCreateOneInput } from "./inputs/entry-create.input";
import { FindManyEntriesPaginatedInput } from "./inputs/entry-paginated.input";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { EntryCreateManyAuthorInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-create-many-author.input";
import {
  Field,
  InputType,
  IntersectionType,
  ObjectType
} from "@nestjs/graphql";
import { EntryUpdateManyWithWhereWithoutAuthorInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-update-many-with-where-without-author.input";
import { EntryWhereInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-where.input";
import { EntryUpdateOneRequiredWithoutCommentsInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-update-one-required-without-comments.input";
import { XOR } from "src/common/types/helpers.type";
import { EntryCreateWithoutAuthorInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-create-without-author.input";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError
} from "@prisma/client/runtime";
import { GraphQLError } from "graphql";
import { FindViewerEntriesPaginatedInput } from "./inputs/entry-paginated.input";
import { HttpService, HttpModuleOptions } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { AxiosResponse } from "axios";
import { EntryDeleteUno } from "./inputs/entry-delete.input";

export const axiosConfig: HttpModuleOptions = {
  withCredentials: true,
  headers: {
    authorization: `${process.env.LOCAL_AUTH}`,
    "Content-Type": "application/json"
  },
  baseURL: `http://localhost:3000/entry/`.trim()
};

@ObjectType("EntryUpdateMapped")
export class EntryUpdateMapped extends IntersectionType(
  EntryUpdateOneRequiredWithoutCommentsInput,
  EntryWhereInput,
  InputType
) {}

@InputType("EntryUpdateInputIntersection")
export class EntryUpdateInputIntersection {
  @Field(() => EntryWhereInput)
  where: EntryWhereInput;

  @Field(() => EntryUpdateManyWithWhereWithoutAuthorInput)
  data: EntryUpdateManyWithWhereWithoutAuthorInput;
}
@Injectable()
export class EntryService {
  constructor(
    private httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly paginationService: PaginationService
  ) {}

  async entry(
    entryWhereUniqueInput: XOR<{ id: string }, { authorId: string }>
  ): Promise<Entry | null> {
    const { id, authorId } = entryWhereUniqueInput;
    return (await this.prisma.entry.findUnique({
      where: { id: id } || { authorId: authorId },
      include: { _count: true, author: true }
    })) as unknown as Entry | null;
  }
  excludeEntryField<Entry, Key extends keyof Entry>(
    params: Entry,
    ...keys: Key[]
  ): Omit<Entry, Key> {
    for (const key of keys) {
      `${delete params[key]}`;
    }
    return params;
  }

  async getViewerEntriesPaginated(
    params: FindViewerEntriesPaginatedInput,
    viewerId: string
  ) {
    return await this.prisma.user
      .findUnique({
        where: { id: viewerId },
        include: { entries: true }
      })
      .then(async auth => {
        const user = auth as unknown as NonNullable<typeof auth>;
        return await findManyCursorConnection(
          args =>
            this.prisma.entry.findMany({
              include: {
                _count: true,
                author: true,
                comments: true,
                categories: true
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
                id: auth?.entries?.find(id => id)?.id,
                ...params.cursor
              },
              orderBy: params.orderBy,
              ...args
            }),
          () =>
            this.prisma.entry.count({
              distinct: params.distinct,
              orderBy: params.orderBy,
              take: params.take,
              skip: params.skip,
              where: {
                authorId: { equals: user.id },
                ...params.where
              },
              cursor: {
                id: auth?.entries?.find(id => id)?.id,
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
              toGlobalId(Entry.name, cursor.id)
          }
        );
      });
  }

  async siftEntries(params: FindManyEntriesPaginatedInput) {
    return await findManyCursorConnection(
      args =>
        this.prisma.entry.findMany({
          include: {
            _count: true,
            author: true,
            comments: true,
            categories: true
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
        this.prisma.entry.count({
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
          toGlobalId(Entry.name, cursor.id)
      }
    );
  }
  async updateManyEntries(
    upsertInput: Omit<EntryUpdateInputIntersection, "authorId">,
    context: string
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.entry.updateMany({
      where: upsertInput.where ? upsertInput.where : { authorId: context },
      data: upsertInput.data
    });
  }

  async deleteEntry(where: EntryDeleteUno) {
    return await this.prisma.entry
      .delete({
        where: { id: where.id }
      })
      .then(data => data);
  }

  async relayFindUniqueEntry(params: { id: string }): Promise<Entry | null> {
    const entry = await this.prisma.entry
      .findUnique({
        where: { id: fromGlobalId(params.id).id }
      })
      .author()
      .entries()
      .then(entries => entries[0]);
    if (!entry) {
      throw new Error("could not find entry with id " + params.id);
    }
    return entry as unknown as Entry | null;
  }

  async relayFindManyEntries(params: PaginationArgs) {
    return this.prisma.entry.findMany({
      ...(await this.paginationService.relayToPrismaPagination(params))
    });
  }

  async createEntry(params: { data: EntryCreateOneInput; viewerId: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: params.viewerId },
      include: { entries: true }
    });

    if (user) {
      return await this.prisma.entry.create({
        data: {
          author: { connect: { id: user.id } },
          title: params.data.title,
          content: params.data.content,
          featuredImage: params.data.featuredImage
        }
      });
    }
  }
  async findUniqueEntryByEncodedCursor(params: { id: string }) {
    const entry = await this.prisma.entry.findUnique({
      where: { id: fromGlobalId(params.id).id }
    });
    if (!entry) {
      throw new Error("could not find entry with id " + params.id);
    }
    return entry;
  }
  async axiosMediatedEntryCreate(
    params: EntryCreateOneInput,
    viewerId: string
    // pubSubProgation: PubSub
  ) {
    const validateUser = await this.prisma.user.findUnique({
      where: { id: viewerId }
    });
    if (!validateUser) {
      return new PrismaClientValidationError(
        "no valid active viewer -- please sign in"
      ).message;
    }
    try {
      const newEntryCreate = await this.prisma.entry.create({
        data: {
          author: {
            connect: { id: validateUser.id, email: validateUser.email }
          },
          title: params.title,
          content: params.content,
          featuredImage: params.featuredImage
        }
      });
      const axiosConf = this.httpService
        .post(`createEntry/${viewerId}`, { ...newEntryCreate }, axiosConfig)
        .pipe();

      if (!newEntryCreate) {
        throw (
          new PrismaClientKnownRequestError(
            `failed newEntry mutation`,
            "P2019",
            "3.91"
          ) && new GraphQLError("error in newEntry of entry service")
        );
      }
      return (await firstValueFrom(
        axiosConf
      )) as AxiosResponse<EntryCreateWithoutAuthorInput>;
    } catch (error) {
      throw new GraphQLError(
        `new error in try.catch blck of newEntry mutation ${error}`
      );
    }
  }

  async createManyEntry(
    params: FindManyEntriesPaginatedInput,
    data: EntryCreateManyAuthorInput,
    viewerId: string
  ) {
    const getUser = await this.prisma.user.findUnique({
      where: { id: viewerId },
      include: { _count: true }
    });
    const user = getUser as unknown as NonNullable<typeof getUser>;
    return await this.prisma
      .$transaction(
        async (prisma = this.prisma) => {
          const createManyEntries = await prisma.entry.createMany({
            skipDuplicates: true,
            data: {
              authorId: user.id,
              ...data
            }
          });
          const findManyCreatedEntries = await this.siftEntries(params);
          return {
            user: user,
            createMany: createManyEntries,
            getPaginatedReturn: findManyCreatedEntries
          };
        },
        { maxWait: 10000, timeout: 10000 }
      )
      .then(({ createMany, getPaginatedReturn, user }) => {
        return {
          createMany,
          getPaginatedReturn,
          user
        };
      });
  }
}
