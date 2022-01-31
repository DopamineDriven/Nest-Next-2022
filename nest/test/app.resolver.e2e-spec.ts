import * as request from "supertest";
import { Chance } from "chance";
import { INestApplication } from "@nestjs/common";

const chance = new Chance();

describe("AppResolver (e2e)", () => {
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

  it("helloWorld (Query)", async () => {
    // TODO assert return value
    return await request(app.getHttpServer())
      .post("/graphql")
      .send({
        query: "{ helloWorld }"
      })
      .expect(200);
  });
  it("hello (Query)", async () => {
    // TODO assert return value
    const name = chance.name();
    return await request(app.getHttpServer())
      .post("/graphql")
      .send({
        query: `{ hello(name: "${name}") }`
      })
      .expect(200);
  });
});
