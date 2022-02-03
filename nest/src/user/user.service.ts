import { Injectable, BadRequestException } from "@nestjs/common";
import { PasswordService } from "../password/password.service";
import { Prisma } from "@prisma/client";
import { fromGlobalId } from "graphql-relay";
import { UserConnection } from "./model/user-connection.model";
// import { UserConnection } from "../../Entities/Pagination/user-connection.entity";
import { PrismaService } from "../prisma/prisma.service";
import { ChangePasswordInput } from "./inputs/change-passsword.input";
import {
  PaginationService,
  PaginationArgs
} from "../pagination/pagination.service";
import { UserOrder } from "./inputs/user-order.input";
import { XOR } from "../common/types/helpers.type";
import { UserWhereInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-where.input";
import { UserWhereUniqueInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-where-unique.input";
import { UserUncheckedUpdateInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-unchecked-update.input";
import { AuthService } from "../auth/auth-jwt.service";
import { Omit } from "@nestjs/graphql/dist/interfaces/gql-module-options.interface";
import { ManyUsersPaginatedArgs } from "./args/find-many-paginated.args";
import { EnumRoleNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/enum-role-nullable-filter.input";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { StringNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/string-nullable-filter.input";
import { EnumUserStatusNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/enum-user-status-nullable-filter.input";
import { UserOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-order-by-with-relation-and-search-relevance.input";
import { StringFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/string-filter.input";

type Enumerable<T> = T | Array<T>;
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
    private readonly authService: AuthService,
    private readonly paginationService: PaginationService
  ) {}
  async user(params: {
    userWhereUniqueInput: XOR<
      {
        id: string;
      },
      { email: string }
    >;
  }) {
    const {
      userWhereUniqueInput: { email, id }
    } = params;

    return this.prisma.user
      .findFirst({
        where: id ? { id: id } : { email: email },
        include: { profile: true }
      })
      .profile()
      .user()
      .then();
  }


  async usersPaginated(params: ManyUsersPaginatedArgs) {
    const { paginationArgs
    } = params;

    const firstNameFilter = params as StringNullableFilter;
    const lastNameFilter = params.lastNameFilter as StringNullableFilter;
    const userStatus = params.userStatus as unknown as EnumUserStatusNullableFilter;
    const { first, last, before, after } = paginationArgs as unknown as PaginationArgs;
    const roles = params.roles as unknown as EnumRoleNullableFilter;
    const emailFilter = this.prisma.excludeStringNullableField(params.emailFilter);
    const orderByRelevance = params.orderByRelevance as Enumerable<UserOrderByWithRelationAndSearchRelevanceInput>;

    return await findManyCursorConnection(
      args =>
        this.prisma.user.findMany({
          include: { _count: true, entries: true, profile: true, sessions: true },
          where: {
            role: roles,
            email: emailFilter,
            firstName: firstNameFilter,
            lastName: lastNameFilter,
            status: userStatus
          },
          orderBy: orderByRelevance,
          ...args
        }),
      () =>
        this.prisma.user.count({
          orderBy: orderByRelevance,
          where: {
            role: roles,
            email: emailFilter,
            firstName: firstNameFilter,
            lastName: lastNameFilter,
            status: userStatus
          }
        }),
      { first, last, before, after }
    );
  }

  async usersForPaginationCount() {
    return await this.prisma.user.findMany();
  }

  excludeUserField<User, Key extends keyof User>(
    user: User,
    ...keys: Key[]
  ): Omit<User, Key> {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }

  excludeUserConnectionField<UserConnection, Key extends keyof UserConnection>(
    userConnection: UserConnection,
    ...keys: Key[]
  ): Omit<UserConnection, Key> {
    for (const key of keys) {
      delete userConnection[key];
    }
    return userConnection;
  }

  async users(params: Omit<Prisma.UserFindManyArgs, "select">) {
    const { skip, take, cursor, where, orderBy, include } = params;
    const users = this.prisma.user.findMany({
      skip: skip,
      where: { ...where },
      include: { ...include },
      orderBy: { ...orderBy },
      cursor: { ...cursor },
      take: take
    });
    return await { ...users };
  }

  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: { ...data }
    });
  }

  async updatingUser(params: {
    userWhereUniqueInput: XOR<
      {
        id: string;
      },
      { email: string }
    >;
    data:
      | (Prisma.Without<
          Prisma.UserUpdateInput,
          Prisma.UserUncheckedUpdateInput
        > &
          Prisma.UserUncheckedUpdateInput)
      | (Prisma.Without<
          Prisma.UserUncheckedUpdateInput,
          Prisma.UserUpdateInput
        > &
          Prisma.UserUpdateInput);
  }) {
    const {
      userWhereUniqueInput: { email, id },
      data
    } = params;
    return await this.prisma.user.update({
      include: {
        _count: true,
        accounts: true,
        profile: true,
        entries: true,
        comments: true,
        connections: true,
        sessions: true,
        categories: true
      },
      data: { ...data },
      where: id ? { id: id } : { email: email }
    });
  }

  async deleteUser(
    where: XOR<
      {
        id: string;
      },
      { email: string }
    >
  ) {
    const { id, email } = where;
    return this.prisma.user.delete({
      where: id
        ? { id: id }
        : { email: email ? email : ("" as unknown as string) },
      include: {
        _count: true,
        accounts: true,
        categories: true,
        comments: true,
        connections: true,
        entries: true,
        profile: true,
        sessions: true
      }
    });
  }

  async relayFindUniqueUser(params: { id: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: fromGlobalId(params.id).id }
    });
    if (!user) {
      throw new Error("could not find user with id " + params.id);
    }
    return user;
  }

  async relayFindManyUsers(
    params: PaginationArgs,
    orderBy: UserOrder
  ): Promise<UserConnection> {
    const counting = this.prisma.user.count({
      where: {
        email: { contains: "gmail" }
      },
      orderBy: { [orderBy.field]: orderBy.direction }
    });
    return await this.prisma.user
      .findMany({
        ...(await this.paginationService.relayToPrismaPagination(params))
      })
      .then();
  }

  updateUser(data: Prisma.UserUncheckedUpdateInput, email: string) {
    return this.prisma.user.update({
      where: { email: email },
      data: { ...data }
    });
  }

  create(data: Prisma.UserCreateInput, account: Prisma.AccountCreateInput) {
    return this.prisma.user.create({
      data: { ...data, accounts: { create: { ...account } } }
    });
  }

  async changePassword(
    userId: string,
    userPassword: string,
    changePassword: ChangePasswordInput
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword
    );

    if (!passwordValid) {
      throw new BadRequestException("Invalid password");
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword
    );

    return this.prisma.user.update({
      data: {
        password: hashedPassword
      },
      where: { id: userId }
    });
  }
}
