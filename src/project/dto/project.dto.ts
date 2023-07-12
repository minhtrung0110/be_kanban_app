import { IsNotEmpty } from 'class-validator';
import { User } from '../../user/model/user.model';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;
  description: string;
  status: number;
  created_by: User;
}

export class UpdateProjectDto {
  @IsNotEmpty()
  id: string;
  name: string;
  description: string;
  status: number;
  created_by: User;
}

export class PaginationProjectDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  start: string;
}
