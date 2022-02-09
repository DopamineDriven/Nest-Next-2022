import {
  Args,
  GqlContextType,
  GqlExecutionContext,
  PartialType,
  PickType
} from "@nestjs/graphql";
import {
  GraphQLUpload,
  FileUpload,
  graphqlUploadExpress,
  UploadOptions
} from "graphql-upload";
import { createWriteStream } from "fs";
import { ReadStream } from "fs-capacitor";
import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { JSONObjectResolver } from "graphql-scalars";
import { Context as LocalContext } from "../app.module";

@Injectable()
export class UploadService implements FileUpload, UploadOptions {
  public encoding: BufferEncoding;
  public maxFieldSize?: number | undefined;
  public maxFileSize?: number | undefined;
  public maxFiles?: number | undefined;
  public filename: string;
  public mimetype: string;
  public createReadStream: () => ReadStream;
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService
  ) {
    ({
      encoding: this.encoding,
      filename: this.filename,
      mimetype: this.mimetype,
      createReadStream: this.createReadStream
    });
  }

  async uploadFile({
    createReadStream = this.createReadStream,
    filename = this.filename
  }: FileUpload): Promise<typeof JSONObjectResolver> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on("finish", () => resolve(true))
        .on("error", () => reject(false))
    ).then(data => Object.create({ data: data }));
  }

  async graphqlExpressUploadFile(
    {
      createReadStream = this.createReadStream,
      filename = this.filename,
      encoding = this.encoding,
      mimetype = this.mimetype
    }: FileUpload,
    {
      maxFieldSize = this.maxFieldSize,
      maxFileSize = this.maxFileSize,
      maxFiles = this.maxFiles
    }: UploadOptions
  ) {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .read(maxFileSize)
        .pipe(
          createWriteStream(`./uploads/${filename}`, {
            encoding: this.encoding ?? undefined,
            fd: this.maxFieldSize ?? Number.MAX_SAFE_INTEGER
          })
        )
        .on("finish", () => resolve(true))
        .on("error", () => reject(false))
    ).then(data => Object.create({ data: data }));
  }
}
