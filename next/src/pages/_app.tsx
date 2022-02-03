import "../styles/index.css";

import { useEffect, FC } from "react";
import { NextWebVitalsMetric, AppProps } from "next/app";
import { useApollo } from "@/apollo/apollo";
import { ApolloProvider } from "@apollo/client";

const Noop: FC = ({ children }) => <>{children}</>;
const envVars = {
  facebookId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID ?? "",
};

export default function CrmApp({ pageProps, Component }: AppProps) {
  const LayoutNoop = (Component as any).LayoutNoop || Noop;

  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    document.body.classList?.remove("loading");
  }, []);

  return (
    <>
      {/* <Script strategy="afterInteractive" id={`${envVars.facebookId}`}>
        {`window.fbAsyncInit = function() {
            FB.init({
              appId            : '${envVars.facebookId}',
              autoLogAppEvents : true,
              xfbml            : true,
              version          : 'v12.0'
            });
          };`}
      </Script>
      <Script
        strategy="lazyOnload"
        async
        defer
        id={`connect-${envVars.facebookId}`}
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js"
      /> */}
      <ApolloProvider client={apolloClient}>
        <LayoutNoop pageProps={pageProps}>
          <Component {...pageProps} />
        </LayoutNoop>
      </ApolloProvider>
    </>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development")
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
        console.log(JSON.stringify(`[Next.js-hydration]: ${metric}`, null, 2));
        break;
      case "Next.js-route-change-to-render":
        console.log(
          JSON.stringify(`[Next.js-route-change-to-render]: ${metric}`, null, 2)
        );
        break;
      case "Next.js-render":
        console.log(JSON.stringify(`[Next.js-render]: ${metric}`, null, 2));
        break;
      default:
        break;
    }
}
