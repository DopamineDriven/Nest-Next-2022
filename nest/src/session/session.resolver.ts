import { SessionService } from "./session.service";
import { Session } from "./model/session.model";
import { SessionConnection } from "./model/session-connection.model";
import { Resolver, Query, Args } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FindManySessionsPaginatedInput } from "./inputs/sessions-paginated.input";

@Resolver(Session)
export class SessionResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    @Inject(SessionService) private sessionService: SessionService
  ) {}

  @Query(() => Session)
  async sessionByRelayId(
    @Args("cursor", { type: () => String }) cursor: string
  ) {
    return await this.sessionService.relayFindUniqueSession({ id: cursor });
  }

  @Query(() => SessionConnection)
  async listSessions(
    @Args("findManySessionsPaginatedInput", {
      type: () => FindManySessionsPaginatedInput
    })
    params: FindManySessionsPaginatedInput
  ) {
    return await this.sessionService.listSessions(params);
  }
}
