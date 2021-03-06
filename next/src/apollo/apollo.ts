import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  TypedDocumentNode
} from "@apollo/client";
import {
  createBatch,
  nextNestAfterware,
  nextNestMiddleware,
  errorLink,
  ResolverContext,
  xResolvers
} from "./resolver-context";
import { useMemo } from "react";
import { relayStylePagination } from "@apollo/client/utilities";
import {
  TypedTypePolicies,
  AuthDetailedFieldPolicy,
  AuthDetailedKeySpecifier,
  UserConnectionKeySpecifier,
  JwtDecodedFieldPolicy,
  ConnectionConnectionKeySpecifier,
  CategoryConnectionKeySpecifier,
  CommentConnectionKeySpecifier,
  MediaItemConnectionKeySpecifier,
  EntryConnectionKeySpecifier,
  ProfileConnectionKeySpecifier,
  SessionConnectionKeySpecifier
} from "./helpers";
import emittedIntrospection from "./fragment-matcher";
import { Resolvers } from "@/graphql/generated/graphql";

export type DocumentType<
  TDocumentNode extends TypedDocumentNode<any, any>
> = TDocumentNode extends TypedDocumentNode<infer TType, any>
  ? TType
  : never;

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient(
  context?: ResolverContext
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    name: "graphql-global",
    link: nextNestMiddleware
      .concat(nextNestAfterware)
      .concat(createBatch(context) || errorLink),
    connectToDevTools: true,
    resolvers: xResolvers(context ?? {}),
    cache: new InMemoryCache({
      possibleTypes: emittedIntrospection.possibleTypes,
      typePolicies: {
        AuthDetailed: {
          mutationType: true,
          keyFields: ["auth", "jwt"] as AuthDetailedKeySpecifier,
          fields: {
            auth: {
              merge(
                existing: AuthDetailedFieldPolicy,
                incoming: AuthDetailedFieldPolicy,
                { mergeObjects }
              ) {
                return mergeObjects<AuthDetailedFieldPolicy>(
                  existing,
                  incoming
                );
              }
            },
            jwt: {
              merge(
                existing: JwtDecodedFieldPolicy,
                incoming: JwtDecodedFieldPolicy,
                { mergeObjects }
              ) {
                return mergeObjects<JwtDecodedFieldPolicy>(
                  existing,
                  incoming
                );
              }
            }
          }
        },
        Query: {
          fields: {
            listCategories:
              relayStylePagination<CategoryConnectionKeySpecifier>([
                "edges",
                "pageInfo",
                "totalCount"
              ] as CategoryConnectionKeySpecifier),
            listConnections:
              relayStylePagination<ConnectionConnectionKeySpecifier>([
                "edges",
                "pageInfo",
                "totalCount"
              ] as ConnectionConnectionKeySpecifier),
            listComments:
              relayStylePagination<CommentConnectionKeySpecifier>([
                "edges",
                "pageInfo",
                "totalCount"
              ] as CommentConnectionKeySpecifier),
            listEntries: relayStylePagination<EntryConnectionKeySpecifier>(
              [
                "edges",
                "pageInfo",
                "totalCount"
              ] as EntryConnectionKeySpecifier
            ),
            listMediaItems:
              relayStylePagination<MediaItemConnectionKeySpecifier>([
                "edges",
                "pageInfo",
                "totalCount"
              ] as MediaItemConnectionKeySpecifier),
            listProfiles:
              relayStylePagination<ProfileConnectionKeySpecifier>([
                "edges",
                "pageInfo",
                "totalCount"
              ] as ProfileConnectionKeySpecifier),
            listSessions:
              relayStylePagination<SessionConnectionKeySpecifier>([
                "edges",
                "pageInfo",
                "totalCount"
              ] as SessionConnectionKeySpecifier),
            listUsers: relayStylePagination<UserConnectionKeySpecifier>([
              "edges",
              "pageInfo",
              "totalCount"
            ] as UserConnectionKeySpecifier)
          }
        }
      } as TypedTypePolicies
    })
  });
}

export type InitialState = NormalizedCacheObject | null;

// Pages with Next.js data fetching methods, like `getStaticProps`, can send
// a custom context which will be used by `SchemaLink` to server render pages
export function initializeApollo<T extends ResolverContext>(
  initialState: InitialState = null,
  context?: T
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient(context);
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // always create a new ApolloClient for SSG/SSR
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the Client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo<T extends ResolverContext>(
  initialState: InitialState,
  context?: T
): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(
    () => initializeApollo(initialState, context),
    [initialState, context]
  );
  return store;
}
