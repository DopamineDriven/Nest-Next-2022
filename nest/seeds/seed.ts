import * as Prisma from "@prisma/client";

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

  enum MediaItemDestination {
    COVER_IMAGE = "COVER_IMAGE",
    AVATAR = "AVATAR",
    COMMENT_ATTACHMENT = "COMMENT_ATTACHMENT",
    ENTRY_ATTACHMENT = "ENTRY_ATTACHMENT",
    FEATURED_IMAGE = "FEATURED_IMAGE"
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
  enum MimeTypes {
    GIF = "GIF",
    JPEG = "JPEG",
    WEBP = "WEBP",
    AVIF = "AVIF",
    PNG = "PNG",
    SVG = "SVG",
    TIFF = "TIFF",
    BMP = "BMP"
  }
  const faker = await import("faker");
  const bcrypt = await import("bcrypt");
  const { Country, CountryCode } = await import("../src/profile/enums");
  const hashPassword = async (input: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(input, salt);
    return hash;
  };
  const Prisma = await import("@prisma/client");

  const toBase64 = (str: string) => {
    return Buffer.from(str).toString("base64");
  };

  const hashedPassword = await hashPassword(
    process.env.PWD ? process.env.PWD : "Nest2022!"
  );
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

  const {
    UnitedStates,
    UnitedKingdom,
    Australia,
    Germany,
    SouthAfrica,
    Bahamas,
    Taiwan,
    Japan,
    Vietnam,
    India,
    Norway,
    Canada,
    Mexico,
    Chile,
    SaudiArabia,
    Argentina,
    Italy,
    Poland,
    RussianFederation,
    France
  } = Country;
  const seedUserCountry = (min: number, max: number) =>
    [
      UnitedStates,
      UnitedKingdom,
      Australia,
      Germany,
      SouthAfrica,
      Bahamas,
      Taiwan,
      Japan,
      Vietnam,
      India,
      Norway,
      Canada,
      Mexico,
      Chile,
      SaudiArabia,
      Argentina,
      Italy,
      Poland,
      RussianFederation,
      France
    ][n(min, max)];

  const userCountry = seedUserCountry(0, 20);

  const countryToCountryCode = (country: typeof userCountry = userCountry) =>
    userCountry.valueOf().includes(UnitedStates) && country === UnitedStates
      ? CountryCode.USA.valueOf()
      : userCountry.valueOf().includes(UnitedKingdom) &&
        country === UnitedKingdom
      ? CountryCode.UK.valueOf()
      : userCountry.valueOf().includes(Australia) && country === Australia
      ? CountryCode.Australia.valueOf()
      : userCountry.valueOf().includes(Germany) && country === Germany
      ? CountryCode.Germany.valueOf()
      : userCountry.valueOf().includes(SouthAfrica) && country === SouthAfrica
      ? CountryCode.SouthAfrica.valueOf()
      : userCountry.valueOf().includes(Bahamas) && country === Bahamas
      ? CountryCode.Bahamas.valueOf()
      : userCountry.valueOf().includes(Taiwan) && country === Taiwan
      ? CountryCode.Taiwan.valueOf()
      : userCountry.valueOf().includes(Japan) && country === Japan
      ? CountryCode.Japan.valueOf()
      : userCountry.valueOf().includes(Vietnam) && country === Vietnam
      ? CountryCode.Vietnam.valueOf()
      : userCountry.valueOf().includes(India) && country === India
      ? CountryCode.India.valueOf()
      : userCountry.valueOf().includes(Norway) && country === Norway
      ? CountryCode.Norway.valueOf()
      : userCountry.valueOf().includes(Canada) && country === Canada
      ? CountryCode.Canada.valueOf()
      : userCountry.valueOf().includes(Mexico) && country === Mexico
      ? CountryCode.Mexico.valueOf()
      : userCountry.valueOf().includes(Chile) && country === Chile
      ? CountryCode.Chile.valueOf()
      : userCountry.valueOf().includes(SaudiArabia) && country === SaudiArabia
      ? CountryCode.SaudiArabia.valueOf()
      : userCountry.valueOf().includes(Argentina) && country === Argentina
      ? CountryCode.Argentina.valueOf()
      : userCountry.valueOf().includes(Italy) && country === Italy
      ? CountryCode.Italy.valueOf()
      : userCountry.valueOf().includes(Poland) && country === Poland
      ? CountryCode.Poland.valueOf()
      : userCountry.valueOf().includes(RussianFederation) &&
        country === RussianFederation
      ? CountryCode.Russia.valueOf()
      : userCountry.valueOf().includes(France) && country === France
      ? CountryCode.France.valueOf()
      : 0;

  const thoseDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map(value => {
      value = n(0, 9);
      return value;
    })
    .join("");
  const phoneNumberCallingCode = countryToCountryCode(userCountry)
    .valueOf()
    .toString()
    .trim();
  // E164 Intl Format +countrycode${thoseDigits}
  const standardE164 = `+${phoneNumberCallingCode}${thoseDigits}`.trim();

  const usingUnixTime = (): number => {
    const twoThousandFourUnix = 1095379200500; // 2004
    const zeroUnix = 0; // 1970
    const val = n(zeroUnix, twoThousandFourUnix);
    return val;
  };

  const fractionateTimeStamp = (data: string): string[] => {
    return data.split(/([T])/);
  };
  const featuredImageFileLastModified = faker.date
    .past(0.0921355, new Date(Date.now()))
    .toUTCString();
  const featuredImageId = faker.datatype.uuid();
  const featuredImageName = `${seedFirstName}s-featured-image`;
  const featuredImage = [
    {
      id: featuredImageId,
      uploadedAt: new Date(Date.now()).toUTCString(),
      quality: 90,
      fileLastModified: featuredImageFileLastModified,
      filename: featuredImageName,
      src: faker.image.imageUrl(2250.5, 1550.75, "galaxy", true, true),
      srcSet: "",
      type: MimeTypes.WEBP,
      size: "1.35MB",
      width: 2250.75,
      height: 1550.75,
      caption: faker.lorem.sentence(5),
      title: `${seedFirstName} ${seedSurname}'s Featured Image`,
      ariaLabel: "Accessibility label",
      destination: MediaItemDestination.FEATURED_IMAGE,
      unique: `${seedUserId}_${featuredImageName}`
    }
  ];

  const featuredImageString = faker.image.imageUrl(
    2250.5,
    1550.75,
    "galaxy",
    true,
    true
  );
  const coverImageFileLastModified = faker.date
    .past(0.0821355, new Date(Date.now()))
    .toUTCString();
  const coverImageId = faker.datatype.uuid();
  const coverImageFilename = `${seedFirstName}s-killer-cover`;
  const coverImage = [
    {
      id: coverImageId,
      uploadedAt: new Date(Date.now()).toUTCString(),
      fileLastModified: coverImageFileLastModified,
      filename: coverImageFilename,
      src: faker.image.imageUrl(2500.0, 1750.25, "winter", true, true),
      srcSet: "",
      type: MimeTypes.WEBP,
      size: "12.5MB",
      width: 2500.0,
      quality: 80,
      height: 1750.25,
      title: `${seedFirstName} ${seedSurname}'s Cover Image`,
      ariaLabel: "Accessibility label",
      caption: faker.lorem.sentence(5),
      destination: MediaItemDestination.COVER_IMAGE,
      unique: `${seedUserId}_${coverImageFilename}`
    }
  ].map(t => t);

  const coverImageString = faker.image.imageUrl(
    2500.0,
    1750.25,
    "abstract",
    true,
    true
  );
  const userAvatarFileLastModified = faker.date
    .past(0.0221355, new Date(Date.now()))
    .toUTCString();

  const userAvatarId = faker.datatype.uuid();
  const userAvatarFileName = `${seedFirstName}s-fresh-avatar`;
  const userAvatar = [
    {
      id: userAvatarId,
      uploadedAt: new Date(Date.now()).toUTCString(),
      fileLastModified: userAvatarFileLastModified,
      quality: 100,
      filename: userAvatarFileName,
      src: faker.image.imageUrl(125.0, 125.0, "abstract", true, true),
      srcSet: "",
      type: MimeTypes.WEBP,
      size: "0.25MB",
      width: 125.0,
      height: 125.0,
      caption: faker.lorem.sentence(5),
      title: `${seedFirstName} ${seedSurname}'s Avatar`,
      ariaLabel: "Accessibility label",
      destination: MediaItemDestination.AVATAR,
      unique: `${seedUserId}_${userAvatarFileName}`
    }
  ];

  const userAvatarString = `https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g4apn65eo8acy988pfhb.gif`;

  const dobGenerated = fractionateTimeStamp(
    new Date(usingUnixTime()).toUTCString()
  )[0]; // adheres to the Date Intl format by splitting the timestamp at the T character

  const userCity = faker.address.city();
  const entryId = faker.datatype.uuid();
  const signature = toBase64(refreshToken);
  const reactionTemplate = (min: number, max: number) =>
    [
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
      CommentReactions.WOW,
      CommentReactions.LAUGH,
      CommentReactions.LIKE,
      CommentReactions.LOVE,
      CommentReactions.PARROT,
      CommentReactions.LAUGH,
      CommentReactions.LIKE,
      CommentReactions.LOVE,
      CommentReactions.PARROT,
      CommentReactions.LAUGH,
      CommentReactions.LIKE,
      CommentReactions.LOVE,
      CommentReactions.PARROT,
      CommentReactions.LAUGH,
      CommentReactions.LIKE,
      CommentReactions.LOVE,
      CommentReactions.PARROT,
      CommentReactions.LAUGH,
      CommentReactions.LIKE,
      CommentReactions.LOVE,
      CommentReactions.PARROT
    ][n(min, max)] as keyof typeof CommentReactions;
  // intra-enum field ratios reflective of general population frequencies
  const seedUser = async () => {
    return await prisma.user.create({
      data: {
        createdAt: new Date(Date.now()),
        role: [
          Role.USER,
          Role.USER,
          Role.MAINTAINER,
          Role.USER,
          Role.USER,
          Role.ADMIN,
          Role.USER,
          Role.USER,
          Role.USER,
          Role.ADMIN,
          Role.USER,
          Role.USER
        ][n(0, 10)] as keyof typeof Role,
        email: `${seedFirstName.toLowerCase()}.${seedSurname.toLowerCase()}@gmail.com`,
        image: userAvatarString,
        password: hashedPassword,
        id: seedUserId,
        status: [
          UserStatus.ONLINE,
          UserStatus.OFFLINE,
          UserStatus.ONLINE,
          UserStatus.DEACTIVATED,
          UserStatus.ONLINE,
          UserStatus.OFFLINE,
          UserStatus.ONLINE,
          UserStatus.OFFLINE,
          UserStatus.ONLINE,
          UserStatus.OFFLINE,
          UserStatus.ONLINE,
          UserStatus.ONLINE,
          UserStatus.OFFLINE
        ][n(0, 11)] as keyof typeof UserStatus,
        firstName: seedFirstName,
        lastName: seedSurname,
        emailVerified: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        profile: {
          create: {
            bio: {
              set: [
                { headline: faker.lorem.sentence(12, 14) },
                { body: faker.lorem.paragraph(5) }
              ] as Prisma.Prisma.InputJsonArray
            } as Prisma.Prisma.InputJsonObject,
            city: userCity,
            dob: dobGenerated,
            gender: [
              Gender.FEMALE,
              Gender.MALE,
              Gender.MALE,
              Gender.FEMALE,
              Gender.MALE,
              Gender.FEMALE,
              Gender.OTHER,
              Gender.UNCERTAIN,
              Gender.FEMALE,
              Gender.FEMALE,
              Gender.MALE,
              Gender.MALE
            ][n(0, 11)] as keyof typeof Gender,
            id: faker.datatype.uuid(),
            country: [
              UnitedStates,
              UnitedKingdom,
              Australia,
              Germany,
              SouthAfrica,
              Bahamas,
              Taiwan,
              Japan,
              Vietnam,
              India,
              Norway,
              Canada,
              Mexico,
              Chile,
              SaudiArabia,
              Argentina,
              Italy,
              Poland,
              RussianFederation,
              France
            ][n(0, 20)],
            phoneNumber: standardE164,
            memberSince: new Date(Date.now()),
            lastSeen: new Date(Date.now()),
            activiyFeed: [{ feed: `No new activity to show` }],
            pronouns: [
              Pronouns.HE_HIM_HIS,
              Pronouns.SHE_HER_HERS,
              Pronouns.HE_HIM_HIS,
              Pronouns.SHE_HER_HERS,
              Pronouns.HE_HIM_HIS,
              Pronouns.SHE_HER_HERS,
              Pronouns.HE_HIM_HIS,
              Pronouns.SHE_HER_HERS,
              Pronouns.THEY_THEM_THEIRS,
              Pronouns.NOT_LISTED,
              Pronouns.PREFER_NOT_TO_SAY,
              Pronouns.HE_HIM_HIS,
              Pronouns.SHE_HER_HERS,
              Pronouns.HE_HIM_HIS,
              Pronouns.SHE_HER_HERS
            ][n(0, 14)],
            coverPhoto: coverImageString,
            occupation: faker.lorem.words(2),
            recentActivity: {
              set: [
                { createdProfile: `${new Date(Date.now())}` }
              ] as Prisma.Prisma.InputJsonArray
            } as Prisma.Prisma.InputJsonObject
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
              content: {
                set: [
                  { subtitle: faker.lorem.sentences(2) },
                  { body: faker.lorem.paragraphs(4, "\n") }
                ] as Prisma.Prisma.InputJsonArray
              } as Prisma.Prisma.InputJsonObject,
              featuredImage: featuredImage,
              createdAt: new Date(Date.now()),
              id: entryId,
              published: [true, false, true, false][n(0, 3)]
            }
          ]
        },
        comments: {
          connectOrCreate: {
            where: {
              authorId_entryId: { authorId: seedUserId, entryId: entryId }
            },
            create: {
              body: {
                set: [
                  {
                    input: [
                      {
                        ip: [
                          faker.internet.ip(),
                          faker.internet.ipv6(),
                          faker.internet.ip(),
                          faker.internet.ip()
                        ][n(0, 3)]
                      },
                      { timestamp: new Date(Date.now()) },
                      { content: faker.lorem.paragraph(3) }
                    ] as Prisma.Prisma.InputJsonArray
                  } as Prisma.Prisma.InputJsonObject
                ] as Prisma.Prisma.InputJsonArray
              } as Prisma.Prisma.InputJsonObject,
              createdAt: new Date(Date.now()),
              entryId: entryId,
              id: faker.datatype.uuid(),
              updatedAt: new Date(Date.now()),
              reactions: {
                set: [
                  reactionTemplate(0, 30),
                  reactionTemplate(0, 30),
                  reactionTemplate(0, 30),
                  reactionTemplate(0, 30),
                  reactionTemplate(0, 30)
                ] as (keyof typeof CommentReactions)[]
              },
              position: "MAIN"
            }
          }
        },
        mediaItems: {
          createMany: {
            skipDuplicates: true,
            data: [
              {
                id: coverImage.find(id => id)?.id,
                name: coverImage.find(filename => filename)?.filename,
                height: coverImage.find(height => height.height)?.height,
                width: coverImage.find(width => width)?.width,
                src: coverImage.find(src => src)?.src,
                srcSet: coverImage.find(srcSet => srcSet)?.srcSet,
                quality: coverImage.find(quality => quality)?.quality,
                size: coverImage.find(size => size)?.size,
                fileLastModified: new Date(Date.now() - 2629800000),
                uploadedAt: new Date(
                  `${coverImage.find(uploadedAt => uploadedAt)?.uploadedAt}`
                ),
                type: coverImage.find(type => type)?.type,
                ariaLabel: coverImage.find(ariaLabel => ariaLabel)?.ariaLabel,
                destination: coverImage.find(destination => destination)
                  ?.destination,
                caption: coverImage.find(caption => caption)?.caption,
                title: coverImage.find(title => title)?.title
              },
              {
                id: featuredImage.find(id => id)?.id,
                name: featuredImage.find(filename => filename)?.filename,
                height: featuredImage.find(height => height.height)?.height,
                width: featuredImage.find(width => width)?.width,
                src: featuredImage.find(src => src)?.src,
                srcSet: featuredImage.find(srcSet => srcSet)?.srcSet,
                quality: featuredImage.find(quality => quality)?.quality,
                size: featuredImage.find(size => size)?.size,
                fileLastModified: new Date(Date.now() - 2629800000),
                uploadedAt: new Date(
                  `${featuredImage.find(uploadedAt => uploadedAt)?.uploadedAt}`
                ),
                type: featuredImage.find(type => type)?.type,
                ariaLabel: featuredImage.find(ariaLabel => ariaLabel)
                  ?.ariaLabel,
                destination: featuredImage.find(destination => destination)
                  ?.destination,
                caption: featuredImage.find(caption => caption)?.caption,
                title: featuredImage.find(title => title)?.title
              },
              {
                id: userAvatar.find(id => id)?.id,
                name: userAvatar.find(filename => filename)?.filename,
                height: userAvatar.find(height => height.height)?.height,
                width: userAvatar.find(width => width)?.width,
                src: userAvatar.find(src => src)?.src,
                srcSet: userAvatar.find(srcSet => srcSet)?.srcSet,
                quality: userAvatar.find(quality => quality)?.quality,
                size: userAvatar.find(size => size)?.size,
                fileLastModified: new Date(Date.now() - 2629800000),
                uploadedAt: new Date(
                  `${userAvatar.find(uploadedAt => uploadedAt)?.uploadedAt}`
                ),
                type: userAvatar.find(type => type)?.type,
                ariaLabel: userAvatar.find(ariaLabel => ariaLabel)?.ariaLabel,
                destination: userAvatar.find(destination => destination)
                  ?.destination,
                caption: userAvatar.find(caption => caption)?.caption,
                title: userAvatar.find(title => title)?.title
              }
            ]
          }
        }
      },
      include: {
        categories: true,
        connections: true,
        sessions: true,
        accounts: true,
        profile: true,
        entries: true,
        _count: true,
        comments: true,
        mediaItems: true
      }
    });
  };
  return seedUser();
}
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type SeedInferred = UnwrapPromise<ReturnType<typeof seed>>;
// experimenting
type SeedPropsInferred<U> = UnwrapPromise<
  typeof seed extends Record<keyof U, infer U>
    ? Record<keyof U, U>
    : UnwrapPromise<typeof seed>
>;

async function main() {
  const PrismaClient = (await import("@prisma/client")).PrismaClient;
  const prisma = new PrismaClient({ log: ["error", "info", "query", "warn"] });
  try {
    await prisma
      .$connect()
      .then(() => console.log("[seeding]: db connection opened"));
    const s: SeedPropsInferred<{
      props: typeof prisma;
    }> = async (): Promise<SeedInferred> =>
      await seed(prisma).then(data => {
        console.log(
          JSON.stringify(
            `[seeding]: success 🎉 created ${data.role} with id ${data.id} and email ${data.email} -- in country ${data.profile?.country} having phone number ${data.profile?.phoneNumber} -- gender: ${data.profile?.gender}; pronouns: ${data.profile?.pronouns} -- authored ${data.entries[0].title} having id ${data.entries[0].id} -- with avatar ${data.image} having reactions to a comment on their entry of ${data.comments[0].reactions}`,
            null,
            2
          )
        );
        return data;
      });
    return await s(prisma);
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
