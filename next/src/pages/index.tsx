import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType
} from "next";
import {
  AllUsersQuery,
  AllUsersLazyQueryHookResult,
  AllUsersQueryVariables,
  AllUsersQueryResult,
  useAllUsersQuery,
  AllUsersDocument
} from "@/graphql/queries/users-paginated.graphql";
import auth from "../../public/Cortina_Blue.png";
import { NextPage } from "next";
import Image from "next/image";
import { initializeApollo } from "@/apollo/apollo";
import {
  ApolloClient,
  checkFetcher,
  FetchResult,
  NormalizedCacheObject,
  serializeFetchParameter,
  useApolloClient
} from "@apollo/client";
import { Inspector } from "@/components/UI";
import {
  Role,
  SortOrder,
  UserOrderByRelevanceFieldEnum,
  UserOrderByRelevanceInput,
  UserOrderByWithRelationAndSearchRelevanceInput,
  UserStatus,
  Viewer
} from "../.cache/__types__";
import {
  ViewerQuery,
  useViewerLazyQuery,
  useViewerQuery,
  ViewerQueryVariables,
  ViewerDocument,
  UserPartialFragmentDoc
} from "@/graphql/queries/viewer.graphql";
import { Login } from "@/components/Auth";
import { extractWords } from "@/utils/helpers";
import useSWR from "swr";
import { viewerFetcher } from "@/lib/network/fetchers";

import { parse } from "cookie";
import { getCookies, getCookie } from "cookies-next";
import { ViewerPartialFragment } from "@/graphql/fragments/viewer-partial.graphql";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { CookieValueTypes } from "cookies-next/lib/types";

type IndexProps = {
  apolloCache: NormalizedCacheObject;
  users: AllUsersQuery | null;
  userFromToken: ViewerQuery | null; // cookie: TmpCookieObject
};

function Index<T extends typeof getServerSideProps>({
  apolloCache,
  userFromToken,
  users
}: InferGetServerSidePropsType<T>) {
  console.log(
    JSON.stringify(
      {
        users: users,
        userFromToken: userFromToken,
        apolloCache: apolloCache
      },
      null,
      2
    )
  );
  const { data } = useAllUsersQuery({
    query: AllUsersDocument,
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    variables: {
      findManyUsersPaginatedInput: {
        pagination: { first: 10 },
        // distinct: [UserScalarFieldEnum.Email, UserScalarFieldEnum.],
        where: {
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
              search: "*",
              sort: SortOrder.Asc
            }
          }
        ]
      }
    }
  });
  const router = useRouter();
  const [cookieState, setCookieState] = useState(() =>
    getCookie("nest-next-2022")
  );
  /**
   * {
  "data": {
    "data": {
      "login": {
        "accessToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZmUyNzFlMC1jMGM0LTQ3YWEtOGJjYi1hOTVhOTgwMjJiOTciLCJpYXQiOjE2NDQyNDQxODUsImV4cCI6MTY0NDMzMDU4NX0.zMdhnCCYgyYV_TpBRXiQX0WgANTTKuhtusRvK6EByhE72dH5Hl8fPPny7VchI25ITkRWhecodlx484f-lIDy1Q",
        "refreshToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZmUyNzFlMC1jMGM0LTQ3YWEtOGJjYi1hOTVhOTgwMjJiOTciLCJpYXQiOjE2NDQyNDQxODUsImV4cCI6MTY0NDMzMDU4NX0.zMdhnCCYgyYV_TpBRXiQX0WgANTTKuhtusRvK6EByhE72dH5Hl8fPPny7VchI25ITkRWhecodlx484f-lIDy1Q",
        "__typename": "Token"
      }
    }
  },
  "isValidating": true
}
   */
  //bg-[#133350]
  const cb = useCallback(
    (valueType: CookieValueTypes) => {
      console.log(valueType ?? {});
      if (cookieState !== undefined || null) {
        setTimeout(() => {
          return router.push("/home");
        }, 3000);
        return setCookieState(valueType);
      } else {
        return cookieState;
      }
    },
    [cookieState, router]
  );
  useEffect(() => {
    if (cookieState != null) {
      return cb(cookieState);
    }
  }, [cb, cookieState]);

  const [lazyViewer, { data: viewer, called }] = useViewerLazyQuery({
    query: ViewerDocument,
    fetchPolicy: "cache-and-network"
  });
  console.log(viewer ?? {});
  parse("nest-next-2022");
  return (
    <div className='font-sans text-3xl bg-gradient-to-tl from-[#133050] via-[#133350] to-black text-black font-bold min-w-full text-center  tracking-wide fit'>
      <Login email={"andrew@windycitydevs.io"} password='Dillard20!8!' />
      <Inspector>
        {JSON.stringify(cookieState ?? "no cookies", null, 2)}
      </Inspector>
      <Inspector>{JSON.stringify(data, null, 2)}</Inspector>
    </div>
  );
}

const getServerSideProps = async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<IndexProps>> => {
  const apollo = initializeApollo({ initialState: {}, ctx: ctx.query });
  const cookie = getCookie("nest-next-2022", {
    req: ctx.req,
    res: ctx.res
  });

  const headers = ctx.req.headers;
  console.log(headers ?? "no headz");
  console.log(cookie ?? "no cookz");
  const bearer = ctx.req.headers.authorization?.split(/([ ])/)[1];
  console.log(bearer ?? "no bearer");
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
  await apollo.query<ViewerQuery, ViewerQueryVariables>({
    query: ViewerDocument,
    variables: {},
    returnPartialData: true,
    context: { ...ctx },
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true
  });
  await apollo.query<AllUsersQuery, AllUsersQueryVariables>({
    query: AllUsersDocument,
    fetchPolicy: "cache-first",
    variables: allUsersQueryVars,
    returnPartialData: true,
    notifyOnNetworkStatusChange: true,
    context: { ...ctx }
  });

  return {
    props: {
      apolloCache: apollo.cache.extract(true),
      userFromToken: apollo.cache.readQuery<
        ViewerQuery,
        ViewerQueryVariables
      >({
        optimistic: true,
        query: ViewerDocument,
        variables: {},
        returnPartialData: true
      }),
      users: apollo.cache.readQuery<AllUsersQuery, AllUsersQueryVariables>(
        {
          query: AllUsersDocument,
          optimistic: true,
          returnPartialData: true,
          variables: allUsersQueryVars
        }
      )
    }
  };
};

export default Index;
// ) : !called ? (
//   lazylazy({
//     variables: { first: 10, orderBy: { role: SortOrder.Asc } },
//   }).then((data) => {
//     return <Inspector>{data.data}</Inspector>;
//   })
// ) : loading ? (
//   <div>loading...</div>
// ) : (
//   <div>{error}</div>
// class ApolloHandler {
//   constructor(
//     private apollo: ApolloClient<NormalizedCacheObject> = initializeApollo({
//       initialState: {},
//       ctx,
//     })
//   ) {}
// }
