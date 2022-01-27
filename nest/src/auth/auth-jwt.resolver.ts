import { Token } from "./model/token.model";
import { Auth } from "./model/auth.model";
import { LoginInput } from "./inputs/login.input";
import { SignupInput } from "./inputs/signup.input";
import { RefreshTokenInput } from "./inputs/refresh-token.input";
import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
  PartialType,
  Context,
  Info,
  Query
} from "@nestjs/graphql";
import { AuthJwtService } from "./auth-jwt.service";
import { Prisma } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { GraphQLExecutionContext } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import { forwardRef, ForwardReference, Inject } from "@nestjs/common";
import { User } from "../user/model/user.model";
import { AuthDetailed } from "./model/auth-detailed.model";
@Resolver(() => Auth)
export class AuthJwtResolver {
  constructor(
    @Inject<ForwardReference<AuthJwtService>>(forwardRef(() => AuthJwtService))
    private readonly auth: AuthJwtService
  ) {}

  @Mutation(() => Auth)
  async signup(
    @Args("data", { type: () => SignupInput }) data: SignupInput
  ): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    data.email = data.email.toLowerCase();
    const { user, accessToken, refreshToken } = await this.auth.createUser(data);
    return {
      user,
      accessToken,
      refreshToken
    };
  }
  @Mutation(() => Auth)
  async login(@Args("data", { type: () => LoginInput }) data: LoginInput) {
    const { email, password } = data;
    const payload = await this.auth.login(email, password);

    // const userFromToken = await this.auth
    //   .getUserWithDecodedToken(token.accessToken)
    //   .then(user => user.auth.user);

    return { ...payload };
  }

  @Mutation(() => Token)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.auth.refreshToken(token);
  }

  @Mutation(() => AuthDetailed)
  async getUserFromAccessToken(@Args() { token }: RefreshTokenInput): Promise<AuthDetailed> {
    return await this.auth.getUserWithDecodedToken(token).then(authDetailed => authDetailed);
  }

  @ResolveField("user")
  async user(@Parent() auth: Auth, @Info() info: GraphQLResolveInfo) {
    console.log(info ?? "");
    return await this.auth
      .getUserWithDecodedToken(auth.accessToken)
      .then(user => user.auth.user);
  }
}
