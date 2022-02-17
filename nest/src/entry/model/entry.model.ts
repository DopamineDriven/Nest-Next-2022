import { ObjectType, Field, ID, createUnionType } from "@nestjs/graphql";
import { Comment } from "../../comment/model/comment.model";
import { User } from "../../user/model/user.model";
import { EntryCount } from "../../.generated/prisma-nestjs-graphql/entry/outputs/entry-count.output";
import { Category } from "../../category/model/category.model";
import { Node } from "src/node/model/node.model";
import { EntryConnection } from "./entry-connection.model";
import { EntryOperations } from "../enums/entry-operations.enum";
import { Type } from "@nestjs/common";
import { Auth } from "src/auth/model";
import { JwtDecoded } from "src/auth/dto";
import {
  MappedType
} from "@nestjs/mapped-types";
import { Edge, Connection } from "@devoxa/prisma-relay-cursor-connection";
import { Session } from "src/session/model/session.model";

//function IntersectionType<A, B>(target: Type<A>, source: Type<B>): MappedType<A & B>;

@ObjectType("Entry", {implements: () => Node})
export class Entry implements Node {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  published?: boolean;

  @Field(() => String, { nullable: false })
  authorId?: string;

  @Field(() => String, { nullable: true })
  content?: string

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;

  @Field(() => String, { nullable: true })
  featuredImage?: string;

  @Field(() => [Category], { nullable: true })
  categories?: Array<Category>;

  @Field(() => User, { nullable: false })
  author?: User;

  @Field(() => [Comment], { nullable: true })
  comments?: Array<Comment>;

  @Field(() => String, { nullable: true })
  categoryId?: string | null;

  @Field(() => EntryCount, {
    nullable: false,
    defaultValue: { categories: 0, comments: 0 }
  })
  _count!: EntryCount;
}

@ObjectType("AuthDetailedExtended")
export class AuthDetailedExtended {
  @Field(() => User)
  user: User | null;
  @Field(() => Session, { nullable: true })
  session: Session | null;

  @Field(_type => String, { nullable: true })
  accessToken!: string | null;

  @Field(_type => String, { nullable: true })
  refreshToken!: string | null;

  @Field(_type => JwtDecoded, { nullable: true })
  jwt: JwtDecoded;

  @Field(() => EntryOperations)
  operation?: EntryOperations.AUTH_DETAILED_EXTENDED;
}

@ObjectType("EntryConnectionExtended")
export class EntryConnectionExtended {
  @Field(() => EntryConnection)
  connection: Connection<Entry, Edge<Entry>>;

  @Field(() => EntryOperations)
  operation: EntryOperations.ENTRY_CONNECTION_EXTENDED;
}
export function UnionType<A, B>(
  targetOne: Type<A>,
  targetTwo: Type<B>
): MappedType<A | B> {
  return targetOne || targetTwo;
}
export interface ClassType<T = any> {
  new (...args: any[]): T;
}
// export type ArrayElement<ArrayType extends readonly unknown[]> =
//   ArrayType[number];
// export type Union<T extends any[]> = InstanceType<ArrayElement<T>>;

export type EntryOpsUnion = AuthDetailedExtended | EntryConnectionExtended;
export const EntryOperationsUnion = createUnionType<Type<EntryOpsUnion>[]>({
  name: "EntryOperationsUnion",
  types: (): (typeof AuthDetailedExtended | typeof EntryConnectionExtended)[] => [AuthDetailedExtended, EntryConnectionExtended],
  resolveType: (
    {},
    {},
    { schema }
  ): typeof AuthDetailedExtended | typeof EntryConnectionExtended | undefined =>
    schema.getType("AuthDetailedExtended")?.name === AuthDetailedExtended.name
      ? AuthDetailedExtended
      : schema.getType("EntryConnectionExtended")?.name ===
        EntryConnectionExtended.name
      ? EntryConnectionExtended
      : undefined
});

@ObjectType("EntryOpsUnionInterface")
export class EntryOpsUnionInterface {
  @Field(() => EntryOperationsUnion)
  connect: EntryOpsUnion;
}
// @ObjectType("EntryOperationsUnionOutput", {
//   implements: () => [EntryOpsUnionInterface]
// })
// export class EntryOperationsUnionOutput extends EntryOpsUnionInterface {
//   constructor() {
//     super();
//   }
// }
