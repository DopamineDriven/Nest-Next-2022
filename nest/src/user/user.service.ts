import { Injectable, BadRequestException, Inject } from "@nestjs/common";
import { PasswordService } from "../auth/password.service";
import { Prisma } from "@prisma/client";
import { fromGlobalId, toGlobalId } from "graphql-relay";
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
import { ManyUsersPaginatedArgs } from "./args/find-many-paginated.args";
import { EnumRoleNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/enum-role-nullable-filter.input";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { StringNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/string-nullable-filter.input";
import { EnumUserStatusNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/enum-user-status-nullable-filter.input";
import { UserOrderByWithRelationAndSearchRelevanceInput } from "src/.generated/prisma-nestjs-graphql/user/inputs/user-order-by-with-relation-and-search-relevance.input";
import { StringFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/string-filter.input";
import { User } from "./model/user.model";
import { FindManyUsersPaginatedInput } from "./inputs/user-paginated-args.input";

type Enumerable<T> = T | Array<T>;
@Injectable()
export class UserService {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly authService: AuthService
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

    return this.prismaService.user
      .findFirst({
        where: id ? { id: id } : { email: email },
        include: { profile: true }
      })
      .profile()
      .user()
      .then();
  }

  async usersPaginated(params: ManyUsersPaginatedArgs) {
    const { paginationArgs } = params;

    const firstNameFilter = params as StringNullableFilter;
    const lastNameFilter = params.lastNameFilter as StringNullableFilter;
    const userStatus =
      params.userStatus as unknown as EnumUserStatusNullableFilter;
    const { first, last, before, after } =
      paginationArgs as unknown as PaginationArgs;
    const roles = params.roles as unknown as EnumRoleNullableFilter;
    const emailFilter = this.prismaService.excludeStringNullableField(
      params.emailFilter
    );
    const orderByRelevance =
      params.orderByRelevance as Enumerable<UserOrderByWithRelationAndSearchRelevanceInput>;

    return await findManyCursorConnection(
      args =>
        this.prismaService.user.findMany({
          include: {
            _count: true,
            entries: true,
            profile: true,
            sessions: true
          },
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
        this.prismaService.user.count({
          orderBy: orderByRelevance,
          where: {
            role: roles,
            email: emailFilter,
            firstName: firstNameFilter,
            lastName: lastNameFilter,
            status: userStatus
          }
        }),
      { first, last, before, after },
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

  async usersForPaginationCount() {
    return await this.prismaService.user.findMany();
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

  excludeUserEdgeField<UserEdge, Key extends keyof UserEdge>(
    userEdge: UserEdge,
    ...keys: Key[]
  ): Omit<UserEdge, Key> {
    for (const key of keys) {
      delete userEdge[key];
    }
    return userEdge;
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
    const users = this.prismaService.user.findMany({
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
    return this.prismaService.user.create({
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
    return await this.prismaService.user.update({
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
    return this.prismaService.user.delete({
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
    const user = await this.prismaService.user.findUnique({
      where: { id: fromGlobalId(params.id).id }
    });
    if (!user) {
      throw new Error("could not find user with id " + params.id);
    }
    return user;
  }

  toGlobalRelayId(cursor: { id: string }, typename: string) {
    return toGlobalId(typename, cursor.id);
  }

  fromGlobalRelayId(cursor: string) {
    return fromGlobalId(cursor);
  }

  async relayFindManyUsers(
    params: FindManyUsersPaginatedInput
  ): Promise<UserConnection> {
    return await findManyCursorConnection(
      args =>
        this.prismaService.user.findMany({
          take: params.take,
          include: {
            entries: true,
            profile: true,
            _count: true,
            mediaItems: true
          },
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

  async updateUser(data: Prisma.UserUncheckedUpdateInput, id: string) {
    return await this.prismaService.user
      .update({
        where: { id: id },

        include: {
          entries: true,
          comments: true,
          profile: true,
          categories: true,
          mediaItems: true,
          _count: true,
          sessions: true,
          connections: true
        },
        data: { ...data }
      })
      .then(data => data);
  }

//   async createEntry(data: Prisma.EntryCreateInput, viewerId: string | undefined) {
//     const getUser = await this.authService.validateUser(viewerId ?? "");
//     const { rest, author } = { author:{...data.author}, rest: { ...data }}
//     const updateData = await this.prismaService.entry.create({ data: data, include: {author: true}})
// }

  create(data: Prisma.UserCreateInput, account: Prisma.AccountCreateInput) {
    return this.prismaService.user.create({
      data: { ...data, accounts: { create: { ...account } } }
    });
  }

  async changePassword(passwordInput: {
    changePasswordInput: ChangePasswordInput;
    accessToken: string;
  }) {
    const getUser = await this.authService.getUserFromToken(
      passwordInput.accessToken
    );

    const { newPassword, oldPassword } = passwordInput.changePasswordInput;

    const passwordValid = await this.passwordService.validatePassword({
      encryptedPassword: getUser?.password
        ? getUser.password
        : this.passwordService.hashSynchronously(`${getUser?.password}`),
      password: oldPassword
    });

    if (!passwordValid) {
      throw new BadRequestException("Invalid password");
    }

    const hashedPassword = await this.passwordService.hashPassword(newPassword);

    return await this.prismaService.user.upsert({
      update: {
        password: { set: hashedPassword },
        updatedAt: new Date(Date.now()),
        status: "ONLINE"
      },
      where: getUser?.id ? { id: getUser.id } : { email: getUser?.email },
      create: {
        password: hashedPassword,
        email: getUser?.email ? getUser.email : "",
        updatedAt: new Date(Date.now())
      }
    });
  }
}
