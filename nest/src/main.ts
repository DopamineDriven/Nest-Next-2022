import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestApplicationOptions, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {
  CorsConfig,
  NestConfig,
  SwaggerConfig
} from "./common/config/config-interfaces.config";
import * as cookieParser from "cookie-parser";
import { PrismaService } from "./prisma/prisma.service";

import * as fs from 'fs';
import * as morgan from 'morgan';

const logStream = fs.createWriteStream('api.log', {
  flags: 'a', // append
});

type Options = NestApplicationOptions;

const options: Options = {
  bufferLogs: true,
  logger: ["debug", "error", "log", "warn", "verbose"],
  cors: {
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    maxAge: 0,
    origin: true,
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

  const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(HttpAdapterHost.prototype.httpAdapter());
  app.use(morgan('tiny', { stream: logStream }));
  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>("nest");
  const corsConfig = configService.get<CorsConfig>("cors");
  const swaggerConfig = configService.get<SwaggerConfig>("swagger");

  // 2022 Swagger Api
  if (swaggerConfig?.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || "Nestjs")
      .setDescription(swaggerConfig.description || "The nestjs API description")
      .setVersion(swaggerConfig.version || "1.0")
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path || "api", app, document);
  }
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app)
  await app.listen(process.env.PORT || nestConfig?.port || 3000);
  console.log(`[swagger]: ${await app.getUrl()}/api \n[graphql]: ${await app.getUrl()}/graphql`);
}

bootstrap();
