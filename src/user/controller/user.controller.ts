import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { User } from '../model/user.model';
import { ApiResponse } from '../../common/response/ApiResponse';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAll(): Promise<ApiResponse<User[]>> {
    try {
      const users: User[] = await this.usersService.findAll();
      return ApiResponse.success(users);
    } catch (error) {
      return ApiResponse.error(400, error.message);
    }
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.updateUser(id, updateUserDto);
  }
}
