import { NextApiRequest, NextApiResponse } from "next";
import { initializeApollo } from "@/apollo/apollo";
import { getCookiesFromContext } from "@/lib/url";
import { setCookies } from "cookies-next";
import {
  ViewerDocument,
  ViewerQuery,
  ViewerQueryVariables
} from "@/graphql/queries/viewer.graphql";
import { ApolloError, ErrorPolicy, NetworkStatus } from "@apollo/client";
import {
  LoginUserMutation,
  LoginUserMutationVariables,
  LoginUserDocument
} from "@/graphql/mutations/login-user.graphql";

import { RequireOnlyOne } from "@/types/helpers";
import { setCookie } from "@/utils/cookies";
let networkStatusVal: keyof typeof NetworkStatus;

export default async function api(
  req: NextApiRequest,
  res: NextApiResponse<ViewerQuery>
) {
  const {
    headers: { authorization }
  } = req;

  const { getHeader, setHeader } = res;
  const getAuthHeader = authorization?.split(/([ ])/)[1];
  if (
    getAuthHeader != null &&
    getAuthHeader.valueOf().toString().length > 0
  ) {
    return setHeader("authorization", `Bearer ${getAuthHeader}`);
  }
  console.log(res.req.headers);
  console.log(req.headers ?? "no forwarded");
  const apolloClient = initializeApollo({}, { req, res });
  try {
    const { data, errors } = await apolloClient.query<
      ViewerQuery,
      ViewerQueryVariables
    >({
      query: ViewerDocument,
      context: { req, res },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
      errorPolicy: "all" as RequireOnlyOne<ErrorPolicy>
    });
    const setAuthHeader = res.setHeader(
      "authorization",
      `Bearer ${data.me.auth?.accessToken}`
    );
    if (data != null && setAuthHeader) {
      const dataActiveViewer = await apolloClient.query<
        ViewerQuery,
        ViewerQueryVariables
      >({
        query: ViewerDocument,
        context: { req, res },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: "network-only",
        errorPolicy: "all" as RequireOnlyOne<ErrorPolicy>
      });

      dataActiveViewer.data != null
        ? () =>
            setCookies("nest-next-2022", dataActiveViewer, {
              req,
              res,
              secure: process.env.NODE_ENV === "production" ? true : false,
              sameSite: "none",
              path: "/"
            })
        : () => {};
      return dataActiveViewer
        ? res.status(204).send(dataActiveViewer.data)
        : console.error(`no data to send ${new Error("no data").message}`);
    }
  } catch (error) {
    throw new Error(
      `error in /api/viewer/viewer - ${error as unknown as ApolloError}`
    );
  }
}
