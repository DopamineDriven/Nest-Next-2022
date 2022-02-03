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

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  excludeStringNullableField<StringNullableFilter, Key extends keyof StringNullableFilter>(
    stringNullableFilter: StringNullableFilter,
    ...keys: Key[]
  ): Omit<StringNullableFilter, Key> {
    for (const key of keys) {
      delete stringNullableFilter[key];
    }
    return stringNullableFilter;
  }
}
