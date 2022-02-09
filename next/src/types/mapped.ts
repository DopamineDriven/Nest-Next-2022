import {
  SVGAttributes,
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  AnchorHTMLAttributes
} from "react";
import { NextApiHandler } from "next";
import { ImageProps } from "next/image";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type RecursiveRequired<T> = {
  [P in keyof T]-?: RecursiveRequired<T[P]>;
};

export type RecursiveAmbivalent<T> = {
  [P in keyof T]: RecursiveAmbivalent<T[P]>;
};

export type ApolloRecursive<
  T extends keyof ApolloClient<
    NormalizedCacheObject extends Record<keyof T, infer U>
      ? Record<keyof T, U>
      : Record<keyof T, unknown>
  >
> = RecursiveAmbivalent<ApolloClient<NormalizedCacheObject>>;
const ApolloClientExample = async ({
  ...props
}: {
  props: ApolloRecursive<
    | "extract"
    | "__actionHookForDevTools"
    | "addResolvers"
    | "getResolvers"
    | "setResolvers"
    | "defaultOptions"
  >;
}) => ({ ...props.props });
// infer a Promise Wrapped Type
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// <svg/> props
export type SVGAttribs<T extends keyof SVGAttributes<SVGSVGElement>> = {
  [P in T]?: SVGAttributes<SVGSVGElement>[P];
};

// <path/> props
export type SVGPathAttribs<T extends keyof SVGAttributes<SVGPathElement>> =
  {
    [P in T]?: SVGAttributes<SVGPathElement>[P];
  };

// <a/> props
export type UnwrapAnchorProps<
  T extends keyof AnchorHTMLAttributes<HTMLAnchorElement>
> = {
  [P in T]?: AnchorHTMLAttributes<HTMLAnchorElement>[P];
};

export type UnwrapTextAreaProps<
  T extends keyof DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
> = {
  [P in T]?: DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >[P];
};

export type UnwrapSelectProps<
  T extends keyof DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >
> = {
  [P in T]?: DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >[P];
};

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

// <code/> props
export type CodeProps<
  T extends keyof DetailedHTMLProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement
  >
> = {
  [P in T]?: DetailedHTMLProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement
  >[P];
};

// <Image/> props
export type ImgPropsConditional<T extends keyof ImageProps> = {
  [P in T]?: ImageProps[P];
};

// <button/> props
export type UnwrapButtonProps<
  T extends keyof ButtonHTMLAttributes<HTMLButtonElement>
> = {
  [P in T]?: ButtonHTMLAttributes<HTMLButtonElement>[P];
};

// All-Purpose styles -- style={{}} -- styles unwrapped
export type CSSPropertiesConditional<S extends keyof CSSProperties> = {
  [R in S]?: CSSProperties[R];
};

export type RecursivelyConditional<I, J extends keyof I> = {
  [K in J]?: I[K];
};

export type RecursivelyRequired<P, R extends keyof P> = {
  [S in R]-?: P[S];
};
export type SvgPropsRecursiveConditional = RecursivePartial<
  SVGAttributes<SVGSVGElement>
>;
export type CSSRecursiveRequired = RecursiveRequired<CSSProperties>;