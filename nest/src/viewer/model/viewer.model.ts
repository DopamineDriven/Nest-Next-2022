import {
  Field,
  ID,
  InputType,
  InterfaceType,
  ObjectType,
  ReturnTypeFuncValue
} from "@nestjs/graphql";
import { JwtDecoded } from "src/auth/dto";
import { Token, ViewerDetailed } from "src/auth/model";
import { User } from "src/user/model/user.model";
import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType
} from "../../common/pagination/pagination";
import { Node } from "src/node/model/node.model";
import { AuthDetailed } from "src/auth/model/auth-detailed.model";
import { Constructor } from "src/common/types/helpers.type";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../../auth/auth-jwt.service";
import { PrismaService } from "../../prisma/prisma.service";
import {
  EmailAddressResolver,
  EmailAddressTypeDefinition,
  GraphQLEmailAddress,
  GraphQLJSONObject
} from "graphql-scalars";
import { Role } from "src/.generated/prisma-nestjs-graphql/prisma/enums/role.enum";
import { UserStatus } from "src/.generated/prisma-nestjs-graphql/prisma/enums/user-status.enum";
import { GraphQLEmailAddressConfig } from "graphql-scalars/scalars/EmailAddress";
import { EmailAddress } from "graphql-scalars/typeDefs";
type Nullable<T> = T | null;
@ObjectType("ViewerEntity", { implements: () => Node })
export class ViewerEntity extends AuthDetailed implements Node {
  constructor() {
    super();
  }
  @Field(() => ID, { nullable: false })
  id!: string;
}
@ObjectType("Viewer")
export class Viewer implements User {
  @Field(() => Date, { defaultValue: new Date(Date.now()) })
  createdAt: Date;

  @Field(() => EmailAddressResolver)
  email: typeof EmailAddress;

  @Field(() => Date, { nullable: true })
  emailVerified: Date | null;

  @Field(() => String, { nullable: true })
  firstName: string | null;

  @Field(() => String)
  image: string;

  @Field(() => String, { nullable: true })
  lastName: string | null;

  @Field(() => Role, { defaultValue: Role.USER })
  role: keyof typeof Role;

  @Field(() => UserStatus, { nullable: true })
  status: Nullable<keyof typeof UserStatus>;

  @Field(() => Date, { nullable: true })
  updatedAt: Date | null;

  @Field(() => String)
  password: string;

  @Field(() => ID)
  id: string;

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

export function PrismaViewers<
  T extends import("../../prisma/prisma.service").PrismaService["user"],
  K extends import("../../auth/auth-jwt.service").AuthService,
  W extends ReturnTypeFuncValue,
  H extends Constructor
>(prisma: T, authService: K, viewerType: W): (target: H) => Constructor {
  return (target: H): Constructor => {
    @ObjectType(target.name)
    class ViewersScoped {
      @Field(() => [viewerType])
      viewers: H[];
    }

    @InterfaceType(target.name, {
      implements: () => {
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
    })
    class AuthViewers extends ViewersScoped {
      constructor() {
        super();
      }
      async resolveViewers() {
        return super.viewers;
      }
    }
    return AuthViewers;
  };
}

@PrismaViewers(
  PrismaService.prototype.user,
  AuthService.prototype,
  ViewerDetailed
)
export class ViewersDetailed extends ViewerDetailed {
  constructor() {
    super();
  }
}
/**



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
  refreshToken!: string | null;

  @Field(_type => String, { nullable: true })
  secret!: string | null
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
 */
