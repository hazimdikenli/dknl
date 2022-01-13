import {
  Permission,
  Prisma,
  PrismaClient
} from '@prisma/client';

export class PermissionRepository {
  constructor(private prisma: PrismaClient) {}

  async permission(permissionWhereUniqueInput: Prisma.PermissionWhereUniqueInput): Promise<Permission | null> {
    return this.prisma.permission.findUnique({
      where: permissionWhereUniqueInput,
    });
  }

  async permissions(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PermissionWhereUniqueInput;
    where?: Prisma.PermissionWhereInput;
    orderBy?: Prisma.PermissionOrderByWithRelationInput;
  }): Promise<Permission[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.permission.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPermission(data: Prisma.PermissionCreateInput): Promise<Permission> {
    return this.prisma.permission.create({
      data,
    });
  }

  async updatePermission(params: {
    where: Prisma.PermissionWhereUniqueInput;
    data: Prisma.PermissionUpdateInput;
  }): Promise<Permission> {
    const { where, data } = params;
    return this.prisma.permission.update({
      data,
      where,
    });
  }

  async deletePermission(where: Prisma.PermissionWhereUniqueInput): Promise<Permission> {
    return this.prisma.permission.delete({
      where,
    });
  }
}