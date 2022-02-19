import {
  ApiBearerAuth,
  ApiBody,
  ApiBodyOptions,
  ApiHeader
} from "@nestjs/swagger";
import { PrismaService } from "src/prisma/prisma.service";
import { EntryService } from "./entry.service";
import {
  Controller,
  Post,
  Ip,
  Body,
  Request,
  Res,
  UsePipes,
  Inject,
  Param
} from "@nestjs/common";
import { Request as ExpressRequest, Response } from "express";
import { EntryUncheckedCreateInputSansAuthorId } from "./inputs/entry-unchecked.input";

@Controller("entry")
export class EntryController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly entryService: EntryService
  ) {}

  @Post("createEntry/:viewerId")
  async create(
    @Body("entryCreateInput") params: EntryUncheckedCreateInputSansAuthorId,
    @Param("viewerId") viewerId: string,
    @Ip() ip: string
  ) {
    console.log(ip ?? "no ip");
    return await this.entryService.newEntry(params, viewerId);
  }
}
