import type { NextApiRequest, GetServerSidePropsContext } from "next";
import { fractionateCommaDelimitedData } from "@/utils/helpers";
import type { UnwrapPromise, NetworkDataProps } from "@/types/index";

export const HarvestNetworkInfo = async (
  req: GetServerSidePropsContext["req"] | NextApiRequest
): Promise<NetworkDataProps> => {
  const nonProxiedIp = req.headers["x-forwarded-for"] as string;
  const returnFirstRealIp = nonProxiedIp
    ? fractionateCommaDelimitedData(nonProxiedIp)[0]
    : req.socket.remoteAddress;
  const addressInfo = req.socket.address();

  const RawHeaders = req.headers;
  const Cookies = req.cookies;
  const lookup = req.socket.emit("drain");
  console.log(lookup);

  return {
    ClientIp: `${returnFirstRealIp}`,
    BoundAFP: addressInfo,
    Headers: RawHeaders,
    Cookies
  };
};

export type HarvestNetworkInfoReturnType = UnwrapPromise<
  ReturnType<typeof HarvestNetworkInfo>
>;
