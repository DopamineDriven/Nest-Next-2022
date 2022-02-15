import { Token } from "./model/token.model";
import { Auth, AuthSansSession } from "./model/auth.model";
import { LoginInput } from "./inputs/login.input";
import { SignupInput } from "./inputs/signup.input";
import { TokenInput } from "./inputs/refresh-token.input";
import {
  Resolver,
  Mutation,
  Args,
  Info,
  Query,
  Context,
  ResolveProperty,
  Root,
  GraphQLExecutionContext,
  ResolveField
} from "@nestjs/graphql";
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
import {
  ConflictException,
  ExecutionContext,
  UseGuards,
  UsePipes
} from "@nestjs/common";
import { UserCreateMutationInput } from "./inputs/create-one-user.input";
import { v4 } from "uuid";
import { Prisma } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import { Context as LocalContext } from "src/app.module";
import { AuthGuard } from "src/common/guards/gql-context.guard";
import { ChangePasswordInput } from "src/user/inputs/change-passsword.input";
import { ViewerDetailed } from "./model";
import { pipe } from "rxjs";
import { ViewerAuthInfo } from "./model/jwt-auth.model";
@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly auth: AuthService,
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService
  ) {}
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
    @Args("userCreateInput", { type: () => UserCreateMutationInput })
    params: UserCreateMutationInput
  ): Promise<AuthDetailed> {
    const uploadDate = new Date(Date.now()).toUTCString();
    try {
      const userCreate = await this.prismaService.user.create({
        include: {
          _count: true
        },
        data: {
          ...params,
          email: params.email,
          password: await this.passwordService.hashPassword(
            params.password ? params.password : ""
          ),
          firstName: params.firstName,
          lastName: params.lastName,
          role: params.email.includes("andrew@windycitydevs.io")
            ? "SUPERADMIN"
            : "USER",
          status: "ONLINE",
          createdAt: new Date(Date.now()),
          image: params.image,
            // ? { ...params.image.set }
            // : {
            //     set: [
            //       {
            //         id: params.image?.set.find(id => id).id ?? v4(),
            //         uploadedAt: new Date(
            //           params.mediaItems?.create
            //             ? (params.mediaItems.create[0].uploadedAt as string)
            //             : (uploadDate as string)
            //         ).toUTCString()
            //       },
            //       {
            //         ariaLabel: "Accessibility label",
            //         caption: "default avatar",
            //         destination: "AVATAR",
            //         quality: 90,
            //         name: "g4apn65eo8acy988pfhb",
            //         src: "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g4apn65eo8acy988pfhb.gif",
            //         srcSet: "",
            //         height: 141,
            //         width: 220,
            //         type: "GIF",
            //         size: ""
            //       },
            //       {
            //         unique: `${params.id}_${"g4apn65eo8acy988pfhb"}`
            //       }
            //     ]
            //   }
        } as UserCreateMutationInput
      });

      const getTokes = this.auth.generateTokens({ userId: userCreate.id });

      if (getTokes.accessToken != null) {
        return await this.auth.getUserWithDecodedToken(getTokes.accessToken);
      }
      return await this.auth.getUserWithDecodedToken(
        getTokes.accessToken ? getTokes.accessToken : ""
      );
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        throw new ConflictException(`Email ${params.email} already used.`);
      } else {
        throw new Error(e as any);
      }
    }
  }

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
        image: dataRegister.image ?? "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g4apn65eo8acy988pfhb.gif",
        lastName: dataRegister.lastName,
        password: await this.passwordService.hashPassword(
          dataRegister.password
        ),
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
            refreshToken: user.auth.refreshToken,
            ...user.auth.user
          }
        };
        return viewer;
      });
  }
}
