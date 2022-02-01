export type Config = ConfigCoalesced;

export type ConfigMapped<T extends keyof ConfigCoalesced> = {
  [P in T]: ConfigCoalesced[P];
};

export const ConfigMappedFunction = ({
  ...props
}: ConfigMapped<
  "cors" | "apollo" | "graphql" | "nest" | "security" | "swagger" | "github" | "redis" | "postgres"
>) => {
  const { cors, graphql, nest, security, swagger, github, apollo, redis, postgres } = props;
  return { cors, graphql, nest, security, swagger, github, apollo, redis, postgres };
};

export type ConfigCoalesced = {
  apollo: ApolloConfig;
  nest: NestConfig;
  cors: CorsConfig;
  postgres: PostgresConfig;
  swagger: SwaggerConfig;
  graphql: GraphqlConfig;
  redis: RedisConfig;
  security: SecurityConfig;
  github: GitHubConfig;
};

export interface NestConfig {
  port: number;
}

export interface RedisConfig {
  password: string;
  port: number | null;
  url: string;
  ports?: string;
  host: string;
  replicationEnv?: string;
  ipv4Addy?: string;
  ipamConfigSubnet?: string;
}

export interface CorsConfig {
  enabled: boolean;
}
export interface PostgresConfig {
  dbUrl: string;
}
export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export interface GraphqlConfig {
  playgroundEnabled: boolean;
  debug: boolean;
  introspection: boolean;
  schemaDestination: string;
  sortSchema: boolean;
}

export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
  secret: string;
  refreshSecret: string;
}

export interface GitHubConfig {
  baseUrl: string;
  serveBasic?: string | null;
  serveBearer?: string | null;
  adminEmail: string;
  adminPassword: string;
  subdomain: string;
  maxRedirects: number;
  timeout: number | null;
}

export interface ApolloConfig {
  key: string;
  ref?: string;
  reporting: boolean;
}
