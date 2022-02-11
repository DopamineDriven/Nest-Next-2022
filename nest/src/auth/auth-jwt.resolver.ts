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
  Context
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
import { ConflictException, ExecutionContext, UsePipes } from "@nestjs/common";
import { UserCreateMutationInput } from "./inputs/create-one-user.input";
import { v4 } from "uuid";
import { Prisma } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime";

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly auth: AuthService,
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService
  ) {}

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
          image: params.image?.set
            ? { ...params.image.set }
            : {
                set: [
                  {
                    id: params.image?.set.find(id => id).id ?? v4(),
                    uploadedAt: new Date(
                      params.mediaItems?.create
                        ? (params.mediaItems.create[0].uploadedAt as string)
                        : (uploadDate as string)
                    ).toUTCString()
                  },
                  {
                    ariaLabel: "Accessibility label",
                    caption: "default avatar",
                    destination: "AVATAR",
                    quality: 90,
                    name: "g4apn65eo8acy988pfhb",
                    src: "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g4apn65eo8acy988pfhb.gif",
                    srcSet: "",
                    height: 141,
                    width: 220,
                    type: "GIF",
                    size: ""
                  },
                  {
                    unique: `${params.id}_${"g4apn65eo8acy988pfhb"}`
                  }
                ]
              }
        }
      });

      /**
     *         profile: {
              create: {
                memberSince: new Date(Date.now()),
                recentActivity: {
                  set: [
                    {
                      signedUp: `Created an account on ${new Date(Date.now())
                        .toUTCString()
                        .split(/([T])/)} 🎉`
                    }
                  ]
                },
                lastSeen: new Date(Date.now()),
                city: params.profile?.create?.city
              }
            },
            mediaItems: {
              create: params.mediaItems?.create
                ? { ...params.mediaItems.create }
                : {
                    uploadedAt: new Date(
                      params.mediaItems?.create
                        ? (params.mediaItems.create[0].uploadedAt as string)
                        : (uploadDate as string)
                    ).toUTCString(),
                    ariaLabel: "Accessibility label",
                    caption: "default avatar",
                    destination: "AVATAR",
                    quality: 90,
                    name: "g4apn65eo8acy988pfhb",
                    src: "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g4apn65eo8acy988pfhb.gif",
                    srcSet: "",
                    height: 141,
                    width: 220,
                    type: "GIF",
                    title: "Archer Default",
                    size: ""
                  }
            }
     */

      // return await this.prismaService.user.update({
      //   where: { id: userCreate.id },
      //   data: {
      //     profile: {
      //       connectOrCreate: {
      //         where: { userId: userCreate.id }, create: {
      //           memberSince: new Date(Date.now()),
      //           recentActivity: {
      //             set: [
      //               {
      //                 signedUp: `Created an account on ${new Date(Date.now())
      //                   .toUTCString()
      //                   .split(/([T])/)} 🎉`
      //               }
      //             ]
      //           },
      //           lastSeen: new Date(Date.now()),
      //           city: params.profile?.create?.city

      //         }
      //       }
      //     },
      //     mediaItems: {
      //       create: {
      //         uploadedAt: new Date(
      //           params.mediaItems?.create
      //             ? (params.mediaItems.create[0].uploadedAt as string)
      //             : (uploadDate as string)
      //         ).toUTCString(),
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
      //         title: "Archer Default",
      //         size: ""

      //       }
      //     }
      //   }
      // }).then(async (user) => {
      //   const getTokens = this.auth.generateTokens({ userId: user.id });

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
  async signin(@Args("userloginInput") userloginInput: LoginInput
  ): Promise<AuthDetailed> {
    const { email, password } = userloginInput;

    const getUserWithToken = await this.auth.signIn({email, password});
    console.log(getUserWithToken ?? "no context");
    return await getUserWithToken;
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
          include: { sessions: true, _count: true, mediaItems: true },
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
