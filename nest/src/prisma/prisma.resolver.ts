import { PrismaService } from ".";
import {
  Resolver,
  ResolveProperty,
  ResolveField,
  ResolveReference,
  Args
} from "@nestjs/graphql";
import { EntryConnection } from "src/entry/model/entry-connection.model";
import { UserConnection } from "src/user/model/user-connection.model";
import { forwardRef, Inject } from "@nestjs/common";
import { FindManyUsersPaginatedInput } from "src/user/inputs/user-paginated-args.input";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { UserService } from "src/user/user.service";
import { PaginationService } from "src/pagination";

@Resolver("PrismaResolver")
export class PrismaResolver {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => PaginationService)) private readonly paginationService: PaginationService
  ) {}

  @ResolveField(() => UserConnection)
  async users(
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
}
