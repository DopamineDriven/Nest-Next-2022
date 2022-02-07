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
  UserStatus,
  Viewer
} from "../.cache/__types__";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import {
  useViewerLazyQuery,
  useViewerQuery,
  ViewerDocument,
  ViewerKeySpecifier,
  ViewerFieldPolicy,
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

type ProfileProps = {
  apolloCache: NormalizedCacheObject;
  // fallback?:
  //   | (Partial<
  //       PublicConfiguration<ViewerQuery, any, BareFetcher<ViewerQuery>>
  //     > &
  //       Partial<ProviderConfiguration> & {
  //         provider?:
  //           | ((cache: Readonly<Cache<ViewerQuery>>) => Cache<ViewerQuery>)
  //           | undefined;
  //       })
  //   | undefined;
  allUsers: AllUsersQuery | null;
};

// const UseProfile: FC<{
//   viewer: ViewerQuery | null;
//   allUsers: AllUsersQuery;
//   fallback: ProfileProps["fallback"];
//   err: ApolloError;
// }> = ({ viewer, allUsers, fallback, err, children }) => {
//   const { data, error } = useSWR("/api/viewer/me", viewerFetcher);
//   return (
//     <div className='font-sans text-3xl bg-gradient-to-tl from-[#133050] via-[#133350] to-black text-black font-bold min-w-full text-center  tracking-wide fit'>
//       {error ? (
//         <ApolloErrorComponent {...err}>{children}</ApolloErrorComponent>
//       ) : (
//         <Inspector>{JSON.stringify(error, null, 2)}</Inspector>
//       )}
//       <SWRConfig value={fallback}>
//         <ProfileComponent
//           viewer={data ? data : (viewer as unknown as ViewerQuery)}
//         />
//       </SWRConfig>

//       <pre>{JSON.stringify(allUsers, null, 2)}</pre>
//     </div>
//   );
// };

export default function Profile<T extends typeof getServerSideProps>({
  allUsers,
  apolloCache
}: InferGetServerSidePropsType<T>) {
  const callbackData = useCallback(
    (
      lazyViewer: (
        options?: QueryLazyOptions<Exact<ViewerQueryVariables>> | undefined
      ) => Promise<
        LazyQueryResult<ViewerQuery, Exact<ViewerQueryVariables>>
      >
    ) => {
      async function getViewerLazy() {
        return await (lazyViewer ? lazyViewer() : () => {});
      }

      return getViewerLazy();
    },
    []
  );
  const [lazyViewer, { data, called, client, error, loading }] =
    useViewerLazyQuery({
      query: ViewerDocument,
      client: useApollo(apolloCache),
      fetchPolicy: "cache-first",
      partialRefetch: true,
      returnPartialData: true
    });
  // const [useLazy, setUseLazy] =
  //   useState<
  //     (
  //       options?: QueryLazyOptions<Exact<ViewerQueryVariables>> | undefined
  //     ) => Promise<
  //       LazyQueryResult<ViewerQuery, Exact<ViewerQueryVariables>>
  //     >
  //   >(lazyViewer);

  // useEffect(() => {
  //   (async function lazyIIFE() {
  //     return await (lazyViewer !== undefined
  //       ? callbackData(lazyViewer)
  //       : () => {});
  //   })();
  //   return setUseLazy(lazyViewer);
  // }, [lazyViewer, callbackData]);

  // const getViewer = () => {
  //   return !called && !error && !loading ? (
  //     callbackData(() => lazyViewer())
  //   ) : !!loading ? (
  //     <>{"loading..."}</>
  //   ) : (
  //     <pre>{JSON.stringify(data, null, 2)}</pre> ?? (
  //       <Inspector>{JSON.stringify(error, null, 2)}</Inspector>
  //     )
  //   );
  // };
  const crm = getCookie("nest-next-2022");
  console.log(crm ?? "no cookie");
  const router = useRouter();
  return (
    // <SWRConfig value={fallback}>
    <>
      {allUsers?.listUsers ? (
        <ProfileComponent viewer={data ? data : null}>
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
  return {
    props: {
      apolloCache: apolloClient.cache.extract(true),
      // fallback: (await viewerQuery.result())
      //   .data as unknown as ProfileProps["fallback"],
      allUsers: allUsers.data
    }
  };
};
