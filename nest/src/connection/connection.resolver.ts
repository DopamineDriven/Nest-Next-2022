import { ConnectionService } from "./connection.service";
import { Connection } from "./model/connection.model";
import { ConnectionConnection } from "./model/connection-connection.model";
import { Resolver, Query, Args } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FindManyConnectionsPaginatedInput } from "./inputs/find-many-connections-paginated.input";

@Resolver(Connection)
export class ConnectionResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    @Inject(ConnectionService) private connectionService: ConnectionService
  ) {}

  @Query(() => Connection)
  async connectionByRelayId(
    @Args("connectionCursor", { type: () => String }) cursor: string
  ) {
    return await this.connectionService.relayFindUniqueConnection({
      id: cursor
    });
  }

  @Query(() => ConnectionConnection)
  async listConnections(
    @Args("findManyConnectionsPaginatedInput", {
      type: () => FindManyConnectionsPaginatedInput
    })
    params: FindManyConnectionsPaginatedInput
  ) {
    return await this.connectionService.listConnections(params);
  }
}
