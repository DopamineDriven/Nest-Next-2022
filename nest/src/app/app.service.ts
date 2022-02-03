import { Injectable } from "@nestjs/common";
import { RedisService } from "@liaoliaots/nestjs-redis";
import { Redis } from "ioredis";
import { ConfigService } from "@nestjs/config";
import { RedisConfig } from "../common/config/config-interfaces.config";

@Injectable()
export class AppService {
  private readonly redis: Redis;
  private readonly redisConfig: RedisConfig | undefined;
  constructor(
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

  getHello(): string {
    return "Hello World!";
  }

  getHelloName(name: string): string {
    return `Hello ${name}!`;
  }

  async getLoginParam(Authorization: string | null) {
    return { Authorization: "Bearer " + Authorization };
  }
}
