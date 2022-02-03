import {
  Body,
  Controller,
  Get,
  Header,
  Inject,
  Param,
  Post
} from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("hello/:name")
  getHelloName(@Param("name") name: string): string {
    return this.appService.getHelloName(name);
  }

  @Get("redisPing")
  @Header("auth", process.env.REDIS_PASSWORD ? process.env.REDIS_PASSWORD : "")
  async getRedisPing() {
    return await this.appService.ping();
  }
}
