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

  constructor(private configService: ConfigService) {}

  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  hashPassword(password: string): Promise<string> {
    return hash(password, this.bcryptSaltRounds);
  }
}
