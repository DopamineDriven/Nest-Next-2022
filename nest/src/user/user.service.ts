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
    return this.prisma.user
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
