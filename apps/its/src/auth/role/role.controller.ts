import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Role as RoleModel } from '@prisma/client';
import { RoleService } from './role.service';

@Controller('auth/roles')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Post()
  async create(
    @Body()
    data: Omit<RoleModel, 'id' | 'created_at' | 'updated_at'> & {
      permissions: Array<{ permission_id: number; permission_name?: string }>;
    },
  ): Promise<RoleModel> {
    const { permissions, ...role } = data;
    return this.service.create({role, permissions});
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<RoleModel> {
    return this.service.findUnique({ role_id: Number(id) });
  }
  @Get()
  async getAll(): Promise<RoleModel[]> {
    return this.service.findMany({});
  }
}
