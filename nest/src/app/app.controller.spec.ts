import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Chance } from "chance";
const chance = new Chance();

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it(
      "should return " +
        `${new Date(Date.now()).toISOString().split(/([T])/)[0]}`,
      () => {
        expect(appController.getRedisPing()).toBe(
          `${new Date(Date.now()).toISOString().split(/([T])/)[0]}`
        );
      }
    );
  });
});
