import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty() first_name: string;
  @IsNotEmpty() last_name: string;
  @IsNotEmpty() birth_day: string;
  @IsNotEmpty() gender: number;
  @IsNotEmpty() status: number;
  @IsNotEmpty() mail: string;
  @IsNotEmpty() phone: string;
  @IsNotEmpty() avatar: string;
  @IsNotEmpty() address: string;
}

export class CreateUserDto {
  @IsNotEmpty() first_name: string;
  @IsNotEmpty() last_name: string;
  @IsNotEmpty() birth_day: string;
  @IsNotEmpty() gender: number;
  @IsNotEmpty() status: number;
  @IsNotEmpty() mail: string;
  @IsNotEmpty() phone: string;
  @IsNotEmpty() avatar: string;
  @IsNotEmpty() address: string;
}

export class UpdateUserDto {
  @IsNotEmpty() _id: string;
  first_name: string;
  last_name: string;
  birth_day: string;
  gender: number;
  status: number;
  mail: string;
  phone: string;
  avatar: string;
  address: string;
}
