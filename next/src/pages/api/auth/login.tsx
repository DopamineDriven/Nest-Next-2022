import { NextApiRequest, NextApiResponse } from "next";
import { initializeApollo } from "@/apollo/apollo";
import {
  LoginUserMutation,
  LoginUserMutationVariables,
  LoginUserDocument
} from "@/graphql/mutations/login-user.graphql";
import { getCookiesFromContext } from "@/lib/url";
import { setCookies } from "cookies-next";

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<{
    data: LoginUserMutation | null | undefined;
    context: Record<string, any> | undefined;
    extensions: Record<string, any> | undefined;
    cookies: string | undefined;
  }>
) {
  const {
    query: { email, password }
  } = req;
  const authHeader = req.headers.authorization?.split(/([ ])/)[1];
  try {
    const apolloClient = initializeApollo({}, req.query);

    const { data, context, errors, extensions } =
      await apolloClient.mutate<
        LoginUserMutation,
        LoginUserMutationVariables
      >({
        mutation: LoginUserDocument,
        variables: {
          loginData: {
            email: email as string,
            password: password as string
          }
        },
        fetchPolicy: "network-only"
      });
    const cookies = getCookiesFromContext(req.cookies);
    setCookies("nest-next-2022", data?.login.accessToken, {
      req,
      res,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
      path: "/"
    });
    if (errors) throw errors.map(graphqlError => ({ ...graphqlError }));
    res.setHeader(
      "authorization",
      "Bearer " +
        JSON.stringify(
          data?.login.accessToken ? data.login.accessToken : authHeader,
          null,
          2
        )
    );
    return res.send({ data, context, extensions, cookies });
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    res.end(res.getHeader("authorization"));
  }
}
