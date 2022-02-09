import { Resolver, Args, Mutation } from "@nestjs/graphql";
import {
  GraphQLUpload,
  FileUpload,
  graphqlUploadExpress
} from "graphql-upload";
import { createWriteStream, read } from "fs";
import { ReadStream } from "fs-capacitor";
import { Inject } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { JSONObjectResolver } from "graphql-scalars";

@Resolver()
export class UploadResolver implements FileUpload {
  public encoding: BufferEncoding;
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
  @Mutation(() => JSONObjectResolver)
  async uploadFile(
    @Args({ name: "name", type: () => GraphQLUpload })
    {
      createReadStream = this.createReadStream,
      filename = this.filename,
      encoding = this.encoding
    }: FileUpload
  ): Promise<typeof JSONObjectResolver> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(
          createWriteStream(`./uploads/${filename}`, { encoding: encoding ?? undefined })
        )
        .on("finish", () => resolve(true))
        .on("error", () => reject(false))
    ).then(data => Object.create({ data: data }));
  }
}
