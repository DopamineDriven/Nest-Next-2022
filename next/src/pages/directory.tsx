import {
  allUsersDocument,
  allUsersQuery,
  allUsersQueryVariables,
  Role,
  SortOrder,
  useallUsersLazyQuery,
  useallUsersQuery,
  UserOrderByRelevanceFieldEnum
} from "@/graphql/generated/graphql";
import Directory from "@/components/Directory/directory";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetServerSidePropsType,
  InferGetStaticPropsType
} from "next";
import { initializeApollo, useApollo } from "@/apollo/apollo";
import {
  ApolloClient,
  ApolloError,
  NormalizedCacheObject,
  useApolloClient
} from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/layout";

export type DirectoryPageProps = {
  people: allUsersQuery | null;
  apolloCache: NormalizedCacheObject;
};

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<DirectoryPageProps>> => {
  console.log(ctx.params ?? "no params");

  const apolloClient = initializeApollo({}, ctx);
  const allUsersVars: allUsersQueryVariables = {
    findManyUsersPaginatedInput: {
      pagination: { first: 20 },
      orderBy: [
        {
          _relevance: {
            fields: [UserOrderByRelevanceFieldEnum.email],
            search: "*",
            sort: SortOrder.asc
          }
        }
      ],
      where: {
        role: {
          in: [Role.ADMIN, Role.MAINTAINER, Role.SUPERADMIN, Role.USER]
        }
      }
    }
  };
  await apolloClient.query<allUsersQuery, allUsersQueryVariables>({
    query: allUsersDocument,
    variables: allUsersVars
  });

  return {
    props: {
      apolloCache: apolloClient.extract(true),
      people: await apolloClient.readQuery<
        allUsersQuery,
        allUsersQueryVariables
      >({
        query: allUsersDocument,
        variables: allUsersVars
      })
    }
  };
};

export default function DirectoryPage<
  T extends typeof getServerSideProps
>({ apolloCache, people }: InferGetServerSidePropsType<T>) {
  // const [
  //   lazyPeople,
  //   {
  //     called,
  //     variables,
  //     data,
  //     client,
  //     loading,
  //     networkStatus,
  //     updateQuery,
  //     error,
  //     previousData,
  //     refetch
  //   }
  // ] = useallUsersLazyQuery({
  //   query: allUsersDocument
  // });
  const allUsersVarsClient: allUsersQueryVariables = {
    findManyUsersPaginatedInput: {
      pagination: { first: 20 },
      orderBy: [
        {
          _relevance: {
            fields: [UserOrderByRelevanceFieldEnum.firstName],
            search: "*",
            sort: SortOrder.asc
          }
        },
        { firstName: SortOrder.asc }
      ],
      where: {
        role: {
          in: [Role.ADMIN, Role.MAINTAINER, Role.SUPERADMIN, Role.USER]
        }
      }
    }
  };
  const router = useRouter();
  const clientApollo = useApollo(apolloCache, router.query);
  const {
    data: dataClient = people as unknown as allUsersQuery | undefined,
    error,
    loading,
    refetch,
    previousData,
    client: injectClient = clientApollo
  } = useallUsersQuery({
    query: allUsersDocument,
    variables: allUsersVarsClient
  });
  // const [callPrompted, setCallPrompted] = useState(called);
  // const [lazyPeopleVariables, setLazyPeopleVariables] =
  //   useState<typeof variables>(variables);
  // const [lazyPeopleState, setLazyPeopleState] = useState(
  //   lazyPeople({ variables })
  // );

  // useEffect(() => {
  //   const allUsersVarsClient: allUsersQueryVariables = {
  //     findManyUsersPaginatedInput: {
  //       pagination: { first: 20 },
  //       orderBy: [
  //         {
  //           _relevance: {
  //             fields: [UserOrderByRelevanceFieldEnum.email],
  //             search: "*",
  //             sort: SortOrder.asc
  //           }
  //         }
  //       ],
  //       where: {
  //         role: {
  //           in: [Role.ADMIN, Role.MAINTAINER, Role.SUPERADMIN, Role.USER]
  //         }
  //       }
  //     }
  //   };
  //   (function lazyPeopleIIFE() {
  //     return !callPrompted ? () => {} :lazyPeople({variables: allUsersVarsClient});
  //   })();
  // }, [callPrompted, lazyPeople]);

  return (
    <>
      {dataClient ? (
        <Directory people={dataClient?.listUsers} />
      ) : loading && !error ? (
        <div>loading...</div>
      ) : (
        <div>
          {error
            ? new ApolloError(error)
            : new Error("error in directory page")}
        </div>
        // ) : (
        //   <div>
        //     {!called && !data ? (
        //       <div>{`${setCallPrompted(true)} called!`}</div>
        //     ) : (
        //       data && <Directory people={data?.listUsers} />
        //     )}
        //   </div>
      )}
    </>
  );
}

DirectoryPage.Layout = Layout;
