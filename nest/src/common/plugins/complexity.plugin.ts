import { GraphQLSchemaHost } from "@nestjs/graphql";
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
  BaseContext,
  GraphQLRequestContextDidResolveOperation
} from "apollo-server-plugin-base";
import { GraphQLError } from "graphql";
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator
} from "graphql-query-complexity";
import { Plugin } from "@nestjs/apollo";
@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin<BaseContext> {
  constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

  async requestDidStart<T extends BaseContext>(): Promise<
    GraphQLRequestListener<T>
  > {
    const maxComplexity = 25;
    const { schema } = this.gqlSchemaHost;

    return {
      async didResolveOperation<T extends BaseContext>({
        request,
        document
      }: GraphQLRequestContextDidResolveOperation<T>) {
        const complexity = getComplexity({
          schema: schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 })
          ]
        });
        if (complexity > maxComplexity) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}`
          );
        }
        console.log("[Query Complexity]:", complexity);
      }
    };
  }
}
