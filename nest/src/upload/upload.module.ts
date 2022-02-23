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
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

@Module({
  imports: [
    PrismaModule,
    MulterModule.registerAsync({
      useFactory: async ({ ...props }: MulterOptions) => {
        return {
          // fileFilter(req: GraphQLOperation['query'], file: Multer['single'], callback: (error: Error | null, acceptFile: boolean) => void)
          ...props
        };
      }
    })
  ],
  providers: [UploadResolver, UploadService],
  exports: [UploadService]
})
export class UploadModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
      .forRoutes("graphql");
  }
}
