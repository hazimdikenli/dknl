import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Group as GroupModel } from '@prisma/client';
import {
  GroupCreateModel,
  GroupLookupModel,
  GroupService,
} from './group.service';

@Controller('auth/groups')
export class GroupController {
  constructor(private readonly service: GroupService) {}

  @Post()
  async create(
    @Body()
    groupData: GroupCreateModel,
  ): Promise<GroupModel> {
    return this.service.create(groupData);
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
