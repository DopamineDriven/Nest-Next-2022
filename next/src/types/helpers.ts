export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

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
abstract class A<
  T extends number extends { [index: string]: infer U } ? U : number
> {
  obj;

  constructor(obj: Record<string, T>) {
    this.obj = obj;
  }
  // [inferred]
  // constructor A<T extends number>(obj: Record<string, T>): A<T>
}

class B extends A<0> {
  constructor(public readonly i: number extends infer U ? U : number) {
    super({ i: 0 });
    // [inferred]
    // constructor A<0>(obj: Record<string, 0>): A<0>
  }

  stringify() {
    return JSON.stringify(
      {
        i: this.i as number, // i: number
        sup: super.obj as Record<string, 0> // sup: { [x: string]: 0; }
      },
      null,
      2
    );
  }

  objValueOfCompare(valOne: number, valTwo: number) {
    return valOne === valTwo ? true : false;
  }

  truthyCheck() {
    const extractValueFromSuper = Object.values(super.obj)[0].valueOf();
    const iIsValueOfObjRecord = <
      T extends typeof this.i extends Record<string, infer U>
        ? U
        : typeof this.i
    >(
      objectCompare: T
    ) => {
      const extractThisInjectedObjectValue =
        Object.values(objectCompare)[0].valueOf();
      return this.objValueOfCompare(
        extractValueFromSuper,
        extractThisInjectedObjectValue
      );
    };
    return iIsValueOfObjRecord; // returns True
  }
}

// By declaring each index of the super obj in the constructor you can input a unique comma-delimited Int/Float value on a
// per field basis. This allows you to key into fields within the Record -- eg, `this.i` or `this.j`
class C extends A<3.14 | -7.28> {
  constructor(
    public readonly i: number extends infer U ? U : number,
    public readonly j: number extends infer U ? U : number
  ) {
    super({ i: 3.14, j: -7.28 });

    // [inferred]:
    // constructor A<3.14 | -7.28>(obj: Record<string, 3.14 | -7.28>): A<3.14 | -7.28>
  }

  // thisObj deconstruction/reconstruction helper
  thisObjByIndex(thisIndex: number) {
    const extractKeyFromThisObj = Object.keys(this.obj)[thisIndex].toString();
    const extractValueFromThisObj = Object.values(this.obj)[
      thisIndex
    ].valueOf();
    return { extractKeyFromThisObj, extractValueFromThisObj };
  }

  // superObj deconstruction/reconstruction helper
  superObjByIndex(superIndex: number) {
    const extractKeyFromSuperObj = Object.keys(super.obj)[
      superIndex
    ].toString();
    const extractValueFromSuperObj = Object.values(super.obj)[
      superIndex
    ].valueOf();
    return { extractKeyFromSuperObj, extractValueFromSuperObj };
  }

  // intraObject equality cross-check
  crossCompareIntraObjectEquality() {
    // thisObj
    //keys
    const iKey = this.thisObjByIndex(0).extractKeyFromThisObj;
    const jKey = this.thisObjByIndex(1).extractKeyFromThisObj;
    // values
    const iValue = this.thisObjByIndex(0).extractValueFromThisObj;
    const jValue = this.thisObjByIndex(1).extractValueFromThisObj;
    // reconstructed reconstructed intraobject equality check
    const thisTruthyObj = {
      [iKey]: iValue === this.i ? true : false, // returns true
      [jKey]: jValue === this.j ? true : false // returns true
    };

    // superObj
    // keys
    const iSuperKey = this.superObjByIndex(0).extractKeyFromSuperObj;
    const jSuperKey = this.superObjByIndex(1).extractKeyFromSuperObj;
    // values
    const iSuperVal = this.superObjByIndex(0).extractValueFromSuperObj;
    const jSuperVal = this.superObjByIndex(1).extractValueFromSuperObj;
    // reconstructed intraobject equality check
    const superTruthyObj = {
      [iSuperKey]: iSuperVal === this.i ? true : false,
      [jSuperKey]: jSuperVal === this.j ? true : false
    };

    // testing for intraobject key/value equality
    return thisTruthyObj === superTruthyObj ? true : false; // returns True!
  }

  // thisObj
  recreateSuperObjFromDeconstructedThisMethods() {
    //keys
    const iKey = this.thisObjByIndex(0).extractKeyFromThisObj;
    const jKey = this.thisObjByIndex(1).extractKeyFromThisObj;
    // values
    const iValue = this.thisObjByIndex(0).extractValueFromThisObj;
    const jValue = this.thisObjByIndex(1).extractValueFromThisObj;
    // reconstructed reconstructed intraobject equality check
    return {
      [iKey]: iValue,
      [jKey]: jValue
    };
    // outputs expected shape & key/value combos

    // [LOG]: {
    //    "i": 3.14,
    //    "j": -7.28
    // }
  }

  // superObj
  recreateSuperObjByIndex() {
    // keys
    const iSuperKey = this.superObjByIndex(0).extractKeyFromSuperObj;
    const jSuperKey = this.superObjByIndex(1).extractKeyFromSuperObj;
    // values
    const iSuperValue = this.superObjByIndex(0).extractValueFromSuperObj;
    const jSuperValue = this.superObjByIndex(1).extractValueFromSuperObj;
    return {
      [iSuperKey]: iSuperValue,
      [jSuperKey]: jSuperValue
    };
  }

  crossCompareRebuiltThisAndSuperObjects() {
    return this.recreateSuperObjFromDeconstructedThisMethods() ===
      this.recreateSuperObjByIndex()
      ? true
      : false;
  } // returns True!!
}
// Boolean constructor wrapper used since calling these methods without initializing them within a Class can throw errors
console.log(Boolean(new B(0).truthyCheck)); // Returns True!
console.log(Boolean(new C(3.14, -7.28).crossCompareRebuiltThisAndSuperObjects)); // returns True!

/**
 *
 *
 *   excludeStringNullableField<StringNullableFilter, Key extends keyof StringNullableFilter>(
    stringNullableFilter: StringNullableFilter,
    ...keys: Key[]
  ): Omit<StringNullableFilter, Key> {
    for (const key of keys) {
      delete stringNullableFilter[key];
    }
    return stringNullableFilter;
  }
 */
  export type PropGetters<TObj extends Record<string, any>> = {
    [TKey in string &
      keyof TObj as `get${Capitalize<TKey>}`]: () => TObj[TKey];
  };

  // Record<string, any> extended by TObj to resolve a type error on line 16 in its absence
  // pertaining to: newObj[getterKey] = () => obj[key]
  export function createGetterObject<TObj extends Record<string, any>>(
    obj: TObj
  ): PropGetters<TObj> {
    const newObj: any = {};
    for (const key of Object.keys(obj)) {
      const capitalizedKey = key[0].toUpperCase() + key.substr(1);
      const getterKey = `get${capitalizedKey}`;
      newObj[getterKey] = () => obj[key];
    }
    return newObj;
  }


  export interface IStorage {
    load<T>(key: string): T | undefined;
    save<T>(key: string, data: T): void;
    remove(key: string): void;
  }

  export default interface ISession {
    jwt: string;
    user: {
      name: string;
      email: string;
      image: string;
    };
    id: number;
    expires: string;
  }
  export type Sin<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  export type MutuallyExclusive<T, U> = T | U extends object
    ? (Sin<T, U> & U) | (Sin<U, T> & T)
    : T | U;
  export type UnwrapAwaitable<T> = T extends PromiseLike<infer U> ? U : T;

  export type Enumerable<T> = T | Array<T>;

  export type UnwrapTuple<Tuple extends readonly unknown[]> = {
    [K in keyof Tuple]: K extends `${number}`
      ? Tuple[K] extends Promise<infer X>
        ? X
        : UnwrapAwaitable<Tuple[K]>
      : UnwrapAwaitable<Tuple[K]>;
  };

  export class SetUtil<T> {
    /**
     * Creates a set that contains those elements of arrayOne that are also in arrayTwo.
     * @param arrayOne
     * @param arrayTwo
     */
    constructor(private arrayOne: T[], private arrayTwo: T[]) {
      arrayOne = this.arrayOne;
      arrayTwo = this.arrayTwo;
    }
    intersection<T>(arrayOne: T[], arrayTwo: T[]): Set<T> {
      return new Set(
        [...arrayOne].filter(value => arrayTwo.includes(value))
      );
    }

    /**
     * Creates a set that contains those elements of arrayOne that are not in arrayTwo
     * @param arrayOne
     * @param arrayTwo
     */
    difference<T>(arrayOne: T[], arrayTwo: T[]): Set<T> {
      const difference = new Set(arrayOne);

      for (const value of arrayTwo) {
        difference.delete(value);
      }

      return difference as Set<T>;
    }
  }
  // returns Set (3) {1, 2, 4}
  // const arrayOne = [1, 2, 3, 4];
  // const arrayTwo = [1, 2, 4, 5];

  // const x = new SetUtil(arrayOne, arrayTwo).intersection(arrayOne, arrayTwo);

  // const y = x.entries().next();

  // returns Set (1) {3}
  // returns Set (1) {5}
  // const arrayOne = [1, 2, 3, 4];
  // const arrayTwo = [1, 2, 4, 5];

  // const x = new SetUtil(arrayOne, arrayTwo).difference(arrayOne, arrayTwo);
  // const y = new SetUtil(arrayTwo, arrayOne).difference(arrayTwo, arrayOne);
  // console.log(x)
  // console.log(y)
