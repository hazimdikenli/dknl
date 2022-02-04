import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Group as GroupModel } from '@prisma/client';
import { GroupLookupModel, GroupService } from './group.service';

@Controller('auth/groups')
export class GroupController {
  constructor(private readonly service: GroupService) {}

  @Post()
  async create(
    @Body()
    data: Omit<GroupModel, 'id' | 'created_at' | 'updated_at'> & {
      roles: Array<{ role_id: number; role_name?: string }>;
      users: Array<{ user_id: number; user_name?: string }>;
    },
  ): Promise<GroupModel> {
    const { roles, users, ...group } = data;
    return this.service.create({ group, roles, users });
  }

  @Get('/lookup')
  async getLookupList(): Promise<GroupLookupModel[]> {
    return this.service.findManyLookup({});
  }
  @Get(':id')
  async getById(@Param('id') id: number): Promise<GroupModel> {
    return this.service.findUnique({ group_id: Number(id) });
  }
  @Get()
  async getAll(): Promise<GroupModel[]> {
    return this.service.findMany({});
  }
}
