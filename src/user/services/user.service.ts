import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/user.repository';
import { User } from '../model/user.model';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getUserById(user_id: string) {
    const user = this.userRepository.findById(user_id);
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async createUser(user: CreateUserDto) {
    return await this.userRepository.create(user);
  }

  async updateUser(id: string, data: UpdateUserDto) {
    return await this.userRepository.findByIdAndUpdate(id, data);
  }

  // getListUser(): string {
  //   return 'List User Nè Nha!';
  // }
}
