import { NextApiRequest, NextApiResponse } from "next";
import { initializeApollo } from "@/apollo/apollo";
import { setCookies } from "cookies-next";
import {
  ViewerDocument,
  ViewerQuery,
  ViewerQueryVariables,
  deriveUserDetailsFromTokenDocument,
  usederiveUserDetailsFromTokenMutation,
  deriveUserDetailsFromToken,
  deriveUserDetailsFromTokenMutation,
  deriveUserDetailsFromTokenMutationVariables
} from "@/graphql/generated/graphql";
import { ApolloError, ErrorPolicy } from "@apollo/client";
import { RequireOnlyOne } from "@/types/helpers";

export default async function viewerValidate(
  req: NextApiRequest,
  res: NextApiResponse<{
    authDetailed: deriveUserDetailsFromTokenMutation["userFromAccessTokenDecoded"];
  }>
) {
  const {
    query: { token }
  } = req;
  console.log(res.req.headers);
  console.log(req.headers ?? "no forwarded");
  // const apolloClient = initializeApollo({}, { req, res });
  try {
    const nestSwaggerValidate: deriveUserDetailsFromTokenMutation["userFromAccessTokenDecoded"] =
      await fetch(
        `http://localhost:3000/auth/token/${token as string}`.trim(),
        {
          credentials: "include",
          cache: "only-if-cached",
          mode: "cors",
          referrerPolicy: "origin-when-cross-origin",
          body: JSON.stringify({
            token: token as string
          }),
          method: "POST",
          headers: {
            authorization: `Bearer ${token as string}`
          },
          keepalive: true
        }
      )
        .then(
          res =>
            res.json() as Promise<
              deriveUserDetailsFromTokenMutation["userFromAccessTokenDecoded"]
            >
        )
        .finally(() => Promise.resolve({}));
    const setAuthHeader = res.setHeader(
      "authorization",
      `Bearer ${nestSwaggerValidate?.auth?.accessToken}`
    );
    if (nestSwaggerValidate != null && setAuthHeader) {
      setCookies("nest-to-next-2022", nestSwaggerValidate, {
        sameSite: "none",
        path: "/",
        maxAge:
          new Date(Date.now()).getMilliseconds() +
          30 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production" ? true : false,
        httpOnly: false,
        encode: (val: string) => encodeURIComponent(val)
      });

      return nestSwaggerValidate
        ? res.status(201).json({ authDetailed: nestSwaggerValidate })
        : console.error(`no data to send ${new Error("no data").message}`);
    }
  } catch (error) {
    throw new Error(`error in /api/viewer/viewer - ${error}`).message;
  }
}
    // const { data, errors } = await apolloClient.mutate<
    //   deriveUserDetailsFromTokenMutation,
    //   deriveUserDetailsFromTokenMutationVariables
    // >({
    //   mutation: deriveUserDetailsFromTokenDocument,
    //   context: { req, res, token: token as string },
    //   refetchQueries: [{ query: ViewerDocument }],
    //   errorPolicy: "all" as RequireOnlyOne<ErrorPolicy>
    // });
