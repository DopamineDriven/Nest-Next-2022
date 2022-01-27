export class Serializer<T> {
  serialize(inp: T): string {
    return JSON.stringify(inp);
  }
  deserialize(inp: string): JSONified<T> {
    return JSON.parse(inp);
  }
}

export type Widget = {
  toJSON(): {
    kind: "Widget";
    date: Date;
  };
};

export type Item = {
  text: string;
  count: number;
  // preserve options
  choice: "yes" | "no" | null;
  // drop functions
  func: () => void;
  nested: {
    isSaved: boolean;
    data: [1, undefined, 2];
  };
  // pointer to another type
  widget: Widget;
  // Same obj referenced again
  children?: Item[];
};

export type PrimitveJSONValue = string | number | boolean | undefined | null;

export type JsonObject = { [Key in string]?: PrimitveJSONValue };

export type JSONValue = PrimitveJSONValue | JSON | JsonObject;

export type JsonArr = Array<string | number | boolean | JsonObject | null>;

export type JSONifiedObject<T> = {
  [P in keyof T]: JSONifiedObject<T[P]>;
};
export type Send<T> = (body: T) => void;

export type UndefinedAsNull<T> = T extends undefined ? null : T;

export type JSONifiedArray<T> = Array<UndefinedAsNull<JSONified<T>>>;

export type JSONifiedValue<T> = T extends string | number | boolean | null
  ? T
  : T extends Record<string, unknown>
  ? never
  : T extends () => Record<string, unknown>
  ? JSONifiedObject<T>
  : T extends Array<infer U>
  ? JSONifiedArray<U>
  : never;

export type JSONified<T> = JSONifiedValue<
  T extends { toJSON(): infer U } ? U : T
>;
