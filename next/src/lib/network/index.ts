import { HarvestNetworkDataProps } from "@/types/network";
import type { NextApiRequest, GetServerSidePropsContext } from "next";

export type NetworkConstructProps = {
  HarvestNetworkInfo: (
    req: GetServerSidePropsContext["req"] | NextApiRequest
  ) => Promise<{
    harvestedData: HarvestNetworkDataProps;
  }>;
};

export const networkConstruct = async (
    req: GetServerSidePropsContext["req"] | NextApiRequest
  ): Promise<{ harvestedData: HarvestNetworkDataProps }> => {
    const nonProxiedIp = req.headers["x-forwarded-for"] as string;

    const returnFirstRealIp = nonProxiedIp
      ? (nonProxiedIp.split(/([,])/))[0]
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
