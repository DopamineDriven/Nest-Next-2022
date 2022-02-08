import { Inject } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { AuthService } from "src/auth/auth-jwt.service";
import { AuthDetailed } from "src/auth/model/auth-detailed.model";
import { PrismaService } from "src/prisma";
import { AppService } from "./app.service";

@Resolver()
export class AppResolver {
  constructor(@Inject(AppService) private readonly appService: AppService, private readonly authService: AuthService) {}
  @Query(() => String)
  helloWorld(): string {
    return "Hello World!";
  }
  @Query(() => String)
  hello(@Args("name") name: string): string {
    return `Hello ${name}!`;
  }

  @Mutation(() => AuthDetailed)
  async userFromAccessTokenDecoded(
    @Args("token", { type: () => String }) token: string
  ): Promise<AuthDetailed> {
    return await this.authService.getUserWithDecodedToken(token);
  }
}
