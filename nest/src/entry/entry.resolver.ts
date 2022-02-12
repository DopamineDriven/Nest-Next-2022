import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Subscription,
  Context
} from "@nestjs/graphql";
import { HostParam, Inject, UseGuards, ExecutionContext } from "@nestjs/common";
import { AuthService } from "src/auth/auth-jwt.service";
import { AuthGuard } from "src/common/guards/gql-context.guard";
import { Entry, EntryOperationsIntersectionDeailed } from "./model/entry.model";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { PrismaService } from "../prisma/prisma.service";
import { PubSub, PubSubEngine, PubSubOptions } from "graphql-subscriptions";
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
import { fromGlobalId, toGlobalId } from "graphql-relay";
import { EntryOperations } from "./enums/entry-operations.enum";
const pubSub = new PubSub();
export declare const ENTRY_CREATED: unique symbol;
export declare const ENTRY_CREATED_KEY: keyof typeof ENTRY_CREATED;

/**
 *   @Subscription(() => Entry, {name: ENTRY_CREATED_KEY.toString()})
  entryCreated() {
    return this.pubSub.asyncIterator(ENTRY_CREATED_KEY.toString());
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Entry)
  async createEntry(
    @Args("createInput", { type: () => EntryCreateInput })
    data: EntryCreateInput
  ) {
    const newEntry = await this.prisma.entry.create({ data }).then((entry) => {
      this.pubSub.publish(ENTRY_CREATED_KEY.toString(), { [ENTRY_CREATED]: { entry } })
    })    @Inject("PUB_SUB") pubSub: PubSubEngine,
    this.pubSub.publish("entryCreated", { entryCreated: newEntry });
    return newEntry;
  }
 */
@Resolver(() => Entry)
export class EntryResolver {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(EntryService) private readonly entryService: EntryService
  ) {}

  @Subscription(() => Entry)
  entryCreated() {
    return pubSub.asyncIterator("ENTRY_CREATED");
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Entry)
  async createEntry(
    @Args("createInput", { type: () => EntryCreateInput })
    data: EntryCreateInput
  ) {
    const newEntry = await this.prisma.entry.create({ data });
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
    return edgingThoseNodes;
  }

  // @Query(() => EntryOperationsIntersectionDeailed)
  // async viewerEntries(
  //   @Context() ctx: ExecutionContext,
  //   @Args("findManyEntriesPaginatedInput") params: FindManyEntriesPaginatedInput
  // ): Promise<EntryOperationsIntersectionDeailed> {
  //   return await this.authService
  //     .getUserWithDecodedToken(ctx as unknown as string)
  //     .then(async data => {
  //       const consumeData = data;
  //       const getConnection = await findManyCursorConnection(
  //         args =>
  //           this.prisma.entry.findMany({
  //             include: { author: true, _count: true },
  //             distinct: params.distinct,
  //             take: params.take,
  //             skip: params.skip,
  //             where: params.where,
  //             cursor: args.cursor,
  //             orderBy: params.orderBy,
  //             ...args
  //           }),
  //         () =>
  //           this.prisma.entry.count({
  //             include: {author: true, _count: true},
  //             distinct: params.distinct,
  //             skip: params.skip,
  //             where:  params.where,
  //             cursor: params.cursor
  //           }),
  //         {
  //           first: params.pagination.first ?? 10,
  //           last: params.pagination.last,
  //           before: params.pagination.before,
  //           after: params.pagination.after
  //         },
  //         {
  //           getCursor: (record: { id: string }) => {
  //             return record;
  //           },
  //           decodeCursor: (cursor: string) => fromGlobalId(cursor),
  //           encodeCursor: (cursor: { id: string }) =>
  //             toGlobalId(Entry.name, cursor.id)
  //         }
  //       );
  //       const combine = {getConnection.totalCount, ...getConnection.edges, ...getConnection.pageInfo, ...data}
  //       return combine
  //     })
  // }

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
