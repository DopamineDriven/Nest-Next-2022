import { Entry } from "../../entry/model/entry.model";
import { Prisma, PrismaPromise } from "@prisma/client";
import { User } from "../model/user.model";
import {
  EntryConnection,
  EntryEdge,
  EntryOrderBy,
  EntryFilter
} from "src/entry/model/entry-connection.model";
import { Connection, Edge } from "graphql-relay";
import { ObjectType, InterfaceType, Field, Int } from "@nestjs/graphql";
import { Type } from "ts-morph";
import { Injectable } from "@nestjs/common";

@ObjectType()
  export class EntryCountFields {
 @Field(() => Int, {defaultValue: 0})
 categories: number;
  @Field(() => Int, { defaultValue: 0 })
    comments: number;
}

@ObjectType()
export class EntryCountOutputType {
  @Field(_type => EntryCountFields)
  _count: EntryCountFields
}

@ObjectType()
export class UserToEntryConnection<
  EntryConnection extends  EntryCountOutputType, EntryEdge extends EntryCountOutputType[]> {
  @Field(_type => (EntryConnection && EntryCountOutputType))
  entryConnection?: EntryConnection & EntryCountOutputType;
  @Field(_type => EntryEdge && [EntryCountOutputType])
  entryEdge: EntryEdge & Array<EntryCountOutputType>;

}

export type EntryConnectionViaUser = {
  entry: EntryConnection extends {
    _count: Prisma.EntryCountOutputType;
  }
    ? {
        edge: EntryEdge extends {
          _count: Prisma.EntryCountOutputType;
        }
          ? { _count: Prisma.EntryCountOutputType }
          : { _count: null };
      }
    : {
        edge: EntryEdge extends {
          _count: Prisma.EntryCountOutputType;
        }
          ? { _count: Prisma.EntryCountOutputType }
          : { _count: null };
      };
};

@ObjectType()
export class EntryInterfaceExtendsEntryConnection<
  T extends EntryConnectionViaUser
  > {
  userToEntryConnect: T;
}
