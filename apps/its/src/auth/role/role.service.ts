import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Role, Prisma, RoleView } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/db/prisma.service';
import { GroupLookupModel } from '../group/group.service';
import { UserLookupModel } from '../user/user.service';

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
  }): Promise<RoleView[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.roleView.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findManyForUpdate(params: {
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
    users,
    groups,
  }: {
    role: Prisma.RoleCreateInput;
    permissions?: Array<{ permission_id?: number; permission_name?: string }>;
    users?: Array<UserLookupModel>;
    groups?: Array<GroupLookupModel>;
  }): Promise<Role> {
    const data = { ...role } as Prisma.RoleCreateInput;

    if (permissions && permissions.length > 0) {
      data.permissions = {
        create: permissions.map((p) => {
          return {
            permission: {
              connect: {
                permission_id: p.permission_id,
                permission_name: p.permission_name,
              },
            },
          };
        }),
      };
    }
    if (users?.length) {
      data.users = {
        create: users.map((u) => {
          return {
            user: {
              connect: {
                user_id: u.user_id,
                user_name: u.user_id ? undefined : u.user_name,
              },
            },
          };
        }),
      };
    }
    if (groups?.length) {
      data.groups = {
        create: groups.map((g) => {
          return {
            group: {
              connect: {
                group_id: g.group_id,
                group_name: g.group_id ? undefined : g.group_name,
              },
            },
          };
        }),
      };
    }
    const resp = this.prisma.role
      .create({
        data: data,
        // eagerly loaded on the returned object
        include: { permissions: true, users: true, groups: true },
      })
      .catch((reason) => {
        console.error('Error creating new role:', reason);
        if (reason instanceof PrismaClientKnownRequestError) {
          if (reason.code === 'P2002') {
            throw new HttpException(
              { message: 'Duplicate Role', errorCode: reason.code },
              HttpStatus.UNPROCESSABLE_ENTITY,
            );
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
