import {
  INestApplication,
  Injectable,
  OnModuleInit
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ log: ["error", "info", "query", "warn"] });
  }

  async onModuleInit() {
    return await super.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    super.$on("beforeExit", async () => {
      await app.close().then(async() => {
        console.log("prisma service disconnecting")
        return await super.$disconnect()
      });
    });
  }
}
