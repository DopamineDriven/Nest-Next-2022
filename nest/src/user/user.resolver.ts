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
import { Request } from "express";
import * as JWT from "jsonwebtoken";
import { JwtDecoded } from "../auth/dto";
import { AuthService } from "../auth/auth-jwt.service";
import { PasswordService } from "../password";
import { UserMeta } from "../common/decorators/user.decorator";
import { AuthGuard } from "src/common/guards/gql-context.guard";
import { AuthDetailed } from "src/auth/model/auth-detailed.model";
import { ManyUsersPaginatedArgs } from "./args/find-many-paginated.args";
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
    @Args({
      name: "ManyUsersPaginatedArgs",
      type: () => ManyUsersPaginatedArgs,
      nullable: true
    })
    {userStatus,
      emailFilter,
      firstNameFilter,
      lastNameFilter,
      orderByRelevance,
      roles,
      paginationArgs: { first, last, before, after }
    }: ManyUsersPaginatedArgs
  ) {
    return await findManyCursorConnection(
      args =>
        this.prismaService.user.findMany({
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
      { first, last, before, after }
    );
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
