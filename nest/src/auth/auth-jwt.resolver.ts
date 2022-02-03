import { Token } from "./model/token.model";
import { Auth, AuthSansSession } from "./model/auth.model";
import { LoginInput } from "./inputs/login.input";
import { SignupInput } from "./inputs/signup.input";
import { TokenInput } from "./inputs/refresh-token.input";
import { Resolver, Mutation, Args, Info, Query, Context } from "@nestjs/graphql";
import { AuthService } from "./auth-jwt.service";
import { GraphQLResolveInfo } from "graphql";
import { User } from "../user/model/user.model";
import { AuthDetailed } from "./model/auth-detailed.model";
import { PrismaService } from "../prisma";
import { Role } from "src/.generated/prisma-nestjs-graphql/prisma/enums/role.enum";
import { PasswordService } from "src/password";
import { CacheScope } from "apollo-server-types";
import { Viewer, PrismaViewer } from "./model/auth.model";
import { UserMeta } from "src/common/decorators/user.decorator";
import { ExecutionContext, UsePipes } from "@nestjs/common";

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly auth: AuthService,
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService
  ) {}

  @Mutation(() => AuthSansSession)
  async register(
    @Args("dataRegister", { type: () => SignupInput }) dataRegister: SignupInput
  ): Promise<AuthSansSession> {
    const registerUser = await this.prismaService.user.create({
      data: {
        role: dataRegister.email.includes("andrew@windycitydevs.io")
          ? Role.SUPERADMIN
          : Role.USER,
        status: "ONLINE",
        emailVerified: new Date(Date.now()),
        email: dataRegister.email,
        firstName: dataRegister.firstName,
        lastName: dataRegister.lastName,
        password: await this.passwordService.hashPassword(
          dataRegister.password
        ),
        image: dataRegister.image,
        createdAt: new Date(Date.now())
      }
    });
    const getToken = this.auth.generateTokens({
      userId: registerUser.id ? registerUser.id : ""
    });

    console.log(registerUser);
    const createUserResult = {
      user: registerUser,
      accessToken: getToken.accessToken,
      refreshToken: getToken.refreshToken
    } as AuthSansSession;
    return createUserResult;
  }
  @Mutation(() => Token)
  async signup(
    @Args("data", { type: () => SignupInput }) data: SignupInput
  ): Promise<Token> {
    data.email = data.email.toLowerCase();
    const { accessToken, refreshToken } = await this.auth.createUser(data);
    return {
      accessToken: accessToken ? accessToken : "",
      refreshToken: refreshToken ? refreshToken : ""
    };
  }

  @Mutation(() => AuthDetailed)
  async signin(    @Context("token") ctx: ExecutionContext,
  @UserMeta<User>() user: User
  ): Promise<AuthDetailed> {
    const getUserWithToken = await this.auth.getUserFromToken(ctx.getType());
    console.log(getUserWithToken ?? "no context")
    return await this.auth.getUserWithDecodedToken(ctx as unknown as string);
  }

  // @CacheKey("login")
  @Mutation(() => Token)
  async login(
    @Args("data") data: LoginInput,
    @Info() info: GraphQLResolveInfo
  ): Promise<Token> {
    info.cacheControl.setCacheHint({ scope: CacheScope.Public, maxAge: 20000 });
    const { email, password } = data;
    const payload = await this.auth.login(email, password);

    // const userFromToken = await this.auth
    //   .getUserWithDecodedToken(token.accessToken)
    //   .then(user => user.auth.user);

    return payload;
  }

  @Query(() => Viewer)
  async getViewer(
    @Args("id", { type: () => String }) id: string
  ): Promise<Viewer> {
    const getTokens = this.auth.generateTokens({ userId: id ? id : "" });

    const getViewer = await PrismaViewer(this.prismaService["user"], this.auth);
    const findFirstViewer = await getViewer
      .findFirst({ where: { id: id ? id : "" } })
      .then(async data => {
        const updateUser = await this.prismaService.user.update({
          where: { id: data?.id ? data.id : "" },
          include: { sessions: true },
          data: {
            sessions: {
              connectOrCreate: {
                where: { userId: data?.id ? data.id : "" },
                create: {
                  accessToken: getTokens.accessToken
                    ? getTokens.accessToken
                    : null,
                  refreshToken: getTokens.refreshToken
                    ? getTokens.refreshToken
                    : null
                }
              }
            }
          }
        });
        return { user: data, updatedWithSession: updateUser };
      });
    const { sessions, ...userUpdated } = findFirstViewer.updatedWithSession;
    const viewerObj = {
      accessToken: getTokens.accessToken ? getTokens.accessToken : "",
      ...userUpdated
    };
    return viewerObj;
  }

  @Mutation(() => Token)
  async refreshToken(@Args() { token }: TokenInput) {
    return this.auth.refreshToken(token);
  }

  @Mutation(() => User)
  async getUserFromAccessToken(
    @Args() { token }: TokenInput
  ): Promise<User | null> {
    return await this.auth
      .getUserFromToken(token)
      .then(authDetailed => authDetailed);
  }

  // @ResolveField("user")
  // async user(@Parent() auth: Auth, @Info() info: GraphQLResolveInfo) {
  //   console.log(info ?? "");
  //   return await this.auth
  //     .getUserWithDecodedToken(auth.accessToken ? auth.accessToken : "")
  //     .then(user => user.auth.user);
  // }
}
