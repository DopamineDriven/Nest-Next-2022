import { ConfigService } from "@nestjs/config";
import { ApolloDriverConfig } from "@nestjs/apollo";
import { Injectable } from "@nestjs/common";
import { GqlOptionsFactory } from "@nestjs/graphql";
import {
  ApolloConfig,
  GraphqlConfig
} from "./common/config/config-interfaces.config";
import { AuthService } from "./auth/auth-jwt.service";
import { Context } from "src/app.module";
import { AuthDetailed } from "./auth/model/auth-detailed.model";
import { AuthModule } from "./auth/auth-jwt.module";
import { PasswordModule } from "./auth/password.module";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "./user/user.module";
import { CategoryModule } from "./category/category.module";
import { ConnectionModule } from "./connection/connection.module";
import { CommentModule } from "./comment/comment.module";
import { EntryModule } from "./entry/entry.module";
import { MediaModule } from "./media/media.module";
import { NodeModule } from "./node/node.module";
import { PaginationModule } from "./pagination";
import { PrismaModule } from "./prisma";
import { ProfileModule } from "./profile/profile.module";
import { SessionModule } from "./session/session.module";

export type ParsedUrlQuery<
  T extends string,
  N extends NodeJS.Dict<T | T[keyof T]>
> = N[T];

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {}

  public base64Encode(
    str: WithImplicitCoercion<string | Uint8Array | readonly number[]>
  ) {
    return Buffer.from(str).toString("base64");
  }
  createGqlOptions(): ApolloDriverConfig {
    const graphqlConfig = this.configService.get<GraphqlConfig>("graphql");
    const apolloConfig = this.configService.get<ApolloConfig>("apollo");

    return {
      autoSchemaFile: graphqlConfig?.schemaDestination || "./src/schema.gql",
      sortSchema: graphqlConfig?.sortSchema ? graphqlConfig.sortSchema : true,
      installSubscriptionHandlers: true,
      apollo: {
        key: apolloConfig?.key ?? process.env.APOLLO_KEY ?? undefined
      },
      autoTransformHttpErrors: true,
      buildSchemaOptions: { dateScalarMode: "isoDate" },
      typeDefs: "./node_modules/.prisma/client/index.d.ts",
      definitions: {
        path: "src/graphql.schema.ts",
        outputAs: "class",
        emitTypenameField: true
      },
      playground: true,
      debug: true,
      introspection: true,
      cors: {
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        maxAge: 60,
        origin: true, // reflects dynamic origin -- Vary
        allowedHeaders: [
          "Access-Control-Allow-Methods",
          "Access-Control-Expose-Headers",
          "apollographql-client-name",
          "access-control-allow-headers",
          "Access-Control-Allow-Origin",
          "Origin",
          "X-Requested-With",
          "Content-Type",
          "Accept",
          "Apollo-Federation-Include-Trace",
          "Authorization",
          "Cache-Control",
          "Vary",
          "Content-Length",
          "Cookie",
          "Accept-Encoding",
          "Transfer-Encoding",
          "Connection",
          "Referrer",
          "Referrer-Policy",
          "X-Csrf-Token",
          "Woocommerce-Session",
          "Accept-Charset",
          "Forwarded",
          "Host",
          "From",
          "ETag",
          "Retry-After",
          "Server",
          "Set-Cookie",
          "Trailer",
          "User-Agent",
          "Upgrade",
          "X-XSS-Protection",
          "Upgrade-Insecure-Requests",
          "Session",
          "authorization"
        ],
        credentials: true,
        exposedHeaders: ["*", "authorization", "Authorization"],
        optionsSuccessStatus: 204,
        preflightContinue: false
      },
      fieldResolverEnhancers: ["guards"],
      context: async ({
        req,
        res,
        token = req.headers.authorization?.split(/([ ])/)[2] ?? null
      }: Context) => {
        try {
          if (token != null && token.length > 10) {
            const viewer = this.authService.getDecodedJwtComplete(token);

            res.setHeader(
              "X-Auth",
              `${this.base64Encode(
                viewer.payload.userId.concat(":").concat(token)
              ).trim()}`
            );

            res.setHeader("authorization", `Bearer ${token}`);
            return {
              req,
              res,
              token,
              viewerId: viewer.payload.userId,
              xAuth: `${viewer.payload.userId.concat(":").concat(token)}`.trim()
            };
          } else {
            return { req, res, token: null, viewerId: null };
          }
        } catch (error) {
          throw new Error(`error in gql-config.service.ts: ${error}`);
        }
      },
      include: [
        AuthModule,
        PasswordModule,
        JwtModule,
        UserModule,
        CategoryModule,
        ConnectionModule,
        CommentModule,
        EntryModule,
        MediaModule,
        NodeModule,
        PaginationModule,
        PrismaModule,
        ProfileModule,
        SessionModule
      ],
      bodyParserConfig: {}
    };
  }
}
