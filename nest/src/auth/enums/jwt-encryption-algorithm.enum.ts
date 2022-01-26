import { registerEnumType, EnumOptions } from "@nestjs/graphql";

export enum JwtEncryptionAlgorithm {
  "RSA-OAEP" = "RSA-OAEP",
  "RSA-OAEP-256" = "RSA-OAEP-256",
  "ECDH-ES" = "ECDH-ES",
  "ECDH-ES+A128" = "ECDH-ES+A128",
  "ECDH-ES+A192" = "ECDH-ES+A192",
  "ECDH-ES+A256" = "ECDH-ES+A256",
  "A128" = "A128",
  "A192" = "A192",
  "A256" = "A256",
  "A128GCM" = "A128GCM",
  "A192GCM" = "A192GCM",
  "A256GCM" = "A256GCM",
  "PBES2-HS256+A128" = "PBES2-HS256+A128",
  "PBES2-HS384+A192" = "PBES2-HS384+A192",
  "PBES2-HS512+A256" = "PBES2-HS512+A256"
}

registerEnumType<typeof JwtEncryptionAlgorithm>(JwtEncryptionAlgorithm, {
  name: "JwtEncryptionAlgorithm"
} as EnumOptions<typeof JwtEncryptionAlgorithm>);
