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
import { Inject, UseGuards, ExecutionContext } from "@nestjs/common";
import { AuthService } from "src/auth/auth-jwt.service";
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
const pubSub = new PubSub();

@Resolver(() => Entry)
export class EntryResolver {
  // public h = class IntersectedResult extends IntersectionType(
  //       OmitType(EntryCreateOneInput, ["author", "title"] as const),
  //       EntryCreateIntersectedTitle
  //     ){}
  constructor(
    @Inject(PrismaService) private prisma: PrismaService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(EntryService) private entryService: EntryService
  ) {}

  @Subscription(() => Entry)
  entryCreated() {
    return pubSub.asyncIterator("ENTRY_CREATED");
  }

  @Mutation(() => Entry)
  async createEntry(
    @Context("token") ctx: ExecutionContext,
    @Args("EntryInput", {
      type: () => EntryUncheckedCreateNestedManyWithoutAuthorInput
    })
    data: EntryUncheckedCreateNestedManyWithoutAuthorInput
  ) {
    return await this.entryService
      .newEntry(data, ctx as unknown as string)
      .then(data => {
        return data;
      });
  }

  @Mutation(() => Entry)
  async createNewEntry(
    @Context("token") ctx: ExecutionContext,
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
    @Context("token") ctx: ExecutionContext,
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

  // @ResolveField()
  // async author(@HostParam() entry: Entry) {
  //   return await this.prisma.entry
  //     .findUnique({
  //       where: { id: entry.id },
  //       include: { author: true }
  //     })
  //     .author();
  // }

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
