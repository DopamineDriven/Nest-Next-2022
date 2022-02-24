import { Resolver, Query, Context, Args } from "@nestjs/graphql";
import {
  ViewerFieldsPaginated,
  ViewerFieldsPaginatedConnection
} from "./model/viewer-fields-paginated.model";
import { ViewerFieldsPaginatedInput } from "./inputs/viewer-fields-paginated.input";
import { AppContext } from "src/gql-config.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/common/guards/gql-context.guard";
import { ViewerFieldsPaginatedService } from "./viewer-fields-paginated.service";

@Resolver(ViewerFieldsPaginated)
export class ViewerFieldsPaginatedResolver {
  constructor(
    private readonly viewerFieldsPaginatedService: ViewerFieldsPaginatedService
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => ViewerFieldsPaginatedConnection)
  async viewerFieldsPaginated(
    @Context() { viewerId }: AppContext,
    @Args("viewerFieldsPaginatedInput", {
      type: () => ViewerFieldsPaginatedInput
    })
    input: ViewerFieldsPaginatedInput
  ): Promise<ViewerFieldsPaginatedConnection | null> {
    return viewerId
      ? await this.viewerFieldsPaginatedService.getViewerFieldsPaginated(
          input,
          viewerId
        )
      : null;
  }
}
