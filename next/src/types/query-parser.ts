// export declare function Freeze<T>(o: T): Readonly<T>;
/**
 * @type {ParsedUrlQuery}
 * @description url query params
 */

 export type ParsedUrlQuery<T = string, N = NodeJS.Dict<T | T[]>> = N;

 export interface Q extends ParsedUrlQuery<Q> {}

 export type ParsedUrlQueryInput = NodeJS.Dict<
   | string
   | number
   | boolean
   | ReadonlyArray<string>
   | ReadonlyArray<number>
   | ReadonlyArray<boolean>
   | null
 >;
