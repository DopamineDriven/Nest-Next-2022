export async function seed<T extends import("@prisma/client").PrismaClient>(
  prisma: T
) {
  enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    UNCERTAIN = "UNCERTAIN",
    OTHER = "OTHER"
  }

  enum Pronouns {
    SHE_HER_HERS = "SHE_HER_HERS",
    HE_HIM_HIS = "HE_HIM_HIS",
    THEY_THEM_THEIRS = "THEY_THEM_THEIRS",
    NOT_LISTED = "NOT_LISTED",
    PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY"
  }

  enum Role {
    SUPERADMIN = "SUPERADMIN",
    ADMIN = "ADMIN",
    MAINTAINER = "MAINTAINER",
    USER = "USER"
  }

  enum CommentReactions {
    LIKE = "LIKE",
    LOVE = "LOVE",
    LAUGH = "LAUGH",
    TEARS = "TEARS",
    DISLIKE = "DISLIKE",
    ANGRY = "ANGRY",
    CONFUSED = "CONFUSED",
    CARE = "CARE",
    WOW = "WOW",
    PARROT = "PARROT",
    ROCKET = "ROCKET"
  }

  enum UserStatus {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE",
    SUSPENDED = "SUSPENDED",
    DELETED = "DELETED",
    BANNED = "BANNED",
    DEACTIVATED = "DEACTIVATED"
  }

  const faker = await import("faker");
  const bcrypt = await import("bcrypt");
  const { Country, CountryCode } = await import("../src/profile/enums");
  const hashPassword = async (input: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(input, salt);
    return hash;
  };

  const toBase64 = (str: string) => {
    return Buffer.from(str).toString("base64");
  };

  const hashedPassword = await hashPassword(process.env.PWD ? process.env.PWD : "Nest2022!");
  const seedFirstName = faker.name.firstName();
  const seedSurname = faker.name.lastName();
  const accessToken = faker.datatype.hexaDecimal(166);
  const refreshToken = faker.datatype.hexaDecimal(166);
  const exp = faker.date.future(0.0821355, new Date(Date.now()));
  const seedUserId = faker.datatype.uuid();

  function n(min: number, max: number) {
    const { round, random } = Math;
    return round(random() * (max - min) + min);
  }

  const indexGenerator: {
    quasiRandomGenderIndexGenerator: number[];
    quasiRandomPronounIndexGenerator: number[];
    randomReactionIndexGenerator: number[];
    quasiRandomUserStatusIndexGenerator: number[];
    quasiRandomRoleIndexGenerator: number[];
    randomCountryIndexGenerator: number[];
    randomCountryCodeIndexGenerator: number[];
  } = {
    quasiRandomGenderIndexGenerator: [0, 1, 2, 3, 4, 5, 6, 7].map(
      quasiRandomGenderIndexValue => {
        quasiRandomGenderIndexValue = n(0, 7);
        return quasiRandomGenderIndexValue;
      }
    ),
    quasiRandomPronounIndexGenerator: [0, 1, 2, 3, 4, 5, 6, 7, 8].map(
      quasiRandomPronounIndexValue => {
        quasiRandomPronounIndexValue = n(0, 8);
        return quasiRandomPronounIndexValue;
      }
    ),
    randomReactionIndexGenerator: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
      randomReactionIndexValue => {
        randomReactionIndexValue = n(0, 10);
        return randomReactionIndexValue;
      }
    ),
    quasiRandomUserStatusIndexGenerator: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
    ].map(quasiRandomUserStatusIndexValue => {
      quasiRandomUserStatusIndexValue = n(0, 11);
      return quasiRandomUserStatusIndexValue;
    }),
    quasiRandomRoleIndexGenerator: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
      quasiRandomRoleIndexValue => {
        quasiRandomRoleIndexValue = n(0, 10);
        return quasiRandomRoleIndexValue;
      }
    ),
    randomCountryIndexGenerator: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 14, 15, 16, 17, 18, 19, 20
    ].map(randomCountryIndexValue => {
      randomCountryIndexValue = n(0, 20);
      return randomCountryIndexValue;
    }),
    randomCountryCodeIndexGenerator: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 14, 15, 16, 17, 18, 19, 20
    ].map(randomCountryCodeIndexValue => {
      randomCountryCodeIndexValue = n(0, 20);
      return randomCountryCodeIndexValue;
    })
  };

  const enumSeeder: {
    quasiRandomGender: keyof typeof Gender;
    quasiRandomPronouns: keyof typeof Pronouns;
    randomCommentReaction: keyof typeof CommentReactions;
    quasiRandomUserStatus: keyof typeof UserStatus;
    quasiRandomRole: keyof typeof Role;
    randomCountryCodeSubset: number;
    randomCountrySubset: keyof typeof Country;
  } = {
    quasiRandomGender: [
      Gender.FEMALE,
      Gender.MALE,
      Gender.FEMALE,
      Gender.MALE,
      Gender.OTHER,
      Gender.UNCERTAIN,
      Gender.FEMALE,
      Gender.MALE
    ][
      indexGenerator.quasiRandomGenderIndexGenerator[n(0, 7)]
    ].toString() as unknown as keyof typeof Gender,
    quasiRandomPronouns: [
      Pronouns.HE_HIM_HIS,
      Pronouns.SHE_HER_HERS,
      Pronouns.HE_HIM_HIS,
      Pronouns.SHE_HER_HERS,
      Pronouns.THEY_THEM_THEIRS,
      Pronouns.NOT_LISTED,
      Pronouns.PREFER_NOT_TO_SAY,
      Pronouns.HE_HIM_HIS,
      Pronouns.SHE_HER_HERS
    ][
      indexGenerator.quasiRandomPronounIndexGenerator[n(0, 8)]
    ].toString() as unknown as keyof typeof Pronouns,
    randomCommentReaction: [
      CommentReactions.ANGRY,
      CommentReactions.CARE,
      CommentReactions.CONFUSED,
      CommentReactions.DISLIKE,
      CommentReactions.LAUGH,
      CommentReactions.LIKE,
      CommentReactions.LOVE,
      CommentReactions.PARROT,
      CommentReactions.ROCKET,
      CommentReactions.TEARS,
      CommentReactions.WOW
    ][
      indexGenerator.randomReactionIndexGenerator[n(0, 10)]
    ].toString() as unknown as keyof typeof CommentReactions,
    quasiRandomUserStatus: [
      UserStatus.ONLINE,
      UserStatus.OFFLINE,
      UserStatus.BANNED,
      UserStatus.DEACTIVATED,
      UserStatus.ONLINE,
      UserStatus.OFFLINE,
      UserStatus.ONLINE,
      UserStatus.OFFLINE,
      UserStatus.DELETED,
      UserStatus.SUSPENDED,
      UserStatus.ONLINE,
      UserStatus.OFFLINE
    ][
      indexGenerator.quasiRandomUserStatusIndexGenerator[n(0, 11)]
    ].toString() as unknown as keyof typeof UserStatus,
    quasiRandomRole: [
      Role.USER,
      Role.USER,
      Role.MAINTAINER,
      Role.USER,
      Role.USER,
      Role.ADMIN,
      Role.USER,
      Role.USER,
      Role.ADMIN,
      Role.USER,
      Role.USER
    ][
      indexGenerator.quasiRandomRoleIndexGenerator[n(0, 10)]
    ].toString() as unknown as keyof typeof Role,
    randomCountryCodeSubset: [
      CountryCode.USA,
      CountryCode.UK,
      CountryCode.Australia,
      CountryCode.Germany,
      CountryCode.SouthAfrica,
      CountryCode.Bahamas,
      CountryCode.Taiwan,
      CountryCode.Japan,
      CountryCode.Vietnam,
      CountryCode.India,
      CountryCode.Norway,
      CountryCode.Canada,
      CountryCode.Mexico,
      CountryCode.Chile,
      CountryCode.SaudiArabia,
      CountryCode.Argentina,
      CountryCode.Italy,
      CountryCode.Poland,
      CountryCode.Russia,
      CountryCode.France
    ][indexGenerator.randomCountryCodeIndexGenerator[n(0, 20)]],
    randomCountrySubset: [
      Country.UnitedStates,
      Country.UnitedKingdom,
      Country.Australia,
      Country.Germany,
      Country.SouthAfrica,
      Country.Bahamas,
      Country.Taiwan,
      Country.Japan,
      Country.Vietnam,
      Country.India,
      Country.Norway,
      Country.Canada,
      Country.Mexico,
      Country.Chile,
      Country.SaudiArabia,
      Country.Argentina,
      Country.Italy,
      Country.Poland,
      Country.RussianFederation,
      Country.France
    ][
      indexGenerator.randomCountryIndexGenerator[n(0, 20)]
    ] as unknown as keyof typeof Country
  };

  const thoseDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map(value => {
      value = n(0, 9);
      return value;
    })
    .join("");
  // E164 Intl Format +countrycode${thoseDigits}
  const standardE164 =
    `+${enumSeeder.randomCountryCodeSubset}${thoseDigits}`.trim();

  const usingUnixTime = (): number => {
    const twoThousandFourUnix = 1095379200500; // 2004
    const zeroUnix = 0; // 1970
    const val = n(zeroUnix, twoThousandFourUnix);
    return val;
  };

  const fractionateTimeStamp = (data: string): string[] => {
    return data.split(/([T])/);
  };

  const dobGenerated = fractionateTimeStamp(
    new Date(usingUnixTime()).toISOString()
  )[0]; // adheres to the Date Intl format by splitting the timestamp at the T character

  const userCity = faker.address.city();

  const signature = toBase64(refreshToken);

  const seedUser = async () => {
    return await prisma.user.create({
      data: {
        createdAt: new Date(Date.now()),
        role: enumSeeder.quasiRandomRole,
        email: `${seedFirstName.toLowerCase()}.${seedSurname.toLowerCase()}@gmail.com`,
        image: faker.image.avatar(),
        password: hashedPassword,
        id: seedUserId,
        status: enumSeeder.quasiRandomUserStatus,
        firstName: seedFirstName,
        lastName: seedSurname,
        emailVerified: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        profile: {
          create: {
            bio: [
              { headline: faker.lorem.sentence(12, 14) },
              { body: faker.lorem.paragraph(5) }
            ],
            city: userCity,
            dob: dobGenerated,
            gender: enumSeeder.quasiRandomGender,
            id: faker.datatype.uuid(),
            country: enumSeeder.randomCountrySubset,
            phoneNumber: standardE164,
            memberSince: new Date(Date.now()),
            lastSeen: new Date(Date.now()),
            activiyFeed: [{ feed: `No new activity to show` }],
            pronouns: enumSeeder.quasiRandomPronouns,
            coverPhoto: faker.image.imageUrl(1800, 1800, "winter", true, true),
            occupation: faker.lorem.words(2),
            recentActivity: [{ createdProfile: `${new Date(Date.now())}` }]
          }
        },
        accounts: {
          create: [
            {
              id: faker.datatype.uuid(),
              provider: "custom",
              providerAccountId: `2022CustomAuth:${standardE164}`,
              type: "auth",
              access_token: accessToken,
              refresh_token: refreshToken,
              refresh_secret: signature,
              expires_at: exp.getMilliseconds()
            }
          ]
        },
        sessions: {
          create: [
            {
              exp: new Date(exp).getSeconds(),
              accessToken: accessToken,
              refreshToken: refreshToken,
              alg: "HS512",
              provider: "custom",
              scopes: ["read", "write"],
              tokenState: "VERIFIED",
              lastVerified: new Date(Date.now()),
              signature: signature,
              iat: new Date(Date.now()).getSeconds(),
              id: faker.datatype.uuid()
            }
          ]
        },
        entries: {
          create: [
            {
              title: faker.lorem.words(8),
              content: faker.lorem.paragraphs(4, "\n"),
              featuredImage: faker.image.imageUrl(
                1800,
                1800,
                "winter",
                true,
                true
              ),
              createdAt: new Date(Date.now()),
              id: faker.datatype.uuid(),
              published: [true, false, true, false][n(0, 3)]
            }
          ]
        }
      },
      include: {
        sessions: true,
        accounts: true,
        profile: true,
        entries: true,
        _count: true
      }
    });
  };
  return seedUser();
}
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type SeedInferred = UnwrapPromise<ReturnType<typeof seed>>;

async function main() {
  const PrismaClient = (await import("@prisma/client")).PrismaClient;
  const prisma = new PrismaClient({ log: ["error", "info", "query", "warn"] });
  try {
    await prisma
      .$connect()
      .then(() => console.log("[seeding]: db connection opened"));
    const s = async (): Promise<SeedInferred> =>
      await seed(prisma).then(data => {
        console.log(
          `[seeding]: success 🎉 created ${data.role} with id ${data.id} and email ${data.email} -- in country ${data.profile?.country} having phone number ${data.profile?.phoneNumber} -- gender: ${data.profile?.gender}; pronouns: ${data.profile?.pronouns} -- authored ${data.entries[0].title} having id ${data.entries[0].id}`
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
      .then(() => console.log(`[seeding]: db connection closed`));
  }
}

main();
