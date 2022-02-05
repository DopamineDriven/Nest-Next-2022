import { DashboardCoalesced } from "@/components/Dashboard";
import type {
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType
} from "next";
import Image from "next/image";
import { initializeApollo, useApollo } from "@/apollo/apollo";
import {
  ApolloClient,
  NormalizedCacheObject,
  useApolloClient
} from "@apollo/client";
import { ParsedUrlQuery } from "@/types/query-parser";
import type { UnwrapPromise } from "@/types/helpers";
import { useRouter } from "next/router";
import { Inspector, ProfileComponent } from "@/components/UI";
import { ViewerQuery } from "@/graphql/queries/viewer.graphql";
import useSWR from "swr";
import { viewerFetcher } from "@/lib/network/fetchers";
import { LoginUserMutationResult, ViewerKeySpecifier } from "@/graphql/mutations/login-user.graphql";
import { Suspense } from "react";

// export type HomeGetStaticPropsInferred = UnwrapPromise<
//   ReturnType<typeof getStaticProps>
// >;

// type HomeProps = {
//   viewer: ViewerQuery['me'];
// };

export default function Home() {
  const data = useSWR(
    `/api/viewer/viewer`,
    viewerFetcher
  );

  return (
    <>
      {data?.data?.me ? (
        <ProfileComponent viewer={data.data} />
      ) : (
        <Inspector>{JSON.stringify(data, null, 2)}</Inspector>
      )}
    </>
  );
}

// export const getStaticProps = async <T extends ParsedUrlQuery>(
//   ctx: GetStaticPropsContext<T>
// ): Promise<
//   GetStaticPropsResult<HomeProps>
// > => {
//   const apolloClient = initializeApollo({ initialState: {}, ctx });
//   const cacheDerived = apolloClient.cache.extract(true).__META;
//   return {
//     props: {
//       initialState: apolloClient.cache.extract(true),
//       cacheDerived: cacheDerived ? cacheDerived : null
//     },
//     revalidate: 180
//   };
// };
