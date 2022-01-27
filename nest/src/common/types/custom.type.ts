export type XGeneric<
  Key extends string | number | symbol,
  T
> = Record<Key, T> extends infer U
  ? U
  : Record<Key, T> extends Promise<(...args: unknown[]) => Promise<infer U>>
  ? U
  : T extends (...args: unknown[]) => infer U
  ? U
  : Record<Key, T>;

const StrongkTypeInference: XGeneric<0, Date> = {
  0: new Date(Date.now())
};

console.log(StrongkTypeInference);
