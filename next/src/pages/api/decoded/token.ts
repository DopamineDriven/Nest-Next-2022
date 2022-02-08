import { initializeApollo } from "@/apollo/apollo";
import {
  DeriveUserDetailsFromTokenDocument,
  DeriveUserDetailsFromTokenMutation,
  DeriveUserDetailsFromTokenMutationVariables
} from "@/graphql/mutations/get-user-from-access-token.graphql";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

export default async function decoded<T extends AuthDetailed>(
  req: NextApiRequest,
  res: NextApiResponse<AuthDetailed>
) {
  const {
    query: { token }
  } = req;
  const authHeader = req.headers["authorization"]?.split(/([ ])/)[0];
  console.log(`received: ${token} vs parsed: ${authHeader}`);
  const apolloClient = initializeApollo({}, { req, res });
  const authDetailed = await apolloClient.mutate<
    DeriveUserDetailsFromTokenMutation,
    DeriveUserDetailsFromTokenMutationVariables
  >({
    mutation: DeriveUserDetailsFromTokenDocument,
    context: { token: (token as string) ?? (authHeader as string) },
    errorPolicy: "all",
    variables: { token: (token as string) ?? (authHeader as string) }
  }).then((data) => data.data?.userFromAccessTokenDecoded as unknown as AuthDetailed)
  try {
    if (!token || !authHeader)
      new Error("no token or Auth Header").message;

    const getSessionWithUserFfs = async () =>
      await apolloClient.mutate({
        fetchPolicy: "network-only",

        mutation: DeriveUserDetailsFromTokenDocument,
        variables: { data: { token: token as string } },
        optimisticResponse: await { ...data },
        awaitRefetchQueries: true
      });
    const data: AuthDetailed = (await getSessionWithUserFfs()).data
      ? ((await getSessionWithUserFfs()).data as AuthDetailed)
      : ((await getSessionWithUserFfs.prototype.data)) ?? authDetailed;
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
