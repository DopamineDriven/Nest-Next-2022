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
  allUsers,
  allUsersDocument,
  Role,
  SortOrder,
  UserStatus,
  UserOrderByRelevanceFieldEnum,
  allUsersQuery,
  allUsersQueryVariables,
  useallUsersLazyQuery,
  userDecodedFromTokenQueryVariables,
  userDecodedFromTokenDocument,
  userDecodedFromTokenQuery,
  useuserDecodedFromTokenLazyQuery
} from "@/graphql/generated/graphql";
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
import { Exact, UserScalarFieldEnum } from "../.cache/__types__";
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
import { ProfileComponent, Inspector } from "@/components/UI";
import { storeKeyNameFromField } from "@apollo/client/utilities";
import {
  deriveUserDetailsFromTokenDocument,
  usederiveUserDetailsFromTokenLazyQuery
} from "@/graphql/generated/graphql";
type ProfileProps = {
  apolloCache: NormalizedCacheObject;
  authHeaderReq: string;
  authHeaderRes: string;
  allUsers: allUsersQuery | null;
};

export default function Profile<T extends typeof getServerSideProps>({
  allUsers,
  apolloCache,
  authHeaderReq,
  authHeaderRes
}: InferGetServerSidePropsType<T>) {
  const router = useRouter();
  const useApolloClient = useApollo(apolloCache, router.query ?? {});
  const [
    lazyDerivePayload,
    { data, called, client: client = useApolloClient, error, loading }
  ] = useuserDecodedFromTokenLazyQuery({
    query: userDecodedFromTokenDocument
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
        accessToken: authHeaderReq ? authHeaderReq : authHeaderRes ?? ""
      }
    }).then(data => {
      data.data?.getUserFromAccessToken as unknown as AuthDetailed;
    });
  }, [authHeaderReq, authHeaderRes, lazyDerivePayload]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      async () => await callbackData();
    }
  }, [callbackData]);
  const crm = getCookie("nest-next-2022");
  console.log(crm ?? "no cookie");
  return (
    // <SWRConfig value={fallback}>
    <>
      {allUsers?.listUsers ? (
        <ProfileComponent
          viewer={
            data?.getUserFromAccessToken.auth?.user &&
            ({ accessToken: authHeaderReq } ?? {
              accessToken: authHeaderRes
            })
              ? ((data.getUserFromAccessToken.auth.user &&
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
  const allUsersQueryVars: allUsersQueryVariables = {
    findManyUsersPaginatedInput: {
      pagination: { first: 10 },
      // distinct: [UserScalarFieldEnum.Email, UserScalarFieldEnum.],
      where: {
        email: { contains: "" },
        role: {
          in: [Role.USER, Role.ADMIN, Role.MAINTAINER, Role.SUPERADMIN]
        },
        status: {
          in: [
            UserStatus.OFFLINE,
            UserStatus.ONLINE,
            UserStatus.DEACTIVATED
          ]
        }
      },
      orderBy: [
        { firstName: SortOrder.desc },
        {
          _relevance: {
            fields: [UserOrderByRelevanceFieldEnum.firstName],
            search: "",
            sort: SortOrder.desc
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
  await apolloClient.query<allUsersQuery, allUsersQueryVariables>({
    query: allUsersDocument,
    fetchPolicy: "cache-first",
    variables: allUsersQueryVars,
    notifyOnNetworkStatusChange: true,
    context: { ...ctx }
  });
  viewerQuery.getCurrentResult(true);

  const getAuthHeader = ctx.req.headers["authorization"]?.split(
    /([ ])/
  )[2] as string;

  const authHeaderRes = ctx.res.req.headers["authorization"]?.split(
    /([ ])/
  )[2] as string;
  return {
    props: {
      apolloCache: apolloClient.cache.extract(true),
      authHeaderRes: authHeaderRes,
      authHeaderReq: getAuthHeader,
      // fallback: (await viewerQuery.result())
      //   .data as unknown as ProfileProps["fallback"],
      allUsers: apolloClient.cache.readQuery<
        allUsersQuery,
        allUsersQueryVariables
      >({
        query: allUsersDocument,
        variables: allUsersQueryVars
      })
    }
  };
};
