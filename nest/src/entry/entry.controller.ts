import { EntryService } from "./entry.service";
import { Controller, Post, Ip, Body, Param } from "@nestjs/common";
import { EntryCreateOneInput } from "./inputs/entry-create.input";

@Controller("entry")
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post("createEntry/:viewerId")
  async create(
    @Body("entryCreateInput") params: EntryCreateOneInput,
    @Param("viewerId") viewerId: string,
    @Ip() ip: string
  ) {
    console.log(ip ?? "no ip");
    return await this.entryService.createEntry({ data: params, viewerId });
  }
}
