import { Resolver, Query, Mutation, Args, ResolveField, Subscription } from "@nestjs/graphql";
import { HostParam, Inject, UseGuards } from "@nestjs/common";
import { Entry } from "./model/entry.model";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { PrismaService } from "../prisma/prisma.service";
import { PubSub } from "graphql-subscriptions";
import { PaginationArgs } from "../common/pagination/pagination.args";
import {UserIdArgs} from "../user/args/user-id.args"
import { GraphqlAuthGuard } from "../common/guards/graphql-auth.guard";
import { EntryService } from "./entry.service";
import { EntryConnection } from "./model/entry-connection.model";
import { EntryCreateInput } from "../.generated/prisma-nestjs-graphql/entry/inputs/entry-create.input";
import { EntryOrderByWithRelationAndSearchRelevanceInput } from "../.generated/prisma-nestjs-graphql/entry/inputs/entry-order-by-with-relation-and-search-relevance.input";

const pubSub = new PubSub()
@Resolver(() => Entry)
export class EntryResolver {
  constructor(
    @Inject(PrismaService) private prisma: PrismaService,
    private entryService: EntryService
  ) {}

  @Subscription(() => Entry)
  entryCreated() {
    return pubSub.asyncIterator("entryCreated");
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Entry)
  async createEntry(
    @Args("data") data: EntryCreateInput
  ) {
    const newEntry = this.prisma.entry.create({
      data
    });
    pubSub.publish("entryCreated", { entryCreated: newEntry });
    return newEntry;
  }

  @Query(() => EntryConnection)
  async entryCursorConnection(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: "query", type: () => String, nullable: true })
    query: string,
    @Args({
      name: "orderBy",
      type: () => EntryOrderByWithRelationAndSearchRelevanceInput,
      nullable: true
    })
    orderBy: EntryOrderByWithRelationAndSearchRelevanceInput
  ) {
    const edgingThoseNodes = await findManyCursorConnection(
      args =>
        this.prisma.entry.findMany({
          include: { author: true },
          where: {
            title: { contains: query || "" }
          },

          orderBy: orderBy?._relevance?.fields
            ? { ...orderBy }
            : undefined,
          ...args
        }),
      () =>
        this.prisma.entry.count({
          where: {
            title: { contains: query || "" }
          }
        }),
      { first, last, before, after }
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
