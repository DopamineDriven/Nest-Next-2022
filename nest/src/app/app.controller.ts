import {
  All,
  Controller,
  Get,
  Header,
  Req,
  Request
} from "@nestjs/common";
// import { refs, SwaggerModule, ApiBearerAuth, ApiNoContentResponse, ApiResponse, ApiResponseMetadata, ApiBody, ApiAcceptedResponse, ApiHeader, ApiHeaders, ApiOperation, ExpressSwaggerCustomOptions, ApiParam, ApiQuery } from "@nestjs/swagger";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
    // private readonly authService: AuthService
  ) {}

  @Get("redisPing")
  @Header("auth", process.env.REDIS_PASSWORD ? process.env.REDIS_PASSWORD : "")
  async getRedisPing() {
    return await this.appService.ping();
  }
  // @ApiQuery({schema: "./src/schema.gql", })
  // @Header("authorization", Return FuncValue)
  // async all(@Ctx) {
  //   this.appService.getToken()
  // }
  // @All("authflow")
  // @Header("auth")
}
