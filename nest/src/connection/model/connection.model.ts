import { ObjectType, Field, ID } from "@nestjs/graphql";
import {
  PhoneNumberMock,
  PhoneNumberResolver,
  PhoneNumberTypeDefinition
} from "graphql-scalars";
import { User } from "../../user/model/user.model";
import { Node } from "src/node/model/node.model";
import { PhoneNumber } from "graphql-scalars/typeDefs";

@ObjectType("Connection", { implements: () => Node })
export class Connection implements Node {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  ownerId!: string | null;

  @Field(() => String, { nullable: true })
  firstName?: string | null;

  @Field(() => String, { nullable: true })
  lastName?: string | null;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(_type => PhoneNumberResolver, { nullable: true })
  phoneNumber!: string | null;

  @Field(_type => String, { nullable: true })
  ip!: string | null;

  @Field(_type => Date, { nullable: true })
  lastModified!: Date | null;

  @Field(_type => User, { nullable: false })
  owner?: User;
}
