export type Maybe<T> = T | null;

export type InputMaybe<T> = Maybe<T>;

export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};

type Values<T extends Record<string, unknown>> = T[keyof T];

type Tuplize<T extends Record<string, unknown>[]> = Pick<
  T,
  Exclude<keyof T, Extract<keyof Record<string, unknown>[], string> | number>
>;

type _OneOf<T extends Record<string, unknown>> = Values<{
  [K in keyof T]: T[K] & {
    [M in Values<{ [L in keyof Omit<T, K>]: keyof T[L] }>]?: undefined;
  };
}>;

export type OneOf<T extends Record<string, unknown>[]> = _OneOf<Tuplize<T>>;

interface Cat {
  isCat: true;
}

interface Dog {
  isDog: true;
}

interface Bird {
  isBird: true;
}

// type Animal = OneOf<Record<"Cat", Cat | "Dog", Dog | "Bird",  Bird>>;
// type Animarl = Record<[keyof Cat]: Cat | keyof Dog, Dog | keyof Bird, Bird>[]
// const assert = <T>(t: T) =>t;

// assert<Animal>({ isCat: true });
// assert<Animal>({ isDog: true });
