export function create<Type>(c: { new (): Type }): Type {
  return new c();
}

/**
 * @example
 * @description
 * prototype property infers and constrain relationships between
 * the constructor function and the instance side of class types.
 *
 */

class BeeKeeper {
  hasMask = true;
}

class ZooKeeper {
  nametag = "Mikle";
}

class Animal {
  numLegs = 4;
}

class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;

/**
 * The above powers the [Mixins](https://www.typescriptlang.org/docs/handbook/mixins.html) design pattern
 * @url {https://www.typescriptlang.org/docs/handbook/mixins.html}
 */
