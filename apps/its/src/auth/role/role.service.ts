import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  Role,
  Prisma
} from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async findUnique(
    whereUniqueInput: Prisma.RoleWhereUniqueInput,
  ): Promise<Role> {
    return this.prisma.role.findUnique({
      where: whereUniqueInput,
      include: { permissions: { include: { permission: true } } },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoleWhereUniqueInput;
    where?: Prisma.RoleWhereInput;
    orderBy?: Prisma.RoleOrderByWithRelationInput;
  }): Promise<Role[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.role.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create({
    role,
    permissions,
  }: {
    role: Prisma.RoleCreateInput;
    permissions?: Array<{ permission_id?: number; permission_name?: string }>;
  }): Promise<Role> {
    const data = { ...role } as Prisma.RoleCreateInput;

    if (permissions && permissions.length > 0) {
      data.permissions = {
        create: permissions.map((p) => {
          return {
            permission: {
              connect: { permission_id: p.permission_id, permission_name: p.permission_name },
            },
          };
        }),
      };
    }
    const resp = this.prisma.role
      .create({ data: data, include: { permissions: true } })
      .catch((reason) => {
        console.error('Error creating new role:', reason);
        if (reason instanceof PrismaClientKnownRequestError) {
          if (reason.code === 'P2002') {
            throw new HttpException({message:'Duplicate Role', errorCode: reason.code}, HttpStatus.UNPROCESSABLE_ENTITY);
          }
        }
        throw new HttpException(reason?.message, HttpStatus.BAD_REQUEST);
      });
    return resp;
  }

  async update(params: {
    where: Prisma.RoleWhereUniqueInput;
    data: Prisma.RoleUpdateInput;
  }): Promise<Role> {
    const { where, data } = params;
    return this.prisma.role.update({ data, where });
  }

  async delete(where: Prisma.RoleWhereUniqueInput): Promise<Role> {
    return this.prisma.role.delete({ where });
  }
}
