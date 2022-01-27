import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { Chance } from "chance";
import { INestApplication } from "@nestjs/common";

const chance = new Chance();

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const PrismaService = (await import("../src/prisma/prisma.service")).PrismaService;
    const prismaService = new PrismaService(); 
    app.get(PrismaService);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    prismaService.enableShutdownHooks(app)
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect("Hello World!");
  });

  it("/hello/:name (GET)", () => {
    const name = chance.name();
    return request(app.getHttpServer())
      .get(`/hello/${name}`)
      .expect(200)
      .expect(`Hello ${name}!`);
  });
});
