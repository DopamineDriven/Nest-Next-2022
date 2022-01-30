import { PrismaService } from "./prisma.service";

describe("PrismaService", () => {
  let service: PrismaService;

  beforeEach(async () => {
    const Test = (await import("@nestjs/testing")).Test;
    const module = await Test.createTestingModule({
      providers: [PrismaService]
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("should have been called", () => {
    expect(service).toHaveBeenCalled();
  });
});
