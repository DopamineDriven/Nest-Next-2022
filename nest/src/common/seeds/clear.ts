export const clearData = async <T extends import("@prisma/client").PrismaClient>(prisma: T) => {
  const users = await prisma.user.deleteMany({});
  const accounts = await prisma.account.deleteMany({});
  const entries = await prisma.entry.deleteMany({});
  const connections = await prisma.connection.deleteMany({});
  const comments = await prisma.comment.deleteMany({});
  const categories = await prisma.category.deleteMany({});
  const verificationRequests = await prisma.verificationToken.deleteMany({});
  const sessions = await prisma.session.deleteMany({});
  const profile = await prisma.profile.deleteMany({});

  return {
    accounts,
    profile,
    sessions,
    entries,
    connections,
    categories,
    comments,
    verificationRequests,
    users
  };
};

export const clearUsers = async <T extends import("@prisma/client").PrismaClient>(prisma: T)  => {
  const getUsers = async () => await prisma.user.findMany({
    include: {accounts: true, categories: true, comments: true, connections: true, entries: true, profile: true, sessions: true, _count: true}
  });
  const clearUserData =async () => {
    if ((await getUsers()).length  >  0) {
      for (const user of await getUsers()) {
        return await prisma.user.delete({ where: { id: user.id } })
      }
    } else {
      return "clear"
    }
  }
  return await clearUserData();
  // for (const user of getUsers) {
  //   return await prisma.user.delete({where: {id: user.id}})
  // }
  // const users = await prisma.user.deleteMany({});
  // if (users.count > 0) {
  //   return await prisma.user.deleteMany({where: {AND: [{id: ""}, {id: ""}]}});
  // }

}

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
          `[clearing]: there are ${data.users.count} users, ${data.accounts.count} accounts, ${data.comments.count} comments, ${data.connections.count} connections, ${data.categories.count} categories, ${data.entries.count} entries, ${data.profile.count} profiles, ${data.sessions.count} sessions, and ${data.verificationRequests.count} verification requests remaining`
        );
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