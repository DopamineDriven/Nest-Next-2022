import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Subscription,
  Context,
  Parent,
  Info
} from "@nestjs/graphql";
import { UseGuards, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "src/common/guards/gql-context.guard";
import { Entry } from "./model/entry.model";
import { PrismaService } from "../prisma/prisma.service";
import { PubSub } from "graphql-subscriptions";
import { EntryService } from "./entry.service";
import { EntryConnection } from "./model/entry-connection.model";
import {
  FindManyEntriesPaginatedInput,
  FindViewerEntriesPaginatedInput
} from "./inputs/entry-paginated.input";
import { User } from "src/user/model/user.model";
import { NewEntryOutput } from "./outputs/new-entry.output";
import { EntryCreateOneInput } from "./inputs/entry-create.input";
import { GraphQLResolveInfo } from "graphql";
import { AppContext } from "src/gql-config.service";

const pubSub = new PubSub();

@Resolver(Entry)
export class EntryResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly entryService: EntryService
  ) {}

  @Subscription(() => Entry)
  entryCreated(@Info() info: GraphQLResolveInfo) {
    console.log(
      "pubSub createEntrySubscription Triggered: " + { ...info } ?? "no info"
    );

    return pubSub.asyncIterator("ENTRY_CREATED");
  }

  @Mutation(() => Entry)
  @UseGuards(AuthGuard)
  async createNewEntry(
    @Context() { viewerId }: AppContext,
    @Args("entryCreateInput", {
      type: () => EntryCreateOneInput
    })
    data: EntryCreateOneInput
  ) {
    return this.entryService.createEntry({
      data: data,
      viewerId: viewerId as string
    });
  }
  @Mutation(() => Entry)
  @UseGuards(AuthGuard)
  async nuevoEntry(
    @Args("nuevoEntry") data: EntryCreateOneInput,
    @Context() { viewerId }: AppContext
  ) {
    const newEntry = this.entryService.createEntry({
      data: data,
      viewerId: viewerId as string
    });
    pubSub.publish("ENTRY_CREATED", { entryCreated: newEntry });
    return await newEntry;
  }
  @UseGuards(AuthGuard)
  @Mutation(() => Entry)
  async createEntryWithAxios(
    @Context() { viewerId }: AppContext,
    @Context() ctx: ExecutionContext,
    @Args("createNew", { type: () => EntryCreateOneInput })
    createNew: EntryCreateOneInput
  ) {
    const getViewerId = viewerId as string;
    if (getViewerId) {
      ctx.switchToHttp();
      return await this.entryService
        .axiosMediatedEntryCreate(createNew, getViewerId)
        .then(data => {
          return data.valueOf() as NewEntryOutput;
        });
    }
  }

  @Query(() => Entry)
  async entryByRelayId(
    @Args("entryCursor", { type: () => String }) cursor: string
  ) {
    return await this.entryService.findUniqueEntryByEncodedCursor({
      id: cursor
    });
  }

  @Query(() => EntryConnection)
  async siftEntries(
    @Args("entryFindManyInput", { type: () => FindManyEntriesPaginatedInput })
    params: FindManyEntriesPaginatedInput
  ) {
    return await this.entryService.siftEntries(params);
  }

  @Query(() => EntryConnection)
  async listEntries(
    @Args("findManyEntriesPaginatedInput") params: FindManyEntriesPaginatedInput
  ) {
    return await this.entryService.siftEntries(params);
  }
  @Query(() => EntryConnection)
  @UseGuards(AuthGuard)
  async viewerEntriesPaginated(
    @Context() { viewerId }: AppContext,
    @Args("viewerEntriesPaginatedInput", {
      type: () => FindViewerEntriesPaginatedInput
    })
    viewerEntriesPaginatedInput: FindViewerEntriesPaginatedInput
  ) {
    return await this.entryService
      .getViewerEntriesPaginated(
        viewerEntriesPaginatedInput,
        viewerId as string
      )
      .then(entryConnection => entryConnection);
  }

  @Query(() => Entry)
  async entryById(@Args("id") id: string) {
    return this.prisma.entry.findUnique({
      where: { id: id }
    });
  }

  @ResolveField(() => User, { name: "author" })
  async author(@Parent() entry: Entry) {
    return this.prisma.entry.findUnique({ where: { id: entry.id } }).author();
  }
}
