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
  UploadOptions,
  processRequest,
  Upload,
  GraphQLOperation
} from "graphql-upload";
import { createWriteStream } from "fs";
import { ReadStream } from "fs-capacitor";
import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import {
  GraphQLJSON,
  JSONObjectResolver,
  GraphQLJSONObject
} from "graphql-scalars";
import { AppContext } from "src/gql-config.service";
import { Multer } from "multer";
@Injectable()
export class UploadService
  implements GraphQLOperation, FileUpload, UploadOptions
{
  operationName?: string | null | undefined;
  query: string;
  variables?: unknown;
  public encoding: BufferEncoding;
  public maxFieldSize?: number | undefined;
  public maxFileSize?: number | undefined;
  public maxFiles?: number | undefined;
  public filename: string;
  public mimetype: string;
  public createReadStream: () => ReadStream;
  constructor(
    private readonly multerService: Multer
  ) {
    ({
      /** TODO Mimic GqlConfig flow 
       * export interface MulterOptionsFactory {
    createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions;
}
       */
      // Upload(upload: ReturnType<typeof Upload>)=> (processRequest(this.createReadStream(upload()).setEncoding("base64").emit("data")),
      encoding: this.encoding,
      filename: this.filename,
      mimetype: this.mimetype,
      createReadStream: this.createReadStream
    });
  }

  readFileEventWithCb = (
    img: File | Blob,
    callback: (imageBase64Value: string) => void
  ) => {
    const reader = new FileReader();

    reader.readAsDataURL(img);

    reader.onload = e => {
      console.log(
        JSON.stringify(
          {
            total: e.total,
            target: e.target,
            loaded: e.loaded
          },
          null,
          2
        )
      );
      callback(reader.result as string);
    };
  };

  async uploadFile({
    createReadStream = this.createReadStream,
    filename = this.filename
  }: FileUpload): Promise<typeof GraphQLJSONObject> {
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
