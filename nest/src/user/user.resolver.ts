import { ExecutionContext, Inject, UseGuards } from "@nestjs/common";
import { Args, Context, Resolver } from "@nestjs/graphql";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "./model/user.model";
import { UserService } from "./user.service";
import { Query, Mutation } from "@nestjs/graphql";
import { UserConnection } from "./model/user-connection.model";
import { ChangePasswordInput } from "./inputs/change-passsword.input";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { AuthService } from "../auth/auth-jwt.service";
import { UserMeta } from "../common/decorators/user.decorator";
import { AuthGuard } from "src/common/guards/gql-context.guard";
import { AuthDetailed } from "src/auth/model/auth-detailed.model";
import { FindManyUsersPaginatedInput } from "./inputs/user-paginated-args.input";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import { FindManyEntriesPaginatedInput } from "src/entry/inputs/entry-paginated.input";
import { FindManyMediaItemsPaginatedInput } from "src/media/inputs/find-many-media-items-paginated.input";
import { Entry } from "src/entry";
import { ContentNodes } from "./outputs/content-nodes.output";
import { EntryUpdateManyWithWhereWithoutAuthorInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-update-many-with-where-without-author.input";
import { GraphqlAuthGuard } from "src/auth/gql-auth.guard";
import { Context as AppContext } from "src/app.module";
import { EntryCreateInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-create.input";
import { EntryUncheckedCreateInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-unchecked-create.input";

@Resolver(() => User)
export class UserResolver {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => AuthDetailed)
  async me(
    @Context("token") ctx: ExecutionContext
  ): Promise<AuthDetailed | null> {
    console.log(ctx ?? "no viewerId coupled with token");

    return await this.authService.getUserWithDecodedToken(
      (ctx as unknown as string) ?? ""
    );
  }

  @Query(() => ContentNodes)
  async contentNodesUnion(
    @Args("findManyUsersPaginatedInput", {
      type: () => FindManyUsersPaginatedInput,
      nullable: true
    })
    params: FindManyUsersPaginatedInput,
    @Args("findManyEntriesPaginatedInput")
    entryParams: FindManyEntriesPaginatedInput,
    @Args("findManyMediaItemsPaginated", {
      type: () => FindManyMediaItemsPaginatedInput,
      nullable: true
    })
    mediaParams: FindManyMediaItemsPaginatedInput
  ): Promise<ContentNodes> {
    const edgingUserNodes = await findManyCursorConnection(
      args =>
        this.prismaService.user.findMany({
          take: params.take,
          skip: params.skip,
          distinct: params.distinct,
          where: params.where,
          orderBy: params.orderBy,
          cursor: params.cursor,
          ...args
        }),
      () =>
        this.prismaService.user.count({
          orderBy: params.orderBy,
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
    const edgingThoseMediaItems = await findManyCursorConnection(
      args =>
        this.prismaService.mediaItem.findMany({
          skip: mediaParams.skip,
          take: mediaParams.take,
          distinct: mediaParams.distinct,
          where: mediaParams.where,
          orderBy: mediaParams.orderBy,
          cursor: mediaParams.cursor,
          ...args
        }),
      () =>
        this.prismaService.mediaItem.count({
          skip: mediaParams.skip,
          take: mediaParams.take,
          distinct: mediaParams.distinct,
          where: mediaParams.where,
          orderBy: mediaParams.orderBy
        }),
      {
        first: mediaParams.pagination.first ?? 10,
        last: mediaParams.pagination.last,
        before: mediaParams.pagination.before,
        after: mediaParams.pagination.after
      }
    );
    const edgingThoseNodes = await findManyCursorConnection(
      args =>
        this.prismaService.entry.findMany({
          distinct: entryParams.distinct,
          take: entryParams.take,
          skip: entryParams.skip,
          where: entryParams.where,
          cursor: entryParams.cursor,
          orderBy: entryParams.orderBy,
          ...args
        }),
      () =>
        this.prismaService.entry.count({
          distinct: entryParams.distinct,
          skip: entryParams.skip,
          where: entryParams.where,
          cursor: entryParams.cursor
        }),
      {
        first: entryParams.pagination.first ?? 10,
        last: entryParams.pagination.last,
        before: entryParams.pagination.before,
        after: entryParams.pagination.after
      }
    );
    const output = edgingThoseMediaItems || edgingThoseNodes || edgingUserNodes;
    return { contentNodes: { nodes: output } };
  }

  @Query(() => User)
  async userById(@Args("id") id: string) {
    const getUserById = await this.userService.relayFindUniqueUser({
      id
    });
    return getUserById;
  }

  @Query(() => UserConnection)
  @UseGuards(AuthGuard)
  async listUsers(
    @Args("findManyUsersPaginatedInput", {
      type: () => FindManyUsersPaginatedInput,
      nullable: true,
      defaultValue: {
        findManyUsersPaginatedInput: { pagination: { first: 10 } }
      }
    })
    params: FindManyUsersPaginatedInput
  ) {
    return await findManyCursorConnection(
      args =>
        this.prismaService.user.findMany({
          take: params.take,
          include: { entries: true, profile: true, _count: true },
          skip: params.skip,
          distinct: params.distinct,
          where: params.where,
          orderBy: params.orderBy,
          ...args
        }),
      () =>
        this.prismaService.user.count({
          orderBy: params.orderBy,
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
          toGlobalId(User.name, cursor.id)
      }
    );
  }

  @Query(() => User)
  async userByRelayId(
    @Args("cursor", { type: () => String }) cursor: string
  ): Promise<User> {
    return await this.userService.relayFindUniqueUser({
      id: cursor
    });
  }
  @UseGuards(AuthGuard)
  @Mutation(() => User)
  async changePassword(
    @Context("viewerId") ctx: ExecutionContext,
    @Args("changePasswordInput") changePasswordInput: ChangePasswordInput
  ) {
    return await this.userService
      .changePassword({
        changePasswordInput: changePasswordInput,
        id: ctx as unknown as string
      })
      .then(async data => {
        const changePW = await this.userService.changePassword({
          changePasswordInput: {
            newPassword: changePasswordInput.newPassword,
            oldPassword: changePasswordInput.oldPassword
          },
          id: ctx as unknown as string
        });
        if (changePW != null) {
          return changePW;
        }
        return changePW;
      });
  }
  // @UseGuards(AuthGuard)
  // @Mutation(() => Entry)
  // async viewerCreateEntry(
  //   @Context("viewerId") ctx: ExecutionContext,
  //   @Args("viewerEntryCreateInput", {
  //     type: () => EntryUncheckedCreateInput
  //   })
  //   viewerEntryCreateInput: EntryUncheckedCreateInput
  // ) {
  //   const viewerId = ctx as unknown as string;
  //   console.log(
  //     `[viewerId in viewerCreateEntry of UserResolver]: ${viewerId}` ??
  //       "no viewer Id"
  //   );
  //   return await this.prismaService.entry.create({
  //     data: { ...viewerEntryCreateInput },
  //     include: { _count: true, author: true }
  //     // data: {
  //     //   entries: { updateMany: [viewerEntryCreateInput] }
  //     // },
  //     // where: { id: ctx as unknown as string },
  //     // include: {
  //     //   entries: { include: { _count: true, author: true } },
  //     //   _count: true
  //     // }
  //   });
  // }
}
