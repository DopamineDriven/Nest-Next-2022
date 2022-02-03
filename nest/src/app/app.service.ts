import { Injectable } from "@nestjs/common";
import { RedisService } from "@liaoliaots/nestjs-redis";
import { Redis } from "ioredis";
import { ConfigService } from "@nestjs/config";
import { RedisConfig } from "../common/config/config-interfaces.config";
import { Request, Response } from "express";
import { Cookie } from "express-session";
import { AuthService } from "src/auth/auth-jwt.service";
import { User } from "src/user/model/user.model";

@Injectable()
export class AppService {
  private readonly redis: Redis;
  private readonly redisConfig: RedisConfig | undefined;
  constructor(
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService
  ) {
    this.redisConfig = this.configService.get
      ? this.configService.get<RedisConfig>("redis")
      : undefined;
    this.redis = this.redisService.getClient(
      this.redisConfig?.namespace ? this.redisConfig.namespace : "redis-nest"
    );
  }

  async ping(): Promise<string> {
    const redisPing = await this.redis.ping(
      `${new Date(Date.now()).toISOString().split(/([T])/)[0]}`
    );
    return await this.redis.ping(redisPing);
  }

  async getLoginParam<T extends Request>(authorization: string | null, req: T) {
    const accessToken = req.headers.authorization?.split(/([ ])/)[1]
      ? req.headers.authorization.split(/([ ])/)[0]
      : null; // token of Bearer token
    console.log(accessToken ?? "no access token");
    if (authorization != null && authorization.length > 0 && authorization===accessToken) {
      const getUser = await this.authService
        .getUserFromToken(authorization)
        .then(user => {
          return user;
        });
      return getUser;
    } else {
      return JSON.stringify(
        "no token && no user" + req.authInfo ?? "no auth info",
        null,
        2
      );
    }
  }
}
