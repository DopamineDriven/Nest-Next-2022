import { Injectable, BadRequestException, Inject } from "@nestjs/common";
import { PasswordService } from "../auth/password.service";
import { Prisma } from "@prisma/client";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import { UserConnection } from "./model/user-connection.model";
import { PrismaService } from "../prisma/prisma.service";
import { ChangePasswordInput } from "./inputs/change-passsword.input";
import { XOR } from "../common/types/helpers.type";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { User } from "./model/user.model";
import { FindManyUsersPaginatedInput } from "./inputs/user-paginated-args.input";

@Injectable()
export class UserService {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private readonly passwordService: PasswordService
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

  excludeStringNullableField<
    StringNullableFilter,
    Key extends keyof StringNullableFilter
  >(
    stringNullableFilter: StringNullableFilter,
    ...keys: Key[]
  ): Omit<StringNullableFilter, Key> {
    for (const key of keys) {
      delete stringNullableFilter[key];
    }
    return stringNullableFilter;
  }
  async usersPaginated(params: FindManyUsersPaginatedInput) {
    return await findManyCursorConnection(
      args =>
        this.prismaService.user.findMany({
          include: {
            _count: true,
            entries: true,
            accounts: true,
            profile: true,
            mediaItems: true,
            sessions: true,
            connections: true,
            comments: true,
            categories: true
          },
          distinct: params.distinct,
          take: params.take,
          skip: params.skip,
          where: params.where,
          cursor: args.cursor,
          orderBy: params.orderBy,
          ...args
        }),
      () =>
        this.prismaService.user.count({
          orderBy: params.orderBy,
          take: params.take,
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
    const user = (await this.prismaService.user.findUnique({
      where: { id: fromGlobalId(params.id).id }
    })) as User;
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
    id: string;
  }) {
    const getUser = await this.prismaService.user.findUnique({
      where: { id: passwordInput.id }
    });

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
