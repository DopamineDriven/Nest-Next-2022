import "@/styles/index.css";

import React, {
  useEffect,
  FC,
  ReactElement,
  useCallback,
  useState
} from "react";
import App, {
  NextWebVitalsMetric,
  AppProps,
  AppInitialProps,
  AppContext
} from "next/app";
import { initializeApollo, useApollo } from "@/apollo/apollo";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject
} from "@apollo/client";
import { useRouter } from "next/router";
import Router from "next/dist/server/router";
import { NextPageContext } from "next";
import { request } from "http";
import { getCookie } from "cookies-next";
import { getCookieParser } from "next/dist/server/api-utils";
import Link, { LinkProps } from "next/link";
import NextNodeServer from "next/dist/server/next-server";
import { BaseRouter } from "next/dist/shared/lib/router/router";
import { error } from "console";

const Noop: FC<{}> = ({ children }) => <>{children}</>;
const envVars = {
  facebookId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? ""
};

type LinkPropsMapped<T extends keyof LinkProps> = {
  [P in T]: LinkProps[P];
};

type RouterPropsMapped<K extends keyof ReturnType<typeof useRouter>> = {
  [L in K]: ReturnType<typeof useRouter>[L];
};

export default function NestNextApp<T extends AppProps>({
  pageProps,
  Component
}: T): ReactElement {
  const LayoutNoop = (Component as any).LayoutNoop || Noop;
  const apolloClient = useApollo(
    pageProps.initialApolloState ?? null,
    {}
  ) as ApolloClient<NormalizedCacheObject>;
  const router = useRouter();

  // useEffect(() => {
  //   const isProd = process.env.NODE_ENV === "production";
  //   const handleRouteChange = <
  //     T extends RouterPropsMapped<"events">,
  //     P extends URL,
  //     S extends LinkPropsMapped<"shallow">
  //   >(
  //     events: T,
  //     url: P,
  //     shallow: S
  //   ) => {
  //     !isProd
  //       ? console.log(
  //           `App is changing to ${url} ${
  //             shallow ? "with" : "without"
  //           } shallow routing with query: ${Object.values(router.query).join(", \n")}`
  //         )
  //       : () => {
  //           events.events.emit("routeChangeError");
  //         };
  //   };
  //   router.events.on(
  //     "routeChangeStart",
  //     (
  //       events: RouterPropsMapped<"events">,
  //       url: URL,
  //       shallow: LinkPropsMapped<"shallow">
  //     ) => handleRouteChange(events, url, shallow)
  //   );
  //   return () => {
  //     router.events.off(
  //       "routeChangeComplete",
  //       (
  //         events: RouterPropsMapped<"events">,
  //         url: URL,
  //         shallow: LinkPropsMapped<"shallow">
  //       ) => handleRouteChange(events, url, shallow)
  //     );
  //   };
  // }, [router.events, router.query]);

  useEffect(() => {
    // getCookie("nest-next-2022") ? router.replace(window.location.href, { auth: cookieAuth }) : document.cookie;
    document?.body?.classList?.remove("loading");
  }, [router]);

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <LayoutNoop pageProps={pageProps}>
          <Component {...pageProps} />
        </LayoutNoop>
      </ApolloProvider>
    </>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  if (
    typeof window !== "undefined" &&
    process.env.NODE_ENV === "development"
  )
    switch (metric.name) {
      case "FCP":
        console.log(JSON.stringify(`[FCP]: ${metric}`, null, 2));
        break;
      case "LCP":
        console.log(JSON.stringify(`[LCP]: ${metric}`, null, 2));
        break;
      case "CLS":
        console.log(JSON.stringify(`[CLS]: ${metric}`, null, 2));
        break;
      case "FID":
        console.log(JSON.stringify(`[FID]: ${metric}`, null, 2));
        break;
      case "TTFB":
        console.log(JSON.stringify(`[TTFB]: ${metric}`, null, 2));
        break;
      case "Next.js-hydration":
        console.log(
          JSON.stringify(`[Next.js-hydration]: ${metric}`, null, 2)
        );
        break;
      case "Next.js-route-change-to-render":
        console.log(
          JSON.stringify(
            `[Next.js-route-change-to-render]: ${metric}`,
            null,
            2
          )
        );
        break;
      case "Next.js-render":
        console.log(
          JSON.stringify(`[Next.js-render]: ${metric}`, null, 2)
        );
        break;
      default:
        break;
    }
}
