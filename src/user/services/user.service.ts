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

  async update(filter, update) {
    if (update.refreshToken) {
      update.refreshToken = await bcrypt.hash(this.reverse(update.refreshToken), 10);
    }
    return await this.userRepository.findByConditionAndUpdate(filter, update);
  }

  async create(userDto: CreateUserDto) {
    userDto.password = await bcrypt.hash(userDto.password, 10);

    // check exists
    const userInDb = await this.userRepository.findByCondition({
      email: userDto.mail,
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    // await this.sendMail.add(
    //   'register',
    //   {
    //     to: userDto.email,
    //     name: userDto.name,
    //   },
    //   {
    //     removeOnComplete: true,
    //   },
    // );
    // await this.mailerService.sendMail({
    //   to: userDto.email,
    //   subject: 'Welcome to my website',
    //   template: './welcome',
    //   context: {
    //     name: userDto.name,
    //   },
    // });

    return await this.userRepository.create(userDto);
  }

  // async getUserByRefresh(refresh_token, email) {
  //   const user = await this.findByEmail(email);
  //   if (!user) {
  //     throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
  //   }
  //   const is_equal = await bcrypt.compare(this.reverse(refresh_token), user.refreshToken);
  //
  //   if (!is_equal) {
  //     throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  //   }
  //
  //   return user;
  // }

  // getListUser(): string {
  //   return 'List User Nè Nha!';
  // }

  private reverse(s) {
    return s.split('').reverse().join('');
  }
}
