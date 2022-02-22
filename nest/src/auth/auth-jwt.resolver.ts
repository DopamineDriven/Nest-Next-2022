import { Token } from "./model/token.model";
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
import { ExecutionContext, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/common/guards/gql-context.guard";
import { ChangePasswordInput } from "src/user/inputs/change-passsword.input";
import { ViewerDetailed } from "./model";
import { ViewerAuthInfo } from "./model/jwt-auth.model";

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}
  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async updateUserPassword(
    @Context("token") ctx: ExecutionContext,
    @Args("passwordInput") passwordInput: ChangePasswordInput
  ) {
    return await this.auth.updatePassword(
      {
        newPassword: passwordInput.newPassword,
        oldPassword: passwordInput.oldPassword
      },
      ctx as unknown as string
    );
  }
  @Mutation(() => AuthDetailed)
  async registerNewUser(
    @Args("userCreateInput", { type: () => SignupInput })
    params: SignupInput
  ) {
    return await this.auth.createNewUser(params);
  }

  @Mutation(() => AuthDetailed)
  async register(
    @Args("dataRegister", { type: () => SignupInput }) dataRegister: SignupInput
  ): Promise<AuthDetailed> {
    return await this.auth.createNewUser(dataRegister);
  }

  @Mutation(() => AuthDetailed)
  async signin(
    @Args("userloginInput") userloginInput: LoginInput
  ): Promise<AuthDetailed> {
    const { email, password } = userloginInput;

    const getUserWithToken = await this.auth.signIn({ email, password });
    console.log(getUserWithToken ?? "no context");
    return getUserWithToken;
  }

  // @CacheKey("login")
  @Mutation(() => Token)
  async login(
    @Args("data") data: LoginInput,
    @Info() info: GraphQLResolveInfo
  ): Promise<Token> {
    info.cacheControl.setCacheHint({
      scope: CacheScope.Public,
      maxAge: 200000
    });
    const { email, password } = data;
    const payload = await this.auth.login(email, password);

    return payload;
  }

  @Query(() => AuthDetailed)
  @UseGuards(AuthGuard)
  async getViewer(
    @Context("token") ctx: ExecutionContext
  ): Promise<AuthDetailed> {
    return await this.auth.getUserWithDecodedToken(ctx as unknown as string);
  }

  @Query(() => ViewerAuthInfo)
  @UseGuards(AuthGuard)
  async viewerAuthInfoFromContext(
    @Context("token") ctx: ExecutionContext
  ): Promise<ViewerAuthInfo> {
    return await this.auth
      .getUserWithDecodedToken(ctx as unknown as string)
      .then(getAuth => {
        return {
          accessToken: getAuth.auth?.accessToken
            ? getAuth.auth.accessToken
            : (ctx as unknown as string),
          refreshToken: getAuth.auth.refreshToken
            ? getAuth.auth.refreshToken
            : "",
          viewerJwt: getAuth.jwt
        };
      });
  }

  @Query(() => User)
  async getUserFromAccessToken(
    @Args() { token }: TokenInput
  ): Promise<User | null> {
    return await this.auth
      .getUserFromToken(token)
      .then(authDetailed => authDetailed);
  }

  @Query(() => ViewerDetailed)
  @UseGuards(AuthGuard)
  async viewer(
    @Context("token") token: ExecutionContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<ViewerDetailed> {
    console.log(info ?? "");
    return await this.auth
      .getUserWithDecodedToken(token as unknown as string)
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
