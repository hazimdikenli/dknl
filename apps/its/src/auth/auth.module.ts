import { Module } from '@nestjs/common';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { PermissionController } from './permission/permission.controller';
import { PermissionService } from './permission/permission.service';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';

@Module({
  controllers: [PermissionController, UserController, RoleController],
  providers: [PermissionService, UserService, RoleService]
})
export class AuthModule {}
