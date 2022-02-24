import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType
} from "next";
import { useCallback, useEffect } from "react";
import {
  allUsersDocument,
  SortOrder,
  UserStatus,
  Role,
  UserOrderByRelevanceFieldEnum,
  allUsersQuery,
  allUsersQueryVariables,
  userDecodedFromTokenDocument,
  ViewerDocument,
  ViewerQuery,
  ViewerQueryVariables,
  useuserDecodedFromTokenLazyQuery
} from "@/graphql/generated/graphql";
import { initializeApollo, useApollo } from "@/apollo/apollo";
import {
  ApolloClient,
  ErrorPolicy,
  NetworkStatus,
  NormalizedCacheObject
} from "@apollo/client";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { ParsedUrlQuery } from "@/types/query-parser";
import { IncomingMessage, ServerResponse } from "http";
import { RequireOnlyOne } from "@/types/helpers";
import { ProfileComponent, Inspector } from "@/components/UI";
import Layout from "@/components/Layout/layout";
import useAuth from "@/hooks/use-auth";
import { ResolverContext, xResolvers } from "@/apollo/resolver-context";
import { Resolvers } from "@/graphql/generated/resolver-types";

export type ProfileProps = {
  apolloCache: NormalizedCacheObject;
  authHeaderReq: string;
  authHeaderRes: string;
  allUsers: allUsersQuery | null;
  viewer: ViewerQuery | null;
};

export default function Profile<T extends typeof getServerSideProps>({
  allUsers,
  viewer,
  apolloCache,
  authHeaderReq,
  authHeaderRes
}: InferGetServerSidePropsType<T>) {
  const getViewer = useAuth();
  const router = useRouter();
  const useApolloClient = useApollo(apolloCache, router.query ?? {});

  const [
    lazyDerivePayload,
    { data, called, client: client = useApolloClient, error, loading }
  ] = useuserDecodedFromTokenLazyQuery({
    query: userDecodedFromTokenDocument
  });

  const callbackData = useCallback(async () => {
    // const fetchIt = async () =>
    //   await fetch(
    //     encodeURIComponent(
    //       `http://localhost:3000/auth/token/${
    //         authHeaderReq
    //           ? authHeaderReq
    //           : authHeaderRes
    //           ? authHeaderRes
    //           : ""
    //       }`
    //     ),
    //     {
    //       headers: {},
    //       body: JSON.stringify({ token: authHeaderReq ?? authHeaderRes }),
    //       method: "POST",
    //       mode: "cors",
    //       credentials: "include"
    //     }
    //   )
    //     .then(async res => (await res.json()) as Promise<AuthDetailed>)
    //     .then(resolved => resolved as AuthDetailed);
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
      {getViewer.viewer?.me ? (
        <ProfileComponent viewer={getViewer.viewer}>
          {error ? (
            <Inspector>{JSON.stringify(error, null, 2)}</Inspector>
          ) : (
            <Inspector>{JSON.stringify(data, null, 2)}</Inspector>
          )}
        </ProfileComponent>
      ) : (
        <>
          {viewer ? (
            <ProfileComponent viewer={viewer}></ProfileComponent>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
type networkstats = typeof NetworkStatus[keyof typeof NetworkStatus];

// function watchViewerQueryFallback(
//   apolloClient: ApolloClient<NormalizedCacheObject>,
//   req?: IncomingMessage,
//   res?: ServerResponse
// ) {
//   return apolloClient.watchQuery<ViewerQuery, ViewerQueryVariables>({
//     query: ViewerDocument,
//     context: xResolvers({
//       req,
//       res,
//       networkStatus: NetworkStatus
//     }) as Resolvers<ResolverContext>,
//     notifyOnNetworkStatusChange: true,
//     fetchPolicy: "network-only",
//     nextFetchPolicy: "cache-first",
//     errorPolicy: "all" as RequireOnlyOne<ErrorPolicy>,
//     partialRefetch: true,
//     returnPartialData: true
//   });
// }

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

  const apolloClient = initializeApollo(
    {},
    { req: ctx.req, res: ctx.res }
  );
  // const viewerQuery = watchViewerQueryFallback(
  //   apolloClient,
  //   ctx.req,
  //   ctx.res
  // );
  await apolloClient
    .query<allUsersQuery, allUsersQueryVariables>({
      query: allUsersDocument,
      fetchPolicy: "cache-first",
      variables: allUsersQueryVars,
      notifyOnNetworkStatusChange: true
    })
    .then(data => data);

  const getAuthHeader = ctx.req.headers["authorization"]?.split(
    /([ ])/
  )[2] as string;

  const authHeaderRes = ctx.res.req.headers["authorization"]?.split(
    /([ ])/
  )[2] as string;
  return {
    props: {
      viewer:
        (
          await apolloClient.query<ViewerQuery, ViewerQueryVariables>({
            query: ViewerDocument
          })
        ).data ?? null,
      apolloCache: apolloClient.cache.extract(true),
      authHeaderRes: authHeaderRes,
      authHeaderReq: getAuthHeader,
      // fallback: (await viewerQuery.result())
      //   .data as unknown as ProfileProps["fallback"],
      allUsers:
        apolloClient.cache.readQuery<
          allUsersQuery,
          allUsersQueryVariables
        >({
          query: allUsersDocument,
          variables: allUsersQueryVars
        }) ?? null
    }
  };
};

Profile.Layout = Layout;
