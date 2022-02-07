import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Subscription
} from "@nestjs/graphql";
import { HostParam, Inject, UseGuards } from "@nestjs/common";
import { Entry } from "./model/entry.model";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { PrismaService } from "../prisma/prisma.service";
import { PubSub } from "graphql-subscriptions";
import { UserIdArgs } from "../user/args/user-id.args";
import { GraphqlAuthGuard } from "../common/guards/graphql-auth.guard";
import { EntryService } from "./entry.service";
import { EntryConnection } from "./model/entry-connection.model";
import { FindManyEntriesPaginatedInput } from "./inputs/entry-paginated.input";
import { EntryCreateInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-create.input";
import { EntryCreateOneInput } from "./inputs/entry-create.input";
import { EntryUpsertInput } from "./inputs/entry-upsert.input";
import { XOR } from "src/common/types/helpers.type";
import { UpsertOneEntryArgs } from "src/.generated/prisma-nestjs-graphql/entry/args/upsert-one-entry.args";
import { EntryUpsertWithWhereUniqueWithoutAuthorInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-upsert-with-where-unique-without-author.input";
const pubSub = new PubSub();
@Resolver(() => Entry)
export class EntryResolver {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(EntryService) private readonly entryService: EntryService
  ) {}

  @Subscription(() => Entry)
  entryCreated() {
    return pubSub.asyncIterator("entryCreated");
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Entry)
  async createEntry(
    @Args("createInput", { type: () => EntryCreateInput })
    data: EntryCreateInput
  ) {
    const newEntry = await this.prisma.entry.create({data});
    pubSub.publish("entryCreated", { entryCreated: newEntry });
    return newEntry;
  }

  @Query(() => EntryConnection)
  async listEntries(
    @Args("findManyEntriesPaginatedInput") params: FindManyEntriesPaginatedInput
  ) {
    const edgingThoseNodes = await findManyCursorConnection(
      args =>
        this.prisma.entry.findMany({
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
      }
    );
    return edgingThoseNodes;
  }

  @Query(() => [Entry])
  userPosts(@Args() id: UserIdArgs) {
    return this.prisma.user
      .findUnique({ where: { id: id.userId } })
      .entries({ where: { published: true } });
  }

  @ResolveField()
  async author(@HostParam() entry: Entry) {
    return await this.prisma.entry
      .findUnique({
        where: { id: entry.id },
        include: { author: true }
      })
      .author();
  }

  @Query(() => Entry)
  async entryById(@Args("id") id: string) {
    return this.prisma.entry.findUnique({
      where: { id: id }
    });
  }
}
