import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { Injectable, ShutdownSignal } from "@nestjs/common";
import { AbstractGraphQLDriver, GqlModuleOptions } from "@nestjs/graphql";
import { graphqlHTTP } from "express-graphql";
import { Context } from "src/app.module";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaService } from "src/prisma/prisma.service";
import { GraphQLSchema } from "graphql";

@Injectable()
export class ExpressGraphQLDriver extends AbstractGraphQLDriver {
  async start(options: GqlModuleOptions<any>): Promise<void> {
    options = await this.graphQlFactory.mergeWithSchema(options);
    const rootSchema = await loadSchema("src/schema.gql", {
      loaders: [new GraphQLFileLoader()],
      sort: true,
      inheritResolversFromInterfaces: true,
      experimentalFragmentVariables: true,
      commentDescriptions: true
    });

    const { httpAdapter } = this.httpAdapterHost;
    httpAdapter.use(
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
            res.setHeader("Accept", "application/json")

            return { ...ctx };
          } else {
            return { ...ctx };
          }
        },
        pretty: true,
        schema: rootSchema,
        graphiql: true
      })
    );
  }

  async stop() {
    return process.nextTick(() =>
      Promise.resolve({ exitCode: process.exitCode })
    );
  }
}
