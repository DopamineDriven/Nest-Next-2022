import { Inject, UseGuards } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ProfileService } from "./profile.service";
import {
  Query,
  Resolver,
  Parent,
  Subscription,
  Mutation,
  Args,
  ResolveField,
  Context
} from "@nestjs/graphql";
import { Profile } from "../profile/model/profile.model";
import { PubSub } from "graphql-subscriptions";
import { ProfileConnection } from "./model/profile-connection.model";
import { User } from "../user/model/user.model";
import { FindManyProfilesPaginatedInput } from "./inputs/profile-paginated.input";
import { AuthGuard } from "../common/guards/gql-context.guard";
import { CreateOneProfile } from "./inputs/profile-create.input";
import { AppContext } from "../gql-config.service";

const pubSub = new PubSub();
@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private profileService: ProfileService
  ) {}

  @Query(() => Profile)
  async profileByRelayId(
    @Args("cursor", { type: () => String }) cursor: string
  ) {
    return await this.profileService.relayFindUniqueProfile({ id: cursor });
  }

  @Subscription(() => Profile)
  profileCreated() {
    return pubSub.asyncIterator("PROFILE_CREATED");
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Profile)
  async createNewProfile(
    @Context() { viewerId }: AppContext,
    @Args("createNewProfileInput") params: CreateOneProfile
  ) {
    const createNewProfile = await this.profileService.createNewProfileService(
      params,
      viewerId as string
    );
    pubSub.publish("PROFILE_CREATED", { profileCreated: createNewProfile });
    return createNewProfile;
  }

  @Query(() => ProfileConnection)
  async listProfiles(
    @Args("profilesArgs", { type: () => FindManyProfilesPaginatedInput })
    params: FindManyProfilesPaginatedInput
  ): Promise<ProfileConnection> {
    return await this.profileService.listProfiles(params);
  }

  @ResolveField(() => User)
  async userInProfile(
    @Parent() profile: Profile,
    @Context() { viewerId }: AppContext
  ) {
    return await this.prismaService.user
      .findUnique({
        where: {
          id: profile.userId ? profile.userId : (viewerId as string)
        }
      })
      .profile()
      .user();
  }

  @UseGuards(AuthGuard)
  @Query(() => Profile)
  async viewerProfile(@Context() { viewerId }: AppContext) {
    return viewerId ? await this.profileService.viewerProfile(viewerId) : null;
  }
}
