import { User } from "../../user/model/user.model";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UnauthorizedException } from "@nestjs/common";
import { JsonWebTokenError } from "jsonwebtoken";
import { GraphQLError, GraphQLResolveInfo } from "graphql";

/**
 * Support AuthGuard
 * https://github.com/nestjs/graphql/issues/48
 */
@Injectable()
export class GraphqlAuthGuard extends AuthGuard("jwt") {
  getRequest(context: ExecutionContext) {
    const graphqlContext = GqlExecutionContext.create(context);
    return graphqlContext.getContext().req;
  }

  handleRequest<T extends User>(
    err: GraphQLError,
    info: GraphQLResolveInfo,
    user: T
  ) {
    if (err) {
      throw err;
    }
    if (info && info instanceof Error) {
      if (info instanceof JsonWebTokenError) {
        info = info;
      }
      throw new UnauthorizedException(info);
    }

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

/**
 * import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Type,
  Scope,
} from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  ROLES_KEY,
  RoleMeta
} from '../decorators/role.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: CaslAbilityFactory,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions =
      this.reflector.get<RequiredPermission[]>(
        PERMISSION_CHECKER_KEY,
        context.getHandler(),
      ) || [];
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    const ability = await this.abilityFactory.createForUser(user);
    return requiredPermissions.every((permission) =>
      this.isAllowed(ability, permission),
    );
  }
  private isAllowed(
    ability: AppAbility,
    permission: RequiredPermission,
  ): boolean {
    return ability.can(...permission);
  }
}
 */
