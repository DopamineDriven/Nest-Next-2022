import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType
} from "next";
import useSWR, { SWRConfig, useSWRConfig } from "swr";
import {
  FullConfiguration,
  PublicConfiguration,
  ProviderConfiguration,
  BareFetcher,
  Fetcher,
  Cache
} from "swr/dist/types";
import {
  useCallback,
  useEffect,
  useState,
  LegacyRef,
  FC,
  lazy
} from "react";
import {
  AllUsersDocument,
  AllUsersQuery,
  AllUsersQueryVariables,
  useAllUsersLazyQuery
} from "@/graphql/queries/users-paginated.graphql";
import auth from "../../public/auth-validation.png";
import Image from "next/image";
import { initializeApollo, useApollo } from "@/apollo/apollo";
import {
  ApolloClient,
  ApolloError,
  ErrorPolicy,
  LazyQueryResult,
  NetworkStatus,
  NormalizedCacheObject,
  QueryLazyOptions,
  QueryTuple
} from "@apollo/client";
import {
  Exact,
  Role,
  SortOrder,
  UserOrderByRelevanceFieldEnum,
  UserScalarFieldEnum,
  UserStatus
} from "../.cache/__types__";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import {
  useViewerLazyQuery,
  useViewerQuery,
  ViewerDocument,
  ViewerQuery,
  ViewerQueryVariables
} from "@/graphql/queries/viewer.graphql";
import { ParsedUrlQuery } from "@/types/query-parser";
import { IncomingMessage, ServerResponse } from "http";
import DataInspector from "@/components/UI/Inspector/inspector";
import { RequireOnlyOne } from "@/types/helpers";
import { viewerFetcher } from "@/lib/network/fetchers";
import {
  ProfileComponent,
  Inspector,
  ApolloErrorComponent
} from "@/components/UI";
import { storeKeyNameFromField } from "@apollo/client/utilities";
import {
  DeriveUserDetailsFromTokenDocument,
  useDeriveUserDetailsFromTokenMutation
} from "@/graphql/mutations/get-user-from-access-token.graphql";
type ProfileProps = {
  apolloCache: NormalizedCacheObject;
  authHeaderReq: string;
  authHeaderRes: string;
  allUsers: AllUsersQuery | null;
};

export default function Profile<T extends typeof getServerSideProps>({
  allUsers,
  apolloCache,
  authHeaderReq,
  authHeaderRes
}: InferGetServerSidePropsType<T>) {
  const [lazyDerivePayload, { data, called, client, error, loading }] =
    useDeriveUserDetailsFromTokenMutation({
      mutation: DeriveUserDetailsFromTokenDocument
    });
  const callbackData = useCallback(async () => {
    const fetchIt = async () =>
      await fetch(
        encodeURIComponent(
          `http://localhost:3000/auth/token/${
            authHeaderReq
              ? authHeaderReq
              : authHeaderRes
              ? authHeaderRes
              : ""
          }`
        ),
        {
          headers: {},
          body: JSON.stringify({ token: authHeaderReq ?? authHeaderRes }),
          method: "POST",
          mode: "cors",
          credentials: "include"
        }
      )
        .then(async res => (await res.json()) as Promise<AuthDetailed>)
        .then(resolved => resolved as AuthDetailed);
    return await lazyDerivePayload({
      variables: {
        token: authHeaderReq
          ? authHeaderReq
          : authHeaderRes ??
            (await fetchIt()).auth.accessToken.split(/([ ])/)[0]
      }
    }).then(data => {
      data.data?.userFromAccessTokenDecoded as unknown as AuthDetailed;
    });
  }, [authHeaderReq, authHeaderRes, lazyDerivePayload]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      async () => await callbackData();
    }
  }, [callbackData]);
  const crm = getCookie("nest-next-2022");
  console.log(crm ?? "no cookie");
  const router = useRouter();
  return (
    // <SWRConfig value={fallback}>
    <>
      {allUsers?.listUsers ? (
        <ProfileComponent
          viewer={
            data?.userFromAccessTokenDecoded.auth?.user &&
            ({ accessToken: authHeaderReq } ?? {
              accessToken: authHeaderRes
            })
              ? ((data.userFromAccessTokenDecoded.auth.user &&
                  authHeaderReq) as unknown as ViewerQuery)
              : null ?? (null as unknown as ViewerQuery | null)
          }>
          {error ? (
            <Inspector>{JSON.stringify(error, null, 2)}</Inspector>
          ) : (
            <Inspector>{JSON.stringify(data, null, 2)}</Inspector>
          )}
        </ProfileComponent>
      ) : (
        <></>
      )}
    </>
  );
}
function watchViewerQueryFallback(
  apolloClient: ApolloClient<NormalizedCacheObject>,
  req?: IncomingMessage,
  res?: ServerResponse
) {
  return apolloClient.watchQuery<ViewerQuery, ViewerQueryVariables>({
    query: ViewerDocument,
    context: { req, res, networkStatus: { ...NetworkStatus } },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    errorPolicy: "all" as RequireOnlyOne<ErrorPolicy>,
    partialRefetch: true,
    returnPartialData: true
  });
}

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<ProfileProps>> => {
  const allUsersQueryVars: AllUsersQueryVariables = {
    findManyUsersPaginatedInput: {
      pagination: { first: 10 },
      // distinct: [UserScalarFieldEnum.Email, UserScalarFieldEnum.],
      where: {
        email: { contains: "" },
        role: {
          in: [Role.Admin, Role.Maintainer, Role.Superadmin, Role.User]
        },
        status: {
          in: [
            UserStatus.Online,
            UserStatus.Offline,
            UserStatus.Deactivated
          ]
        }
      },
      orderBy: [
        { firstName: SortOrder.Asc },
        {
          _relevance: {
            fields: [UserOrderByRelevanceFieldEnum.FirstName],
            search: "",
            sort: SortOrder.Asc
          }
        }
      ]
    }
  };
  const apolloClient = initializeApollo({}, ctx);
  const viewerQuery = watchViewerQueryFallback(
    apolloClient,
    ctx.req,
    ctx.res
  );
  const allUsers = await apolloClient.query<
    AllUsersQuery,
    AllUsersQueryVariables
  >({
    query: AllUsersDocument,
    fetchPolicy: "cache-first",
    variables: allUsersQueryVars,
    notifyOnNetworkStatusChange: true,
    context: { ...ctx }
  });
  viewerQuery.getCurrentResult(true);

  const getAuthHeader = ctx.req.headers["authorization"]?.split(
    /([ ])/
  )[0] as string;

  const authHeaderRes = ctx.res.req.headers["authorization"]?.split(
    /([ ])/
  )[0] as string;
  return {
    props: {
      apolloCache: apolloClient.cache.extract(true),
      authHeaderRes: authHeaderRes,
      authHeaderReq: getAuthHeader,
      // fallback: (await viewerQuery.result())
      //   .data as unknown as ProfileProps["fallback"],
      allUsers: allUsers.data
    }
  };
};
