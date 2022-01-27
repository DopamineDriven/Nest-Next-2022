import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "../../user/model/user.model";

export const UserEntity = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx);
    return context.getContext().req.user;
  }
);
// user.decorator.ts
export const CURRENT_USER_KEY = "currentUser";
export const CurrentUser = (...user: User[]) =>
  SetMetadata<string, User[]>(CURRENT_USER_KEY, user);
