import { Chance } from "chance";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";

const chance = new Chance();

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const AppModule = (await import("../src/app.module")).AppModule;
    const Test = (await import("@nestjs/testing")).Test;

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it("/ (GET)", async () => {
    return await request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect("Hello World!");
  });

  it("/hello/:name (GET)", async () => {
    const name = chance.name();
    return await request(app.getHttpServer())
      .get(`/hello/${name}`)
      .expect(200)
      .expect(`Hello ${name}!`);
  });
});
