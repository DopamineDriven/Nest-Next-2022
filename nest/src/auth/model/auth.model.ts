import { ObjectType, Field, InputType } from "@nestjs/graphql";
import { User } from "../../user/model/user.model";
import { Session } from "../../session/model";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";
import { InstanceOf } from "ts-morph";
import { Token } from ".";
@ObjectType("Auth")
export class Auth extends Token {
  constructor() {
    super();
  }
  @Field(() => User)
  user!: User;
  @Field(() => Session, { nullable: true })
  session: Session | null;
}

@ObjectType("AuthSansSession")
export class AuthSansSession extends Token {
  constructor() {
    super();
  }
  @Field(() => User, { nullable: true })
  user!: User | null;
}

@ObjectType("Viewer")
export class Viewer extends User {
  @Field(_type => String, { nullable: true })
  accessToken: string | null;
}

@ObjectType("ViewerDetailed")
export class ViewerDetailed extends Viewer {
  constructor() {
    super();
  }

  @Field(_type => String, { nullable: true })
  refreshToken?: string | null;

  @Field(_type => String, { nullable: true })
  secret!: string | null;
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
  K extends import("../auth-jwt.service").AuthService
>(
  prisma: T,
  authService: K
): Promise<
  T & {
    getViewer(data: GetViewer): any;
  }
> {
  return Object.assign(prisma, {
    async getViewer(data: GetViewer) {
      const viewer = await authService.getUserFromToken(
        data.accessToken ? data.accessToken : ""
      );
      const findPrismaViewer = await prisma.findFirst({
        include: { _count: true, mediaItems: true },
        where: {
          OR: [
            { id: viewer?.id ? viewer.id : "" },
            {
              email: viewer?.email ? viewer.email : ""
            }
          ]
        }
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
