import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Entry, Prisma } from "@prisma/client";
import { Connection, connectionFromArray, fromGlobalId } from "graphql-relay";
import {
  PaginationService,
  PaginationArgs
} from "../pagination/pagination.service";
import { EntryCreateOneInput } from "./inputs/entry-create.input";
import * as Relay from "graphql-relay";
import { EntryNodes } from "./model/entry-connection.model";
import { EntryUpsertInput } from "./inputs/entry-upsert.input";
import { AuthService } from "src/auth/auth-jwt.service";
import { EntryCount } from "src/.generated/prisma-nestjs-graphql/entry/outputs/entry-count.output";

@Injectable()
export class EntryService {
  constructor(
    private prisma: PrismaService,
    private readonly paginationService: PaginationService,
    @Inject(AuthService) private readonly authService: AuthService
  ) {}

  async entry(
    entryWhereUniqueInput: Prisma.EntryWhereUniqueInput
  ): Promise<Entry | null> {
    const { id, authorId } = entryWhereUniqueInput;
    return await this.prisma.entry.findUnique({
      where: id ? { id } : { authorId }
    });
  }
  excludeUserOrViewerField<
    FindManyEntriesPaginatedInput,
    Key extends keyof FindManyEntriesPaginatedInput
  >(
    params: FindManyEntriesPaginatedInput,
    ...keys: Key[]
  ): Omit<FindManyEntriesPaginatedInput, Key> {
    for (const key of keys) {
      `${delete params[key]}`;
    }
    return params;
  }
  async entries(
    params: Omit<Prisma.EntryFindManyArgs, "include">,
    args: Relay.ConnectionArguments & {
      limit?: number;
      offset?: number;
    }
  ): Promise<EntryNodes> {
    const { skip, take, cursor, where, orderBy } = params;
    const { first, after, before, last, limit, offset } = args;
    // const result = await findManyCursorConnection(
    //   args =>
    //     this.prisma.entry.findMany({
    //       ...params,
    //       select: { id: true, isCompleted: true },
    //       ...args
    //     }),
    //   () => this.prisma.entry.count({ where: where }),
    //   { last: 5, before: "" }
    // );

    return await this.prisma.entry
      .findMany({
        skip,
        take,
        cursor,
        where,
        orderBy
      })
      .then(entries => {
        return connectionFromArray(
          { ...entries },
          { first: first ? first : 10, after, before, last }
        );
      })
      .then();
  }
  async siftEntries(params: Prisma.EntryFindFirstArgs): Promise<Entry[]> {
    const { include, where, orderBy, cursor, take, skip, distinct } = params;
    const findFirst = await this.prisma.entry
      .findFirst({
        include,
        where,
        orderBy,
        cursor,
        take,
        skip,
        distinct
      })
      .author()
      .entries(this.entries);
    return findFirst as Array<Entry>;
  }
  async upsertEntry(upsertInput: {
    where: Prisma.EntryWhereUniqueInput;
    create: Prisma.XOR<
      Prisma.EntryCreateInput,
      Prisma.EntryUncheckedCreateInput
    >;
    /**
     * In case the Entry was found with the provided `where` argument, update it with this data.
     *
     **/ update: Prisma.XOR<
      Prisma.EntryUpdateInput,
      Prisma.EntryUncheckedUpdateInput
    >;
    include?: Prisma.EntryInclude;
  }): Promise<Entry> {
    return await this.prisma.entry.upsert({
      ...upsertInput
    });
  }

  async updateEntry(params: {
    where: Prisma.EntryWhereUniqueInput;
    data: Prisma.EntryUpdateInput;
  }): Promise<Entry> {
    const { where, data } = params;
    return await this.prisma.entry.update({
      data,
      where
    });
  }

  async deleteEntry(where: Prisma.EntryWhereUniqueInput): Promise<Entry> {
    return await this.prisma.entry.delete({
      where
    });
  }

  async relayFindUniqueEntry(params: { id: string }): Promise<Entry> {
    const entry = await this.prisma.entry.findUnique({
      where: { id: fromGlobalId(params.id).id }
    });
    if (!entry) {
      throw new Error("could not find entry with id " + params.id);
    }
    return entry;
  }

  async relayFindManyEntries(params: PaginationArgs) {
    return this.prisma.entry.findMany({
      ...(await this.paginationService.relayToPrismaPagination(params))
    });
  }

  async createEntry(params: {
    token: string;
    data: EntryCreateOneInput;
  }): Promise<Entry & {
    _count: EntryCount
  }> {
    return await this.authService
      .getUserWithDecodedToken(params.token)
      .then(async dataAuth => {
        return await this.prisma.entry.create({
          include: { _count: true },
          data: {
            author: { connect: { id: dataAuth.auth.user.id } },
            ...params.data
          }
        })
      }).then(data => data)
    // pubSub.publish("entryCreated", { entryCreated: newEntry });
  }
}
