import { Inject, Injectable } from "@nestjs/common";
import { hash, compare, hashSync, compareSync } from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { SecurityConfig } from "../common/config/config-interfaces.config";
import { createBrotliCompress } from "zlib";
import crypto, { Cipher } from 'crypto';
import { nanoid } from "nanoid";
import { BufferEncodingOptions, BufferScaffold } from "./enums/buffer-encoding.enum";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";

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
  toBase64(str: string) {
    return BufferScaffold(str, "base64")
  }

  // node_modules/@types/node/crypto.d.ts/cipher namespace
  async customsalter(password: string) {
    const { scrypt, randomFill, createCipheriv } = await import("crypto");

    const algorithm = 'aes-192-cbc';
    scrypt(password, "salt", 24, (error, key) => {
      if (error) throw error;

      randomFill(new Uint16Array(), (error, iv) => {
        if (error) throw error;

        const cipher = createCipheriv(algorithm, key, iv);

        const input = createReadStream("test-custom-salt");

        const output = createWriteStream("test-custom-salt-en");

        pipeline(input, cipher, output, (error) => {
          if (error) throw error;
        })
      })
    })
    const salt = crypto.randomBytes(16).toString()
    const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')
  }

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService
  ) {}

  async validatePassword(validateInput: {
    password: string;
    encryptedPassword: string;
  }): Promise<boolean> {
    return await (async () => {
      return await compare(validateInput.password, validateInput.encryptedPassword);
    })()
      .finally(() => Promise.resolve({}))
      .then(val => val);
  }

  async hashPassword(password: string) {
    return await (async () => {
      return await hash(password, this.bcryptSaltRounds);
    })()
      .finally(() => Promise.resolve({}))
      .then(val => val);
  }

  hashSynchronously(password: string) {
    return hashSync(password, this.bcryptSaltRounds);
  }

  validateSynchronously(validateInput: {
    password: string;
    encryptedPassword: string;
  }) {
    return compareSync(validateInput.password, validateInput.encryptedPassword);
  }
}
/**
 *     T = string extends infer U
      ? U
      : any extends WithImplicitCoercion<infer C>
      ? WithImplicitCoercion<C>
      : WithImplicitCoercion<any>
 */
