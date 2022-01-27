import { Upload } from "graphql-upload";

/**
 * Applies Partial utility type to all nested objects.
 */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

/**
 * Interface of the simple literal object with any string keys.
 */
export interface ObjectLiteral {
  [key: string]: unknown;
}

/**
 * Makes an interface with all optional values to require AT LEAST one of them.
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

/* Makes an interface with all optional values to accept ONLY one of them */
export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

export type MaybeEnumerable<T> = (T | Array<T>) | null;

export type UnEnumerate<T> = T extends Array<infer U> ? U : T;

export type GetScalarType<T, O> = O extends Record<string, unknown>
  ? { [P in keyof T]: P extends keyof O ? O[P] : never }
  : never;

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

/**
 * @type XOR is needed to have a real mutually exclusive union type
 * @url
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types}
 */
export type XOR<T, U> = T | U extends Record<string, unknown>
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export type ValidObjects =
  | BigInt
  | Date
  | Buffer
  | Upload['file']
  | Record<string, unknown>;

export type IsObject<T> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends ValidObjects
  ? False
  : T extends Upload['file']
  ? False
  : T extends Record<string, unknown>
  ? True
  : False;

export type Key = string | number | symbol;

export type Keys<U> = U extends unknown ? keyof U : never;

export type True = 1;
export type False = 0;

/**
 * @type Boolean
 * @description A [[Boolean]]
 */
export type Boolean = True | False;

/**
 *@type ImmutablePick<T, K extends keyof T> = { [P in K]: T[P]; };
 *  @description From T, pick a set of properties whose keys are in the union K
 *
 */

export type ImmutablePick<T, K extends keyof T> = {
  [P in K]: T[P];
};

export type __Either<O extends Record<string, unknown>, K extends Key> = Omit<
  O,
  K
> &
  {
    // Merge all but K
    [P in K]: ImmutablePick<O, P & keyof O>; // With K possibilities
  }[K];

export type RawCompute<A> = A extends () => Record<string, unknown>
  ? A
  : {
      [K in keyof A]: A[K];
    } & Record<string, unknown>;

export type RecursiveConditional<O> = {
  [K in keyof O]?: O[K];
} & Record<string, unknown>;

export type _Record<K extends keyof any, T> = {
  [P in K]: T;
};

export type _Strict<U, _U = U> = U extends unknown
  ? U & RecursiveConditional<_Record<Exclude<Keys<_U>, keyof U>, never>>
  : never;

export type Strict<U extends Record<string, unknown>> = RawCompute<_Strict<U>>;

export type EitherStrict<
  O extends Record<string, unknown>,
  K extends Key
> = Strict<__Either<O, K>>;

export type EitherLoose<
  O extends Record<string, unknown>,
  K extends Key
> = RawCompute<__Either<O, K>>;

export type _Either<
  O extends Record<string, unknown>,
  K extends Key,
  strict extends 0 | 1
> = {
  [0]: EitherStrict<O, K>;
  [1]: EitherLoose<O, K>;
}[strict];

export type Either<
  O extends Record<string, unknown>,
  K extends Key,
  strict extends 1
> = O extends unknown ? _Either<O, K, strict> : never;
