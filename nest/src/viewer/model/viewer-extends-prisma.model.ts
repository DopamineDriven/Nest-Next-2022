import { ObjectType, InputType, Field } from "@nestjs/graphql";
import { User } from "src/user/model/user.model";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";

@ObjectType("Viewer")
export class Viewer extends User {
  constructor() {
    super();
  }
  @Field(_type => String, { nullable: true })
  accessToken: string | null;
}

@ObjectType("ViewerOutput")
export class ViewerOutput extends Viewer {
  @Field(_type => String, {
    nullable: true,
    defaultValue: null
  })
  error: string | null;
}
@InputType("GetViewer")
export class GetViewer {
  @Field(() => String, { nullable: true })
  accessToken: string | null;
}

