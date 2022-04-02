import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Group, GroupView, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/db/prisma.service';
import { RoleLookupModel } from '../role/role.service';
import { UserLookupModel } from '../user/user.service';

export type GroupLookupModel = Pick<
  Group,
  'group_id' | 'group_name' | 'group_description' | 'group_email'
>;

export type GroupCreateModel = Pick<
  Prisma.GroupCreateInput,
  'group_name' | 'group_email' | 'group_description'
> & { users: UserLookupModel[]; roles: RoleLookupModel[] };

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async findUnique(
    whereUniqueInput: Prisma.GroupViewWhereUniqueInput,
  ): Promise<GroupView> {
    return this.prisma.groupView.findUnique({
      where: whereUniqueInput,
      include: {
        users: {
          select: {
            user_id: true,
            user_name: true,
            full_name: true,
            user_email: true,
          },
          // include: {
          //   user: {
          //     select: { user_id: true, user_name: true, full_name: true },
          //   },
          //},
        },
        roles: {
          select: { role_id: true, role_name: true, role_description: true },
          // include: { role: true }
        },
      },
    });
  }

  private async findManyForUpdate(params: {
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
      // include: {
      //   _count: {
      //     select: { users: true, roles: true },
      //   },
      // },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GroupViewWhereUniqueInput;
    where?: Prisma.GroupViewWhereInput;
    orderBy?: Prisma.GroupViewOrderByWithRelationInput;
  }): Promise<GroupView[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.groupView.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findManyLookup(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GroupViewWhereUniqueInput;
    where?: Prisma.GroupViewWhereInput;
    orderBy?: Prisma.GroupViewOrderByWithRelationInput;
  }): Promise<GroupLookupModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.group.findMany({
      select: {
        group_id: true,
        group_name: true,
        group_email: true,
        group_description: true,
      },
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(group: GroupCreateModel): Promise<Group> {
    const {roles, users, ...rest} = group;
    const data = { ...group } as Prisma.GroupCreateInput;

    if (roles && roles.length > 0) {
      data.roles = {
        create: roles.map((p) => {
          return {
            role: {
              connect: { role_id: p.role_id},
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
              connect: { user_id: p.user_id},
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
