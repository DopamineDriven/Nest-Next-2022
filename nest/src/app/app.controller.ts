import { Body, Controller, Get, Header, Inject, Param, Post } from "@nestjs/common";
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
  @Header("auth", "Dillard20!8!")
  getRedisPing() {
    return this.appService.ping();
  }
  /**
 *   @Get("hello/:name")
  getHelloName(@Req() req: Request, @Param("name") name: string): string {

    return this.appService.getHelloName(name);
  }
}

 */
}

//   @Post("register")
//   async getRegisterEvent(@Body() registerDto: RegisterDto) {
//     // return await this.prismaService.user.create({data: {registerDto}})
// }
// }
