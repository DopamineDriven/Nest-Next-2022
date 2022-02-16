import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata
} from "@nestjs/common";
import { GqlExecutionContext, ReturnTypeFunc } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Request } from "express";
import { ClientRequest } from "http";
import { AuthService } from "src/auth/auth-jwt.service";
import { User } from "../../user/model/user.model";

export const UserEntity = createParamDecorator(
  async <T extends AuthService>(
    data: T,
    ctx: ExecutionContext
  ): Promise<User | null> => {
    const context = GqlExecutionContext.create(ctx)
      .switchToHttp()
      .getRequest<Request>();
    const token = context.headers.authorization?.split(" ")[1];
    const userFromToken = await data.getUserFromToken(token ? token : "");
    return userFromToken;
  }
);

export const UserMeta = createParamDecorator(
  <
    T extends User extends infer U
      ? U
      : T extends User
      ? User
      : T
  >(
    data: T,
    ctx: ExecutionContext
  ) => {
    GqlExecutionContext.create(ctx).getRoot<typeof data>();
  }
);
// user.decorator.ts
export const CURRENT_USER_KEY = ("currentUser");
export const CurrentUser = (...user: User[]) =>
  SetMetadata<string, User[]>(CURRENT_USER_KEY, user);
