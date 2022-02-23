import {
  AbstractHttpAdapter,
  HttpAdapterHost,
  NestContainer,
  NestFactory
} from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppContext } from "src/gql-config.service";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NestApplicationOptions,
  UseGuards,
  ValidationPipe
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  ApiBearerAuth,
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule
} from "@nestjs/swagger";
import {
  NestConfig,
  RedisConfig,
  PostgresConfig,
  SecurityConfig,
  SwaggerConfig
} from "./common/config/config-interfaces.config";
import { json, urlencoded } from "body-parser";
import * as cookieParser from "cookie-parser";
import { loadSchema, loadSchemaSync } from "@graphql-tools/load";

import { PrismaService } from "./prisma/prisma.service";
import * as fs from "fs";
import * as morgan from "morgan";
import {
  Transport,
  MicroserviceOptions,
  CustomStrategy
} from "@nestjs/microservices";
import { PrismaModel } from "./.generated/prisma-class-generator";
import { AuthGuard } from "./common/guards/gql-context.guard";
import { graphqlUploadExpress } from "graphql-upload";
import multer from "multer";
import { Application } from "express";
import { ExpressAdapter } from "@nestjs/platform-express";
import * as bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { GraphQLModule } from "@nestjs/graphql";
// import { GqlExecutionContext } from "@nestjs/graphql";
// import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
// import { PipesContextCreator } from "@nestjs/core/pipes/pipes-context-creator";
// import { PrismaModule } from "./prisma";
// import { UserModule } from "./user/user.module";
// declare const module: any
// .gitignored logs output in root as api.log and error.log
const logStream = fs.createWriteStream("api.log", {
  flags: "a" // append
});
type Options = NestApplicationOptions;

const options: Options = {
  bodyParser: true,
  bufferLogs: true,
  logger: ["debug", "error", "log", "warn", "verbose"],
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
      "X-Auth",
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
  }
};

async function bootstrap() {
  const rootSchema = await loadSchema("src/schema.gql", {
    loaders: [new GraphQLFileLoader()],
    sort: true,
    inheritResolversFromInterfaces: true,
    experimentalFragmentVariables: true,
    commentDescriptions: true
  });

  const app = await NestFactory.create(AppModule, { ...options });
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000
    })
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.use(morgan("tiny", { stream: logStream }));
  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>("nest");
  const redisConfig = configService.get<RedisConfig>("redis");
  const postgresConfig = configService.get<PostgresConfig>("postgres");
  const securityConfig = configService.get<SecurityConfig>("security");
  const swaggerConfig = configService.get<SwaggerConfig>("swagger");
  const redisStrategy = configService.get<CustomStrategy>("customStrategy");
  app.use(cookieParser(`${securityConfig?.secret}`));
  if (swaggerConfig?.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || "Nestjs")
      .addBearerAuth()
      .setDescription(swaggerConfig.description || "The nestjs API description")
      .setVersion(swaggerConfig.version || "1.0")
      .build();

    const docOptions: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,

      extraModels: [
        PrismaModel.Account,
        PrismaModel.Category,
        PrismaModel.Comment,
        PrismaModel.Connection,
        PrismaModel.Entry,
        PrismaModel.Profile,
        PrismaModel.Session,
        PrismaModel.User,
        PrismaModel.VerificationToken
      ]
    };
    const document = SwaggerModule.createDocument(app, options, {
      ...docOptions
    });
    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true
      },
      customSiteTitle: "Nest Next 2022"
    };
    SwaggerModule.setup("api", app, document, customOptions);
  }
  const prismaService = app.get<PrismaService>(PrismaService);

  prismaService.enableShutdownHooks(app);
  await app
    .listen(process.env.PORT ?? nestConfig?.port ?? 3000)
    .then(async () => {
      console.log(
        `[GraphQL Playground]: ${await app.getUrl()}/graphql  \n [Swagger Api]: ${await app.getUrl()}/api`
      );
    });
}

bootstrap();

// const microServiceRedis = app.connectMicroservice<MicroserviceOptions>({
//   transport: Transport.REDIS,
//   options: {
//     retry_unfulfilled_commands: process.env.NODE_ENV !== "production" ? true : false,
//     connect_timeout: 10000,
//     max_attempts: 10,
//     password: redisConfig?.password
//       ? redisConfig.password
//       : process.env.REDIS_PASSWORD ?? "",
//     url: redisConfig?.url ? redisConfig.url : process.env.REDIS_URL ?? "",
//     host: redisConfig?.host ? redisConfig.host : "",
//     port: redisConfig?.port ? redisConfig.port : 6379
//   }
// });
// await app.startAllMicroservices();
// app.getHttpAdapter().use(ExpressGraphQLDriver.prototype.start);
