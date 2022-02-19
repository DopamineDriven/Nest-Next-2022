import { Injectable, Inject } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import {
  PaginationService,
  PaginationArgs
} from "../pagination/pagination.service";
import { Entry } from "./model/entry.model";
import { EntryCreateOneInput } from "./inputs/entry-create.input";
import { AuthService } from "src/auth/auth-jwt.service";
import { FindManyEntriesPaginatedInput } from "./inputs/entry-paginated.input";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { EntryCreateManyAuthorInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-create-many-author.input";
import { EntryWhereUniqueInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-where-unique.input";
import {
  Field,
  InputType,
  IntersectionType,
  ObjectType
} from "@nestjs/graphql";
import { EntryUpdateManyWithWhereWithoutAuthorInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-update-many-with-where-without-author.input";
import { EntryWhereInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-where.input";
import { EntryUpdateOneRequiredWithoutCommentsInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-update-one-required-without-comments.input";
import { XOR } from "src/common/types/helpers.type";
import { EntryCreateManyAuthorInputEnvelope } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-create-many-author-input-envelope.input";
import { User } from "src/user/model/user.model";
import { EntryCreateOrConnectWithoutAuthorInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-create-or-connect-without-author.input";
import { EntryCreateWithoutAuthorInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-create-without-author.input";
import { EntryUncheckedCreateNestedManyWithoutAuthorInput } from "src/.generated/prisma-nestjs-graphql/entry/inputs/entry-unchecked-create-nested-many-without-author.input";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { GraphQLError } from "graphql";
import { PubSub } from "graphql-subscriptions";
import { valueMatchesCriteria } from "@graphql-tools/utils";
import { EntryCount } from "src/.generated/prisma-nestjs-graphql/entry/outputs/entry-count.output";
import { FindViewerEntriesPaginatedInput } from "./inputs/entry-paginated.input";
@ObjectType("EntryUpdateMapped")
export class EntryUpdateMapped extends IntersectionType(
  EntryUpdateOneRequiredWithoutCommentsInput,
  EntryWhereInput,
  InputType
) {}

@InputType("EntryUpdateInputIntersection")
export class EntryUpdateInputIntersection {
  @Field(() => EntryWhereInput)
  where: EntryWhereInput;

  @Field(() => EntryUpdateManyWithWhereWithoutAuthorInput)
  data: EntryUpdateManyWithWhereWithoutAuthorInput;
}
@Injectable()
export class EntryService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    private readonly paginationService: PaginationService,
    @Inject(AuthService) private readonly authService: AuthService
  ) {}

  async entry(
    entryWhereUniqueInput: XOR<{ id: string }, { authorId: string }>
  ): Promise<Entry | null> {
    const { id, authorId } = entryWhereUniqueInput;
    return (await this.prisma.entry.findUnique({
      where: { id: id } || { authorId: authorId },
      include: { _count: true, author: true }
    })) as unknown as Entry | null;
  }
  excludeEntryField<Entry, Key extends keyof Entry>(
    params: Entry,
    ...keys: Key[]
  ): Omit<Entry, Key> {
    for (const key of keys) {
      `${delete params[key]}`;
    }
    return params;
  }

  async getViewerEntriesPaginated(
    params: FindViewerEntriesPaginatedInput,
    tokenFromContext: string
  ) {
    return await this.authService
      .getUserWithDecodedToken(tokenFromContext)
      .then(async ({ auth, jwt }) => {
        return await findManyCursorConnection(
          args =>
            this.prisma.entry.findMany({
              include: {
                _count: true,
                author: true,
                comments: true,
                categories: true
              },
              distinct: params.distinct,
              take: params.take,
              skip: params.skip,
              where: {
                authorId: { equals: auth.user.id || jwt.payload.userId },
                id: params.where?.id,
                ...params.where
              },
              cursor: {
                authorId: auth.user.id || jwt.payload.userId,
                ...params.cursor
              },
              orderBy: params.orderBy,
              ...args
            }),
          () =>
            this.prisma.entry.count({
              distinct: params.distinct,
              skip: params.skip,
              where: {
                authorId: auth.user.id || jwt.payload.userId,
                ...params.where
              },
              cursor: {
                authorId: auth.user.id || jwt.payload.userId,
                ...params.cursor
              }
            }),
          {
            first: params.pagination.first ?? 10,
            last: params.pagination.last,
            before: params.pagination.before,
            after: params.pagination.after
          },
          {
            getCursor: (record: { id: string } = auth.user) => {
              return record;
            },
            decodeCursor: (cursor: string = auth.user.id) =>
              fromGlobalId(cursor),
            encodeCursor: (cursor: { id: string } = auth.user) =>
              toGlobalId(Entry.name, cursor.id)
          }
        );
      });
  }
  // [{"subtitle":"Atque est quia assumenda voluptatibus autem atque minima soluta quis. Odio expedita asperiores vel amet cupiditate accusantium."},{"body":"Quisquam similique et nemo quia unde. Rem cupiditate voluptas rerum voluptatum. Ea libero eos qui magni minus. Nemo illum eum minima ratione placeat dolorum earum.\nExpedita in atque culpa vero. Voluptatem corporis eum suscipit laborum reprehenderit. Reiciendis modi ullam dolore. Qui sint occaecati qui voluptatibus. Facilis animi explicabo.\nUt sit reprehenderit natus sit facilis fugiat. Commodi ut aliquid natus est eveniet cum quia iusto. Facere nobis accusantium vero. Et quos quia neque eligendi consequatur temporibus incidunt.\nSapiente dolor laudantium perferendis. Sit sapiente molestiae rerum tempora nulla. Et quia rem. Aut voluptatibus aut non repudiandae voluptatibus non excepturi quam exercitationem. Quia harum vitae ab. Quia cumque sit."}]
  async siftEntries(params: FindManyEntriesPaginatedInput) {
    return await findManyCursorConnection(
      args =>
        this.prisma.entry.findMany({
          include: {
            _count: true,
            author: true,
            comments: true,
            categories: true
          },
          distinct: params.distinct,
          take: params.take,
          skip: params.skip,
          where: params.where,
          cursor: args.cursor,
          orderBy: params.orderBy,
          ...args
        }),
      () =>
        this.prisma.entry.count({
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
          toGlobalId(Entry.name, cursor.id)
      }
    );
  }
  async updateManyEntries(
    upsertInput: Omit<EntryUpdateInputIntersection, "authorId">,
    context: string
  ): Promise<Prisma.BatchPayload> {
    return await this.prisma.entry.updateMany({
      where: upsertInput.where ? upsertInput.where : { authorId: context },
      data: upsertInput.data
    });
  }

  async deleteEntry(where: EntryWhereUniqueInput, authorIdFallback?: string) {
    return await this.prisma.entry
      .delete({
        where: where.id ? { id: where.id } : { authorId: `${authorIdFallback}` }
      })
      .then(data => data);
  }

  async relayFindUniqueEntry(params: { id: string }): Promise<Entry | null> {
    const entry = await this.prisma.entry
      .findUnique({
        where: { id: fromGlobalId(params.id).id }
      })
      .author()
      .entries()
      .then(entries => entries[0]);
    if (!entry) {
      throw new Error("could not find entry with id " + params.id);
    }
    return entry as unknown as Entry | null;
  }

  async relayFindManyEntries(params: PaginationArgs) {
    return this.prisma.entry.findMany({
      ...(await this.paginationService.relayToPrismaPagination(params))
    });
  }

  async createEntry(params: {
    data: EntryCreateOneInput;
    accessToken: string;
  }) {
    const getAccessTokenFromContext =
      await this.authService.getUserWithDecodedToken(params.accessToken);

    if (getAccessTokenFromContext) {
      const upsertion = await this.prisma.user
        .upsert({
          include: {
            _count: true,
            entries: { include: { _count: true, author: true } }
          },
          where: { id: getAccessTokenFromContext.jwt.payload.userId },
          create: {
            email: getAccessTokenFromContext.auth.user.email,
            entries: { create: { ...params.data } }
          },
          update: {
            entries: {
              create: { ...params.data },
              connect: { authorId: getAccessTokenFromContext.auth.user.id }
            }
          }
        })
        .then(data => {
          return {
            entry: data.entries[0]
          };
        })
        .then(data => {
          return data.entry;
        });
      return upsertion;
    }
  }

  async createNewEntry(
    params: EntryUncheckedCreateNestedManyWithoutAuthorInput,
    accessToken: string
  ) {
    await this.authService
      .getUserWithDecodedToken(accessToken)
      .then(async ({ auth, jwt }) => {
        return await this.prisma.user.update({
          include: {
            entries: {
              cursor: { authorId: jwt.payload.userId },
              include: { _count: true, author: true }
            },
            _count: true
          },
          where: { id: auth.user.id },
          data: { entries: { ...params } }
        });
      });
  }

  async newEntry(
    params: EntryUncheckedCreateNestedManyWithoutAuthorInput,
    accessToken: string
    // pubSubProgation: PubSub
  ) {
    try {
      const transactionnn = await this.authService
        .getUserWithDecodedToken(accessToken)
        .then(async ({ auth, jwt }) => {
          return await this.prisma
            .$transaction([
              this.prisma.user.update({
                include: {
                  entries: {
                    cursor: {
                      authorId: jwt.payload.userId
                    },
                    include: { _count: true, author: true }
                  },
                  _count: true
                },
                where: { id: jwt.payload.userId },
                data: { entries: { ...params } }
              }),
              this.prisma.entry.findFirst({
                include: { author: true, _count: true },
                orderBy: { createdAt: "asc" },
                cursor: { authorId: auth.user.id }
              })
            ])
            .then(value => {
              return {
                entryTransaction: value[0],
                entryCountUser: value[1]
              };
            });
        });
      if (transactionnn != null) {
        return transactionnn.entryCountUser;
      } else {
        const getUserFromToken = await this.authService.getUserWithDecodedToken(
          accessToken
        );
        return await this.prisma.entry.findUnique({
          include: { _count: true, author: true },
          where: { authorId: getUserFromToken.jwt.payload.userId }
        });
      }
    } catch (error) {
      throw new GraphQLError(
        `new error in try.catch blck of newEntry mutation ${error}`
      );
    }
    // finally {
    //   pubSubProgation.publish("entryCreated", {
    //     entryCreated: transactions.entryTransaction.entries[0]
    //   });
    //   return {
    //     entry: transactions.entryCountUser,
    //     transaction: transactions.entryTransaction
    //   }
    // }
  }

  async createManyEntry(
    params: FindManyEntriesPaginatedInput,
    data: EntryCreateManyAuthorInput,
    token: string
  ) {
    const getUserFromContext = await this.authService.getUserWithDecodedToken(
      token
    );
    return await this.prisma
      .$transaction(
        async (prisma = this.prisma) => {
          const findUniqueUser = await prisma.user.findUnique({
            where: { id: getUserFromContext.jwt.payload.userId },
            include: { entries: true, _count: true }
          });
          const createManyEntries = await prisma.entry.createMany({
            skipDuplicates: true,
            data: {
              authorId: getUserFromContext.jwt.payload.userId,
              ...data
            }
          });
          const findManyCreatedEntries = await this.siftEntries(params);
          return {
            user: findUniqueUser,
            createMany: createManyEntries,
            getPaginatedReturn: findManyCreatedEntries
          };
        },
        { maxWait: 10000, timeout: 10000 }
      )
      .then(({ createMany, getPaginatedReturn, user }) => {
        return {
          createMany,
          getPaginatedReturn,
          user
        };
      });
  }
}
//   findManyCursorConnection(
//   args =>
//     prisma.entry.findMany({
//       include: {
//         _count: true,
//         author: true,
//         comments: true,
//         categories: true
//       },
//       distinct: params.distinct,
//       take: params.take,
//       skip: params.skip,
//       where: params.where,
//       cursor: args.cursor,
//       orderBy: params.orderBy,
//       ...args
//     }),
//   () =>
//     prisma.entry.count({
//       distinct: params.distinct,
//       skip: params.skip,
//       where: params.where,
//       cursor: params.cursor
//     }),
//   {
//     first: params.pagination.first ?? 10,
//     last: params.pagination.last,
//     before: params.pagination.before,
//     after: params.pagination.after
//   },
//   {
//     getCursor: (record: { id: string }) => {
//       return record;
//     },
//     decodeCursor: (cursor: string) => fromGlobalId(cursor),
//     encodeCursor: (cursor: { id: string }) =>
//       toGlobalId(Entry.name, cursor.id)
//   }
// );
