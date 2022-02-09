import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma";
import { UploadResolver } from "./upload.resolver";

@Module({ imports: [PrismaModule], providers: [UploadResolver] })
export class UploadModule {}
