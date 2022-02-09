import { JwtDecoded } from "@/cache/__types__";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { SignJWT, jwtVerify, decodeJwt } from "jose";
import { jsonResponse } from "@/utils/helpers";
import { initializeApollo } from "@/apollo/apollo";
import { IncomingMessage, ServerResponse } from "http";
import { NextIncomingMessage } from "next/dist/server/request-meta";
import {
  DeriveUserDetailsFromTokenDocument,
  DeriveUserDetailsFromTokenMutation,
  DeriveUserDetailsFromTokenMutationVariables
} from "@/graphql/mutations/get-user-from-access-token.graphql";
export declare const waitUntilSymbol: unique symbol;

const authConstants = {
  JWT_SIGNING_KEY: process.env.JWT_SIGNING_KEY ?? "",
  USER_TOKEN: "next-to-nest-2022"
};

export const { JWT_SIGNING_KEY, USER_TOKEN } = authConstants;

interface UserJwtPayload {
  jti: string;
  iat: number;
}

/**
 * Verifies the user's JWT token and returns the payload if
 * it's valid or a response if it's not.
 */
export async function verifyAuth<
  T extends NextRequest,
  K extends NextIncomingMessage
>(
  request: T,
  req: K,
  res: ServerResponse
): Promise<
  | Response
  | (UserJwtPayload & AuthDetailed)
  | UserJwtPayload
  | AuthDetailed
> {
  const token = request.cookies[USER_TOKEN];
  const headerToken = request.headers
    .get("authorization")
    ?.split(/([ ])/)[0];
  if (!token) {
    return jsonResponse(401, { error: { message: "Missing user token" } });
  }
  const apolloClient = initializeApollo({}, { req: res.req, res: res });
  try {
    const decode = decodeJwt(token) as JwtDecoded;

    const getAuthUrl = () =>
      fetch(
        encodeURI(`http://localhost:3000/auth/token/${(headerToken ?? token).trim()}`),
        { headers: { ["authorization"]: `Bearer ${headerToken}` } }
      ).then(res => res.json() as Promise<AuthDetailed>);
    const getAuthDetailed = async () =>
      await apolloClient.mutate<
        DeriveUserDetailsFromTokenMutation,
        DeriveUserDetailsFromTokenMutationVariables
      >({
        mutation: DeriveUserDetailsFromTokenDocument,
        variables: { token: headerToken ? headerToken : token }
      });

    // const getUserPayload = await
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SIGNING_KEY),
      { typ: "HS512" }
    );
    return (
      verified.payload &&
      ((await getAuthUrl()) ||
        ((await getAuthDetailed()).data
          ?.userFromAccessTokenDecoded as unknown as AuthDetailed))
    );
  } catch (err) {
    return jsonResponse(401, {
      error: { message: "Your token has expired." }
    });
  }
}

/**
 * Adds the user token cookie to a response.
 */
export async function setUserCookie(
  request: NextRequest,
  response: NextResponse
) {
  const cookie = request.cookies[USER_TOKEN];

  if (!cookie) {
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "HS512" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(new TextEncoder().encode(JWT_SIGNING_KEY));
    response.cookie(USER_TOKEN, token, { httpOnly: false });
  }

  return response;
}
