import { Module } from "@nestjs/common";
import { SessionService } from "./session.service";
import { SessionResolver } from "./session.resolver";
import { PrismaModule } from "src/prisma";

@Module({
  imports: [PrismaModule],
  providers: [SessionService, SessionResolver],
  exports: [SessionService]
})
export class SessionModule {}
