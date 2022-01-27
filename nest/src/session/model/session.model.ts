import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../user/model/user.model';

@ObjectType("Session")
export class Session {
  @Field(_type => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable:true })
  sessionToken?: string;

  @Field(() => String, { nullable:false })
  userId!: string;

  @Field(() => Date, { nullable:true })
  expires?: Date;

  @Field(() => Date, { nullable:true })
  iat?: Date | null;

  @Field(() => User, { nullable:false })
  user!: User;
}