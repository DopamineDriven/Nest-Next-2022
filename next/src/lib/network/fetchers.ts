import type { PublicConfiguration, Fetcher } from "swr/dist/types";
import type { HarvestNetworkDataProps } from "@/types/network";
import type { UnwrapPromise } from "@/types/helpers";
import { fractionateCommaDelimitedData } from "@/utils/helpers";
import { GetServerSidePropsContext, NextApiRequest } from "next";
import { AuthDetailed } from "@/cache/__types__";
import { ViewerQuery } from "@/graphql/queries/viewer.graphql";

export enum ReqMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  HEAD = "HEAD",
  CONNECT = "CONNECT",
  TRACE = "TRACE",
  PATCH = "PATCH",
  OPTIONS = "OPTIONS",
  SPECIAL = "SPECIAL",
  QUERY = "QUERY"
}

export type NetworkConstructProps = {
  HarvestNetworkInfo: (
    req: GetServerSidePropsContext["req"] | NextApiRequest
  ) => Promise<{
    harvestedData: HarvestNetworkDataProps;
  }>;
};
export const networkConstruct: NetworkConstructProps = {
  HarvestNetworkInfo: async (
    req: GetServerSidePropsContext["req"] | NextApiRequest
  ): Promise<{ harvestedData: HarvestNetworkDataProps }> => {
    const nonProxiedIp = req.headers["x-forwarded-for"] as string;

    const returnFirstRealIp = nonProxiedIp
      ? fractionateCommaDelimitedData(nonProxiedIp)[0]
      : req.socket.remoteAddress;

    const harvestedData = {
      ClientIp: returnFirstRealIp ?? "",
      BoundAFP: req.socket.address() ?? {},
      Headers: req.headers ?? [],
      Cookies: req.cookies ?? {}
    };

    return {
      harvestedData
    };
  }
};
export const hubspotFetcherVars = {
  oneGraphEndpoint: process.env.NEXT_PUBLIC_ONEGRAPH_ENDPOINT ?? "",
  hubSpotOAuthToken: process.env.NEXT_PUBLIC_HUBSPOT_ACCESS_TOKEN ?? ""
};

// export type OneScaffoldFetcherProps<
//   T = GetContactsOneGraphResponseProps | GetUsersOneGraphResponseProps
// > = Partial<
//   PublicConfiguration<T, unknown extends infer U ? U : any, Fetcher<T>>
// >;
// type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export async function ipFetcher<
  T extends any extends PromiseLike<infer U> ? U : T
>(path: string): Promise<T> {
  const res: Response = await fetch(path, {
    headers: {
      "Cache-Control": "s-maxage=86400, stale-while-revalidate=43200",
      "Accept-Encoding": "gzip, deflate, br",
      "Transfer-Encoding": "chunked",
      "Content-Type": "application/json; charset=utf-8",
      Connection: "keep-alive",
      Accept: "*/*"
    }
  });
  return await res.json();
}

export async function authFetcher<T>(path: string): Promise<T> {
  const res: Response = await fetch(path, {
    headers: {
      "Cache-Control": "s-maxage=86400, stale-while-revalidate=43200",
      "Accept-Encoding": "gzip, deflate, br",
      "Transfer-Encoding": "chunked",
      "Content-Type": "application/json; charset=utf-8",
      Connection: "keep-alive",
      Accept: "*/*"
    }
  });
  return await res.json();
}
type Maybe<T> = T | null | undefined;
export async function viewerFetcher<T extends keyof typeof ReqMethod>(
  method: T,
  accessToken: string,
  path: string,
  value?: any | Record<string | number | symbol, any>
): Promise<AuthDetailed> {
  const res: Response = await fetch(`${path}/${accessToken}`, {
    headers: {
      "Cache-Control": "s-maxage=86400, stale-while-revalidate=43200",
      "Accept-Encoding": "gzip, deflate, br",
      "Transfer-Encoding": "chunked",
      "Content-Type": "application/json; charset=utf-8",
      Connection: "keep-alive",
      Accept: "*/*"
    },
    method: method ? method : "GET",
    body: JSON.stringify({value})
  });
  return res.json() as Promise<AuthDetailed>;
}

export type IpFetcherReturns = UnwrapPromise<ReturnType<typeof ipFetcher>>;
