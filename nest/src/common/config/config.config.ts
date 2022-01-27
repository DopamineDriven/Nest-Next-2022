import { Config } from "./config-interfaces.config";

export const toBase64 = (str: string) => {
  return Buffer.from(str).toString("base64");
 };

const config: Config = {
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
    refreshSecret: process.env.JWT_REFRESH_SECRET ?? ""
  },
  github: {
    adminEmail: process.env.GITHUB_EMAIL ?? "",
    adminPassword: process.env.GITHUB_PASSWORD ?? "",
    baseUrl: process.env.GITHUB_BASE_URL ?? "",
    maxRedirects: process.env.GITHUB_MAX_REDIRECTS ? Number.parseInt(process.env.GITHUB_MAX_REDIRECTS, 10) : 10,
    subdomain: process.env.GITHUB_SUBDOMAIN ?? "",
    timeout: 5000,
    serveBearer: process.env.GITHUB_BEARER_TOKEN
  },
  apollo: {
    key: process.env.APOLLO_KEY ?? "",
    reporting: Boolean.apply(process.env.APOLLO_SCHEMA_REPORTING) ?? true,
    ref: process.env.APOLLO_GRAPH_REF ?? ""
  }
};

export default (): Config => config;
