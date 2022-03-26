import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserCreateModel, UserLookupModel, UserService } from './user.service';
import { Prisma, User, UserView } from '@prisma/client';
import { GroupLookupModel } from '../group/group.service';
import { RoleLookupModel } from '../role/role.service';


@Controller('auth/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signupUser(@Body() userData: UserCreateModel): Promise<User> {
    console.log('User Input:', userData);
    // const { roles, groups, ...user } = userData;
    return this.userService.create(userData);
  }

  @Get('/lookup')
  async getBasicList(): Promise<UserLookupModel[]> {
    return await this.userService.findManyLookup({});
  }

  @Get('')
  async getAll(): Promise<UserView[]> {
    return await this.userService.findMany({});
  }
}
