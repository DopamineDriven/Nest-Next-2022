import { Strategy, ExtractJwt, JwtFromRequestFunction } from "passport-jwt";
import { AbstractStrategy, PassportStrategy } from "@nestjs/passport";
import {
  Injectable,
  UnauthorizedException,
  Type,
  HttpCode,
  HttpException,
  HttpStatus,
  Headers,
  Inject
} from "@nestjs/common";
import { User } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import { jwtConstants } from "./constants/auth-jwt.constant";
import { JwtDecoded } from "./dto/jwt-decoded.dto";
import { AuthJwtService } from "./auth-jwt.service";

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject<typeof AuthJwtService>(AuthJwtService) private readonly authService: AuthJwtService,
    @Inject<typeof ConfigService>(ConfigService) readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
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

  async validate<T extends JwtDecoded>(payload: T): Promise<User> {
    const user = await this.authService.validateUser(payload.payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { ...user };
  }
}
