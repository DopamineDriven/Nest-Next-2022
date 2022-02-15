import { Module } from "@nestjs/common";
import {
  GraphQLModule,
  ReturnTypeFuncValue,
  GqlModuleAsyncOptions,
  GqlModuleOptions,
  GqlOptionsFactory
} from "@nestjs/graphql";
import { join } from "path";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {
  ApolloConfig,
  RedisConfig,
  GraphqlConfig
} from "./common/config/config-interfaces.config";
import config from "./common/config/config.config";
import { ExpressContext } from "apollo-server-express";
import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service";
import { AppResolver } from "./app/app.resolver";
import { APP_FILTER, ModulesContainer } from "@nestjs/core";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { PrismaModule } from "./prisma/prisma.module";
import { loadSchema, loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { PasswordModule } from "./password/password.module";
import { AuthModule } from "./auth/auth-jwt.module";
import { UserModule } from "./user/user.module";
import { PaginationModule } from "./pagination/pagination.module";
import { EntryModule } from "./entry/entry.module";
import { ProfileModule } from "./profile/profile.module";
import {
  RedisModuleOptions,
  RedisModule,
  RedisService
} from "@liaoliaots/nestjs-redis";
import { ThrottlerModule, ThrottlerModuleOptions } from "@nestjs/throttler";
import { ThrottlerStorageRedisService } from "nestjs-throttler-storage-redis";
import { RedisError } from "redis";
import { PrismaService } from "./prisma";
import { UserService } from "./user/user.service";
import { AuthService } from "./auth/auth-jwt.service";
import { UploadModule } from "./upload/upload.module";
import { MediaModule } from "./media/media.module";
import { graphqlUploadExpress, Upload } from "graphql-upload";
import { NodeModule } from "./node/node.module";
import {
  ApolloDriverAsyncConfig,
  ServerRegistration,
  getApolloServer,
  ApolloDriver,
  ApolloDriverConfig
} from "@nestjs/apollo";
import { PubSub, PubSubOptions, PubSubEngine } from "graphql-subscriptions";
import { ViewerModule } from "./viewer/viewer.module";
import { ApolloConfigInput, GraphQLExecutor } from "apollo-server-types";
import { ExpressGraphQLDriver } from "src/app/driver/express-graphql.driver";
import { CommentModule } from "./comment/comment.module";
import { GraphQLSchema } from "graphql";
export type RecordContiional<T> =
  | Record<keyof T, T>
  | Array<T>
  | PromiseLike<T>
  | T;

export type Context<T = unknown extends infer P ? P : unknown> = {
  req: ExpressContext["req"];
  res: ExpressContext["res"];
  token: string | null;
  extras?: T extends infer U ? U : T;
};

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async <T extends ConfigService>(
        configService: T
      ): Promise<RedisModuleOptions> => {
        const redisConfig = configService.get<RedisConfig>("redis");
        return {
          commonOptions: {
            password: redisConfig?.password
              ? redisConfig.password
              : process.env.REDIS_PASSWORD ?? "",
            retryStrategy: (
              times = redisConfig?.maxRetriesPerRequest
                ? redisConfig.maxRetriesPerRequest
                : 10
            ) => {
              return times;
            },
            connectTimeout: redisConfig?.connectTimeout
              ? redisConfig.connectTimeout
              : 10000
          },
          closeClient: true,
          readyLog: true,
          config: {
            lazyConnect: true,
            host: redisConfig?.host
              ? redisConfig.host
              : process.env.REDIS_HOST ?? "",
            port: redisConfig?.port
              ? redisConfig.port
              : process.env.REDIS_PORT
              ? Number.parseInt(process.env.REDIS_PORT, 10)
              : 6379,
            connectTimeout: redisConfig?.connectTimeout
              ? redisConfig.connectTimeout
              : 10000,
            password:
              (redisConfig?.password
                ? redisConfig.password
                : process.env.REDIS_PASSWORD) ?? "",
            url: redisConfig?.url
              ? redisConfig.url
              : process.env.REDIS_URL ?? "",
            namespace: redisConfig?.namespace
              ? redisConfig.namespace
              : process.env.REDIS_NAMESPACE ?? "",
            maxRetriesPerRequest: redisConfig?.maxRetriesPerRequest
              ? redisConfig.maxRetriesPerRequest
              : 10,
            autoResendUnfulfilledCommands: true,
            disconnectTimeout: redisConfig?.disconnectTimeout
              ? redisConfig.disconnectTimeout
              : 2000,
            username: undefined,
            async onClientCreated(client) {
              const redisPing = await client.ping(
                `${new Date(Date.now()).toISOString().split(/([T])/)[0]}`
              );
              console.log(
                "[redis-ping-check]: " + JSON.stringify(redisPing, null, 2)
              );
              client.on("error", error => {
                throw new RedisError(
                  `${error} -- onClientCreated RedisModule error`
                );
              });
            }
          }
        };
      },
      inject: [ConfigService]
    }),
    ThrottlerModule.forRootAsync({
      async useFactory<T extends RedisService>(
        redisService: T
      ): Promise<ThrottlerModuleOptions> {
        const redis = redisService.getClient("redis-nest");
        return {
          ttl: 60,
          limit: 10,
          storage: new ThrottlerStorageRedisService(redis)
        };
      },
      inject: [RedisService]
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
      envFilePath: "./.env"
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      apollo: { key: process.env.APOLLO_KEY ? process.env.APOLLO_KEY : "" },
      autoTransformHttpErrors: true,
      buildSchemaOptions: { dateScalarMode: "isoDate" },
      installSubscriptionHandlers: true,
      definitions: {
        path: "src/graphql.schema.ts",
        outputAs: "class",
        emitTypenameField: true
      },
      sortSchema: true,
      debug: true,
      introspection: true,
      autoSchemaFile: "src/schema.gql",
      cors: false,

      fieldResolverEnhancers: ["guards"],
      context: <T extends AuthService>({ req, res }: Context<T>): any => {
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

          return { ...ctx };
        } else {
          return { ...ctx };
        }
      }

      // useFactory: async (configService: ConfigService) => {
      //   const rootSchema = await loadSchema("./src/schema.gql", {
      //     loaders: [new GraphQLFileLoader()],
      //     sort: true,
      //     experimentalFragmentVariables: true,
      //     commentDescriptions: true
      //   });
      //   const graphqlConfig = configService.get<GraphqlConfig>("graphql");
      //   const apolloConfig = configService.get<ApolloConfig>("apollo");
      //   return {schema: rootSchema,
      //     // driver: ApolloDriver,
      //     fieldResolverEnhancers: ["guards"],
      //     installSubscriptionHandlers: true,
      //     cors: false,
      //     buildSchemaOptions: {
      //       dateScalarMode: "isoDate",
      //       numberScalarMode: "integer"
      //     },
      //     sortSchema: graphqlConfig?.sortSchema
      //       ? graphqlConfig.sortSchema
      //       : true,
      //     autoSchemaFile: "src/schema.gql",
      //     definitions: {
      //       path: "src/graphql.schema.ts" || graphqlConfig?.schemaDestination,
      //       outputAs: "class",
      //       emitTypenameField: true
      //     },
      //     typeDefs: [
      //       join(process.cwd(), "/node_modules/.prisma/client/index.d.ts")
      //     ],
      //     apollo: {
      //       key: apolloConfig?.key ? apolloConfig.key : ""
      //     },
      //     playground: {
      //       settings: {
      //         "general.betaUpdates": true,
      //         "tracing.hideTracingResponse": false,
      //         "schema.polling.interval": 5000
      //       }
      //     },
      //     debug: graphqlConfig?.debug
      //       ? graphqlConfig.debug
      //       : process.env.NODE_ENV !== "production"
      //       ? true
      //       : false,
      // },
    }),
    PrismaModule,
    PasswordModule,
    AuthModule,
    UserModule,
    PaginationModule,
    EntryModule,
    NodeModule,
    MediaModule,
    CommentModule,
    // UploadModule,
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
  ]
})
export class AppModule {}
// export class AppModule<
//   T extends Context<T[keyof T]>,
//   K extends Record<keyof K, K> extends infer U
//     ? Record<keyof K, U>
//     : Record<keyof K, unknown> extends Record<keyof K, infer T>
//     ? Record<keyof K, T>
//     : { [index: string | number | symbol]: unknown },
//   _implements = () => {
//     prisma: <K>(props: ReturnTypeFuncValue) => import("./prisma/prisma.service").PrismaService;
//   }
// > {
//   constructor(private readonly context: T) {
//     context = this.context;
//   }
// }
// const getUserFromToken = (token: string) => {
//   return Promise.resolve(
//     authService
//       .getUserFromToken(
//         token
//           ? token
//           : req.headers?.authorization?.split(/([ ])/)[1]
//           ? req.headers.authorization?.split(/([[ ]])/)[1]
//           : ""
//       )
//       .then(data => {
//         console.log(JSON.stringify(data ?? "no user", null, 2));
//         return { ...data };
//       })
//   );
// };
// console.log(token ? getUserFromToken(token) ?? "emptystring" : "no token")
