import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserLookupModel, UserService } from './user.service';
import { Prisma, User } from '@prisma/client';

type UserModel = Omit<
  Prisma.UserCreateInput,
  'created_by' | 'created_at' | 'updated_by' | 'updated_at' | 'UserRole'
>;

@Controller('auth/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signupUser(@Body() userData: UserModel): Promise<UserModel> {
    return this.userService.create(userData);
  }

  @Get('/lookup')
  async getBasicList(): Promise<UserLookupModel[]> {
    return await this.userService.findManyLookup({});
  }

  @Get('')
  async getAll(): Promise<User[]> {
    return await this.userService.findMany({});
  }
}
