import { Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { GqlExceptionFilter, GqlArgumentsHost, GraphQLExecutionContext, GqlExecutionContext } from "@nestjs/graphql";
import { User } from "src/user/model/user.model";

@Catch(HttpException)
export class AllExceptionsFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    return exception;
    // const userFromContext = GqlExecutionContext.create(ctx).getContext<{user: User}>().user;
  }
}
