import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Subscription,
  Context,
  InputType,
  ArgsType
} from "@nestjs/graphql";
import {
  HostParam,
  Inject,
  UseGuards,
  ExecutionContext,
  Type
} from "@nestjs/common";
import { AuthService } from "src/auth/auth-jwt.service";
import { AuthGuard } from "src/common/guards/gql-context.guard";
import { Entry } from "./model/entry.model";
import { Edge, Connection } from "graphql-relay";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { PrismaService } from "../prisma/prisma.service";
import { PubSub, PubSubEngine, PubSubOptions } from "graphql-subscriptions";
import { UserIdArgs } from "../user/args/user-id.args";
import { GraphqlAuthGuard } from "../common/guards/graphql-auth.guard";
import { EntryService } from "./entry.service";
import { EntryConnection } from "./model/entry-connection.model";
import { FindManyEntriesPaginatedInput } from "./inputs/entry-paginated.input";
import { EntryCreateInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-create.input";
import {
  EntryCreateIntersectedTitle,
  EntryCreateOneInput
} from "./inputs/entry-create.input";
import { fromGlobalId, toGlobalId } from "graphql-relay";
const pubSub = new PubSub();


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

class TitleReadded {
  public title: string;
}
@Resolver(() => Entry)
export class EntryResolver {
  // public h = class IntersectedResult extends IntersectionType(
  //       OmitType(EntryCreateOneInput, ["author", "title"] as const),
  //       EntryCreateIntersectedTitle
  //     ){}
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(EntryService) private readonly entryService: EntryService
  ) {}

  @Subscription(() => Entry)
  entryCreated() {
    return pubSub.asyncIterator("ENTRY_CREATED");
  }

  // helper() {
  //   return class IntersectedResult extends IntersectionType(
  //     OmitType(EntryCreateOneInput, ["author", "title"] as const),
  //     EntryCreateIntersectedTitle
  //   ){}
  // }
  /**
 *
  OmitType<T, K extends keyof T>(
      classRef: Type<T>, keys: readonly K[], decorator?: ClassDecoratorFactory
      ): Type<Omit<T, typeof keys[number]>>;
 */
  @Mutation(() => Entry)
  async createEntry(
    @Context("token") ctx: ExecutionContext,
    @Args("EntryInput", { type: () => EntryCreateOneInput })
    data: EntryCreateOneInput
  ): Promise<Entry> {
    return await this.entryService.createEntry({
      token: ctx as unknown as string,
      data: data
    });
  }

  @Query(() => EntryConnection)
  async listEntries(
    @Args("findManyEntriesPaginatedInput") params: FindManyEntriesPaginatedInput
  ) {
    const edgingThoseNodes = await findManyCursorConnection(
      args =>
        this.prisma.entry.findMany({
          include: { _count: true, author: true },
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

  // @Query(() => EntryOperationsUnionOutput)
  // async viewerEntriesPaginated(
  //   @Context("token") ctx: ExecutionContext,
  //   @Args("viewerEntriesInput", { type: () => ViewerEntriesInput })
  //   viewerEntriesInput: ViewerEntriesInput
  // ): Promise<EntryOperationsUnionOutput> {
  //   return await this.authService
  //     .getUserWithDecodedToken(ctx as unknown as string)
  //     .then(async data => {
  //       const getEntriesPaginated = await this.listEntries({
  //         ...viewerEntriesInput
  //       });

  //       const output = {
  //         connect: {

  //           accessToken: data.auth.accessToken,
  //           refreshToken: data.auth.refreshToken,
  //           session: data.auth.session,
  //           user: data.auth?.user ? data.auth.user : null,
  //           jwt: { ...data.jwt },
  //           connection: { ...getEntriesPaginated }
  //         }
  //       }
  //       return output as EntryOperationsUnionOutput;
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
