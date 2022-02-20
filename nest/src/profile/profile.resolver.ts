import { ExecutionContext, HostParam, Inject, UseGuards } from "@nestjs/common";
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
import { GraphqlAuthGuard } from "../auth/gql-auth.guard";
import { ProfileConnection } from "./model/profile-connection.model";
import { User } from "../user/model/user.model";
import { ProfileCreateInput } from "src/.generated/prisma-nestjs-graphql/profile/inputs/profile-create.input";
import { FindManyProfilesPaginatedInput } from "./inputs/profile-paginated.input";

const pubSub = new PubSub();
@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private profileService: ProfileService
  ) {}

  @Query(() => Profile)
  async profileByRelayId(@Parent() profile: Profile) {
    const getId = await this.prismaService.profile
      .findUnique({
        where: { id: profile.id },
        include: { user: true }
      })
      .user()
      .profile();
    return await this.profileService.relayFindUniqueProfile({
      id: getId?.id ?? profile.id
    });
  }

  @Subscription(() => Profile)
  profileCreated() {
    return pubSub.asyncIterator("profileCreated");
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Profile)
  async createProfile(
    @Args("data", { type: () => ProfileCreateInput }) data: ProfileCreateInput,
    @Args("userId", { type: () => String }) userId: string
  ) {
    const newProfile = await this.profileService.createProfile(data, userId);
    pubSub.publish("profileCreated", { profileCreated: newProfile });
    return newProfile;
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
    @HostParam() profile: Profile,
    @Context("viewerId") ctx: ExecutionContext
  ) {
    return await this.prismaService.user
      .findUnique({
        where: {
          id: profile.userId ? profile.userId : (ctx as unknown as string)
        }
      })
      .profile()
      .user();
  }
}
