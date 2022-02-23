import { SessionService } from "./session.service";
import { Session } from "./model/session.model";
import { SessionConnection } from "./model/session-connection.model";
import { Resolver, Query, Args, Context } from "@nestjs/graphql";
import { Inject, UseGuards } from "@nestjs/common";
import { FindManySessionsPaginatedInput } from "./inputs/sessions-paginated.input";
import { AuthGuard } from "src/common/guards/gql-context.guard";
import { AppContext } from "src/gql-config.service";

@Resolver(Session)
export class SessionResolver {
  constructor(@Inject(SessionService) private sessionService: SessionService) {}

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

  @Query(() => SessionConnection)
  @UseGuards(AuthGuard)
  async viewerSessionsPaginated(
    @Context() { viewerId }: AppContext,
    @Args("viewerSessionssPaginatedInput", {
      type: () => FindManySessionsPaginatedInput
    })
    params: FindManySessionsPaginatedInput
  ) {
    return await this.sessionService
      .getViewerSessionsPaginated(params, viewerId as string)
      .then(sessionConnection => sessionConnection);
  }
}
