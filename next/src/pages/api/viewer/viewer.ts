import { NextApiRequest, NextApiResponse } from "next";
import { initializeApollo } from "@/apollo/apollo";
import { setCookies } from "cookies-next";
import {
  ViewerDocument,
  ViewerQuery,
  ViewerQueryVariables,
  deriveUserDetailsFromTokenDocument,
  deriveUserDetailsFromToken,
  deriveUserDetailsFromTokenLazyQueryHookResult,
  deriveUserDetailsFromTokenQuery,
  deriveUserDetailsFromTokenQueryVariables
} from "@/graphql/generated/graphql";
import { ApolloError, ErrorPolicy } from "@apollo/client";
import { RequireOnlyOne } from "@/types/helpers";

export default async function viewerValidate(
  req: NextApiRequest,
  res: NextApiResponse<{
    authDetailed: deriveUserDetailsFromTokenQuery["userFromAccessTokenDecoded"];
  }>
) {
  const {
    query: { token }
  } = req;
  console.log(res.req.headers);
  console.log(req.headers ?? "no forwarded");
  const apolloClient = initializeApollo({}, { req, res });
  try {
    const nestSwaggerValidate = await apolloClient.query<
      deriveUserDetailsFromTokenQuery,
      deriveUserDetailsFromTokenQueryVariables
      >({
      variables: {token: token as string},
      query: deriveUserDetailsFromTokenDocument,
      context: { req, res, token: token as string },
      errorPolicy: "all" as RequireOnlyOne<ErrorPolicy>
    });
    const setAuthHeader = res.setHeader(
      "authorization",
      `Bearer ${nestSwaggerValidate.data?.userFromAccessTokenDecoded?.auth?.accessToken}`
    );
    console.log(nestSwaggerValidate ?? "no data");
    if (nestSwaggerValidate.data != null && setAuthHeader) {
      setCookies("nest-to-next-2022", nestSwaggerValidate.data, {
        sameSite: "none",
        domain: "http://localhost:3040",
        path: "/",
        maxAge:
          new Date(Date.now()).getMilliseconds() +
          30 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production" ? true : false,
        httpOnly: false,
        encode: (val: string) => encodeURIComponent(val)
      });

      return nestSwaggerValidate
        ? res
            .status(201)
            .json({
              authDetailed:
                nestSwaggerValidate.data.userFromAccessTokenDecoded
            })
        : console.error(`no data to send ${new Error("no data").message}`);
    }
  } catch (error) {
    throw new Error(`error in /api/viewer/viewer - ${error}`).message;
  }
}
