import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { User } from "src/user/model/user.model";
import { PaginationService } from "src/pagination";
import { PaginationArgsInput } from "src/common/pagination/pagination.args";
