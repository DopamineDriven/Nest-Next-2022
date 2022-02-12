import { ObjectType, Field, ID, createUnionType } from "@nestjs/graphql";
import { Comment } from "../../comment/model/comment.model";
import { User } from "../../user/model/user.model";
import { EntryCount } from "../../.generated/prisma-nestjs-graphql/entry/outputs/entry-count.output";
import { Category } from "../../category/model/category.model";
import { JSONObjectResolver, JSONResolver } from "graphql-scalars";
import GraphQLJSON from "graphql-type-json";
import { Prisma } from "@prisma/client";
import { Node } from "src/node/model/node.model";
import { FindManyEntriesPaginatedInput } from "../inputs/entry-paginated.input";
import { EntryConnection } from "./entry-connection.model";
import { AuthDetailed } from "src/auth/model/auth-detailed.model";
import { EntryOperations } from "../enums/entry-operations.enum";
import { Type } from "@nestjs/common";
import { Auth } from "src/auth/model";
import { JwtDecoded } from "src/auth/dto";
import { IntersectionType } from "@nestjs/mapped-types";

@ObjectType("Entry")
export class Entry implements Node {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  published?: boolean;

  @Field(() => String, { nullable: false })
  authorId!: string;

  @Field(() => [JSONObjectResolver], { nullable: true })
  content!: Array<any>;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;

  @Field(() => [JSONObjectResolver], { nullable: true })
  featuredImage?: Array<any>;

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
export class AuthDetailedExtended extends AuthDetailed {
  constructor() {
    super();
  }
  jwt: JwtDecoded = this.jwt;
  auth: Auth = this.auth;
  @Field(() => EntryOperations)
  operation: keyof typeof EntryOperations = "AUTH_DETAILED";
}
@ObjectType("EntryConnectionExtended")
export class EntryConnectionExtended extends EntryConnection {
  constructor() {
    super();
  }
  @Field(() => EntryOperations)
  operation: keyof typeof EntryOperations = "ENTRY_CONNECTION";
}

export type EntryOpsUnion = AuthDetailedExtended | EntryConnectionExtended;
export const EntryOperationsUnion = createUnionType<Type<EntryOpsUnion>[]>({
  name: "EntryOperationsUnion",
  types: () => [AuthDetailedExtended, EntryConnectionExtended],
  resolveType: ({
    operation
  }: EntryOpsUnion): typeof AuthDetailed | typeof EntryConnection | undefined =>
    operation.includes(EntryOperations.AUTH_DETAILED).valueOf()
      ? AuthDetailed
      : operation.includes(EntryOperations.ENTRY_CONNECTION).valueOf()
      ? EntryConnection
      : undefined
});

@ObjectType("EntryOperationsUnionOutput")
export class EntryOperationsUnionOutput {
  @Field(() => EntryOperationsUnion)
  viewerToEntriesAndAuthConnection: EntryOpsUnion;
}

@ObjectType("EntryOperationsIntersectionDeailed")
export class EntryOperationsIntersectionDeailed extends IntersectionType<
  AuthDetailed,
  EntryConnection
>(AuthDetailed, EntryConnection) {
  constructor() {
    super(
      IntersectionType<AuthDetailed, EntryConnection>(
        AuthDetailed,
        EntryConnection
      )
    );
  }
}
