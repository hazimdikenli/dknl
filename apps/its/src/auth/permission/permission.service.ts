import { Injectable } from '@nestjs/common';
import { Permission, PermissionView, Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  async findUnique(
    permissionWhereUniqueInput: Prisma.PermissionViewWhereUniqueInput,
  ): Promise<PermissionView | null> {
    return this.prisma.permissionView.findUnique({
      where: permissionWhereUniqueInput,
      include: {
        children: true,
        parent: true,
        // roles: { include: { role: true } },
        roles: {
          select: { role_id: true, role_name: true, role_description: true },
        },
      },
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PermissionViewWhereUniqueInput;
    where?: Prisma.PermissionViewWhereInput;
    orderBy?: Prisma.PermissionViewOrderByWithRelationInput;
  }): Promise<PermissionView[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.permissionView.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.PermissionCreateInput): Promise<Permission> {
    return this.prisma.permission.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.PermissionWhereUniqueInput;
    data: Prisma.PermissionUpdateInput;
  }): Promise<Permission> {
    const { where, data } = params;
    return this.prisma.permission.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.PermissionWhereUniqueInput): Promise<Permission> {
    return this.prisma.permission.delete({
      where,
    });
  }
}
