import { initializeApollo, InitialState } from "@/apollo/apollo";
import { ObservableQuery } from "@apollo/client";
import {
  ViewerQuery,
  ViewerDocument,
  ViewerQueryVariables
} from "@/graphql/queries/viewer.graphql";
import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequest, NextApiResponse } from "next";
type NetworkObservable<
  T = Record<
    string | number | symbol,
    unknown extends infer P ? P : unknown
  >
> = {
  req: IncomingMessage | NextApiRequest;
  res: NextApiResponse<T> | ServerResponse;
};
export default function watchViewerQuery<P extends NetworkObservable>(
  req: P["req"],
  res: P["res"],
  initialState: InitialState,
  initApollo: typeof initializeApollo
): ObservableQuery<ViewerQuery, ViewerQueryVariables> {
  const apolloClient = initApollo(initialState, { req, res });
  return apolloClient.watchQuery<ViewerQuery, ViewerQueryVariables>({
    query: ViewerDocument,
    context: { req, res },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    errorPolicy: "all",
    partialRefetch: true,
    returnPartialData: true
  });
}
