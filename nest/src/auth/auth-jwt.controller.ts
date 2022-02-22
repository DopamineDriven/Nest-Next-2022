import {
  Controller,
  Post,
  Req,
  Res,
  Param,
  Request,
  Body,
  Inject,
  SetMetadata,
  ExecutionContext
} from "@nestjs/common";
import { AuthService } from "./auth-jwt.service";
import { JwtService } from "@nestjs/jwt";
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
  Response
} from "express";
import { JwtDecoded } from "./dto/jwt-decoded.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDetailed } from "./model/auth-detailed.model";

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
    @Res({ passthrough: true }) response: ExpressResponse
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
  @Post("signin/:credentials")
  async signin(
    @Request() req: ExpressRequest,
    @Body() credentials: SignInSwaggerDto,
    @Res({ passthrough: true }) res: ExpressResponse
    // @Ctx() ctx: GqlExecutionContext | ExecutionContext
  ) {
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

  @Post("token/:token")
  async getUserFromDecodedAccessToken(
    @Param("token") token: string,
    @Request() req: ExpressRequest,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const userFromToken = await this.authService.getUserWithDecodedToken(
        token
      );
      const parseTokenFromIncomingReq =
        req.headers.authorization?.split(/([ ])/)[2];
      if (userFromToken != null || req.headers.authorization?.split(/([ ])/)[2])
        res.setHeader(
          "authorization",
          `Bearer ${userFromToken.auth.accessToken}`
        );
      if (parseTokenFromIncomingReq)
        res.setHeader("authorization", parseTokenFromIncomingReq);
      return this.authService.setTokenCookie(
        res,
        (parseTokenFromIncomingReq as string) ?? userFromToken
      );
    } catch (err) {
      throw new Error(`${err}`).message;
    }
    // res.cookie("nest-to-next-2022", userFromToken, {
    //   sameSite: "none",
    //   path: "/",
    //   maxAge: new Date(Date.now()).getMilliseconds() + 30 * 24 * 60 * 60 * 1000,
    //   secure: process.env.NODE_ENV === "production" ? true : false,
    //   httpOnly: false,
    //   encode: ((val: string) => encodeURIComponent(val))
    // });
    // return userFromToken;
  }
}
