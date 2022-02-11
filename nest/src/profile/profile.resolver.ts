import { HostParam, Inject, UseGuards } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ProfileService } from "./profile.service";
import {
  Query,
  Resolver,
  Parent,
  Subscription,
  Mutation,
  Args,
  ResolveField
} from "@nestjs/graphql";
import { Profile } from "../profile/model/profile.model";
import { PubSub } from "graphql-subscriptions";
import { GraphqlAuthGuard } from "../common/guards/graphql-auth.guard";
import { ProfileCreateOrConnectWithoutUserInput } from "../.generated/prisma-nestjs-graphql/profile/inputs/profile-create-or-connect-without-user.input";
import { ProfileOrderByWithRelationAndSearchRelevanceInput } from "../.generated/prisma-nestjs-graphql/profile/inputs/profile-order-by-with-relation-and-search-relevance.input";
import { ProfileConnection, ProfileEdge } from "./model/profile-connection.model";
import { PaginationArgs } from "../common/pagination/pagination.args";
import { Edge, findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import {} from "@devoxa/prisma-relay-cursor-connection";
import { User } from "../user/model/user.model";
import { ProfileCreateWithoutUserInput } from "../.generated/prisma-nestjs-graphql/profile/inputs/profile-create-without-user.input";
import { EnumGenderNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/enum-gender-nullable-filter.input";
import { EnumPronounsNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/enum-pronouns-nullable-filter.input";
import { JsonNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/json-nullable-filter.input";
import { StringNullableFilter } from "src/.generated/prisma-nestjs-graphql/prisma/inputs/string-nullable-filter.input";
import { ProfilesInput } from "./inputs/profiles.input";
import { ProfileCreateInput } from "src/.generated/prisma-nestjs-graphql/profile/inputs/profile-create.input";
import { FindManyProfilesPaginatedInput } from "./inputs/profile-paginated.input";
import { fromGlobalId, toGlobalId } from "graphql-relay";
const pubSub = new PubSub();
@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    @Inject(PrismaService) private prisma: PrismaService,
    private profileService: ProfileService
  ) {}

  @Query(() => Profile)
  async profileByRelayId(@Parent() profile: Profile) {
    const getId = await this.prisma.profile
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

  @Query(() => ProfileConnection, { name: "listProfiles" })
  async listProfiles(
    @Args("findManyProfilesPaginatedInput", { type: () => FindManyProfilesPaginatedInput })
    findManyProfiles: FindManyProfilesPaginatedInput
  ) {

    const edgingThoseProfiles = await findManyCursorConnection(
      args =>
        this.prisma.profile.findMany({
          include: { user: true },
          skip: findManyProfiles.skip,
          take: findManyProfiles.take,
          distinct: findManyProfiles.distinct,
          where: findManyProfiles.where,
          orderBy: findManyProfiles.orderBy,
          ...args
        }),
      () =>
        this.prisma.profile.count({
          where: findManyProfiles.where
        }),
      {
        first: findManyProfiles.pagination.first ?? 10,
        last: findManyProfiles.pagination.last,
        before: findManyProfiles.pagination.before,
        after: findManyProfiles.pagination.after
      },
      {
        getCursor: (record: {id: string}) => {
          return record
        },
        decodeCursor: (cursor: string) => fromGlobalId(cursor),
        encodeCursor: (cursor: { id: string }) => toGlobalId(Profile.name, cursor.id)
      }
    );
    return edgingThoseProfiles;
  }

  @Query(() => ProfileConnection)
  async profiles(
    @Args("profilesArgs", { type: () => ProfilesInput })
    profilesArgs: ProfilesInput
  ): Promise<ProfileConnection> {
    const getProfiles = await this.profileService
      .prismaProfiles(this.prisma["profile"])
      .then(async val => await val.Profiles({ ...profilesArgs }));
    return getProfiles;
  }

  @ResolveField(() => User)
  async userInProfile(@HostParam() profile: Profile) {
    return await this.prisma.user
      .findUnique({
        where: { id: profile.userId }
      })
      .profile()
      .user();
  }
}
