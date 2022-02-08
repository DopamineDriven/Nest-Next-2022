import {
  Inject,
  Injectable
} from "@nestjs/common";
import { RedisService } from "@liaoliaots/nestjs-redis";
import { Redis } from "ioredis";
import { ConfigService } from "@nestjs/config";
import { RedisConfig } from "../common/config/config-interfaces.config";
export type RecursiveAmbivalent<T> = {
  [P in keyof T]: keyof RecursiveAmbivalent<T[P]>;
};
@Injectable()
export class AppService {
  private readonly redis: Redis;
  private readonly redisConfig: RedisConfig | undefined;
  constructor(
    @Inject(RedisService)
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




  // async getLoginParam<T extends Request>(
  //   authorization: string | null,
  //   req: T
  // ): Promise<
  //   | string
  //   | import("/home/dopamine_driven/personal/port/2022/nest/src/auth/model/auth-detailed.model").AuthDetailed
  //   | null
  // > {
  //   const accessToken = req.headers.authorization?.split(/([ ])/)[1]
  //     ? req.headers.authorization.split(/([ ])/)[0]
  //     : null; // token of Bearer token
  //   console.log(accessToken ?? "no access token");
  //   if (
  //     authorization != null &&
  //     authorization.length > 0 &&
  //     authorization === accessToken
  //   ) {
  //     const getUserDetailed =
  //       accessToken != null && accessToken.length > 0
  //         ? await this.authService.getUserWithDecodedToken(accessToken)
  //         : null;
  //     const getUser = await this.authService
  //       .getUserFromToken(authorization)
  //       .then(user => {
  //         return user;
  //       });
  //     return getUserDetailed;
  //   } else {
  //     return JSON.stringify(
  //       "no token && no user" + req.authInfo ?? "no auth info",
  //       null,
  //       2
  //     );
  //   }
  // }
}
  // async getToken<
  //   T = ExecutionContextHost extends infer U ? U : ExecutionContextHost
  // >(req: Context<T>["req"]) {
  //   const httpReq =
  //     this.executionContextHost.getType<GqlContextType>() === "http"
  //       ? this.executionContextHost.switchToHttp().getRequest<Request>()
  //       : this.executionContextHost.getType<GqlContextType>() === "http"
  //       ? (this.executionContextHost.getType() as unknown as string)
  //       : (this.executionContextHost.getType() as unknown as User);
  //   const accessToken = req.headers.authorization
  //     ? req.headers.authorization.split(/([ ])/)[1]
  //     : req.header("authorization")?.split
  //     ? req.header("authorization")?.split(/[ ]/)[1]
  //       : null;
  //   return {accessToken: accessToken, context: httpReq}
  // }
