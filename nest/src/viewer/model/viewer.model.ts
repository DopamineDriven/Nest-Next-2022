import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { JwtDecoded } from "src/auth/dto";
import { Token } from "src/auth/model";
import { User } from "src/user/model/user.model";
import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType
} from "../../common/pagination/pagination";
import { Node } from "src/node/model/node.model";


@ObjectType("ViewerEntity")
export class ViewerEntity extends JwtDecoded {
  @Field(() => User, { nullable: true })
  user: User | null;

  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  accessToken: string | null;

  @Field(() => String, { nullable: true })
  refreshToken: string | null;

  @Field(() => String, { nullable: true })
  viewerSecret: string | null;
}
@ObjectType("Viewer")
export class Viewer extends User {
  @Field(_type => String, { nullable: true })
  accessToken: string | null;
}


@ObjectType("ViewerOutput")
export class ViewerOutput extends Viewer {
  @Field(_type => String, {
    nullable: true,
    defaultValue: null
  })
  error: string | null;
}
@InputType()
export class GetViewer {
  @Field(() => String, { nullable: true })
  accessToken: string | null;
}

export async function PrismaViewer<
  T extends import("../../prisma/prisma.service").PrismaService["user"],
  K extends import("../../auth/auth-jwt.service").AuthService
>(
  prisma: T,
  authService: K
): Promise<
  T & {
    getViewer(data: GetViewer): any
  }
> {
  return Object.assign(prisma, {
    async getViewer(data: GetViewer) {
      const viewer = await authService.getUserFromToken(
        data.accessToken ? data.accessToken : ""
      );
      const findPrismaViewer = await prisma.findFirst({
        include: {_count: true, mediaItems: true},
        where: {
          OR: [
            { id: viewer?.id ? viewer.id : "" },
            {
              email: viewer?.email ? viewer.email : ""
            }
          ]
        }
      });
      // if (!findPrismaViewer) {
      //   return new PrismaClientUnknownRequestError(
      //     `could not process ${findPrismaViewer}`,
      //     `could not get ${findPrismaViewer}`
      //   );
      // }
      return findPrismaViewer;
    }
  });
}
