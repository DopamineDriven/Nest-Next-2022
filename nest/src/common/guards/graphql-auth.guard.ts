import { User } from "../../user/model/user.model";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UnauthorizedException } from "@nestjs/common";
import { JsonWebTokenError } from "jsonwebtoken";
import { GraphQLError, GraphQLResolveInfo } from "graphql";

/**
 * Support AuthGuard
 * https://github.com/nestjs/graphql/issues/48
 */
@Injectable()
export class GraphqlAuthGuard extends AuthGuard("jwt") {
  getRequest(context: ExecutionContext) {
    const graphqlContext = GqlExecutionContext.create(context);
    return graphqlContext.getContext().req;
  }

  handleRequest<T extends User>(err: GraphQLError, info: GraphQLResolveInfo, user: T) {
    if (err) {
      throw err;
    }
    if (info && info instanceof Error) {
      if (info instanceof JsonWebTokenError) {
        info = info;
      }
      throw new UnauthorizedException(info);
    }

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}