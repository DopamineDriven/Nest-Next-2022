import { ExecutionContext, Inject, UseGuards } from "@nestjs/common";
import { Args, Context, Resolver } from "@nestjs/graphql";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "./model/user.model";
import { UserService } from "./user.service";
import { Query, Mutation } from "@nestjs/graphql";
import { UserConnection } from "./model/user-connection.model";
import { GraphqlAuthGuard } from "../common/guards/graphql-auth.guard";
import { ChangePasswordInput } from "./inputs/change-passsword.input";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
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
import { Connection, connectionFromArray, Edge } from "graphql-relay";
import { EntryConnection } from "src/entry/model/entry-connection.model";
import { UsersToEntriesPaginatedInput } from "./inputs/users-to-entries-paginated.input";
import { UsersToEntriesOutput } from "./outputs/user-to-entries.output";
import { BaseTypesConnection, typeConnectionsUnion, TypeConnectionsUnionType } from "./model/user-connection-union.model";
import { TypesConnectionUnionTypeOutput } from "./outputs/types-union.output";
import { FindManyProfilesPaginatedInput } from "src/profile/inputs/profile-paginated.input";
import { FindManyEntriesPaginatedInput } from "src/entry/inputs/entry-paginated.input";
import { Prisma } from "@prisma/client";
import { UserCount } from "./outputs/user-count.output";
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

  @Query(() => BaseTypesConnection)
  async typeConnectionUnionFuncton(
    @Args("findManyUsersPaginatedInput", {
      type: () => FindManyUsersPaginatedInput,
      nullable: true,
      defaultValue: {
        findManyUsersPaginatedInput: { pagination: { first: 10 } }
      }
    })
    params: FindManyUsersPaginatedInput,
    @Args("findManyEntriesPaginatedInput") entryParams: FindManyEntriesPaginatedInput,
    @Args("findManyProfilesPaginatedInput", { type: () => FindManyProfilesPaginatedInput })
    profileParams: FindManyProfilesPaginatedInput
  ): Promise<BaseTypesConnection> {
    const edgingUserNodes = await findManyCursorConnection(
      args =>
        this.prismaService.user.findMany({
          take: params.take,
          include: { _count: true },
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
    const edgingThoseProfiles = await findManyCursorConnection(
      args =>
        this.prismaService.profile.findMany({
          skip: profileParams.skip,
          take: profileParams.take,
          distinct: profileParams.distinct,
          where: profileParams.where,
          orderBy: profileParams.orderBy,
          cursor: profileParams.cursor,
          ...args
        }),
      () =>
        this.prismaService.profile.count({
          skip: profileParams.skip,
          take: profileParams.take,
          distinct: profileParams.distinct,
          where: profileParams.where,
          orderBy: profileParams.orderBy
        }),
      {
        first: profileParams.pagination.first ?? 10,
        last: profileParams.pagination.last,
        before: profileParams.pagination.before,
        after: profileParams.pagination.after
      }
    );
    const edgingThoseNodes = await findManyCursorConnection(
      args =>
        this.prismaService.entry.findMany({
          include: {_count: true},
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
    const output = ([edgingThoseNodes || edgingThoseProfiles || edgingUserNodes]);
    return output
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
      }
    );
  }

  // @Query(() => UsersToEntriesOutput)
  // async usersToEntriesPaginated(
  //   @Args("usersToEntriesPaginatedInput", {
  //     type: () => UsersToEntriesPaginatedInput
  //   })
  //   params: UsersToEntriesPaginatedInput
  // ): Promise<UsersToEntriesOutput> {
  //   const findManyUsersTransaction = await this.prismaService.$transaction(
  //     async (prisma = this.prismaService) => {
  //       const edgingUserNodes = await findManyCursorConnection(
  //         args =>
  //           prisma.user.findMany({
  //             take: params.findManyUsersPaginatedInput.take,
  //             skip: params.findManyUsersPaginatedInput.skip,
  //             distinct: params.findManyUsersPaginatedInput.distinct,
  //             where: params.findManyUsersPaginatedInput.where,
  //             orderBy: params.findManyUsersPaginatedInput.orderBy,
  //             ...args
  //           }),
  //         () =>
  //           prisma.user.count({
  //             orderBy: params.findManyUsersPaginatedInput.orderBy,
  //             distinct: params.findManyUsersPaginatedInput.distinct,
  //             skip: params.findManyUsersPaginatedInput.skip,
  //             where: params.findManyUsersPaginatedInput.where,
  //             cursor: params.findManyUsersPaginatedInput.cursor
  //           }),
  //         {
  //           first: params.findManyUsersPaginatedInput.pagination.first ?? 10,
  //           last: params.findManyUsersPaginatedInput.pagination.last,
  //           before: params.findManyUsersPaginatedInput.pagination.before,
  //           after: params.findManyUsersPaginatedInput.pagination.after
  //         }
  //       );

  //       const edgingThoseNodes = await findManyCursorConnection(
  //         args =>
  //           prisma.entry.findMany({
  //             distinct: params.findManyEntriesPaginatedInput.distinct,
  //             take: params.findManyEntriesPaginatedInput.take,
  //             skip: params.findManyEntriesPaginatedInput.skip,
  //             where: params.findManyEntriesPaginatedInput.where,
  //             cursor: params.findManyEntriesPaginatedInput.cursor,
  //             orderBy: params.findManyEntriesPaginatedInput.orderBy,
  //             ...args
  //           }),
  //         () =>
  //           prisma.entry.count({
  //             distinct: params.findManyEntriesPaginatedInput.distinct,
  //             skip: params.findManyEntriesPaginatedInput.skip,
  //             where: params.findManyEntriesPaginatedInput.where,
  //             cursor: params.findManyEntriesPaginatedInput.cursor,
  //             orderBy: params.findManyEntriesPaginatedInput.orderBy
  //           }),
  //         {
  //           first: params.findManyEntriesPaginatedInput.pagination.first ?? 10,
  //           last: params.findManyEntriesPaginatedInput.pagination.last,
  //           before: params.findManyEntriesPaginatedInput.pagination.before,
  //           after: params.findManyEntriesPaginatedInput.pagination.after
  //         }
  //       );
  //       return { entries: edgingThoseNodes, users: edgingUserNodes };
  //     },
  //     { maxWait: 5000, timeout: 10000 }
  //   );

  //   return (
  //     findManyUsersTransaction.users && {
  //       entries: findManyUsersTransaction.entries
  //     }
  //   );
  // }

  @Query(() => User)
  async userByRelayId(@Context("CONTEXT") CONTEXT: Request) {
    const token = CONTEXT.header("authorization")
      ? CONTEXT.header("authorization")
      : "";
    const user = JWT.decode(token ? token : "", {
      complete: true
    }) as JwtDecoded;
    console.log(user);
    return await this.userService.relayFindUniqueUser({
      id: user.payload.userId
    });
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => User)
  async changePassword(
    @Args("accessToken", { type: () => String }) accessToken: string,
    @Args("data") data: ChangePasswordInput
  ) {
    const jwtDecoded = (await this.authService.getUserFromToken(
      accessToken
    )) as User | null;

    return await this.userService.changePassword(
      jwtDecoded?.id ? jwtDecoded.id : "",
      jwtDecoded?.password ? jwtDecoded.password : data.oldPassword,
      { ...data }
    );
  }
}
