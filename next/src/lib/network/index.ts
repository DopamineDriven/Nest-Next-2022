import type { NextApiRequest, GetServerSidePropsContext } from "next";
import { fractionateCommaDelimitedData } from "@/utils/helpers";
import { OneScaffold } from "./one-scaffold";
import type {
  IpPapiProps,
  IpProps,
  MapQuestRes,
  NetworkDataProps,
  WhoIsProps,
  UspsProps,
  UspsPropsReturned,
  ResProps,
  GoogleMapsResponse
} from "@/types/Network";

export const networkVars = {
  oneGraphEndpoint: process.env.NEXT_PUBLIC_ONEGRAPH_ENDPOINT ?? "",
  googleApiKey: process.env.GOOGLE_API_KEY ?? "",
  mapQuestKey: process.env.NEXT_PUBLIC_MAP_QUEST_KEY ?? "",
  ipInfoToken: process.env.NEXT_PUBLIC_IP_INFO_TOKEN ?? "",
  papiKey: process.env.NEXT_PUBLIC_IP_PAPI_KEY ?? "",
  whoIsKey: process.env.NEXT_PUBLIC_WHOIS_API ?? "",
  access_token: process.env.HUBSPOT_ACCESS_TOKEN ?? "",
  uspsUsername: process.env.USPS_USERNAME ?? ""
};

export type googleReverseGeoLatLng = {
  lat: number;
  lng: number;
};

export const googleReverseGeoQuery = ({
  lat,
  lng
}: googleReverseGeoLatLng) => `
query ReverseGeocode {
  google(auths: { googleMapsKey: "${networkVars.googleApiKey}"  }) {
    maps {
      reverseGeolocation(
        point: {
          lat: ${lat}
          lng: ${lng}
        }
      ) {
        formattedAddress
        types
        placeId
        addressComponents {
        types
          longName
          shortName
        }
      }
    }
  }
}
`;
export type NetworkConstructProps = {
  HarvestNetworkInfo: (
    req: GetServerSidePropsContext["req"] | NextApiRequest
  ) => Promise<{
    harvestedData: NetworkDataProps;
  }>;
  IpInfoToLocation: (ip: string) => Promise<IpProps>;
  WhoIsIpToLocation: (ip: string) => Promise<WhoIsProps>;
  IpPapiIpToLocation: (ip: string) => Promise<IpPapiProps>;
  GoogleReverseGeocode: ({
    lat,
    lng
  }: googleReverseGeoLatLng) => Promise<GoogleMapsResponse>;
  MapQuestReverseGeo: (lat: number, lng: number) => Promise<MapQuestRes>;
  uspsPostalRoutePlusFour: (
    input: UspsProps
  ) => Promise<UspsPropsReturned>;
};

export const networkConstruct: NetworkConstructProps = {
  HarvestNetworkInfo: async (
    req: GetServerSidePropsContext["req"] | NextApiRequest
  ): Promise<{ harvestedData: NetworkDataProps }> => {
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
  },
  IpInfoToLocation: async (ip: string): Promise<IpProps> => {
    const res: Response = await fetch(
      `https://ipinfo.io/${ip}/geo?token=${networkVars.ipInfoToken}`,
      {
        headers: {
          "Accept-Encoding": "gzip, deflate, br",
          "Transfer-Encoding": "chunked",
          "Content-Type": "application/json; charset=utf-8",
          Connection: "keep-alive",
          Accept: "*/*"
        }
      }
    );
    return res.json();
  },
  WhoIsIpToLocation: async (ip: string): Promise<WhoIsProps> => {
    const res = await fetch(
      `https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=${networkVars.whoIsKey}&ipAddress=${ip}`,
      {
        headers: {
          "Accept-Encoding": "gzip, deflate, br",
          "Transfer-Encoding": "chunked",
          "Content-Type": "application/json; charset=utf-8",
          Connection: "keep-alive",
          "Cache-Control": "s-maxage=86400, stale-while-revalidate=43200",
          Accept: "*/*"
        }
      }
    );
    return res.json();
  },
  IpPapiIpToLocation: async (ip: string): Promise<IpPapiProps> => {
    const res = await fetch(
      `http://api.ipapi.com/${ip}?access_key=${networkVars.papiKey}`,
      {
        headers: {
          "Accept-Encoding": "gzip, deflate, br",
          "Transfer-Encoding": "chunked",
          "Content-Type": "application/json; charset=utf-8",
          Connection: "keep-alive",
          "Cache-Control": "s-maxage=86400, stale-while-revalidate=43200",
          Accept: "*/*"
        }
      }
    );
    return res.json();
  },
  GoogleReverseGeocode: async ({
    lat,
    lng
  }: googleReverseGeoLatLng): Promise<GoogleMapsResponse> => {
    return await fetch(networkVars.oneGraphEndpoint, {
      body: JSON.stringify({
        query: googleReverseGeoQuery({ lat, lng })
      }),
      method: "POST"
    }).then(data => data.json());
  },
  MapQuestReverseGeo: async (
    lat: number | string,
    lng: number | string
  ): Promise<MapQuestRes> => {
    const res: Response = await fetch(
      `http://www.mapquestapi.com/geocoding/v1/reverse?key=${networkVars.mapQuestKey}&location=${lat},${lng}&includeRoadMetadata=true&includeNearestIntersection=true`,
      {
        headers: {
          "Accept-Encoding": "gzip, deflate, br",
          "Transfer-Encoding": "chunked",
          "Content-Type": "application/json; charset=utf-8",
          Connection: "keep-alive",
          Accept: "*/*"
        }
      }
    );
    return res.json();
  },
  uspsPostalRoutePlusFour: async (
    input: UspsProps
  ): Promise<UspsPropsReturned> => {
    const res: Response = await fetch(
      `https://tools.usps.com/tools/app/ziplookup/zipByAddress`,
      {
        headers: {
          "Accept-Encoding": "gzip, deflate, br",
          "Transfer-Encoding": "chunked",
          "Content-Type": "application/x-www-form-urlencoded",
          Connection: "keep-alive",
          "Cache-Control":
            "public, s-maxage=86400, stale-while-revalidate=43200",
          Cookie:
            "TLTSID=565fa2d6a377160f8d0800e0ed96a2ca; NSC_uppmt-usvf-ofx=ffffffff3b22378945525d5f4f58455e445a4a4212d3",
          Accept: "*/*"
        },
        method: "POST",
        body: JSON.stringify({ input })
      }
    );
    return res.json();
  }
};

const {
  GoogleReverseGeocode,
  IpInfoToLocation,
  IpPapiIpToLocation,

  MapQuestReverseGeo
} = networkConstruct;

export type OneConstructChildFuncs<
  T extends keyof typeof networkConstruct
> = {
  [P in T]?: typeof networkConstruct[P];
};

export const emailToDeets = async (
  userEmail: string
): Promise<ResProps> => {
  const { getUserByEmail } = OneScaffold;
  const userByEmail = await getUserByEmail(userEmail);
  const ip =
    userByEmail.data.hubspot.makeRestCall.get.jsonBody.properties.city;
  const IpToLocationProviders = {
    ipInfoToLocation: (await IpInfoToLocation(ip).then(
      data => data
    )) as IpProps,
    ipPapiToLocation: (await IpPapiIpToLocation(ip).then(
      data => data
    )) as IpPapiProps
  };

  const getIpInfoGeoCoords = (loc: string) => {
    const IpInfoCoords = loc?.split(",", 2) ?? [""];
    const latlngToExact = {
      lat: parseFloat(IpInfoCoords[0]),
      lng: parseFloat(IpInfoCoords[1])
    };
    return { latlngToExact };
  };

  const {
    ipInfoToLocation: { loc },
    ipPapiToLocation: { latitude: papiLat, longitude: papiLng }
  } = IpToLocationProviders;

  const { latlngToExact } = getIpInfoGeoCoords(loc);

  const getAvgOfReturnedGeoCoords = {
    avgLat: parseFloat(
      ((latlngToExact.lat + papiLat) / 2).toPrecision(21)
    ),
    avgLng: parseFloat(((latlngToExact.lng + papiLng) / 2).toPrecision(21))
  };

  const { avgLat, avgLng } = getAvgOfReturnedGeoCoords;

  const PooledReverseGeoCodeResults = {
    mapQuestReverseGeocode: (await MapQuestReverseGeo(avgLat, avgLng).then(
      data => data
    )) as MapQuestRes,
    googleReverseGeoResults: (await GoogleReverseGeocode({
      lat: parseFloat(avgLat.toPrecision(21)),
      lng: parseFloat(avgLng.toPrecision(21))
    }).then(data => data)) as GoogleMapsResponse
  };

  return {
    userByEmail,
    IpToLocationProviders,
    getAvgOfReturnedGeoCoords,
    PooledReverseGeoCodeResults
  };
};
// const { googleReverseGeoResults } = PooledReverseGeoCodeResults;

// const getAddressObject = () =>
//   googleReverseGeoResults
//     .results!.map((x, i) => {
//       return x.address_components[i++];
//     })
//     .pop()!;

// const input = {
//   address1: `${getAddressObject().long_name} ${getAddressObject().long_name}`,
//   address2: "",
//   urbanCode: "",
//   companyName: "",
//   city: `${getAddressObject().long_name}`,
//   state: `${getAddressObject().short_name}`,
//   zip: `${getAddressObject().long_name}`
// };

// const getPlusFour: UspsPropsReturned = await uspsPostalRoutePlusFour(
//   input
// ).then(data => {
//   return data;
// });
