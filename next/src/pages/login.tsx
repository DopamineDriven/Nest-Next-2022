import { Container, Inspector, LoadingSpinner } from "@/components/UI";
import { ParsedUrlQuery } from "@/types/query-parser";
// import {
//   GetStaticPropsContext,
//   GetStaticPropsResult,
//   InferGetStaticPropsType
// } from 'next';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType
} from "next";

import { initializeApollo } from "@/apollo/apollo";
import LoginComponent from "@/components/Auth/Login/login-component";
import UnAuthContext from "../context/unauth-context";
import { useCallback, useEffect, useState } from "react";
import useAuth from "src/hooks/use-auth";
import Layout from "@/components/Layout/layout";

// export type LoginProps = {
//   nav: DynamicNavQuery;
//   newsletter?: GetGravityFormQuery;
// };

export default function LoginPage() {
  // const [token, setToken] = useState<string | null>("");
  const { viewer, loading, loggedIn } = useAuth();

  // const [viewerStatus, setViewerStatus] = useState(
  //   viewerState.viewer?.authDetailed
  // );
  // const viewerCb = useCallback((token: string | null) => {
  //   if (token != null) {
  //   }
  // }, []);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const authToken = window.localStorage.getItem("authorization");
  //     return setToken(authToken);
  //   }
  // }, []);

  return (
    <Container
      className='mx-auto min-w-full z-150 flex container w-screen justify-center'
      clean={true}>
      {loading === true ? (
        <LoadingSpinner />
      ) : loggedIn ? (
        <>
          <Inspector>{JSON.stringify(viewer, null, 2)}</Inspector>
        </>
      ) : (
        <UnAuthContext>
          <div className='mt-12 bg-white p-4 ring-2 ring-inset ring-blue-600 rounded-lg font-gothamLight shadow-cardHover'>
            <LoginComponent viewer={viewer} />
          </div>
        </UnAuthContext>
      )}
    </Container>
  );
}

// export const getServerSideProps = async (
//   ctx: GetServerSidePropsContext<ParsedUrlQuery>
// ): Promise<GetServerSidePropsResult<LoginProps>> => {
//   console.log(`[login ctx]: ${ctx}`);
//   const apolloClient = initializeApollo();
//   const { data: nav } = await apolloClient.query<
//     DynamicNavQuery,
//     DynamicNavQueryVariables
//   >({
//     query: DynamicNavDocument,
//     variables: {
//       idHead: "Header",
//       idTypeHead: MenuNodeIdTypeEnum.NAME,
//       idFoot: "Footer",
//       idTypeFoot: MenuNodeIdTypeEnum.NAME
//     },
//     notifyOnNetworkStatusChange: true
//   });
//   const { data: newsletter } = await apolloClient.query<
//     GetGravityFormQuery,
//     GetGravityFormQueryVariables
//   >({
//     fetchPolicy: "cache-first",
//     query: GetGravityFormDocument,
//     notifyOnNetworkStatusChange: true,
//     variables: {
//       first: 100,
//       formId: "3",
//       idType: IdTypeEnum.DATABASE_ID
//     }
//   });
//   return addApolloState(apolloClient, {
//     props: {
//       nav,
//       newsletter
//     },
//     redirect: {
//       permanent: false,
//       destination: "/"
//     }
//   });
// };

LoginPage.Layout = Layout;
