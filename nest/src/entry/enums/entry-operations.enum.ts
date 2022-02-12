import { registerEnumType, EnumOptions } from "@nestjs/graphql";

export enum EntryOperations {
  ENTRY_CONNECTION = "ENTRY_CONNECTION",
  AUTH_DETAILED = "AUTH_DETAILED"
}

registerEnumType<typeof EntryOperations>(EntryOperations, {
  name: "EntryOperations"
} as EnumOptions<typeof EntryOperations>);
