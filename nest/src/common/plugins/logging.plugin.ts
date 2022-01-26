import { Plugin } from "@nestjs/graphql";
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestContextWillSendResponse,
  GraphQLRequestListener
} from "apollo-server-plugin-base";

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin<BaseContext> {
  async requestDidStart<T extends BaseContext>(): Promise<
    GraphQLRequestListener<T>
  > {
    console.log("Request started");
    return {
      async willSendResponse<T extends BaseContext>(
        requestContext: GraphQLRequestContextWillSendResponse<T>
      ) {
        return console.log("Will send response " + { ...requestContext });
      }
    };
  }
}
