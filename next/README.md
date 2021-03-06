# Next

### Nextjs Module Augmentation -- `@/types/next.d.ts`
  
```ts
import type { NextComponentType, NextPageContext } from "next";
import type { AppInitialProps } from "next/app";
import type { Router } from "next/router";
import type {
  NormalizedCacheObject,
  ApolloClient,
  NormalizedCache
} from "@apollo/client";
import { ResolverContext } from '@/apollo/resolver-context';
import { AuthData } from "@/hooks/use-auth";
declare module "next/app" {
  type AppProps<P = Record<string, unknown>> = {
        Component: NextComponentType<NextPageContext, any, P>;
        router: Router;
        __N_SSG?: boolean | undefined;
        __N_SSP?: boolean | undefined;
    __N_RSC?: boolean | undefined;
    pageProps: P & {
      // props of utility injected into the heart of Nextjs
      initialApolloState: NormalizedCacheObject | null;
      resolverContext: ResolverContext;
      authData: AuthData | null;
    }
  }
}

```

##### These props are strongly typed in `_app.tsx` when consumed
```tsx

export default function NextNest<T extends AppProps>({
  pageProps,
  Component
}: T): ReactElement {
  // apolloclient pageProps injected
  const apolloClient = useApollo(
    pageProps.initialApolloState ?? null,
    pageProps.resolverContext ?? {}
  ) as ApolloClient<NormalizedCacheObject>;
  
  /*.... more code ...*/
  
  // AuthData = Global Context Provider for Jwt-based Auth
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <AuthProvider authData={pageProps.authData}>
          <LayoutNoop pageProps={pageProps}>
            <Component {...pageProps} />
          </LayoutNoop>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}
```
## Mapped Types of Utility
![ApolloClientRecursivelyUnwrapped](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/abm3ahsbjpjuz8oqfiil.png)
---
### @/types/* Directory
- `mapped.ts` contains mapped, recursively optional, reusable, ReactHTMLElement constituents. It also contains the implemented and mapped ApolloClientProps type pictured above.
- example:
```ts

export type UnwrapInputProps<
  T extends keyof DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = {
  [P in T]?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >[P];
};

export type UnwrapDivProps<
  T extends keyof DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
> = {
  [P in T]?: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >[P];
};

export type SVGAttribs<T extends keyof SVGAttributes<SVGSVGElement>> = {
  [P in T]?: SVGAttributes<SVGSVGElement>[P];
};
```

### Using `SVGAttribs`
```tsx
import { SVGAttribs } from '@/types/mapped';

export const TypeScript = ({
  ...props
}: SVGAttribs<"className" | "aria-hidden" | "height" | "width" | "onMouseOver" | "fill">) => {
  return (
    <svg
      width='43.5'
      height='31.5'
      viewBox='0 0 87 63'
      fill={(props.fill ?? "none").trim()}
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <g filter='url(#filter0_d)'>
        <path
          d='M4.13965 6.28636V11.0425H18.7798V54.2261H29.1688V11.0425H43.8092V6.37405C43.8092 3.74788 43.8092 1.61787 43.6964 1.55955C43.6964 1.47206 34.7717 1.44289 23.9321 1.44289L4.22406 1.53038V6.31552L4.13965 6.28636ZM69.9363 1.41374C72.809 2.11402 75.005 3.45606 76.9747 5.58607C78.0175 6.75335 79.5661 8.79568 79.6783 9.321C79.6783 9.49597 74.8062 12.9099 71.8509 14.8064C71.7384 14.8939 71.2878 14.398 70.8373 13.6393C69.3734 11.4802 67.8811 10.5464 65.5444 10.3714C62.1658 10.1379 59.9134 11.9761 59.9134 15.0399C59.9134 15.9735 60.0824 16.4988 60.4203 17.2574C61.1804 18.8621 62.5881 19.825 66.9521 21.8093C75.005 25.3982 78.4957 27.7615 80.6071 31.1463C82.9998 34.9393 83.535 40.8917 81.9294 45.3559C80.1289 50.2287 75.737 53.5258 69.4578 54.6054C67.4869 54.9555 62.9822 54.8972 60.8707 54.5179C56.366 53.6426 52.0585 51.3083 49.4119 48.303C48.3702 47.1357 46.3712 44.0138 46.4839 43.8095L47.5538 43.1092L51.7769 40.5707L54.9583 38.645L55.6903 39.6663C56.6194 41.1835 58.7028 43.2258 59.9134 43.9261C63.5735 45.8812 68.4724 45.6185 70.8936 43.3427C71.9353 42.3506 72.3857 41.3002 72.3857 39.8413C72.3857 38.499 72.1888 37.8864 71.5412 36.8652C70.6402 35.5812 68.8383 34.5308 63.7707 32.1967C57.9427 29.6288 55.465 27.995 53.1564 25.4857C51.8331 23.9684 50.6224 21.6049 50.0595 19.6501C49.6372 17.9577 49.4963 13.8143 49.8904 12.1513C51.1012 6.31552 55.3524 2.23066 61.4338 1.06359C63.4045 0.655124 68.0501 0.830094 69.9928 1.35541L69.9363 1.41374Z'
          fill='rgba(208, 185, 90, 1)'
          stroke='#141415'
        />
      </g>
      <defs>
        <filter
          id='filter0_d'
          x='0.139648'
          y='0.837891'
          width='86.7084'
          height='62'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'>
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='2' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};

```


### spread props inferred
```ts
(parameter) props: {
    className?: string | undefined;
    height?: string | number | undefined;
    fill?: string | undefined;
    width?: string | number | undefined;
    "aria-hidden"?: Booleanish | undefined;
    onMouseOver?: MouseEventHandler<SVGSVGElement> | undefined;
}
```
