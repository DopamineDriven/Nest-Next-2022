import { ObjectType, InputType, Field } from "@nestjs/graphql";
import { User } from "src/user/model/user.model";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";

@ObjectType("Viewer")
export class Viewer extends User {
  constructor() {
    super();
  }
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
@InputType("GetViewer")
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
    getViewer( data: GetViewer): Promise<User | PrismaClientUnknownRequestError>;
  }
> {
  return Object.assign(prisma, {
    async getViewer(data: GetViewer) {
      const viewer = await authService.getUserFromToken(
        data.accessToken ? data.accessToken : ""
      );
      const findPrismaViewer = await prisma.findFirst({
        include: {_count: true},
        where: {
          OR: [
            { id: viewer?.id ? viewer.id : "" },
            {
              email: viewer?.email ? viewer.email : ""
            }
          ]
        }
      });
      const signupViewer = async () => ({

      });
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
