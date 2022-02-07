import "../styles/index.css";

import React, { useEffect, FC, ReactElement } from "react";
import App, {
  NextWebVitalsMetric,
  AppProps,
  AppInitialProps,
  AppContext
} from "next/app";
import { initializeApollo, useApollo } from "@/apollo/apollo";
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/router";
import Router from "next/dist/server/router";
import { NextPageContext } from "next";
import { request } from "http";
import { getCookie } from "cookies-next";
import { getCookieParser } from "next/dist/server/api-utils";

const Noop: FC<{}> = ({ children }) => <>{children}</>;
const envVars = {
  facebookId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? ""
};

export default function NestNextApp<T extends AppProps>({
  pageProps,
  Component
}: T): ReactElement {
  const LayoutNoop = (Component as any).LayoutNoop || Noop;
  // const cookieAuth =
  //   document.cookie && document.cookie.includes("nest-next-2022")
  //     ? decodeURIComponent(document.cookie)
  //     : getCookie("nest-next-2022")?.toString();

  const apolloClient = useApollo(
    pageProps.initialApolloState ?? null,
    pageProps.resolverContext ?? {}
  );

  const router = useRouter();
  useEffect(() => {
    // getCookie("nest-next-2022") ? router.replace(window.location.href, { auth: cookieAuth }) : document.cookie;
    document?.body?.classList?.remove("loading");
  }, [router]);

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <LayoutNoop {...(pageProps as any)}>
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
