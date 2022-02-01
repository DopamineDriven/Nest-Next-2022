import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule, Context } from "./app.module";
import { NestApplicationOptions, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {
  NestConfig,
  RedisConfig,
  PostgresConfig,
  SwaggerConfig
} from "./common/config/config-interfaces.config";
import * as cookieParser from "cookie-parser";
import { PrismaService } from "./prisma/prisma.service";
import * as fs from "fs";
import * as morgan from "morgan";
import {
  Transport,
  MicroserviceOptions,
  CustomStrategy
} from "@nestjs/microservices";

// .gitignored logs output in root as api.log and error.log
const logStream = fs.createWriteStream("api.log", {
  flags: "a" // append
});

type Options = NestApplicationOptions;

const options: Options = {
  bufferLogs: true,
  logger: ["debug", "error", "log", "warn", "verbose"],
  cors: {
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    maxAge: 0,
    origin: true, // reflects dynamic origin -- vary
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
  }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { ...options });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(cookieParser());

  const httpAdapter = app.get(HttpAdapterHost);
  app.getHttpAdapter();
  app.use(morgan("tiny", { stream: logStream }));
  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>("nest");
  const redisConfig = configService.get<RedisConfig>("redis");
  const postgresConfig = configService.get<PostgresConfig>("postgres");
  const swaggerConfig = configService.get<SwaggerConfig>("swagger");
  const redisStrategy = configService.get<CustomStrategy>("customStrategy");
  if (swaggerConfig?.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || "Nestjs")
      .setDescription(swaggerConfig.description || "The nestjs API description")
      .setVersion(swaggerConfig.version || "1.0")
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path || "api", app, document);
  }
  const prismaService: PrismaService = app.get<PrismaService>(PrismaService);

  const microServiceRedis = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      retry_unfulfilled_commands: process.env.NODE_ENV !== "production" ? true : false,
      connect_timeout: 10000,
      max_attempts: 10,
      password: redisConfig?.password
        ? redisConfig.password
        : process.env.PWD ?? "",
      url: redisConfig?.url ? redisConfig.url : process.env.REDIS_URL ?? "",
      host: redisConfig?.host ? redisConfig.host : "",
      port: redisConfig?.port ? redisConfig.port : 6379
    }
  });
  await app.startAllMicroservices();
  prismaService.enableShutdownHooks(app);
  await app
    .listen(process.env.PORT ?? nestConfig?.port ?? 3000)
    .then(async () => {
      return console.log(
        `[GraphQL Playground]: ${await app.getUrl()}/graphql  \n[Swagger Api]: ${await app.getUrl()}/api`
      );
    });
}

bootstrap();
