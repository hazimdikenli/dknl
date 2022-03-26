import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Role as RoleModel, RoleView } from '@prisma/client';
import { GroupLookupModel } from '../group/group.service';
import { UserLookupModel } from '../user/user.service';
import { RoleLookupModel, RoleService } from './role.service';

@Controller('auth/roles')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Post()
  async create(
    @Body()
    data: Omit<RoleModel, 'id' | 'created_at' | 'updated_at'> & {
      permissions: Array<{ permission_id: number; permission_name?: string }>;
      users?: Array<UserLookupModel>;
      groups?: Array<GroupLookupModel>;
    },
  ): Promise<RoleModel> {
    const { permissions, users, groups, ...role } = data;
    return this.service.create({ role, users, groups, permissions });
  }

  @Get('/lookup')
  async getLookupList(): Promise<RoleLookupModel[]> {
    return this.service.findManyLookup({});
  }


  @Get(':id')
  async getById(@Param('id') id: number): Promise<RoleModel> {
    return this.service.findUnique({ role_id: Number(id) });
  }
  @Get()
  async getAll(): Promise<RoleView[]> {
    return this.service.findMany({});
  }
}
