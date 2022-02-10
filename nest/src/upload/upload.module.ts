import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { PrismaModule } from "src/prisma";
import { UploadResolver } from "./upload.resolver";
import {
  graphqlUploadExpress,
  UploadOptions,
  FileUpload,
  GraphQLOperation,
  Upload,
  processRequest
} from "graphql-upload";
import { UploadService } from "./upload.service";
import { MulterModule } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { ApolloConfig, GraphqlConfig } from "src/common";
import multer, { Multer } from "multer";

@Module({
  imports: [PrismaModule],
  //MulterModule.registerAsync({
  //     useFactory: async <T extends GraphQLOperation>(configService: ConfigService) => {
  //       const multerService = configService.get<GraphqlConfig>("graphql");
  //       return ({
  //       fileFilter(req: T['query'], file: Multer['single'], callback: (error: Error | null, acceptFile: boolean) => void) {}, ))

  //       })
  // } })],
  providers: [UploadResolver, UploadService]
})
export class UploadModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
      .forRoutes("graphql");
  }
}
