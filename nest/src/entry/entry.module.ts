import { EntryResolver } from "./entry.resolver";
import { Module } from "@nestjs/common";
import { EntryService } from "./entry.service";
import { PaginationModule } from "../pagination/pagination.module";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "src/auth/auth-jwt.module";

@Module({
  imports: [PaginationModule, PrismaModule, AuthModule],
  providers: [EntryResolver, EntryService],
  exports: [EntryService]
})
export class EntryModule {}
