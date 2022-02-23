import { NextApiRequest, NextApiResponse } from "next";
import { initializeApollo } from "@/apollo/apollo";

import { getCookiesFromContext } from "@/lib/url";
import { setCookies } from "cookies-next";
import {
  ViewerDocument,
  ViewerQuery,
  ViewerQueryVariables
} from "@/graphql/queries/viewer.graphql";
import {
  ApolloError,
  ApolloQueryResult,
  ErrorPolicy,
  NetworkStatus,
  Observable,
  ObservableQuery
} from "@apollo/client";
import { Subscription } from "zen-observable-ts";
import { RequireOnlyOne } from "@/types/helpers";
let networkStatusVal: keyof typeof NetworkStatus;

export default async function api(
  req: NextApiRequest,
  res: NextApiResponse<ViewerQuery | Subscription | undefined>
) {
  // const {
  //   headers: { authorization, forwarded }
  // } = req;
  // const authHeader = authorization?.split(/([ ])/)[1];
  // console.log(forwarded ?? "no forwarded");
  // const apolloClient = initializeApollo({}, { req, res });
  // const watchViewerQuery: ObservableQuery<
  //   ViewerQuery,
  //   ViewerQueryVariables
  // > = apolloClient.watchQuery<ViewerQuery, ViewerQueryVariables>({
  //   query: ViewerDocument,
  //   context: { req, res, networkStatus: NetworkStatus },
  //   notifyOnNetworkStatusChange: true,
  //   fetchPolicy: "network-only",
  //   nextFetchPolicy: "cache-first",
  //   errorPolicy: "all" as RequireOnlyOne<ErrorPolicy>,
  //   partialRefetch: true,
  //   returnPartialData: true
  // });
  // const zenObservableSubscription: Subscription = watchViewerQuery
  //   .concat<ApolloQueryResult<ViewerQuery>>(watchViewerQuery)
  //   .subscribe(
  //     watchViewerQuery.subscribeToMore({
  //       context: { req, res },
  //       onError: error => {
  //         return error.message;
  //       },
  //       document: ViewerDocument
  //     })
  //   );
  // const compareLastWithCurrent =
  //   watchViewerQuery.getLastResult(true)?.data != null
  //     ? watchViewerQuery.getLastResult(true)?.data ===
  //       watchViewerQuery.getCurrentResult(true).data
  //       ? true
  //       : false
  //     : undefined;
  // try {
  //   if (authHeader != null && authHeader.length > 0) {
  //     const getViewerPayload: ViewerQuery =
  //       watchViewerQuery
  //         .isDifferentFromLastResult(await watchViewerQuery.refetch())
  //         .valueOf() === true
  //         ? (await watchViewerQuery.refetch()).data
  //         : (await watchViewerQuery.result()).data;
  //     setCookies("nest-next-2022", getViewerPayload, {
  //       req,
  //       res,
  //       secure: process.env.NODE_ENV === "production" ? true : false,
  //       sameSite: "none",
  //       path: "/"
  //     });
  //     return getViewerPayload;
  //   } else {
  //     return watchViewerQuery
  //       .isDifferentFromLastResult(watchViewerQuery.getCurrentResult())
  //       .valueOf() === true
  //       ? watchViewerQuery.getCurrentResult().data
  //       : watchViewerQuery.startPolling(5000);
  //   }
  // } catch (error: any) {
  //   return error as ApolloError as unknown as any;
  // } finally {
  //   const areEqual =
  //     compareLastWithCurrent === true
  //       ? watchViewerQuery.getCurrentResult(true).data
  //       : (await watchViewerQuery.refetch()).data;
  //   const doesContainData = areEqual.me !== undefined ? true : false;
  //   return !!doesContainData
  //     ? res.status(204).json(areEqual)
  //     : !doesContainData
  //     ? (await watchViewerQuery.refetch()).data
  //     : (await watchViewerQuery.refetch()).data;
  // }
}
