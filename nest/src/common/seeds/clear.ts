export const clearData = async () => {
  const { PrismaClient } = (await import("@prisma/client"));
  const prisma = new PrismaClient({ log: ["info", "error", "warn"] });
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
    users,
    accounts,
    profile,
    sessions,
    entries,
    connections,
    categories,
    comments,
    verificationRequests
  };
};


type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type SeedInferred = UnwrapPromise<ReturnType<typeof clearData>>;

async function main() {
  const PrismaClient = (await import("@prisma/client")).PrismaClient;
  const prisma = new PrismaClient();
  try {
    await prisma
      .$connect()
      .then(() => console.log("[clearing]: db connection opened"));
    const s = async (): Promise<SeedInferred> =>
      await clearData().then(data => {
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
    return await prisma
      .$disconnect()
      .then(() => console.log(`[clearing]: db connection closed`));
  }
}
main();