import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisConfig } from "./common/config/config-interfaces.config";
import config from "./common/config/config.config";
import { ExpressContext } from "apollo-server-express";
import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service";
import { AppResolver } from "./app/app.resolver";
import { PrismaModule } from "./prisma/prisma.module";
import { PasswordModule } from "./auth/password.module";
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
import { MediaModule } from "./media/media.module";
import { NodeModule } from "./node/node.module";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { CommentModule } from "./comment/comment.module";
import { GqlConfigService } from "./gql-config.service";
import { SessionModule } from "./session/session.module";
import { CategoryModule } from "./category/category.module";
import { ConnectionModule } from "./connection/connection.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

export type Context = {
  req: ExpressContext["req"];
  res: ExpressContext["res"];
  token: string | null;
  viewerId: string | null;
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
                `[date]: ${
                  new Date(Date.now()).toISOString().split(/([T])/)[0]
                } [time]: ${
                  new Date(Date.now())
                    .toISOString()
                    .split(/([T])/)[2]
                    .split(/([Z])/)[0]
                } UTC`
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
      expandVariables: true,
      cache: true,
      load: [config],
      envFilePath: "./.env"
    }),
    PrismaModule,
    AuthModule,
    PasswordModule,
    UserModule,
    PaginationModule,
    EntryModule,
    NodeModule,
    MediaModule,
    CommentModule,
    SessionModule,
    CategoryModule,
    ConnectionModule,
    ProfileModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
      imports: [AuthModule, ConfigModule],
      inject: [ConfigService]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "docs", "prisma-docs-generated")
    })
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver]
})
export class AppModule {}
