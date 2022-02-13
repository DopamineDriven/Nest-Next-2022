import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import {
  forwardRef,
  Inject,
  Injectable,
  Scope,
  ShutdownSignal
} from "@nestjs/common";
import {
  AbstractGraphQLDriver,
  GqlModuleOptions,
  GraphQLFactory,
  MiddlewareContext
} from "@nestjs/graphql";
import {
  getGraphQLParams,
  GraphQLParams,
  Options,
  RequestInfo,
  OptionsData,
  graphqlHTTP
} from "express-graphql";
import { Context } from "src/app.module";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaService } from "src/prisma/prisma.service";
import { GraphQLSchema } from "graphql";
import { MiddlewareBuilder } from "@nestjs/core";

export class ExpressGraphQLDriver extends AbstractGraphQLDriver {
  async start(options: GqlModuleOptions<any>): Promise<void> {
    options = await this.graphQlFactory.mergeWithSchema(options);
    // @ts-ignore
    const rootSchema = await loadSchema("src/schema.gql", {
      loaders: [new GraphQLFileLoader()],
      sort: true,
      inheritResolversFromInterfaces: true,
      experimentalFragmentVariables: true,
      commentDescriptions: true,
    });
    this.httpAdapterHost.httpAdapter.all(
      "/graphql",
      graphqlHTTP({
        context: ({ req, res }: Context): any => {
          const token = req.header("authorization")?.split(" ")[1] ?? null;
          const ctx = {
            req,
            res,
            token: token as string | null
          };
          token != null && token.length > 0
            ? res.setHeader("authorization", `Bearer ${token}`)
            : console.log("no auth token to parse");
          if (ctx.token != null && ctx.token.length > 0) {
            res.setHeader("authorization", `Bearer ${token}`);
            res.setHeader("Accept", "application/json");

            return { ...ctx };
          } else {
            return { ...ctx };
          }
        },
        pretty: true,
        schema: rootSchema,
        graphiql: {
          headerEditorEnabled: true
        }
      })
    );
  }

  //@ts-ignore
  async stop();
}
