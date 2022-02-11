import { Injectable } from "@nestjs/common";
import { hash, compare } from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { SecurityConfig } from "../common/config/config-interfaces.config";

@Injectable()
export class PasswordService {
  get bcryptSaltRounds(): string | number {
    const securityConfig = this.configService.get<SecurityConfig>("security");
    const saltOrRounds = securityConfig?.bcryptSaltOrRound;

    return (saltOrRounds as string) ??
      Number.isInteger(Number.parseInt(saltOrRounds as string, 10))
      ? (saltOrRounds as number)
      : this.bcryptSaltRounds;
  }

  constructor(private configService: ConfigService) { }

  async validatePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }

  async hashPassword(password: string) {
    return await hash(password, this.bcryptSaltRounds).then((data) => data)
  }

}
