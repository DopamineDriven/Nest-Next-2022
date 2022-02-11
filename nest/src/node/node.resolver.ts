import { isUUID } from "@nestjs/common/utils/is-uuid";
import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import { UserService } from "../user/user.service";
import { EntryService } from "../entry/entry.service";
import { User } from "../user/model/user.model";
import { Entry } from "../entry/model/entry.model";
import { MediaItem } from "src/media/model/media.model";
import { MediaItemService } from "src/media/media.service";
import { Profile } from "../profile/model/profile.model";
import { ProfileService } from "../profile/profile.service";
// import { AccountService } from "../Services/AccountService/account.service";
// import { SessionService } from "../Services/SessionService/session.service";
import { Node } from "./model/node.model";
import { NodeService } from "./node.service";
import { Inject } from "@nestjs/common";
@Resolver(() => Node)
export class NodeResolver {
  constructor(
    @Inject(MediaItemService)
    private readonly mediaItemService: MediaItemService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(EntryService) private readonly entryService: EntryService,
    @Inject(ProfileService) private readonly profileService: ProfileService // private readonly sessionService: SessionService
  ) {}

  @Query(_returns => Node, { nullable: true })
  async node(@Args({ name: "id", type: () => ID }) id: string) {
    const resolvedGlobalId = fromGlobalId(id);
    if (!isUUID(resolvedGlobalId.id)) {
      return null;
    }
    switch (resolvedGlobalId.id) {
      case typeof User:
        return await this.userService.relayFindUniqueUser({
          id: resolvedGlobalId.id
        });
      case typeof Entry:
        return await this.entryService.relayFindUniqueEntry({
          id: resolvedGlobalId.id
        });
      case typeof MediaItem:
        return await this.mediaItemService.relayFindUniqueMediaItem({
          id: resolvedGlobalId.id
        });
      case typeof Profile:
        return await this.profileService.relayFindUniqueProfile({
          id: resolvedGlobalId.id
        });
      // case typeof Contact:
      //   return await this.contactService.relayFindUniqueEntry({
      //     id: resolvedGlobalId.id
      //   });
      // case AccountScalarFieldEnum.id:
      //   return await this.accountService.relayFindUniqueAccount({
      //     id: resolvedGlobalId.id
      //   });
      // case SessionScalarFieldEnum.id:
      //   return await this.sessionService.realyFindUniqueSession({
      //     id: resolvedGlobalId.id
      //   });
      default:
        break;
    }
    return toGlobalId(
      "User" || "Entry" || "Profile" || resolvedGlobalId.type,
      resolvedGlobalId.id
    );
  }
}
