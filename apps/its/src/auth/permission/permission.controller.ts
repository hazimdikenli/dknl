import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Permission as PermissionModel } from '@prisma/client';
import { PermissionService } from './permission.service';

@Controller('auth/permissions')
export class PermissionController {
  constructor(private readonly service: PermissionService) {}
  @Post()
  async create(
    @Body() data: Omit<PermissionModel, 'permission_id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by' >,
  ): Promise<PermissionModel> {
    return this.service.create(data);
  }

  @Get(':id/children')
  async getChildren(
    @Param('id') parent_id: string,
  ): Promise<PermissionModel[]> {
    return this.service.findMany({
      where: { parent_id: parent_id === 'root' ? null : Number(parent_id) },
    });
  }
  @Get(':id')
  async getById(@Param('id') id: number): Promise<PermissionModel> {
    return this.service.findUnique({ permission_id: Number(id) });
  }
  @Get()
  async getAll(): Promise<PermissionModel[]> {
    return this.service.findMany({});
  }
}
