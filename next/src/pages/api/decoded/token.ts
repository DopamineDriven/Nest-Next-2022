import { initializeApollo } from "@/apollo/apollo";
import {
  deriveUserDetailsFromTokenDocument,
  deriveUserDetailsFromTokenQueryVariables,
  deriveUserDetailsFromTokenQuery
} from "@/graphql/generated/graphql";
import { NextApiRequest, NextApiResponse } from "next";

export default async function decoded<T extends AuthDetailed>(
  req: NextApiRequest,
  res: NextApiResponse<AuthDetailed>
) {
  const {
    query: { token }
  } = req;
  const authHeader = req.headers["authorization"]?.split(/([ ])/)[2];
  console.log(`received: ${token} vs parsed: ${authHeader}`);
  const apolloClient = initializeApollo({}, { req, res });
  const authDetailed = await apolloClient
    .query<
      deriveUserDetailsFromTokenQuery,
      deriveUserDetailsFromTokenQueryVariables
    >({
      query: deriveUserDetailsFromTokenDocument,
      context: { token: (token as string) ?? (authHeader as string) },
      errorPolicy: "all",
      variables: { token: (token as string) ?? (authHeader as string) }
    })
    .then(
      data =>
        data.data?.userFromAccessTokenDecoded as unknown as AuthDetailed
    );
  try {
    if (!token || !authHeader)
      new Error("no token or Auth Header").message;

    const getSessionWithUserFfs = async () =>
      await apolloClient.query<
        deriveUserDetailsFromTokenQuery,
        deriveUserDetailsFromTokenQueryVariables
      >({
        fetchPolicy: "network-only",

        query: deriveUserDetailsFromTokenDocument,
        variables: { token: token as string }
      });
    const data: AuthDetailed = (await getSessionWithUserFfs()).data
      .userFromAccessTokenDecoded as unknown as AuthDetailed;
    return await res.status(201).send(data);
  } catch (error) {
    throw new Error(`${error} -- error in pages/api/decoded/token.ts`)
      .message;
  } finally {
    res
      .status(204)
      .setHeader("authorization", token as string)
      .end({}) as NextApiResponse<T>;
  }
}
