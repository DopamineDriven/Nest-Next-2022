import { registerEnumType, EnumOptions } from "@nestjs/graphql";

export enum BufferEncodingOptions {
  ascii = "ascii",
  utf8 = "utf8",
  "utf-8" = "utf-8",
  utf16le = "utf16le",
  ucs2 = "ucs2",
  "ucs-2" = "ucs-2",
  base64 = "base64",
  base64url = "base64url",
  latin1 = "latin1",
  binary = "binary",
  hex = "hex"
}

export const BufferScaffold = (
  str: WithImplicitCoercion<string | Uint8Array | readonly number[]>,
  encoding?: keyof typeof BufferEncodingOptions | undefined,
  start?: number | undefined,
  end?: number | undefined
) => {
  return Buffer.from(str).toString(encoding, start, end);
};

registerEnumType<typeof BufferEncodingOptions>(BufferEncodingOptions, {
  name: "BufferEncodingOptions"
} as EnumOptions<typeof BufferEncodingOptions>);
// export const CryptoScaffold = () => {
//   return crypto.createHash("")
// };

/**
dopamine_driven@LAPTOP-2IH011V4:~/personal/port/2022$ openssl list -digest-algorithms
RSA-MD4 => MD4
RSA-MD5 => MD5
RSA-RIPEMD160 => RIPEMD160
RSA-SHA1 => SHA1
RSA-SHA1-2 => RSA-SHA1
RSA-SHA224 => SHA224
RSA-SHA256 => SHA256
RSA-SHA3-224 => SHA3-224
RSA-SHA3-256 => SHA3-256
RSA-SHA3-384 => SHA3-384
RSA-SHA3-512 => SHA3-512
RSA-SHA384 => SHA384
RSA-SHA512 => SHA512
RSA-SHA512/224 => SHA512-224
RSA-SHA512/256 => SHA512-256
RSA-SM3 => SM3
BLAKE2b512
BLAKE2s256
id-rsassa-pkcs1-v1_5-with-sha3-224 => SHA3-224
id-rsassa-pkcs1-v1_5-with-sha3-256 => SHA3-256
id-rsassa-pkcs1-v1_5-with-sha3-384 => SHA3-384
id-rsassa-pkcs1-v1_5-with-sha3-512 => SHA3-512
MD4
md4WithRSAEncryption => MD4
MD5
MD5-SHA1
md5WithRSAEncryption => MD5
ripemd => RIPEMD160
RIPEMD160
ripemd160WithRSA => RIPEMD160
rmd160 => RIPEMD160
SHA1
sha1WithRSAEncryption => SHA1
SHA224
sha224WithRSAEncryption => SHA224
SHA256
sha256WithRSAEncryption => SHA256
SHA3-224
SHA3-256
SHA3-384
SHA3-512
SHA384
sha384WithRSAEncryption => SHA384
SHA512
SHA512-224
sha512-224WithRSAEncryption => SHA512-224
SHA512-256
sha512-256WithRSAEncryption => SHA512-256
sha512WithRSAEncryption => SHA512
SHAKE128
SHAKE256
SM3
sm3WithRSAEncryption => SM3
ssl3-md5 => MD5
ssl3-sha1 => SHA1
whirlpool
 */
