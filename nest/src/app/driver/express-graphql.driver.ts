// import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
// import { loadSchema } from "@graphql-tools/load";
// import {
//   forwardRef,
//   Inject,
//   Injectable,
//   Scope,
//   ShutdownSignal
// } from "@nestjs/common";
// import {
//   AbstractGraphQLDriver,
//   GqlModuleOptions,
//   GraphQLFactory,
//   MiddlewareContext
// } from "@nestjs/graphql";
// import {
//   getGraphQLParams,
//   GraphQLParams,
//   Options,
//   RequestInfo,
//   OptionsData,
//   graphqlHTTP
// } from "express-graphql";
// import { Context } from "src/app.module";
// import { makeExecutableSchema } from "@graphql-tools/schema";
// import { PrismaService } from "src/prisma/prisma.service";
// import { GraphQLSchema } from "graphql";
// import { MiddlewareBuilder } from "@nestjs/core";

// export class ExpressGraphQLDriver extends AbstractGraphQLDriver {
//   async start(options: GqlModuleOptions<any>): Promise<void> {
//     options = await this.graphQlFactory.mergeWithSchema(options);
//     // @ts-ignore
//     const rootSchema = await loadSchema("src/schema.gql", {
//       loaders: [new GraphQLFileLoader()],
//       sort: true,
//       inheritResolversFromInterfaces: true,
//       experimentalFragmentVariables: true,
//       commentDescriptions: true,
//     });
//     this.httpAdapterHost.httpAdapter.all(
//       "/graphql",
//       graphqlHTTP({
//         context: ({ req, res }: Context): any => {
//           const token = req.header("authorization")?.split(" ")[1] ?? null;
//           const ctx = {
//             req,
//             res,
//             token: token as string | null
//           };
//           token != null && token.length > 0
//             ? res.setHeader("authorization", `Bearer ${token}`)
//             : console.log("no auth token to parse");
//           if (ctx.token != null && ctx.token.length > 0) {
//             res.setHeader("authorization", `Bearer ${token}`);
//             res.setHeader("Accept", "application/json");

//             return { ...ctx };
//           } else {
//             return { ...ctx };
//           }
//         },
//         pretty: true,
//         schema: rootSchema,
//         graphiql: {
//           headerEditorEnabled: true
//         }
//       })
//     );
//   }

//   //@ts-ignore
//   async stop();
// }

/**
 * declare type Request = IncomingMessage & {
    url: string;
};
declare type Response = ServerResponse & {
    json?: (data: unknown) => void;
};
 */
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { AbstractGraphQLDriver, GqlModuleOptions } from "@nestjs/graphql";
import { getPrismaClient } from "@prisma/client/runtime";
import { Context } from "src/app.module";
import {
  GraphQLParams,
  Options,
  OptionsData,
  RequestInfo,
  getGraphQLParams,
  graphqlHTTP
} from "express-graphql";
import { PrismaService } from "src/prisma";
import { IncomingMessage, ServerResponse } from "http";

export interface ExpressGraphQLRequest extends IncomingMessage {
  url: string;
}

export interface ExpressGraphQLResponse extends ServerResponse {
  json?: (data: unknown extends infer U ? U : unknown) => void;
}

export class ExpressGraphQLDriver<
  T extends PrismaService
> extends AbstractGraphQLDriver {
  async start(options: GqlModuleOptions<any>): Promise<void> {
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
      context:  async (request: Request, response: Response, prismaService: T, params?: GraphQLParams) => {
        const token = request.headers.get("authorization")?.split(/([ ])/)[1] ?? null;
        const ctx = {
          prismaService,
          request,
          response,
          params,
          token: token as string | null
        };


        token != null && token.length > 0
          ? response.headers.set("authorization", `Bearer ${token}`)
          : console.log("no auth token to parse");
        if (ctx.token != null && ctx.token.length > 0) {
          response.headers.set("authorization", `Bearer ${token}`);
          return { ...ctx };
        } else {
          return { ...ctx };
        }
      },
      
      graphiql: {
        headerEditorEnabled: true
      },
      schema: options?.schema ? options.schema : rootSchema,
    }
    httpAdapter.use(
      "/graphql",
      graphqlHTTP({
        context: async (request: Request, response: Response, params?: GraphQLParams)  =>  async ({ req, res }: Context, prismaService: T) => {
          const token = req.header("authorization")?.split(" ")[1] ?? null;
          const ctx = {
            prismaService,
            req,
            res,
            token: token as string | null
          };

          token != null && token.length > 0
            ? res.setHeader("authorization", `Bearer ${token}`)
            : console.log("no auth token to parse");
          if (ctx.token != null && ctx.token.length > 0) {
            res.setHeader("authorization", `Bearer ${token}`);

            return { ...ctx };
          } else {
            return { ...ctx };
          }
        },
        pretty: true,

        schema: options?.schema ? options.schema : rootSchema,
        graphiql: true
      })
    );
  }

  async stop() {
    Promise.resolve({});
  }
}
