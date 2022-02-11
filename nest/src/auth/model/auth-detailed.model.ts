import { Profile } from "src/profile/model/profile.model";
import { EntryConnection } from "src/entry/model/entry-connection.model";
import { MediaItemConnection } from "src/media/model/media-connection";
import { SessionConnection } from "src/session/model/session-connection.model";
import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType,
  ConnectionNodesObjectType
} from "../../common/pagination/pagination";
import { Auth } from "./auth.model";
import { JwtDecoded } from "../dto/jwt-decoded.dto";
import {
  Field,
  ObjectType,
  createUnionType,
  Union,
  UnionOptions,
  IntersectionType
} from "@nestjs/graphql";
import { UnionDefinitionFactory } from "@nestjs/graphql/dist/schema-builder/factories/union-definition.factory";

@ObjectType("AuthDetailed")
export class AuthDetailed {
  @Field(_type => Auth, { nullable: true })
  auth: Auth;
  @Field(_type => JwtDecoded, { nullable: true })
  jwt: JwtDecoded;
}

@ObjectType("AuthIntersected")
export class AuthIntersected extends IntersectionType<
  Auth,
  JwtDecoded
    >(Auth, JwtDecoded, ObjectType) {
  constructor() {
    super();
}}

IntersectionType(EntryConnection, MediaItemConnection);
export class Intersected {}
