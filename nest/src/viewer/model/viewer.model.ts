import { Field, ID, ObjectType } from "@nestjs/graphql";
import { JwtDecoded } from "src/auth/dto";
import { Token } from "src/auth/model";
import { User } from "src/user/model/user.model";
import {
  ConnectionEdgeObjectType,
  ConnectionFilterArgsType,
  ConnectionObjectType,
  ConnectionOrderingInputType
} from "../../common/pagination/pagination";


@ObjectType("ViewerEntity")
export class ViewerEntity extends JwtDecoded {
  @Field(() => User, { nullable: true })
  user: User | null;

  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  accessToken: string | null;

  @Field(() => String, { nullable: true })
  refreshToken: string | null;

  @Field(() => String, { nullable: true })
  viewerSecret: string | null;
}
