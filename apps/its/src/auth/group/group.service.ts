import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Group, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async findUnique(
    whereUniqueInput: Prisma.GroupWhereUniqueInput,
  ): Promise<Group> {
    return this.prisma.group.findUnique({
      where: whereUniqueInput,
      include: {
        users: { include: { user: true } },
        roles: { include: { role: true } },
      },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GroupWhereUniqueInput;
    where?: Prisma.GroupWhereInput;
    orderBy?: Prisma.GroupOrderByWithRelationInput;
  }): Promise<Group[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.group.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        _count: {
          select: { users: true, roles: true },
        },
      },
    });
  }

  async create({
    group,
    roles,
    users,
  }: {
    group: Prisma.GroupCreateInput;
    roles?: Array<{ role_id: number; role_name?: string }>;
    users?: Array<{ user_id: number; user_name?: string }>;
  }): Promise<Group> {
    const data = { ...group } as Prisma.GroupCreateInput;

    if (roles && roles.length > 0) {
      data.roles = {
        create: roles.map((p) => {
          return {
            role: {
              connect: { role_id: p.role_id, role_name: p.role_name },
            },
          };
        }),
      };
    }

    if (users && users.length > 0) {
      data.users = {
        create: users.map((p) => {
          return {
            user: {
              connect: { user_id: p.user_id, user_name: p.user_name },
            },
          };
        }),
      };
    }

    const resp = this.prisma.group
      .create({ data: data, include: { roles: true, users: true } })
      .catch((reason) => {
        console.error('Error creating new group:', reason);
        if (reason instanceof PrismaClientKnownRequestError) {
          if (reason.code === 'P2002') {
            throw new HttpException(
              { message: 'Duplicate Group', errorCode: reason.code },
              HttpStatus.UNPROCESSABLE_ENTITY,
            );
          }
        }
        throw new HttpException(reason?.message, HttpStatus.BAD_REQUEST);
      });
    return resp;
  }

  async update(params: {
    where: Prisma.GroupWhereUniqueInput;
    data: Prisma.GroupUpdateInput;
  }): Promise<Group> {
    const { where, data } = params;
    return this.prisma.group.update({ data, where });
  }

  async delete(where: Prisma.GroupWhereUniqueInput): Promise<Group> {
    return this.prisma.group.delete({ where });
  }
}
