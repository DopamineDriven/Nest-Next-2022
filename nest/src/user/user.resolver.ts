import { HostParam, Inject, UseGuards } from "@nestjs/common";
import { Args, Context, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "./model/user.model";
import { UserService } from "./user.service";
import { Query, Mutation } from "@nestjs/graphql";
import { fromGlobalId } from "graphql-relay";
import { UserConnection } from "./model/user-connection.model";
import { PaginationArgs } from "../common/pagination/pagination.args";
import { Prisma } from ".prisma/client";
import { UserOrder } from "./inputs/user-order.input";
import { GraphqlAuthGuard } from "../common/guards/graphql-auth.guard";
import { UserEntity } from "../common/decorators/user.decorator";
import { ChangePasswordInput } from "./inputs/change-passsword.input";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { Role } from "../.generated/prisma-nestjs-graphql/prisma/enums/role.enum";
import { AuthJwtService } from "../auth/auth-jwt.service";
import { UpdateManyUserArgs } from "../.generated/prisma-nestjs-graphql/user/args/update-many-user.args";
import { ReturnTypedNode } from "ts-morph";
import { XOR } from "../common/types/helpers.type";

@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private readonly userService: UserService
  ) {}

  @Query(() => User)
  async me(
    @Args("accessToken") accessToken: string,
    @UserEntity("user") user: User
  ) {
    return await this.userService.user({
      userWhereUniqueInput: user.id
        ? { id: user.id }
        : { email: user.email ? user.email : "" }
    });
  }

  @Query(() => User)
  async userById(@Args("id") id: string) {
    const getUserById = await this.userService.relayFindUniqueUser({
      id
    });
    return getUserById;
  }

  @Query(() => UserConnection)
  async listUsers(
    @Args() { after, before, first, last }: PaginationArgs,
    @Args({ name: "query", type: () => String, nullable: true }) query: string,
    @Args({
      name: "role",
      type: () => Role,
      nullable: true,
      defaultValue: Role.USER
    })
    role: Role,
    @Args({
      name: "orderBy",
      type: () => UserOrder,
      nullable: true
    })
    orderBy: UserOrder
  ) {
    const edgingUserNodes = await findManyCursorConnection(
      args =>
        this.prismaService.user.findMany({
          include: { entries: true },
          where: {
            role: role,
            email: { contains: query || "" }
          },
          orderBy: orderBy?.field
            ? { [orderBy.field]: orderBy?.direction }
            : undefined,
          ...args
        }),
      () =>
        this.prismaService.user.count({
          where: {
            role: role,
            email: { contains: query || "" }
          }
        }),
      { first, last, before, after }
    );
    return edgingUserNodes;
  }

  @Query(() => User)
  async userByRelayId(@HostParam("user") user: User) {
    return await this.userService.relayFindUniqueUser({ id: user.id });
  }
  // @UseGuards(GraphqlAuthGuard)
  // @Mutation()
  // async updateUser(
  //   @Args()
  //   user: XOR<
  //     {
  //       id: string;
  //     },
  //     { email: string }
  //   >,
  //   @Args("updateUserDate") updateUserData: UpdateManyUserArgs
  // ) {
  //   return await this.userService.updatingUser({
  //     userWhereUniqueInput: user?.id
  //       ? { id: user.id }
  //       : { email: user?.email ? user.email : "" },
  //     data: { ...updateUserData }
  //   });
  // }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => User)
  async changePassword(
    @UserEntity() userentity: User,
    @Args("data") data: ChangePasswordInput
  ) {
    return this.userService.changePassword(userentity.id, userentity.password, {
      ...data
    });
  }

  @Query(_returns => [User])
  async entriesByStatus(@Args("isPublished") isPublished: boolean) {
    return this.prismaService.user.findMany({
      include: {
        entries: { where: { published: isPublished } }
      },
      orderBy: { role: "asc" }
    });
  }
}
