import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import {
  PaginationService,
  PaginationArgs
} from "../pagination/pagination.service";
import { ProfileConnection } from "./model/profile-connection.model";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { ProfilesInput } from "./inputs/profiles.input";
import { ProfileCreateInput } from "src/.generated/prisma-nestjs-graphql/profile/inputs/profile-create.input";
import { FindManyProfilesPaginatedInput } from "./inputs/profile-paginated.input";
import { Profile } from "./model/profile.model";
import { ProfileWhereUniqueInput } from "src/.generated/prisma-nestjs-graphql/profile/inputs/profile-where-unique.input";
import { ProfileUncheckedUpdateInput } from "src/.generated/prisma-nestjs-graphql/profile/inputs/profile-unchecked-update.input";

@Injectable()
export class ProfileService {
  constructor(
    private prismaService: PrismaService,
    @Inject(PaginationService) private paginationService: PaginationService
  ) {}

  async profile(
    profileWhereUniqueInput: ProfileWhereUniqueInput
  ): Promise<Profile | null> {
    return await this.prismaService.profile
      .findUnique({
        where: profileWhereUniqueInput
      })
      .then();
  }

  async findFirstProfiles(
    params: Prisma.ProfileFindFirstArgs
  ): Promise<Profile | null> {
    return await this.prismaService.profile
      .findFirst({ ...params })
      .user()
      .profile()
      .then(data => data)
      .then();
  }
  async createProfile(data: ProfileCreateInput, userId: string | undefined) {
    const userToProfileCreate = await this.prismaService.user
      .findFirst({
        where: { id: userId },
        include: {
          _count: true,
          mediaItems: true,
          profile: true,
          entries: true
        }
      })
      .then(async dataUser => {
        const createUserProfile = await this.prismaService.profile.create({
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
        });
        return createUserProfile;
      });
    return userToProfileCreate;
  }

  async prismaProfiles(prisma: PrismaService["profile"]): Promise<
    PrismaService["profile"] & {
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
  async updateProfile(
    params: ProfileUncheckedUpdateInput,
    userId: string
  ): Promise<Profile> {
    return await this.prismaService.profile.update({
      data: { ...params },
      where: { userId: userId },
      include: { user: true }
    });
  }

  async deleteProfile(params: Prisma.ProfileDeleteArgs): Promise<Profile> {
    return this.prismaService.profile.delete(params);
  }

  async relayFindUniqueProfile(params: { id: string }) {
    const profile = await this.prismaService.profile.findUnique({
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
    return await this.prismaService.profile.findMany({
      ...(await this.paginationService.relayToPrismaPagination(params))
    });
  }

  async listProfiles(params: FindManyProfilesPaginatedInput) {
    return await findManyCursorConnection(
      args =>
        this.prismaService.profile.findMany({
          include: {
            user: true
          },
          distinct: params.distinct,
          take: params.take,
          skip: params.skip,
          where: params.where,
          cursor: params.cursor,
          orderBy: params.orderBy,
          ...args
        }),
      () =>
        this.prismaService.profile.count({
          orderBy: params.orderBy,
          take: params.take,
          distinct: params.distinct,
          skip: params.skip,
          where: params.where,
          cursor: params.cursor
        }),
      {
        first: params.pagination.first ?? 10,
        last: params.pagination.last,
        before: params.pagination.before,
        after: params.pagination.after
      },
      {
        getCursor: (record: { id: string }) => {
          return record;
        },
        decodeCursor: (cursor: string) => fromGlobalId(cursor),
        encodeCursor: (cursor: { id: string }) =>
          toGlobalId(Profile.name, cursor.id)
      }
    );
  }
}
