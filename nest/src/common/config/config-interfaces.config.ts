export type Config = ConfigCoalesced;

export type ConfigMapped<T extends keyof ConfigCoalesced> = {
  [P in T]: ConfigCoalesced[P];
};

export const ConfigMappedFunction = ({
  ...props
}: ConfigMapped<
  | "cors"
  | "apollo"
  | "graphql"
  | "nest"
  | "security"
  | "swagger"
  | "github"
  | "redis"
  | "postgres"
  | "local"
>) => {
  const {
    cors,
    graphql,
    nest,
    security,
    swagger,
    github,
    apollo,
    redis,
    postgres,
    local
  } = props;
  return {
    cors,
    graphql,
    nest,
    security,
    swagger,
    github,
    apollo,
    redis,
    postgres,
    local
  };
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
  local: LocalConfig;
};

export interface NestConfig {
  port: number;
}

export interface RedisConfig {
  password: string;
  port: number | null;
  url: string;
  namespace: string;
  ports?: string;
  host: string;
  replicationEnv?: string;
  ipv4Addy?: string;
  ipamConfigSubnet?: string;
  maxRetriesPerRequest?: number;
  connectTimeout?: number;
  disconnectTimeout?: number;
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
  USER_TOKEN: string;
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

export interface LocalConfig {
  auth?: string;
}
