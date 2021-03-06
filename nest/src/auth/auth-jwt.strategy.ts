import { Strategy, ExtractJwt, JwtFromRequestFunction } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import { jwtConstants } from "./constants/auth-jwt.constant";
import { JwtDecoded } from "./dto/jwt-decoded.dto";
import { AuthService } from "./auth-jwt.service";

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("JWT_ACCESS_SECRET"),
      ignoreExpiration: false,
      usernameField: "email"
    });
    const extractJwtFromCookie: JwtFromRequestFunction = ({
      get,
      headers,
      cookies,
      app,
      body,
      secure,
      params,
      query,
      res,
      authInfo
    }) => {
      let token = null;
      if (get("set-cookie") && cookies) {
        token = get("jwt");
      }
      const extracted = {
        app: app
          .connect("login")
          .param("user_id", function (req, res, next, id) {
            id.find(id, function (err: Error, user: User) {
              if (err) {
                next(err);
              } else if (user) {
                req.user = user.id;
                next();
              } else {
                next(new Error("failed to load user"));
              }
              return res.json(req.user);
            });
          })
      };

      return (
        token ||
        ExtractJwt.fromAuthHeaderAsBearerToken()({
          ...extracted,
          ...extracted.app,
          ...authInfo,
          ...cookies,
          ...(headers = {
            authorization: headers.authorization,
            cookie: headers.cookie,
            "Access-Control-Request-Headers": headers.vary,
            "access-control-allow-credentials": "true"
          }),
          ...query,
          ...res
        })
      );
    };
  }

  async validate(payload: JwtDecoded) {
    const user = await this.authService.validateUser(payload.payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
