import { ExecutionContext, Inject, UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation, ResolveField, Context } from "@nestjs/graphql";
import { AuthService } from "src/auth/auth-jwt.service";
import { AuthDetailed } from "src/auth/model/auth-detailed.model";
import { AuthGuard } from "src/common/guards/gql-context.guard";
import { PrismaService } from "src/prisma";
import { AppService } from "./app.service";
// import { ConnectionEdgeUnion, EdgeUnion } from "src/union/model/union-factory.strategy";
// import { Connection, connectionFromPromisedArray, Edge } from "graphql-relay";
// import { UserEdge } from "src/user/model/user-connection.model";
// import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
// import { FindManyUsersPaginatedInput } from "src/user/inputs/user-paginated-args.input";
// import { FindManyEntriesPaginatedInput } from "src/entry/inputs/entry-paginated.input";
// import { FindManyProfilesPaginatedInput } from "src/profile/inputs/profile-paginated.input";
// import { User } from "src/user/model/user.model";
// import { Prisma } from "@prisma/client";
// import { Profile } from "src/profile";
// import { Entry } from "src/entry";
// import { MediaItem } from "src/media/model/media.model";

@Resolver("AppResolver")
export class AppResolver {
  constructor(
    @Inject(AppService) private readonly appService: AppService,
    private readonly authService: AuthService,
    @Inject(PrismaService) private readonly prismaService: PrismaService
  ) {}
  @Query(() => String)
  helloWorld(): string {
    return "Hello World!";
  }
  @Query(() => String)
  hello(@Args("name") name: string): string {
    return `Hello ${name}!`;
  }

  // @Query(_returns => ConnectionEdgeUnion, { name: "contentNodes" })
  // async contentNodes(@Args("findManyUsersPaginatedInput", {
  //   type: () => FindManyUsersPaginatedInput,
  //   nullable: true,
  //   defaultValue: {
  //     findManyUsersPaginatedInput: { pagination: { first: 10 } }
  //   }
  // })
  // params: FindManyUsersPaginatedInput,    @Args("findManyEntriesPaginatedInput") entryParams: FindManyEntriesPaginatedInput,
  // @Args("findManyProfilesPaginatedInput", { type: () => FindManyProfilesPaginatedInput })
  // profileParams: FindManyProfilesPaginatedInput): Promise<Connection<(User | Profile | Entry | MediaItem) & {_count: Prisma.UserCountOutputType | Prisma.EntryCountOutputType | Prisma.ProfileCou}>> {
  //   const edgingAllTheNodes = await findManyCursorConnection(
  //     args =>
  //       this.prismaService.user.findMany({
  //         take: params.take,
  //         include: { _count: true },
  //         skip: params.skip,
  //         distinct: params.distinct,
  //         where: params.where,
  //         orderBy: params.orderBy,
  //         cursor: params.cursor,

  //         ...args
  //       }), () => this.prismaService.user.count({
  //         orderBy: params.orderBy,

  //         distinct: params.distinct,
  //         skip: params.skip,
  //         where: params.where,
  //         cursor: params.cursor
  //       }),
  //     {
  //       first: params.pagination.first ?? 10,
  //       last: params.pagination.last,
  //       before: params.pagination.before,
  //       after: params.pagination.after
  //     },
  //   );
  // }

  @UseGuards(AuthGuard)
  @Query(() => AuthDetailed)
  async decodeViewerTokenFromContext(@Context("token") ctx: ExecutionContext) {
    return await this.authService.getUserWithDecodedToken(ctx as unknown as string);
  }

  @UseGuards(AuthGuard)
  @Query(() => AuthDetailed)
  async userFromAccessTokenDecoded(
    @Args("token", { type: () => String }) token: string
  ): Promise<AuthDetailed> {
    return await this.authService.getUserWithDecodedToken(token);
  }
}
