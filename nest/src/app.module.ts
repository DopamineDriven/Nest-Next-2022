import {
  Module,
  CacheModule,
  CacheInterceptor,
  CACHE_MANAGER
} from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {
  ApolloConfig,
  RedisConfig,
  GraphqlConfig,
  PostgresConfig
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
import {
  ApolloServerPluginInlineTrace,
  ApolloServerPluginLandingPageLocalDefault
} from "apollo-server-core";
import { ProfileModule } from "./profile/profile.module";
import { RedisModuleOptions, RedisModule, RedisService } from "@liaoliaots/nestjs-redis";
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
export type Context = {
  req: ExpressContext["req"];
  res: ExpressContext["res"];
  token: string | null;
};
@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService
      ): Promise<RedisModuleOptions> => {
        const redisConfig = configService.get<RedisConfig>("redis");
        return {
          commonOptions: {password: "Dillard20!8!",
            retryStrategy: (times = 10) => { return times },
            connectTimeout: 10000
            // password: redisConfig?.password ? redisConfig.password : process.env.REDIS_PASSWORD ?? ""
        },
          closeClient: true,
          readyLog: true,
          config: {lazyConnect: true,
          host: redisConfig?.host ? redisConfig.host : "",
          port: redisConfig?.port ? redisConfig.port : 6379,
          connectTimeout: 10000,
          password: "Dillard20!8!" ?? (redisConfig?.password
            ? redisConfig.password
            : process.env.REDIS_PASSWORD) ?? "",
          url: redisConfig?.url ? redisConfig.url : process.env.REDIS_URL ?? "",
            namespace: "redis-nest",
            maxRetriesPerRequest: 10,
            autoResendUnfulfilledCommands: true,
            disconnectTimeout: 10000,
            username: undefined,
            onClientCreated(client) {
              console.log(
                "[redis-ping-check]: " + client.ping().valueOf()
              );
              client.on("error", err => {
                throw new Error(`${err} -- onClientCreated RedisModule error`)
                  .message;
              });
            }
          }
        }
      },
      inject: [ConfigService]
    }),        ThrottlerModule.forRootAsync({
      useFactory(redisService: RedisService) {
          const redis = redisService.getClient('redis-nest');
          return { ttl: 60, limit: 10, storage: new ThrottlerStorageRedisService(redis) };
      },
      inject: [RedisService]
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
          autoSchemaFile: "./src/schema.gql",
          autoTransformHttpErrors: true,

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
          playground: {
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
          context: ({ req, res }: ExpressContext): any => {
            const token = req.header("authorization")?.split(" ")[1] ?? "";

            const ctx = {
              req,
              res,
              token: token
            };

            if (ctx.token != null && ctx.token.length > 0) {
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
