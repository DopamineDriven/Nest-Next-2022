import { ConfigService } from "@nestjs/config";
import { ApolloDriverConfig } from "@nestjs/apollo";
import { Inject, Injectable } from "@nestjs/common";
import {
  GqlOptionsFactory,
  IntersectionType,
  InterfaceType,
  ObjectType
} from "@nestjs/graphql";
import {
  ApolloConfig,
  GraphqlConfig
} from "./common/config/config-interfaces.config";
import { AuthService } from "./auth/auth-jwt.service";
import { Context } from "src/app.module";
import { AuthDetailed } from "./auth/model/auth-detailed.model";
import { Auth } from "./auth/model/auth.model";
import { JwtDecoded } from "./auth/dto/jwt-decoded.dto";
import { JwtService } from "@nestjs/jwt";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginInlineTrace
} from "apollo-server-core";
import { join } from "path";
export type ParsedUrlQuery<
  T extends string,
  N extends NodeJS.Dict<T | T[keyof T]>
> = N[T];

// @InterfaceType("I", {
//   implements: () => IntersectionType(Auth, JwtDecoded, ObjectType)
// })
// export class ViewerContextIntersection {}

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(
    private configService: ConfigService,
    @Inject<typeof AuthService>(AuthService)
    private readonly authService: AuthService
  ) {}
  async userIdFromContext(accessToken: string) {
    return (
      (await this.authService.getUserWithDecodedToken(
        accessToken
      )) as AuthDetailed
    ).jwt.payload.userId;
  }
  createGqlOptions(): ApolloDriverConfig {
    const graphqlConfig = this.configService.get<GraphqlConfig>("graphql");
    const apolloConfig = this.configService.get<ApolloConfig>("apollo");

    return {
      // schema options
      autoSchemaFile: graphqlConfig?.schemaDestination || "./src/schema.gql",
      sortSchema: graphqlConfig?.sortSchema ? graphqlConfig.sortSchema : true,
      // subscription
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
        // additionalHeader: request.headers.authorization
        // customScalarTypeMapping: {} TODO
      },
      playground: true,
      debug: true,
      introspection: true,
      cors: false,
      // plugins: [
      //   ApolloServerPluginLandingPageLocalDefault(),
      //   ApolloServerPluginInlineTrace()
      // ],
      fieldResolverEnhancers: ["guards"],
      context: async ({
        req,
        res,
        token = req.headers.authorization?.split(/([ ])/)[2] ?? null
      }: Context): Promise<any> => {
        // const viewerContext = await this.authService.getUserWithDecodedToken(
        //   `${token}`
        // );
        // const { session, tokensAndJwt, user } = {
        //   user: viewerContext.auth.user,
        //   session: viewerContext.auth.session,
        //   tokensAndJwt: {
        //     jwt: viewerContext.jwt,
        //     accessToken: viewerContext.auth.accessToken,
        //     refreshToken: viewerContext.auth.refreshToken
        //   }
        // };
        const viewerId = await this.userIdFromContext(token ?? "");
        const ctx = {
          req,
          res,
          token: token as string | null,
          viewerId: viewerId as string | null
          // viewer: viewerContext as AuthDetailed
        };
        // token != null && token.length > 0
        //   ? userId != null
        //     ? console.log("token : " + token + "\r viewerId: " + userId)
        //     : console.log("token: " + token + "userId: no userId")
        //   : console.log("no userId or token to parse");
        if (token != null && token.substring(0).length > 10) {
          res.set({
            authorization: `Bearer ${token}`,
            "X-Viewer-Id": viewerId
          });
          return {req, res, token, viewerId };
        } else {
          return { req, res, token: null, viewerId: null };
        }
      }
    };
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
