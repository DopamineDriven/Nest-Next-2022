import {
  Resolver,
  ResolveField,
  Info,
  Context,
  GqlContextType,
  GqlExecutionContext,
  Query,
  Args,
  Mutation
} from "@nestjs/graphql";
import { UserMeta } from "src/common/decorators/user.decorator";
import { Context as LocalContext } from "src/app.module";
import { User } from "src/user/model/user.model";
import { Viewer } from "./model/viewer-extends-prisma.model";
import { ExecutionContext, Inject, UseGuards } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "src/auth/auth-jwt.service";
import { ViewerEntity } from "./model/viewer.model";
import { AuthGuard } from "src/common/guards/gql-context.guard";
import { AuthDetailed } from "src/auth/model/auth-detailed.model";
import { ViewerService } from "./viewer.service";
import { LoginInput } from "src/auth/inputs";
@Resolver("Viewer")
export class ViewerResolver {
  constructor(
    @Inject(ViewerService) private readonly viewerService: ViewerService,
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(AuthService) private readonly authService: AuthService
  ) {}

  @Query(() => ViewerEntity)
  @UseGuards(AuthGuard)
  async getViewerFromContext(@Context("token") ctx: ExecutionContext) {
    return (
      await this.viewerService
        .PrismaViewer(this.prismaService.user, this.authService)
        .then(async data => ({
          auth: await this.authService
            .getUserWithDecodedToken(ctx as unknown as string)
            .then(res => {
              const combine = {
                viewer: {
                  accessToken: ctx as unknown as string,
                  ...res.auth.user
                }
              } as unknown as Viewer;
              return combine;
            })
        }))
        .then(ops => ops)
    ).auth;
  }
  @Mutation(() => ViewerEntity)
  async signInViewer(@Args("loginArgs") loginArgs: LoginInput) {
    return (
      await this.viewerService
        .PrismaViewer(this.prismaService.user, this.authService)
        .then(async data => ({
          signIn: await data
            .signInViewer(loginArgs.email, loginArgs.password)
            .then(viewerDetailed => viewerDetailed)
        }))
        .then(ops => ops)
    ).signIn;
  }
}
