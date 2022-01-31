import { Controller, Post, Req, Res, Param } from "@nestjs/common";
import { AuthService } from "./auth-jwt.service";
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from "express";
import { JwtDecoded } from "./dto/jwt-decoded.dto";
import { LoginInput } from "./inputs/login.input";

@Controller("auth")
export default class AuthJwtController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
  ) {}

  @Post("/login")
  async login(@Req() request: Request, @Res() response: Response) {
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
}
