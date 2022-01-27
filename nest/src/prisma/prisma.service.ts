import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ["error", "info", "query", "warn"],
      errorFormat: "pretty"
    });
  }

  async onModuleInit() {
    return await this.$connect();
  }

  async enableShutdownHooks<T extends INestApplication>(app: T) {
   return this.$on("beforeExit", async () => {
      return await app.close().then(() => this.$disconnect());
    });
  }
}
