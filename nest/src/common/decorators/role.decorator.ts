import { SetMetadata } from "@nestjs/common";
import { Role } from "../../.generated/prisma-nestjs-graphql/prisma/enums/role.enum";

export const ROLES_KEY = "roles";
export const RoleMeta = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
