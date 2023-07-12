import { IsNotEmpty } from 'class-validator';

export class CreateColumnDto {
  title: string;
  project_id: number;
  sort: number;
}

export class UpdateColumnDto {
  @IsNotEmpty()
  id: string;
  title: string;
  project_id: number;
  sort: number;
}

export class PaginationColumnDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  start: string;
}
