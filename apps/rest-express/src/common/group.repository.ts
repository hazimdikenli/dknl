import {
  Group,
  Prisma,
  PrismaClient
} from '@prisma/client';

export class GroupService {
  constructor(private prisma: PrismaClient) {}

  async group(groupWhereUniqueInput: Prisma.GroupWhereUniqueInput): Promise<Group | null> {
    return this.prisma.group.findUnique({
      where: groupWhereUniqueInput,
    });
  }

  async groups(params: {
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
    });
  }

  async createGroup(data: Prisma.GroupCreateInput): Promise<Group> {
    return this.prisma.group.create({
      data,
    });
  }

  async updateGroup(params: {
    where: Prisma.GroupWhereUniqueInput;
    data: Prisma.GroupUpdateInput;
  }): Promise<Group> {
    const { where, data } = params;
    return this.prisma.group.update({
      data,
      where,
    });
  }

  async deleteGroup(where: Prisma.GroupWhereUniqueInput): Promise<Group> {
    return this.prisma.group.delete({
      where,
    });
  }
}