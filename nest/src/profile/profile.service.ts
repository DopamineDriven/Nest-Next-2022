import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, Profile } from "@prisma/client";
import { fromGlobalId } from "graphql-relay";
import {
  PaginationService,
  PaginationArgs
} from "../pagination/pagination.service";
import { ProfileConnection } from "./model/profile-connection.model";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { ProfilesInput } from "./inputs/profiles.input";
import { ProfileCreateInput } from "src/.generated/prisma-nestjs-graphql/profile/inputs/profile-create.input";
@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    @Inject(PaginationService) private paginationService: PaginationService
  ) {}

  async profile(
    entryWhereUniqueInput: Prisma.ProfileWhereUniqueInput
  ): Promise<Profile | null> {
    const { id, userId } = entryWhereUniqueInput;
    return this.prisma.profile.findUnique({
      where: id ? { id: id } : { userId: userId }
    });
  }

  async profiles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProfileWhereUniqueInput;
    where?: Prisma.ProfileWhereInput;
    orderBy?: Prisma.Enumerable<Prisma.ProfileOrderByWithRelationAndSearchRelevanceInput>;
  }): Promise<Profile[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.profile.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
  }

  async findFirstProfiles(
    params: Prisma.ProfileFindFirstArgs
  ): Promise<Profile | null> {
    const findFirst = await this.prisma.profile
      .findFirst(params)
      .user()
      .profile();

    return findFirst;
  }
  async createProfile(
    data: ProfileCreateInput,
    userId: string | undefined
  ) {
    const userToProfileCreate = await this.prisma.user
      .findFirst({
        where: { id: userId },
        include: {_count: true, mediaItems: true,profile: true, entries: true}
      })
      .then(async dataUser => {
        const createUserProfile = await this.prisma.profile.create({
          data: {
            user: { connect: { id: userId ? userId : undefined } },
            lastSeen: new Date(Date.now()),
            memberSince: dataUser?.createdAt
              ? dataUser.createdAt
              : new Date(Date.now()),
            bio: data?.bio,
            city: data?.city,
            country: data?.country,
            gender: data?.gender,
            pronouns: data?.pronouns,
            dob: data?.dob,
            phoneNumber: data.phoneNumber,
            occupation: data?.occupation,
            activiyFeed: data?.activiyFeed,
            coverPhoto: data?.coverPhoto,
            recentActivity: data?.recentActivity
          },
          include: {
            user: { include: { mediaItems: true, _count: true } }
          }
        })
        return createUserProfile;
      });
    return userToProfileCreate;
  }

  async prismaProfiles(
    prisma: PrismaService['profile']
  ): Promise<
    PrismaService['profile'] & {
      Profiles({
        orderBy,
        pronounsFilter,
        dobFilter,
        bioFilter,
        paginationArgs
      }: ProfilesInput): Promise<ProfileConnection>;
    }
  > {
    return Object.assign(prisma, {
      async Profiles({
        orderBy,
        pronounsFilter,
        dobFilter,
        bioFilter,
        paginationArgs,
        genderFilter
      }: ProfilesInput): Promise<ProfileConnection> {
        const edgingThoseProfiles = await findManyCursorConnection(
          args =>
            prisma.findMany({
              include: { user: true },
              where: {
                gender: genderFilter ? genderFilter : undefined,
                pronouns: pronounsFilter ? pronounsFilter : undefined,
                dob: dobFilter ? dobFilter : undefined,
                bio: bioFilter ? bioFilter : undefined
              },
              orderBy: orderBy?._relevance?.fields ? { ...orderBy } : undefined,
              ...args
            }),
          () =>
            prisma.count({
              where: {
                gender: genderFilter ? genderFilter : undefined,
                pronouns: pronounsFilter ? pronounsFilter : undefined,
                dob: dobFilter ? dobFilter : undefined,
                bio: bioFilter ? bioFilter : undefined
              }
            }),
          { ...paginationArgs }
        );
        return edgingThoseProfiles;
      }
    });
  }
  async updateProfile(params: Prisma.ProfileUpdateArgs): Promise<Profile> {
    return await this.prisma.profile.update(params);
  }

  async deleteProfile(params: Prisma.ProfileDeleteArgs): Promise<Profile> {
    return this.prisma.profile.delete(params);
  }

  async relayFindUniqueProfile(params: { id: string }) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: fromGlobalId(params.id).id }
    });
    if (!profile) {
      throw new Error("could not find profile with id " + params.id);
    }
    return profile;
  }

  excludeCursorConnection<ProfileEdge, Key extends keyof ProfileEdge>(
    profileEdge: ProfileEdge,
    ...keys: Key[]
  ): Omit<ProfileEdge, Key> {
    for (const key of keys) {
      delete profileEdge[key];
    }
    return profileEdge;
  }

  async relayFindManyProfiles(params: PaginationArgs) {
    return await this.prisma.profile.findMany({
      ...(await this.paginationService.relayToPrismaPagination(params))
    });
  }
}
