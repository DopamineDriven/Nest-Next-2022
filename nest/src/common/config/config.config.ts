import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { Config } from "./config-interfaces.config";

export const toBase64 = (str: string) => {
  return Buffer.from(str).toString("base64");
};

const config = {
  nest: {
    port: 3000
  },
  cors: {
    enabled: true
  },
  swagger: {
    enabled: true,
    title: "2022 Swagger",
    description: "Swagger Api for Nesting",
    version: "1.5",
    path: "api"
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    introspection: true,
    schemaDestination: "./src/schema.gql",
    sortSchema: true
  },
  security: {
    expiresIn: "1d",
    refreshIn: "7d",
    bcryptSaltOrRound: 10,
    secret: process.env.JWT_ACCESS_SECRET ?? "",
    refreshSecret: process.env.JWT_REFRESH_SECRET ?? ""
  },
  github: {
    adminEmail: process.env.GITHUB_EMAIL ?? "",
    adminPassword: process.env.GITHUB_PASSWORD ?? "",
    baseUrl: process.env.GITHUB_BASE_URL ?? "",
    maxRedirects: process.env.GITHUB_MAX_REDIRECTS
      ? Number.parseInt(process.env.GITHUB_MAX_REDIRECTS, 10)
      : 10,
    subdomain: process.env.GITHUB_SUBDOMAIN ?? "",
    timeout: 5000,
    serveBearer: process.env.GITHUB_BEARER_TOKEN
  },
  apollo: {
    key: process.env.APOLLO_KEY ?? "",
    reporting: Boolean.apply(process.env.APOLLO_SCHEMA_REPORTING) ?? true,
    ref: process.env.APOLLO_GRAPH_REF ?? ""
  },
  postgres: {
    dbUrl: process.env.DATABASE_URL ? process.env.DATABASE_URL : ""
  },
  redis: {
    namespace: process.env.REDIS_NAMESPACE ? process.env.REDIS_NAMESPACE : "",
    url: process.env.REDIS_URL
      ? process.env.REDIS_URL
      : `redis://:${(process.env.REDIS_PASSWORD ?? "").trim()}@${(
          process.env.REDIS_HOST ?? "127.0.0.1"
        ).trim()}:${(process.env.REDIS_PORT
          ? Number.parseInt(process.env.REDIS_PORT, 10)
          : 6379
        )
          .toString()
          .trim()}`.trim(),
    host: process.env.REDIS_HOST ? process.env.REDIS_HOST : "localhost",
    password: process.env.REDIS_PASSWORD ? process.env.REDIS_PASSWORD : "",
    port: process.env.REDIS_PORT
      ? Number.parseInt(process.env.REDIS_PORT, 10)
      : 6379,
    ports: process.env.REDIS_PORTS ? process.env.REDIS_PORTS : "6379:6379",
    replicationEnv: process.env.REDIS_REPLICATION_ENV
      ? process.env.REDIS_REPLICATION_ENV
      : "",
    ipv4Addy: process.env.REDIS_IPV4_ADDY ? process.env.REDIS_IPV4_ADDY : "",
    ipamConfigSubnet: process.env.REDIS_IPAM_CONFIG_SUBNET
      ? process.env.REDIS_IPAM_CONFIG_SUBNET
      : "",
    maxRetriesPerRequest: process.env.REDIS_MAX_RETRIES
      ? Number.parseInt(process.env.REDIS_MAX_RETRIES, 10)
      : 10,
    connectTimeout: process.env.REDIS_CONNECT_TIMEOUT
      ? Number.parseInt(process.env.REDIS_CONNECT_TIMEOUT, 10)
      : 10000,
    disconnectTimeout: process.env.REDIS_DISCONNECT_TIMEOUT
      ? Number.parseInt(process.env.REDIS_DISCONNECT_TIMEOUT, 10)
      : 2000
  }
};

export default (): Config => config;
