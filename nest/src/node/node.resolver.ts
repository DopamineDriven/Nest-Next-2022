import { isUUID } from "@nestjs/common/utils/is-uuid";
import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { fromGlobalId, globalIdField, toGlobalId } from "graphql-relay";
import { UserService } from "../user/user.service";
import { EntryService } from "../entry/entry.service";
import { User } from "../user/model/user.model";
import { Comment } from "src/comment/model/comment.model";
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
import { CommentConnection } from "src/graphql.schema";
import { CommentService } from "src/comment/comment.service";
import { UserConnection } from "src/user/model/user-connection.model";
import { EntryConnection } from "src/entry/model/entry-connection.model";
import { ProfileConnection } from "src/profile/model/profile-connection.model";
@Resolver(() => Node)
export class NodeResolver {
  constructor(
    @Inject(MediaItemService)
    private readonly mediaItemService: MediaItemService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(EntryService) private readonly entryService: EntryService,
    @Inject(CommentService) private readonly commentService: CommentService,
    @Inject(ProfileService) private readonly profileService: ProfileService // private readonly sessionService: SessionService
  ) {}

  @Query(_returns => Node, { nullable: true })
  async node(@Args({ name: "id", type: () => ID }) id: string) {
    const { type, id: cursor } = fromGlobalId(id);
    if (!globalIdField(toGlobalId(type, cursor))) {
      return null;
    }
    return type === User.name && toGlobalId(type, cursor) in UserConnection
      ? await this.userService
          .relayFindUniqueUser({ id: toGlobalId(type, cursor) })
          .then(val => val as User)
      : type === Entry.name && toGlobalId(type, cursor) in EntryConnection
      ? await this.entryService
          .relayFindUniqueEntry({ id: toGlobalId(type, cursor) })
          .then(val => val as Entry)
      : type === Profile.name && toGlobalId(type, cursor) in ProfileConnection
      ? await this.profileService
          .relayFindUniqueProfile({ id: toGlobalId(type, cursor) })
          .then(prof => prof as Profile)
      : type === Comment.name && toGlobalId(type, cursor) in CommentConnection
      ? await this.commentService
          .relayFindUniqueComment({ id: toGlobalId(type, cursor) })
          .then(comment => comment as Comment)
      : toGlobalId(type, cursor) in
        (UserConnection ||
          EntryConnection ||
          ProfileConnection ||
          CommentConnection)
      ? (fromGlobalId(toGlobalId(type, cursor)).type as
          | typeof User.name
          | typeof Entry.name
          | typeof Profile.name
          | typeof Comment.name)
      : null;
    // switch (toGlobalId(type, cursor)) {
    //   case typeof User:
    //     return await this.userService.relayFindUniqueUser({
    //       id: toGlobalId(type, cursor) in UserConnection ? await this.userService.relayFindUniqueUser({id: cursor}).then((val) => val as User)
    //     })
    //   case typeof Entry:
    //     return await this.entryService.relayFindUniqueEntry({
    //       id: resolvedGlobalId.id
    //     });
    //   case typeof MediaItem:
    //     return await this.mediaItemService.relayFindUniqueMediaItem({
    //       id: resolvedGlobalId.id
    //     });
    //   case typeof Profile:
    //     return await this.profileService.relayFindUniqueProfile({
    //       id: resolvedGlobalId.id
    //     });
    //   case toGlobalId("Comment", id).toString():
    //     return await this.commentService.relayFindUniqueComment({id: id})
    //   // case typeof Contact:
    //   //   return await this.contactService.relayFindUniqueEntry({
    //   //     id: resolvedGlobalId.id
    //   //   });
    //   // case AccountScalarFieldEnum.id:
    //   //   return await this.accountService.relayFindUniqueAccount({
    //   //     id: resolvedGlobalId.id
    //   //   });
    //   // case SessionScalarFieldEnum.id:
    //   //   return await this.sessionService.realyFindUniqueSession({
    //   //     id: resolvedGlobalId.id
    //   //   });
    //   default:
    //     break;
    // }
    // return toGlobalId(
    //   "User" || "Entry" || "Profile" || "MediaItem" || resolvedGlobalId.type,
    //   resolvedGlobalId.id
    // );
  }
}
