import { NextRequest, NextResponse } from "next/server";

import cors, { CorsOptions } from "@/lib/cors";

// (next: () => NextResponse)

export default async function middleware(req: NextRequest) {
  req.cookies;
  console.log(req.cookies ?? "no cooks");
  if (
    req.headers.get("authorization") &&
    req.headers.get("authorization") != null
  ) {
    return NextResponse.prototype.headers.set(
      "authorization",
      `Bearer ${req.headers
        .get("authorization")
        ?.split(/([ ])/)[1]
        ?.trim()}`
    );
  }
  // if (req.nextUrl.pathname === "/" || "") {
  //   const getCookieFromSignupOrloginMutations = JSON.parse(
  //     req.cookies["nest-to-next-2022" || "false"]
  //   );
  //   return NextResponse.rewrite(
  //     `/${getCookieFromSignupOrloginMutations ? "profile" : "index"}`
  //   );
  // }
  const response = NextResponse.next();
  response.headers.set("Referrer-Policy", "Origin-When-Cross-Origin");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  response.headers.set(
    "Cache-Control",
    "public, stale-while-revalidate=600, s-maxage=1200"
  );
  const requestHeader = req.headers.get("authorization");
  response.headers.set("authorization", requestHeader ?? "");
  // response.headers.set("X-XSS-Protection", "1; mode=block");
  // response.headers.set("X-Frame-Options", "DENY");
  // response.headers.set("X-Content-Type-Options", "nosniff");
  // response.headers.set("X-DNS-Prefetch-Control", "On");
  const options: CorsOptions = {
    origin: true, // dynamic origin -- Vary
    allowedHeaders: [
      "Access-Control-Allow-Methods",
      "Access-Control-Expose-Headers",
      "apollographql-client-name",
      "access-control-allow-headers",
      "Access-Control-Allow-Origin",
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Apollo-Federation-Include-Trace",
      "Authorization",
      "Cache-Control",
      "Vary",
      "Content-Length",
      "Cookie",
      "Accept-Encoding",
      "Transfer-Encoding",
      "Connection",
      "Referrer",
      "Referrer-Policy",
      "X-Csrf-Token",
      "Woocommerce-Session",
      "Accept-Charset",
      "Forwarded",
      "Host",
      "From",
      "ETag",
      "Retry-After",
      "Server",
      "Set-Cookie",
      "Trailer",
      "User-Agent",
      "Upgrade",
      "X-XSS-Protection",
      "Upgrade-Insecure-Requests",
      "Session",
      "authorization"
    ],
    maxAge: 31536000,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    exposedHeaders: ["*", "authorization"] // Authorization must be explicitly set
  };
  return cors(req, response, { ...options });
}
