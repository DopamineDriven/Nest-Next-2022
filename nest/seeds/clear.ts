export const clearData = async <
  T extends import("@prisma/client").PrismaClient
>(
  prisma: T
) => {
  const {
    "0": verificationToken,
    "1": mediaItem,
    "2": comment,
    "3": connection,
    "4": category,
    "5": entry,
    "6": account,
    "7": profile,
    "8": session,
    "9": user
  } = await prisma
    .$transaction([
      prisma.verificationToken.deleteMany({}),
      prisma.mediaItem.deleteMany({}),
      prisma.comment.deleteMany({}),
      prisma.connection.deleteMany({}),
      prisma.category.deleteMany({}),
      prisma.entry.deleteMany({}),
      prisma.account.deleteMany({}),
      prisma.profile.deleteMany({}),
      prisma.session.deleteMany({}),
      prisma.user.deleteMany({})
    ]);

  return {
    verificationToken,
    mediaItem,
    comment,
    connection,
    category,
    entry,
    account,
    profile,
    session,
    user
  };
};

export const clearUsers = async <
  T extends import("@prisma/client").PrismaClient
>(
  prisma: T
) => {
  const getUsers = async () =>
    await prisma.user.findMany({
      include: {
        accounts: true,
        categories: true,
        comments: true,
        connections: true,
        entries: true,
        mediaItems: true,
        profile: true,
        sessions: true,
        _count: true
      }
    });
  const clearUserData = async () => {
    if ((await getUsers()).length > 0) {
      for (const user of await getUsers()) {
        return await prisma.user.delete({ where: { id: user.id } });
      }
    } else {
      return "clear";
    }
  };
  return await clearUserData();
  // for (const user of getUsers) {
  //   return await prisma.user.delete({where: {id: user.id}})
  // }
  // const users = await prisma.user.deleteMany({});
  // if (users.count > 0) {
  //   return await prisma.user.deleteMany({where: {AND: [{id: ""}, {id: ""}]}});
  // }
};

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type ClearInferred = UnwrapPromise<ReturnType<typeof clearData>>;

async function main() {
  const PrismaClient = (await import("@prisma/client")).PrismaClient;
  const prisma = new PrismaClient();
  try {
    await prisma
      .$connect()
      .then(() => console.log("[clearing]: db connection opened"));
    const s = async (): Promise<ClearInferred> =>
      await clearData(prisma).then(data => {
          console.log(
            `[clearing]: there are ${data.user.count} users, ${data.account.count} accounts, ${data.comment.count} comments, ${data.connection.count} connections, ${data.category.count} categories, ${data.entry.count} entries, ${data.profile.count} profiles, ${data.session.count} sessions, ${data.mediaItem.count} media items, and ${data.verificationToken.count} verification requests remaining`

          );

        console.log();
        return data;
      });
    return await s();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    const checkUsers = await prisma.user.findMany();
    if (checkUsers.length > 0) await clearUsers(prisma);
    return await prisma
      .$disconnect()
      .then(() => console.log(`[clearing]: db connection closed`));
  }
}
main();
