import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ["error", "query", "info", "warn"],
      errorFormat: "pretty"
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks<T extends INestApplication>(app: T) {
    this.$on("beforeExit", async () => {
       await app.close()
    });
  }
}
