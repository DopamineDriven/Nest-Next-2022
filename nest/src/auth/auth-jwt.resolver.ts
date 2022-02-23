import { Auth } from "./model/auth.model";
import { LoginInput } from "./inputs/login.input";
import { SignupInput } from "./inputs/signup.input";
import { TokenInput } from "./inputs/refresh-token.input";
import {
  Resolver,
  Mutation,
  Args,
  Info,
  Query,
  Context
} from "@nestjs/graphql";
import { AuthService } from "./auth-jwt.service";
import { GraphQLResolveInfo } from "graphql";
import { User } from "../user/model/user.model";
import { AuthDetailed } from "./model/auth-detailed.model";
import { CacheScope } from "apollo-server-types";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/common/guards/gql-context.guard";
import { ChangePasswordInput } from "src/user/inputs/change-passsword.input";
import { ViewerDetailed } from "./model";
import { ViewerAuthInfo } from "./model/jwt-auth.model";
import { AppContext } from "src/gql-config.service";

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async updateUserPassword(
    @Context() { token }: AppContext,
    @Args("passwordInput") passwordInput: ChangePasswordInput
  ): Promise<User> {
    return await this.auth.updatePassword(
      {
        newPassword: passwordInput.newPassword,
        oldPassword: passwordInput.oldPassword
      },
      token as string
    );
  }

  @Mutation(() => AuthDetailed)
  async registerNewUser(
    @Args("userCreateInput", { type: () => SignupInput })
    params: SignupInput
  ): Promise<AuthDetailed> {
    return await this.auth.createNewUser(params);
  }

  // @CacheKey("login")
  @Mutation(() => AuthDetailed)
  async signin(
    @Args("userloginInput") userloginInput: LoginInput,
    @Info() info: GraphQLResolveInfo
  ): Promise<AuthDetailed> {
    info.cacheControl.setCacheHint({
      scope: CacheScope.Public,
      maxAge: 200000
    });
    const infoResolved = JSON.stringify(info, null, 2);
    console.log(infoResolved);
    const { email, password } = userloginInput;

    const getUserWithToken = await this.auth.signIn({ email, password });
    console.log(getUserWithToken ?? "no context");
    return getUserWithToken;
  }

  @Query(() => AuthDetailed)
  @UseGuards(AuthGuard)
  async getViewer(@Context() { token }: AppContext): Promise<AuthDetailed> {
    return await this.auth.getUserWithDecodedToken(token as string);
  }

  @Query(() => ViewerAuthInfo)
  @UseGuards(AuthGuard)
  async viewerAuthInfoFromContext(
    @Context() { token }: AppContext
  ): Promise<ViewerAuthInfo> {
    return await this.auth
      .getUserWithDecodedToken(token as string)
      .then(getAuth => {
        return {
          accessToken: getAuth.auth?.accessToken
            ? getAuth.auth.accessToken
            : (token as string),
          refreshToken: getAuth.auth.refreshToken
            ? getAuth.auth.refreshToken
            : "",
          viewerJwt: getAuth.jwt
        };
      });
  }

  @Query(() => AuthDetailed)
  async getUserFromAccessToken(
    @Args() { token }: TokenInput
  ): Promise<AuthDetailed> {
    return await this.auth.getUserWithDecodedToken(token);
  }

  @Query(() => ViewerDetailed)
  @UseGuards(AuthGuard)
  async viewer(
    @Context() { token }: AppContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<ViewerDetailed> {
    console.log(info ?? "");
    return await this.auth
      .getUserWithDecodedToken(token as string)
      .then(user => {
        const { viewer } = {
          viewer: {
            accessToken: user.auth.accessToken,
            secret: user.jwt.signature,
            refreshToken: user.auth?.refreshToken,
            ...user.auth.user
          }
        };
        return viewer;
      });
  }
}
