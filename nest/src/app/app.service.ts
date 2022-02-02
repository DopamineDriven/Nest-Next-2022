import { Injectable } from "@nestjs/common";
import { ClusterService, RedisService, RedisClientOptions } from "@liaoliaots/nestjs-redis";
import { Cluster, Redis } from "ioredis";

@Injectable()
export class AppService {
  private readonly clientOpts: RedisClientOptions;
  private readonly redis: Redis;
  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient("redis-nest");
  }

  async ping(): Promise<string> {
    return await this.redis.ping();
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
