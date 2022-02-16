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

      definitions: {
        path: "src/graphql.schema.ts",
        outputAs: "class",
        emitTypenameField: true
        // additionalHeader: request.headers.authorization
        // customScalarTypeMapping: {} TODO
      },
      debug: true,
      introspection: true,
      cors: false,

      fieldResolverEnhancers: ["guards"],
      context: async ({ req, res }: Context) => {
        const token = req.header("authorization")?.split(/([ ])/)[1] ?? null;
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
        // const ViewerWithToken = {
        //   viewerIdAndTokens: {
        //     hashedPwForCronAccessTokenFactory: user.password,
        //     viewerEmail: user.email,
        //     viewerId: tokensAndJwt.jwt.payload.userId,
        //     accessToken: tokensAndJwt.accessToken,
        //     refreshToken: tokensAndJwt.refreshToken,
        //     signature: tokensAndJwt.jwt.signature
        //   }
        // };
        const ctx = {
          req,
          res,
          token: token as string | null
          // viewer: viewerContext as AuthDetailed
        };
        token !== null && token.length > 0
          ? res.setHeader("authorization", `Bearer ${token}`)
          : console.log("no auth token to parse");
        if (ctx.token !== null && ctx.token.length > 0) {
          res.setHeader("authorization", `Bearer ${token}`);
          return ctx;
        } else {
          return ctx;
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
