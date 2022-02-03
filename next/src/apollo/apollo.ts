import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import {
  createBatch,
  errorLink,
  ResolverContext,
  crmSesh,
} from "./resolver-context";
import { useMemo } from "react";
import { relayStylePagination } from "@apollo/client/utilities";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient(
  context?: ResolverContext
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    name: "graphql-global",
    link: crmSesh.concat(createBatch(context) || errorLink),
    connectToDevTools: true,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allEntries: relayStylePagination(),
          },
        },
      },
    }),
  });
}

export type InitialState = NormalizedCacheObject | null;

// Pages with Next.js data fetching methods, like `getStaticProps`, can send
// a custom context which will be used by `SchemaLink` to server render pages
export function initializeApollo(
  initialState: InitialState = null,
  context?: ResolverContext
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

export function useApollo(
  initialState: InitialState,
  context?: ResolverContext
): ApolloClient<NormalizedCacheObject> {
  const store = useMemo(
    () => initializeApollo(initialState, context),
    [initialState, context]
  );
  return store;
}
