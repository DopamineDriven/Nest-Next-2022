import { Module, CacheModule, CacheInterceptor, CACHE_MANAGER } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {
  ApolloConfig,
  GraphqlConfig
} from "./common/config/config-interfaces.config";
import config from "./common/config/config.config";
import { ExpressContext } from "apollo-server-express";
import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service";
import { AppResolver } from "./app/app.resolver";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { PrismaModule } from "./prisma/prisma.module";
import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { PasswordModule } from "./password/password.module";
import { AuthModule } from "./auth/auth-jwt.module";
import { UserModule } from "./user/user.module";
import { PaginationModule } from "./pagination/pagination.module";
import { EntryModule } from "./entry/entry.module";
import * as CacheManagerRedisStore from "cache-manager-redis-store";
import {
  ApolloServerPluginInlineTrace,
  ApolloServerPluginLandingPageLocalDefault
} from "apollo-server-core";
import { IResolvers } from "@graphql-tools/utils/Interfaces";
import * as Redis from "redis";
import { ProfileModule } from "./profile/profile.module";


export type Context = {
  req: ExpressContext["req"];
  res: ExpressContext["res"];
  token: string | null;
};
@Module({
  imports: [
    CacheModule.register<Redis.ClientOpts>({
      isGlobal: true,
      host: "localhost",
      port: 6379,
      store: CacheManagerRedisStore.create(),
      db: process.env.DATABASE_URL ?? ""
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
      envFilePath: "./env"
    }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const rootSchema = await loadSchema("./src/schema.gql", {
          loaders: [new GraphQLFileLoader()],
          sort: true,
          experimentalFragmentVariables: true,
          commentDescriptions: true
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
          autoSchemaFile: "./src/schema.gql", autoTransformHttpErrors: true,

          definitions: {
            path: "./src/graphql.schema.ts" || graphqlConfig?.schemaDestination,
            outputAs: "class",
            emitTypenameField: true
          },
          typeDefs: [
            join(process.cwd(), "/node_modules/.prisma/client/index.d.ts")
          ],
          introspection: true,
          // apollo: {
          //   key: apolloConfig?.key ? apolloConfig.key : ""
          // },
          schema: rootSchema,
          playground:
          {

            settings: {
              "general.betaUpdates": true,
              "tracing.hideTracingResponse": false,
              "schema.polling.interval": 5000
            }
          },
          // plugins: [
          //   (await import("apollo-server-plugin-operation-registry")).default({
          //     debug: true
          //   })
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
          context: ({
            req,
            res
          }: ExpressContext): any => {
            const token = req.header("authorization")?.split(" ")[1] ?? "";

            const ctx = {
              req,
              res,
              token: token
            };

            if (ctx.token != null && ctx.token.length > 0) {
              console.log(ctx.token ?? "no token")
              return { ...ctx };
            } else {
              return { req, res, token: null };
            }
          }
        };
      },
      inject: [ConfigService]
    }),
    PrismaModule,
    PasswordModule,
    AuthModule,
    UserModule,
    PaginationModule,
    EntryModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor
    // }
  ]
})
export class AppModule {}

/**
 import {
  CacheModuleOptions,
  CacheOptionsFactory,
  CACHE_MANAGER,
  CACHE_MODULE_OPTIONS,
  Inject,
  Injectable
} from "@nestjs/common";
import * as Redis from "redis";
import * as CacheManagerRedisStore from "cache-manager-redis-store";
import { Cache } from "cache-manager";

@Injectable()
export class CacheConfigService
  implements CacheOptionsFactory<Redis.ClientOpts>
{
  constructor(private cacheModule: Cache) {
    CACHE_MANAGER;
    CACHE_MODULE_OPTIONS;

  }
  createCacheOptions():
    | CacheModuleOptions<Redis.ClientOpts>
    | Promise<CacheModuleOptions<Redis.ClientOpts>> {
    return {isGlobal: true,
      ttl: 5,
      host: "localhost",
      port: 6379,
      store: CacheManagerRedisStore.create()
    };
  }
  get<T>(
    key: string,
    callback: (error: any, result: T | undefined) => void
  ): void;
  get<T>(key: string): Promise<T | undefined>;
  get<T>(key: any, callback?: any): void | Promise<T | undefined> {
    return this.cacheModule.get(key, callback);
  }
}import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const { httpAdapter } = this.httpAdapterHost;

    const isGetRequest = httpAdapter.getRequestMethod(request) === 'GET';
    // const excludePaths = [
    //   "/"
    // ];
    if (
      !isGetRequest
    // || (isGetRequest && excludePaths.includes(httpAdapter.getRequestUrl(request)))
    )
    {
      return undefined;
    }
    return httpAdapter.getRequestUrl(request);
  }
}


 * {
 *
          ...props
        }: GqlModuleOptions
      ): Promise<GqlModuleOptions
 * requestDidStart: (requestContext: GraphQLRequestContext<Context>) => ([requestContext.request.http?.headers.get("authorization")])})
GraphQLRequestContextExecutionDidStart<Context>
*/
