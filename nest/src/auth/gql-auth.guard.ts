import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";

/**
 * Support AuthGuard
 * https://github.com/nestjs/graphql/issues/48
 */
@Injectable()
export class GraphqlAuthGuard extends AuthGuard("jwt") {
  getRequest(context: ExecutionContext) {
    const graphqlContext = GqlExecutionContext.create(context);
    return graphqlContext.getContext().req
  }
}
