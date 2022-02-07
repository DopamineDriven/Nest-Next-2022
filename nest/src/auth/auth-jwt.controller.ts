import {
  Controller,
  Post,
  Req,
  Res,
  Param,
  Request,
  Body,
  Response,
  Inject,
  SetMetadata,
  ExecutionContext
} from "@nestjs/common";
import { AuthService } from "./auth-jwt.service";
import { JwtService } from "@nestjs/jwt";
import {
  Response as ExpressResponse,
  Request as ExpressRequest
} from "express";
import { JwtDecoded } from "./dto/jwt-decoded.dto";
import { LoginInput } from "./inputs/login.input";
import {
  refs,
  SwaggerModule,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiResponse,
  ApiResponseMetadata,
  ApiBody,
  ApiAcceptedResponse,
  ApiHeader,
  ApiHeaders,
  ApiOperation,
  ExpressSwaggerCustomOptions,
  ApiParam,
  ApiQuery
} from "@nestjs/swagger";
import { ConnectUserDto } from "src/.generated/nestjs-dto/connect-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDetailed } from "./model/auth-detailed.model";
import { Ctx } from "@nestjs/microservices";
import { GqlExecutionContext } from "@nestjs/graphql";
import {
  SessionData,
  Session,
  SessionOptions,
  Cookie,
  CookieOptions
} from "express-session";
import { SignInSwaggerDto } from "./dto/signin-controller.dto";
@Controller("auth")
export default class AuthJwtController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    @Inject(PrismaService)
    private readonly prismaService: PrismaService
  ) {}

  @Post("/login")
  async login(
    @Req() request: ExpressRequest,
    @Res() response: ExpressResponse
  ) {
    const payload = this.jwtService.decode(
      request.headers.authorization ? request.headers.authorization : ""
    ) as JwtDecoded;
    const userId = payload.payload?.userId;
    console.log(userId);
    const signedPayload = this.jwtService.sign(
      payload?.payload ? payload.payload : {}
    );
    console.log(signedPayload);
    return response
      .cookie("access_token", signedPayload, {
        httpOnly: true,

        domain: "http://localhost:3000",
        expires: new Date(`${payload.payload?.exp}`),
        path: "*",
        secure: process.env.NODE_ENV === "production" ? true : false
      })
      .json({ payload: signedPayload })
      .end();
  }
  // @Post("/loginInput")
  // async loginInput(@Param("LoginInput") { email, password }: LoginInput) {
  //   return this.authService.login(email, password);
  // }

  @ApiBearerAuth("authorization")
  @ApiHeader({ name: "authorization", allowEmptyValue: true, allowReserved: true })
  @Post("signin")
  async signin(
    @Request() req: ExpressRequest,
    @Body() credentials: SignInSwaggerDto,
    @Res({passthrough: true}) res: ExpressResponse
    // @Ctx() ctx: GqlExecutionContext | ExecutionContext
  ) {
    const xForwardedFor = req.header("X-Forwarded-For")?.split(/([,])/)[0]; // returns non-proxied client IP
    console.log("client IP: " + xForwardedFor ?? "no ip");
    const getAccessToken = req.headers.authorization;
    console.log(
      getAccessToken
        ? getAccessToken + "from the auth swagger controller"
        : "no access token in signIn, auth swagger controller"
    );
    try {
      const { auth, jwt } = await this.authService.signIn({
        email: credentials.email,
        password: credentials.password
      });
      const response: AuthDetailed = { auth, jwt };

      return res
        .cookie("accessToken", auth.accessToken, {
          expires: new Date(jwt.payload.exp),
          maxAge: jwt.payload.exp,
          path: "/",
          secure: process.env.NODE_ENV === "production" ? true : false,
          signed: true,
          sameSite: "none",
          httpOnly: true
        })
        .status(200 || 201 || 202 || 203 || 204)
        .send(response);
    } catch (error) {
      throw error;
    }
  }
}
