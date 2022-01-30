import { Module, CacheModule } from "@nestjs/common";
import { GraphQLExecutionContext, GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { ConfigModule, ConfigService } from "@nestjs/config";
import config from "./common/config/config.config";
import {
  ApolloConfig,
  GraphqlConfig
} from "./common/config/config-interfaces.config";
import { ExpressContext } from "apollo-server-express";
import {
  Context as ApolloContext,
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageGraphQLPlaygroundOptions,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginInlineTrace
} from "apollo-server-core";
import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service";
import { AppResolver } from "./app/app.resolver";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { PrismaModule } from "./prisma/prisma.module";
import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { PasswordModule } from "./password/password.module";
import { AuthJwtModule } from "./auth/auth-jwt.module";
import { UserModule } from "./user/user.module";
import { PaginationModule } from "./pagination/pagination.module";
import { PrismaService } from "./prisma/prisma.service";
import { GraphQLResolveInfo, lexicographicSortSchema } from "graphql";
import { User } from "./user/model/user.model";
import { EntryModule } from "./entry/entry.module";

export type Context = {
  req?: ExpressContext["req"];
  token: string | null;
  res?: ExpressContext["res"];
};
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: "./env"
    }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const rootSchema = await loadSchema("./src/schema.gql", {
          loaders: [new GraphQLFileLoader()]
        });
        const graphqlConfig = configService.get<GraphqlConfig>("graphql");
        const apolloConfig = configService.get<ApolloConfig>("apollo");
        return {
          installSubscriptionHandlers: true,
          cors: false,
          nodeEnv: process.env.NODE_ENV,
          buildSchemaOptions: {
            dateScalarMode: "isoDate",
            numberScalarMode: "integer"
          },
          sortSchema: graphqlConfig?.sortSchema
            ? graphqlConfig.sortSchema
            : true,
          autoSchemaFile: "./src/schema.gql",
          definitions: {
            path: "./src/graphql.schema.ts" || graphqlConfig?.schemaDestination,
            outputAs: "class",
            emitTypenameField: true
          },
          typeDefs: [
            join(process.cwd(), "/node_modules/.prisma/client/index.d.ts")
          ],
          introspection: true,
          apollo: {
            key: apolloConfig?.key ? apolloConfig.key : ""
          },
          schema: rootSchema,
          playground: {              env: ".env",
          settings: {
            "general.betaUpdates": true,
            "tracing.hideTracingResponse": false,
            "request.credentials": "include",
            "schema.polling.interval": 5000
          }},
          // validationRules: [
          //   (context: ValidationContext) => [context.getSchema()]
          // ],
          // plugins: [
          //   ApolloServerPluginLandingPageLocalDefault(),
          //   ApolloServerPluginInlineTrace()
          // ],
          debug: graphqlConfig?.debug
          ? graphqlConfig.debug
          : process.env.NODE_ENV !== "production"
          ? true
          : false,
          context: ({ req, res }: ExpressContext): any => {
            const token = req.headers.authorization;
            if (token != undefined) {
              console.log(token ?? "still no token");
              return { token: token, req, res };
            } else {
              return {
                req,
                res
              };
            }
          }
        };
      },
      inject: [ConfigService]
    }),
    PrismaModule,
    PasswordModule,
    AuthJwtModule,
    UserModule,
    EntryModule,
    PaginationModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule {}
