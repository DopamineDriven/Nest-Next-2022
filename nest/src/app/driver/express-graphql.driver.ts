import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { AbstractGraphQLDriver, GqlModuleOptions } from "@nestjs/graphql";
import { getPrismaClient } from "@prisma/client/runtime";
import { AppContext } from "src/gql-config.service";
import {
  GraphQLParams,
  Options,
  OptionsData,
  RequestInfo,
  getGraphQLParams,
  graphqlHTTP
} from "express-graphql";
import { RequestHandler } from "express-serve-static-core";
import { PrismaService } from "src/prisma";
import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from "http";
import { __TypeKind } from "graphql";

export interface ExpressGraphQLRequest extends IncomingMessage {
  url: string;
  headers: IncomingHttpHeaders;
}

export interface ExpressGraphQLResponse extends ServerResponse {
  json?: (data: any) => void;
}

export interface ExpressGraphQLCtx {
  request: Request;
  response: ExpressGraphQLResponse;
  token: string;
  userId: string;
  params?: GraphQLParams;
}

export class ExpressGraphQLDriver extends AbstractGraphQLDriver {
  constructor() {
    super();
  }
  async start(options: GqlModuleOptions<ExpressGraphQLDriver>): Promise<void> {
    options = await this.graphQlFactory.mergeWithSchema(options);
    //     // @ts-ignore
    const rootSchema = await loadSchema("src/schema.gql", {
      loaders: [new GraphQLFileLoader()],
      sort: true,
      inheritResolversFromInterfaces: true,
      experimentalFragmentVariables: true,
      commentDescriptions: true
    });
    const { httpAdapter } = this.httpAdapterHost;
    const optionsData: OptionsData = {
      context: async (
        request: ExpressGraphQLRequest,
        response: ExpressGraphQLResponse,
        params?: GraphQLParams
      ): Promise<{
        request: ExpressGraphQLRequest;
        response: ExpressGraphQLResponse;
        params: GraphQLParams | undefined;
        token: string | null;
      }> => {
        const token = request.headers.authorization?.split(/([ ])/)[2] ?? null;
        const ctx = {
          request,
          response,
          params,
          token: token as string | null
        };

        token != null && token.length > 0
          ? response.setHeader("authorization", `Bearer ${token}`)
          : console.log("no auth token to parse");
        if (ctx.token != null && ctx.token.length > 0) {
          response.setHeader("authorization", `Bearer ${token}`);

          return { ...ctx };
        } else {
          return { ...ctx };
        }
      },
      pretty: true,
      schema: options?.schema ? options.schema : rootSchema,
      graphiql: {
        headerEditorEnabled: true
      }
    };

    //   token != null && token.length > 0
    //     ? response.headers.set("authorization", `Bearer ${token}`)
    //     : console.log("no auth token to parse");
    //   if (ctx.token != null && ctx.token.length > 0) {
    //     response.headers.set("authorization", `Bearer ${token}`);
    //     return { ...ctx };
    //   } else {
    //     return { ...ctx };
    //   }
    // },
    httpAdapter.use("/graphql", graphqlHTTP(optionsData));
  }

  async stop() {
    Promise.resolve({});
  }
}
