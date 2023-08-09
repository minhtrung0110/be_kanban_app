import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/user.repository';
import { User } from '../model/user.model';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';

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

  async findByLogin({ email, password }: LoginUserDto) {
    const user: User = await this.userRepository.findByCondition({
      email: email,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const is_equal = bcrypt.compareSync(password, user.password);

    if (!is_equal) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findByEmail(email) {
    return await this.userRepository.findByCondition({
      email: email,
    });
  }

  // getListUser(): string {
  //   return 'List User Nè Nha!';
  // }
}
