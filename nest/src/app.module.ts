import { Module, CacheModule } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { ConfigModule, ConfigService } from "@nestjs/config";
import config from "./common/config/config.config";
import { ApolloConfig, GraphqlConfig } from "./common";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginInlineTrace
} from "apollo-server-core";
import { AppController, AppResolver, AppService } from "./app";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "./common";
import { PrismaModule } from "./prisma";
import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { ValidationContext } from "graphql";
// import { ValidationContext } from "graphql";

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
            outputAs: "class"
          },
          typeDefs: [
            join(process.cwd(), "/node_modules/.prisma/client/index.d.ts")
          ],
          playground: false,
          introspection: true,
          apollo: {
            key: apolloConfig?.key ? apolloConfig.key : ""
          },
          schema: rootSchema,
          validationRules: [
            (context: ValidationContext) => context.getSchema()
          ],
          plugins: [
            ApolloServerPluginLandingPageLocalDefault(),
            ApolloServerPluginInlineTrace()
          ],
          debug:
            process.env.NODE_ENV !== "production"
              ? graphqlConfig?.debug
                ? graphqlConfig.debug
                : true
              : false,
          context: (data:any) => {
            return {
              token: undefined as string | undefined,
              req: data.req
            };
          }
        };
      },
      inject: [ConfigService]
    }),
    PrismaModule
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
