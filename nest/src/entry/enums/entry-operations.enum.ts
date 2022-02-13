import { registerEnumType, EnumOptions } from "@nestjs/graphql";

export enum EntryOperations {
  ENTRY_CONNECTION_EXTENDED = "ENTRY_CONNECTION_EXTENDED",
  AUTH_DETAILED_EXTENDED = "AUTH_DETAILED_EXTENDED"
}

registerEnumType<typeof EntryOperations>(EntryOperations, {
  name: "EntryOperations"
} as EnumOptions<typeof EntryOperations>);
