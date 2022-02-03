import type { PublicConfiguration, Fetcher } from "swr/dist/types";
import type { HarvestNetworkDataProps } from "@/types/network";
import type { UnwrapPromise } from "@/types/helpers";
import { fractionateCommaDelimitedData } from "@/utils/helpers";
import { GetServerSidePropsContext, NextApiRequest } from "next";

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

export type IpFetcherReturns = UnwrapPromise<ReturnType<typeof ipFetcher>>;
