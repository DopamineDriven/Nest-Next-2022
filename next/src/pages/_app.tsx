import "@/styles/index.css";

import React, {
  useEffect,
  FC,
  HTMLAttributes,
  ComponentType
} from "react";
import { NextWebVitalsMetric, AppProps } from "next/app";
import { useApollo } from "@/apollo/apollo";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject
} from "@apollo/client";
import { useRouter } from "next/router";
import { Props } from "@/components/Layout/layout";
import { AuthProvider } from "@/hooks/use-auth";
import { LinkProps } from "next/link";
import cn from "classnames";

const Noop: FC = ({ children }) => <>{children}</>;

export const Page: FC<HTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...props
}) => (
  <main
    {...props}
    className={cn("w-full max-w-3xl mx-auto py-16", className)}>
    {children}
  </main>
);

export function getLayout<LP extends {}>(
  Component: ComponentType<any>
): ComponentType<LP> {
  return (Component as any).Layout || Noop;
}

type LinkPropsMapped<T extends keyof LinkProps> = {
  [P in T]: LinkProps[P];
};

type RouterPropsMapped<K extends keyof ReturnType<typeof useRouter>> = {
  [L in K]: ReturnType<typeof useRouter>[L];
};

export default function NestNextApp({ pageProps, Component }: AppProps) {
  const LayoutGlobal = getLayout<Props>(Component);

  const apolloClient = useApollo(
    pageProps.initialApolloState ?? null,
    pageProps.resolverContext ?? {}
  ) as ApolloClient<NormalizedCacheObject>;
  const router = useRouter();

  useEffect(() => {
    const isProd = process.env.NODE_ENV === "production";
    const handleRouteChange = <
      T extends RouterPropsMapped<"events">,
      P extends URL,
      S extends LinkPropsMapped<"shallow">
    >(
      events: T,
      url: P,
      shallow: S
    ) => {
      !isProd
        ? console.log(
            `App is changing to ${url} ${
              shallow ? "with" : "without"
            } shallow routing with query: ${Object.values(
              router.query
            ).join(", \n")}`
          )
        : () => {
            events.events.emit("routeChangeError");
          };
    };
    router.events.on(
      "routeChangeStart",
      (
        events: RouterPropsMapped<"events">,
        url: URL,
        shallow: LinkPropsMapped<"shallow">
      ) => handleRouteChange(events, url, shallow)
    );
    return () => {
      router.events.off(
        "routeChangeComplete",
        (
          events: RouterPropsMapped<"events">,
          url: URL,
          shallow: LinkPropsMapped<"shallow">
        ) => handleRouteChange(events, url, shallow)
      );
    };
  }, [router.events, router.query]);

  useEffect(() => {
    document?.body?.classList?.remove("loading");
  }, [router]);

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <AuthProvider authData={pageProps.authData}>
          <LayoutGlobal
            {...pageProps}
            loggedIn={Boolean(pageProps.authData?.loggedIn)}
            loading={Boolean(pageProps.authData?.loading)}
            viewer={pageProps.authData?.viewer}
            error={pageProps.authData?.error}>
            <Component {...pageProps} />
          </LayoutGlobal>
        </AuthProvider>
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

// const readCache = apolloClient.cache.readQuery<ViewerQuery, ViewerQueryVariables>({
//   query: Viewer,
//   returnPartialData: true
// });

// const objectManipulation: ViewerState['authDetailed'] = pageProps.authData?.viewer?.authDetailed ? pageProps.authData.viewer.authDetailed : undefined;
// const areEqual = objectManipulation === readCache?.me ? readCache?.me : objectManipulation
