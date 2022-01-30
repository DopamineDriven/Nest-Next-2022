import { HostParam, Inject, UseGuards } from "@nestjs/common";
import {
  Args,
  CONTEXT,
  Context,
  Parent,
  PartialType,
  ResolveField,
  Resolver
} from "@nestjs/graphql";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "./model/user.model";
import { UserService } from "./user.service";
import { Query, Mutation } from "@nestjs/graphql";
import { Connection, Edge, fromGlobalId, toGlobalId } from "graphql-relay";
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
import { Without, XOR } from "../common/types/helpers.type";
import { ContextCreator } from "@nestjs/core/helpers/context-creator";
import { Request } from "express";
import * as JWT from "jsonwebtoken";
import { JwtDecoded } from "../auth/dto";
import { PickType } from "@nestjs/graphql";
import {
  EntryConnection,
  EntryOrderBy
} from "../entry/model/entry-connection.model";
import { EntryOrderByWithRelationAndSearchRelevanceInput } from "../.generated/prisma-nestjs-graphql/entry/inputs/entry-order-by-with-relation-and-search-relevance.input";
import { EnumRoleNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/enum-role-nullable-filter.input";
import { UserOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-order-by-with-relation-and-search-relevance.input";
import { Omit } from "@nestjs/graphql/dist/interfaces/gql-module-options.interface";
import { toBase64 } from "src/common";
import { UpdateOneUserArgs } from "./args/update-one.args";
import { UserWhereInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-where.input";
import { InputType } from "zlib";
import { Optional } from "utility-types";

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
      name: "roles",
      type: () => EnumRoleNullableFilter,
      nullable: true
    })
    roles: EnumRoleNullableFilter,
    @Args({
      name: "orderBy",
      type: () => UserOrderByWithRelationAndSearchRelevanceInput,
      nullable: true
    })
    orderBy: UserOrderByWithRelationAndSearchRelevanceInput
  ) {
    const edgingUserNodes = await findManyCursorConnection(
      args =>
        this.prismaService.user.findMany({
          include: { entries: true },
          where: {
            role: roles,
            email: { contains: query || "" }
          },
          orderBy: orderBy?._relevance?.fields ? { ...orderBy } : undefined,
          ...args
        }),
      () =>
        this.prismaService.user.count({
          where: {
            role: roles,
            email: { contains: query || "" }
          }
        }),
      { first, last, before, after }
    );
    return edgingUserNodes;
  }

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
  // @UseGuards(GraphqlAuthGuard)
  // @Mutation(() => User)
  // async updateUser(
  //   @Args() email: string,
  //   @Args("data") data: Prisma.UserUpdateInput
  // ) {
  //   return await this.prismaService.user.update({
  //     where: { email: email },
  //     data: {...data}
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
  // resolve entry connection query in entries service/resolver then import EntryModule in UserModule and Inject this file with EntryService
  // @Query(_returns => [EntryConnection])
  // async entriesByStatus(@Args("isPublished") isPublished: boolean) {
  //   return this.prismaService.user
  //     .findMany({
  //       include: {
  //         entries: { where: { published: isPublished } }
  //       },
  //       orderBy: { role: "asc" }
  //     })
  //     .then(data =>
  //       data.map(mapped => {
  //         mapped.entries;
  //       })
  //     );
  // }

  // @Query(() => EntryConnection)
  // async userToEntryConnection(
  //   @Args() { after, before, first, last }: PaginationArgs,
  //   @Args({ name: "filterByTitle", type: () => String, nullable: true })
  //   filterByTitle: string,
  //   @Args({
  //     name: "orderBy",
  //     type: () => EntryOrderByWithRelationAndSearchRelevanceInput,
  //     nullable: true
  //   })
  //   orderBy: EntryOrderByWithRelationAndSearchRelevanceInput
  // ) {
  //   const entries = await findManyCursorConnection(
  //     args =>
  //       this.prismaService.entry.findMany({
  //         include: { author: true },
  //         orderBy: orderBy._relevance?.fields ? { ...orderBy } : undefined,
  //         where: {
  //           title: filterByTitle
  //         },
  //         ...args
  //       }),
  //     () =>
  //       this.prismaService.entry.count({
  //         where: {
  //           title: filterByTitle
  //         },
  //       }),
  //     { first, last, before, after }
  //   );
  //   return entries;
  //   // ).then(entry => {return {...entry}})
  // }
}
