import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Subscription,
  Context,
  Parent
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
import { EntryUncheckedCreateNestedManyWithoutAuthorInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-unchecked-create-nested-many-without-author.input";
import { EntryUncheckedCreateInputSansAuthorId } from "./inputs/entry-unchecked.input";
import { NewEntryOutput } from "./outputs/new-entry.output";
import { EntryCreateInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-create.input";
import { GraphqlAuthGuard } from "src/auth/gql-auth.guard";

const pubSub = new PubSub();

@Resolver(() => Entry)
export class EntryResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly entryService: EntryService
  ) {}

  @Subscription(() => Entry)
  entryCreated() {
    return pubSub.asyncIterator("ENTRY_CREATED");
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Entry)
  async createEntry(
    @Context("viewerId") ctx: ExecutionContext,
    @Args("entryCreateInput", {
      type: () => EntryUncheckedCreateInputSansAuthorId
    })
    data: EntryUncheckedCreateInputSansAuthorId
  ) {
    return await this.entryService.newEntry(data, ctx as unknown as string);
  }
  @UseGuards(AuthGuard)
  @Mutation(() => Entry)
  async createNewEntry(
    @Context("viewerId") ctx: ExecutionContext,
    @Args("createNewEntryInput", {
      type: () => EntryUncheckedCreateNestedManyWithoutAuthorInput
    })
    createNewEntryInput: EntryUncheckedCreateNestedManyWithoutAuthorInput
  ) {
    return await this.entryService.createNewEntry(
      createNewEntryInput,
      ctx as unknown as string
    );
  }
  @Mutation(() => Entry)
  async nuevoEntry(@Args("nuevoEntry") data: EntryCreateInput): Promise<Entry> {
    const newEntry = await this.prisma.entry.create({
      data,
      include: { _count: true }
    });
    pubSub.publish("ENTRY_CREATED", { entryCreated: newEntry });
    return newEntry as unknown as Entry;
  }
  @UseGuards(AuthGuard)
  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Entry)
  async createEntryWithAxios(
    @Context("viewerId") ctx: ExecutionContext,
    @Args("createNew", { type: () => EntryUncheckedCreateInputSansAuthorId })
    createNew: EntryUncheckedCreateInputSansAuthorId
  ) {
    const getViewerId = ctx as unknown as string;
    if (getViewerId) {
      ctx.switchToHttp();
      return await this.entryService
        .axiosMediatedEntryCreate(createNew, getViewerId)
        .then(data => {
          return data.valueOf() as NewEntryOutput;
        });
    }
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
    @Context("viewerId") ctx: ExecutionContext,
    @Args("viewerEntriesPaginatedInput", {
      type: () => FindViewerEntriesPaginatedInput
    })
    viewerEntriesPaginatedInput: FindViewerEntriesPaginatedInput
  ) {
    return await this.entryService
      .getViewerEntriesPaginated(
        viewerEntriesPaginatedInput,
        ctx as unknown as string
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
