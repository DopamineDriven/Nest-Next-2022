import { ExecutionContext, Inject, UseGuards } from "@nestjs/common";
import { Args, Context, GqlContextType, Resolver } from "@nestjs/graphql";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "./model/user.model";
import { UserService } from "./user.service";
import { Query, Mutation } from "@nestjs/graphql";
import {
  UserConnection,
  UserEdge,
  UserNodes
} from "./model/user-connection.model";
import { GraphqlAuthGuard } from "../common/guards/graphql-auth.guard";
import { ChangePasswordInput } from "./inputs/change-passsword.input";
import {
  findManyCursorConnection,
  PrismaFindManyArguments
} from "@devoxa/prisma-relay-cursor-connection";
import { Type } from "@nestjs/common";
import { Request } from "express";
import * as JWT from "jsonwebtoken";
import { JwtDecoded } from "../auth/dto";
import { AuthService } from "../auth/auth-jwt.service";
import { PasswordService } from "../password";
import { UserMeta } from "../common/decorators/user.decorator";
import { AuthGuard } from "src/common/guards/gql-context.guard";
import { AuthDetailed } from "src/auth/model/auth-detailed.model";
import { ManyUsersPaginatedArgs } from "./args/find-many-paginated.args";
import { FindManyUsersPaginatedInput } from "./inputs/user-paginated-args.input";
import {
  Connection,
  connectionFromArray,
  Edge,
  fromGlobalId,
  toGlobalId
} from "graphql-relay";
import { EntryConnection } from "src/entry/model/entry-connection.model";
import { UsersToEntriesPaginatedInput } from "./inputs/users-to-entries-paginated.input";
import { UsersToEntriesOutput } from "./outputs/user-to-entries.output";
import {
  baseTypes,
  BaseTypesConnection
} from "./model/user-connection-union.model";
import { FindManyProfilesPaginatedInput } from "src/profile/inputs/profile-paginated.input";
import { FindManyEntriesPaginatedInput } from "src/entry/inputs/entry-paginated.input";
import { Prisma } from "@prisma/client";
import { UserCount } from "./outputs/user-count.output";
import { FindManyMediaItemsInput } from "src/media/inputs/find-many-media-items-paginated.input";
import { PickType } from "@nestjs/mapped-types";
import { MediaItem } from "src/media/model/media.model";
import { Entry } from "src/entry";
import { MediaItemConnection } from "src/media/model/media-connection";
import { ContentNodes } from "./outputs/content-nodes.output";
import { PrismaClientValidationError } from "@prisma/client/runtime";
@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService
  ) {}

  @Query(() => AuthDetailed)
  @UseGuards(AuthGuard)
  async me(
    @Context("token") ctx: ExecutionContext,
    @UserMeta<User>() user: User
  ): Promise<AuthDetailed | null> {
    console.log(user ?? null);
    console.log(ctx ? ctx : null);
    return await this.authService.getUserWithDecodedToken(
      ctx as unknown as string
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
      type: () => FindManyMediaItemsInput,
      nullable: true
    })
    mediaParams: FindManyMediaItemsInput
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

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async changePassword(
    @Context("token") ctx: ExecutionContext,
    @Args("changePasswordInput") changePasswordInput: ChangePasswordInput
  ) {
    return await this.authService
      .getUserFromToken(ctx as unknown as string)
      .then(async data => {
        const changePW = await this.userService.changePassword(
          { ...changePasswordInput },
          ctx as unknown as string
        );
        if (changePW != null) {
          return changePW
        } else {
          const {mediaItems, ...user} = {mediaItems: {...data?.mediaItems}, ...data }
          return user
        }
      });
  }
}
