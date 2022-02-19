import { EntryResolver } from "./entry.resolver";
import { Module } from "@nestjs/common";
import { EntryService } from "./entry.service";
import { PaginationModule } from "../pagination/pagination.module";
import { PrismaModule } from "../prisma/prisma.module";
import { Agent } from "http";
import { HttpModule } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { LocalConfig } from "src/common/config/config-interfaces.config";
import { EntryController } from "./entry.controller";

@Module({
  imports: [
    PaginationModule,
    PrismaModule,
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const localConfig = configService.get<LocalConfig>("local");
        return {
          httpAgent: new Agent({ keepAlive: true }),
          withCredentials: true,
          headers: {
            authorization: localConfig?.auth
              ? localConfig.auth
              : `${localConfig?.auth}`,
            "Content-Type": "application/json"
          },
          baseURL: `http://localhost:3000/entry/`.trim()
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [EntryResolver, EntryService],
  controllers: [EntryController],
  exports: [EntryService]
})
export class EntryModule {}
