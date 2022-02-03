import type {
  GetUserByEmailProps,
  GetUsersByEmailProps,
  GetUsersOneGraphResponseProps,
  GetContactsOneGraphResponseProps
} from "@/types/Network";
const oneVars = {
  oneGraphEndpoint: process.env.NEXT_PUBLIC_ONEGRAPH_ENDPOINT ?? "",
  hubSpotOAuthToken: process.env.HUBSPOT_ACCESS_TOKEN ?? ""
};

export const query = (path: string) => `
query HubSpotContacts {
  hubspot(
    auths: {
      hubspotOAuthToken: "${oneVars.hubSpotOAuthToken}"
    }
  ) {
    makeRestCall {
      get(path: "${path}") {
        response {
          statusCode
          headers
        }
        jsonBody
      }
    }
  }
}
`;

export const oneClientFetcher = async (path: string) => {
  return await fetch(`${oneVars.oneGraphEndpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${oneVars.hubSpotOAuthToken}`,
      Accept: "*/*",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/json",
      "Cache-Control":
        "public, s-maxage=86400, stale-while-revalidate=43200"
    },
    body: JSON.stringify({ query: query(path) })
  });
};

export type OneScaffoldProps = {
  getContacts: (
    limit?: string
  ) => Promise<GetContactsOneGraphResponseProps>;
  getUsers: () => Promise<GetUsersOneGraphResponseProps>;
  getUsersByEmail: () => Promise<GetUsersByEmailProps>;
  getUserByEmail: (email: string) => Promise<GetUserByEmailProps>;
};

export const OneScaffold: OneScaffoldProps = {
  getContacts: async (
    limit?: string
  ): Promise<GetContactsOneGraphResponseProps> => {
    const path = `/crm/v3/objects/contacts?limit=${
      limit ?? 20
    }&properties=city%2Cemail%2Cfirstname%2Clastname&archived=false`;
    const res = await oneClientFetcher(path);
    return await res.json();
  },
  getUsers: async (): Promise<GetUsersOneGraphResponseProps> => {
    const path = `/settings/v3/users`;
    const res = await oneClientFetcher(path);
    return await res.json();
  },
  getUsersByEmail: async (): Promise<GetUsersByEmailProps> => {
    const path =
      "/crm/v3/objects/contacts/?properties=email&archived=false&idProperty=email";
    const res = await oneClientFetcher(path);
    return await res.json();
  },
  getUserByEmail: async (email: string): Promise<GetUserByEmailProps> => {
    const path = `/crm/v3/objects/contacts/${email}?properties=city%2Cemail%2Cfirstname%2Clastname%2Cstatus&archived=false&idProperty=email`;
    const res = await oneClientFetcher(path);
    return await res.json();
  }
};
