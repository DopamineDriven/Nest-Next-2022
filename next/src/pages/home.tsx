import { DashboardCoalesced } from "@/components/Dashboard";
import type {
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType
} from "next";
import Image from "next/image";
import { initializeApollo, useApollo } from "@/apollo/apollo";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { ParsedUrlQuery } from "@/types/query-parser";
import type { UnwrapPromise } from "@/types/helpers";
import { useRouter } from "next/router";
import { Inspector } from "@/components/UI";


export type HomeGetStaticPropsInferred = UnwrapPromise<
  ReturnType<typeof getStaticProps>
>;

type HomeProps = {
  initialState: NormalizedCacheObject;
  cacheDerived: {
    extraRootIds: string[];
  } | null;
};

export default function Home<T extends typeof getStaticProps>({
  cacheDerived,
  initialState
}: InferGetStaticPropsType<T>) {
  const r = useRouter();
  const feedCache = useApollo(initialState, cacheDerived ?? r.query);
  console.log(feedCache ?? {})
  console.log(JSON.stringify(cacheDerived?.extraRootIds, null, 2));
  return (
    <>
    <DashboardCoalesced />
    {/* <Inspector>{}</Inspector> */}
  </>);
}

export const getStaticProps = async <T extends ParsedUrlQuery>(
  ctx: GetStaticPropsContext<T>
): Promise<
  GetStaticPropsResult<HomeProps>
> => {
  const apolloClient = initializeApollo({ initialState: {}, ctx });
  const cacheDerived = apolloClient.cache.extract(true).__META;
  return {
    props: {
      initialState: apolloClient.cache.extract(true),
      cacheDerived: cacheDerived ? cacheDerived : null
    },
    revalidate: 180
  };
};
