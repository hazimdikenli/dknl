import { RoleModel, Prisma, PrismaClient } from '@prisma/client';

export class RoleRepository {
  constructor(private prisma: PrismaClient) {}

  async role(
    roleWhereUniqueInput: Prisma.RoleWhereUniqueInput
  ): Promise<RoleModel | null> {
    return this.prisma.role.findUnique({
      where: roleWhereUniqueInput,
    });
  }

  async roles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoleWhereUniqueInput;
    where?: Prisma.RoleWhereInput;
    orderBy?: Prisma.RoleOrderByWithRelationInput;
  }): Promise<RoleModel[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.role.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createRole(data: Prisma.RoleCreateInput): Promise<RoleModel> {
    return this.prisma.role.create({
      data,
    });
  }

  async updateRole(params: {
    where: Prisma.RoleWhereUniqueInput;
    data: Prisma.RoleUpdateInput;
  }): Promise<RoleModel> {
    const { where, data } = params;
    return this.prisma.role.update({
      data,
      where,
    });
  }

  async deleteRole(where: Prisma.RoleWhereUniqueInput): Promise<RoleModel> {
    return this.prisma.role.delete({
      where,
    });
  }
}
