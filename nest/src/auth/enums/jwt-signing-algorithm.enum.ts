import { registerEnumType, EnumOptions } from "@nestjs/graphql";

export enum JwtSigningAlgorithm {
  HS256 = "HS256",
  HS384 = "HS384",
  HS512 = "HS512",
  RS256 = "RS256",
  RS384 = "RS384",
  RS512 = "RS512",
  ES256 = "ES256",
  ES384 = "ES384",
  ES512 = "ES512",
  ES256K = "ES256K",
  PS256 = "PS256",
  PS384 = "PS384",
  PS512 = "PS512",
  Ed25519 = "Ed25519",
  Ed448 = "Ed448",
  None = "None"
}

registerEnumType<typeof JwtSigningAlgorithm>(JwtSigningAlgorithm, {
  name: "AlgorithmType"
} as EnumOptions<typeof JwtSigningAlgorithm>);
