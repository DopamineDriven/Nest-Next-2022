import { Category } from "./model/category.model";
import { CategoryConnection } from "./model/category-connection.model";
import { CategoryService } from "./category.service";
import { Resolver, Query, Args } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FindManyCategoriesPaginatedInput } from "./inputs/find-many-categories-paginated.input";

@Resolver(Category)
export class CategoryResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    @Inject(CategoryService) private categoryService: CategoryService
  ) {}

  @Query(() => Category)
  async categoryByRelayId(
    @Args("cursor", { type: () => String }) cursor: string
  ) {
    return await this.categoryService.relayFindUniqueCategory({ id: cursor });
  }

  @Query(() => CategoryConnection)
  async listCategories(
    @Args("findManyCategoriesPaginatedInput", {
      type: () => FindManyCategoriesPaginatedInput
    })
    params: FindManyCategoriesPaginatedInput
  ) {
    return await this.categoryService.listCategories(params);
  }
}
