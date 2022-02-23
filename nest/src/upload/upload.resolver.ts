import { Resolver, Args, Mutation } from "@nestjs/graphql";
import {
  GraphQLUpload,
  FileUpload,
  processRequest,
  graphqlUploadExpress
} from "graphql-upload";
import { createWriteStream, read } from "fs";
import { ReadStream } from "fs-capacitor";
import { Inject, UploadedFile, Type } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { JSONObjectResolver } from "graphql-scalars";
import multer from "multer";
import { ReturnTypedNode } from "ts-morph";
import { UploadService } from "./upload.service";
import { processGraphQLRequest } from "apollo-server-core/dist/requestPipeline";
import { request, response } from "express";
import { resolve } from "path/posix";

interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
  readonly webkitRelativePath: string;
}

@Resolver()
export class UploadResolver implements FileUpload {
  public encoding: BufferEncoding;
  public filename: string;
  public mimetype: string;
  public createReadStream: () => ReadStream;
  constructor(
    @Inject(UploadService) private readonly uploadService: UploadService
  ) {
    ({
      encoding: this.encoding,
      filename: this.filename,
      mimetype: this.mimetype,
      createReadStream: this.createReadStream,
      callback: (imageBase64Value: string) => void { imageBase64Value }
    });
  }
  @Mutation(() => FileList["prototype"])
  async uploadFile(
    @Args({ name: "name", type: (): typeof File => File })
    { ...props }: File,
    @Args({ name: "callback" }) callback: (imageBase64Value: string) => void
  ) {
    const fileReader = new FileReader();
    
    return new Promise(async (resolve, reject) =>
      props
        .stream()
        .pipe(
          createWriteStream(`./graphql/${props.name}`, {
            encoding: "base64",
            mode: 1,
            start: (Number.parseInt("0", 10), Number.MAX_SAFE_INTEGER),
            emitClose: true
          })
            .once("finish", () => {
              `File Stream Read Progress Complete!`;
            })
            .once("error", () =>
              reject(new Error("error in file upload resolver").message)
            )
        )
        .write("readAsDataURL", () => {
          fileReader.onload = e => {
            console.log(
              JSON.stringify(
                {
                  total: e.total,
                  target: e.target,
                  loaded: e.loaded,
                  event: e.total
                },
                null,
                2
              )
            );
            return resolve(callback(fileReader.result as string));
          };
        })
    )
      .catch(err => new Error(`${err}`).message)
      .then(val => {
        return val
        // graphqlUploadExpress({ maxFieldSize: null, maxFileSize: 1000000, maxFiles: 10 })(request, response, ...prop)=>;
      });
  }
}
