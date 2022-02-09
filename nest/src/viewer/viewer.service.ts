import {
  Resolver,
  ResolveField,
  Info,
  Context,
  GqlContextType,
  GqlExecutionContext
} from "@nestjs/graphql";
import { UserMeta } from "src/common/decorators/user.decorator";
import { Context as LocalContext } from "src/app.module";
import { User } from "src/user/model/user.model";
import { GetViewer, Viewer } from "./model/viewer-extends-prisma.model";
import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { AuthService } from "src/auth/auth-jwt.service";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";

@Injectable()
export class ViewerService {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(AuthService) private readonly authService: AuthService
  ) {}
  async PrismaViewer(
    prisma = this.prismaService["user"],
    authService = this.authService
  ): Promise<
    typeof prisma & {
      getViewer(
        data: GetViewer
      ): Promise<User | PrismaClientUnknownRequestError>;
    }
  > {
    return Object.assign(prisma, {
      async getViewer(data: GetViewer) {
        const viewer = await authService.getUserFromToken(
          data.accessToken ? data.accessToken : ""
        );
        const findPrismaViewer = await prisma.findFirst({
          include: { _count: true },
          where: {
            OR: [
              { id: viewer?.id ? viewer.id : "" },
              {
                email: viewer?.email ? viewer.email : ""
              }
            ]
          }
        });
        const signupViewer = async () => ({});
        if (!findPrismaViewer) {
          return new PrismaClientUnknownRequestError(
            `could not process ${findPrismaViewer}`,
            `could not get ${findPrismaViewer}`
          );
        }
        return findPrismaViewer;
      }
    });
  }
}
