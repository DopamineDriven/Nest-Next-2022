import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Entry, Prisma } from "@prisma/client";
import { Connection, connectionFromArray, fromGlobalId } from "graphql-relay";
import {
  PaginationService,
  PaginationArgs
} from "../pagination/pagination.service";
import * as Relay from "graphql-relay";

@Injectable()
export class EntryService {
  constructor(
    private prisma: PrismaService,
    private readonly paginationService: PaginationService
  ) {}

  async entry(
    entryWhereUniqueInput: Prisma.EntryWhereUniqueInput
  ): Promise<Entry | null> {
    const { id, title } = entryWhereUniqueInput;
    return await this.prisma.entry.findUnique({
      where: id ? { id: id } : { title: title }
    });
  }

  async entries(
    params: Omit<Prisma.EntryFindManyArgs, "include">,
    args: Relay.ConnectionArguments & {
      limit?: number;
      offset?: number;
    }
  ): Promise<Connection<Entry>> {
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
  async createEntry(
    data: Prisma.Without<
      Prisma.EntryCreateInput,
      Prisma.EntryUncheckedCreateInput
    > &
      Prisma.EntryUncheckedCreateInput
  ): Promise<Entry> {
    return await this.prisma.entry.create({
      data
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
}
