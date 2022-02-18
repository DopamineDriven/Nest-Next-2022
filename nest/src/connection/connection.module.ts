import { Module } from "@nestjs/common";
import { ConnectionService } from "./connection.service";
import { ConnectionResolver } from "./connection.resolver";
import { PrismaModule } from "src/prisma";

@Module({
  imports: [PrismaModule],
  providers: [ConnectionService, ConnectionResolver],
  exports: [ConnectionService]
})
export class ConnectionModule {}
