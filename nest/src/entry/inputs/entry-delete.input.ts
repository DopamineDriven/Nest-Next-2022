import { Field, ID, InputType } from "@nestjs/graphql";

@InputType("EntryDeleteUno")
export class EntryDeleteUno {
  @Field(() => ID)
  id!: string;
}
