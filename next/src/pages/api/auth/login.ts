import { NextApiRequest, NextApiResponse } from "next";
import { initializeApollo } from "@/apollo/apollo";
import {
  LoginUserMutation,
  LoginUserMutationVariables,
  LoginUserDocument
} from "@/graphql/mutations/login-user.graphql";
import { getCookiesFromContext } from "@/lib/url";
import { setCookies } from "cookies-next";
const toBase64 = (string: string) => {
  return Buffer.from(string).toString("base64url")
}
export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<{
    data: LoginUserMutation | null | undefined;
    cookies: string | undefined;
  }>
) {
  const {
    query: { email, password }
  } = req;
  const authHeader = req.headers.authorization?.split(/([ ])/)[1];
  console.log(authHeader ?? "no auth header");
  try {
    const apolloClient = initializeApollo({}, req.query);

    const { data, context, errors, extensions } =
      await apolloClient.mutate<
        LoginUserMutation,
        LoginUserMutationVariables
      >({
        mutation: LoginUserDocument,
        variables: {
          data: {
            email: email as string,
            password: password as string
          }
        },
        fetchPolicy: "network-only"
      });
    const cookies = getCookiesFromContext(req.cookies);
    setCookies("nest-next-2022", data, {
      req,
      httpOnly: false,
      encode: () => toBase64("nest-next-2022"),
      res,
      maxAge: new Date(
        new Date(Date.now()).getMilliseconds() + (1000 * 60 * 60 * 24 * 30)
      ).getSeconds(),
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "none",
      path: "/"
    });
    if (errors) throw errors.map(graphqlError => ({ ...graphqlError }));
    return res
      .setHeader(
        "authorization",
        `Bearer ${
          data?.login.accessToken
            ? data.login.accessToken.trim()
            : authHeader
        }`
      )
      .json({ data: data, cookies: cookies });
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
}
