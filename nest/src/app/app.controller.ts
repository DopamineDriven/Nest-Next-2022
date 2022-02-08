import { Controller, Get, Header } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("redisPing")
  @Header("auth", process.env.REDIS_PASSWORD ? process.env.REDIS_PASSWORD : "")
  async getRedisPing() {
    return await this.appService.ping();
  }
}
