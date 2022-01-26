import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
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
