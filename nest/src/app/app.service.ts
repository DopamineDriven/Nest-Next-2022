import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  getHelloName(name: string): string {
    return `Hello ${name}!`;
  }

  async getLoginParam(Authorization: string | null) {
    return { Authorization: "Bearer " + Authorization };
  }
}
