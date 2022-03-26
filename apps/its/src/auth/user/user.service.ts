import { Injectable } from '@nestjs/common';
import { User, Prisma, UserView } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { GroupLookupModel } from '../group/group.service';
import { RoleLookupModel } from '../role/role.service';

export type UserLookupModel = Pick<
  User,
  'user_email' | 'user_id' | 'full_name' | 'user_name'
>;
export type UserCreateModel = Pick<
  Prisma.UserCreateInput,
  'user_name' | 'user_email' | 'full_name' | 'password'
> & { groups: GroupLookupModel[]; roles: RoleLookupModel[] };

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUnique(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findManyForUpdate(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserViewWhereUniqueInput;
    where?: Prisma.UserViewWhereInput;
    orderBy?: Prisma.UserViewOrderByWithRelationInput;
  }): Promise<UserView[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.userView.findMany({
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
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    select?: Prisma.UserSelect;
  }): Promise<UserLookupModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      select: {
        user_id: true,
        user_name: true,
        user_email: true,
        full_name: true,
      },
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(
    user: UserCreateModel,
  ): Promise<User> {
    const {roles, groups, ...rest} = user;
    const data: Prisma.UserCreateInput = rest;
    //const data = { ...user } as Prisma.UserCreateInput;
    if (roles && roles.length > 0) {
      data.roles = {
        create: roles.map((r) => {
          return {
            role: {
              connect: { role_id: r.role_id },
            },
          };
        }),
      };
    }

    if (groups && groups.length > 0) {
      data.groups = {
        create: groups.map((r) => {
          return {
            group: {
              connect: { group_id: r.group_id },
            },
          };
        }),
      };
    }

    return this.prisma.user.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
