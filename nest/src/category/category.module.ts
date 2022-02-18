import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryResolver } from "./category.resolver";
import { PrismaModule } from "src/prisma";

@Module({
  imports: [PrismaModule],
  providers: [CategoryService, CategoryResolver],
  exports: [CategoryService]
})
export class CategoryModule {}
