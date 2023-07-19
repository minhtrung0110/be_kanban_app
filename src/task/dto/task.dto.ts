import { IsNotEmpty } from 'class-validator';
import { Column } from '../../column/model/column.model';
import { User } from '../../user/model/user.model';
import { Priority } from '../../priority/model/priority.model';

export class CreateTaskDto {
  _id: string;
  @IsNotEmpty()
  project_id: string;
  @IsNotEmpty()
  column: Column;
  @IsNotEmpty()
  assignee_user: User;
  @IsNotEmpty()
  report_user: User;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  priority: Priority;
  @IsNotEmpty()
  estimate_point: number;
  @IsNotEmpty()
  sort: number;
  @IsNotEmpty()
  status: number;
}

export class UpdateTaskDto {
  project_id: string;
  column_id: Column;
  assignee_user: User;
  report_user: User;
  title: string;
  description: string;
  priority: Priority;
  estimate_point: number;
  sort: number;
  status: number;
}

export class TaskCompactDto {
  project_id: string;
  column_id: Column;
  assignee_user: User[];
  report_user: User;
  title: string;
  priority: Priority;
  sort: number;
  status: number;
}

export class TaskDetailDto {
  project_id: string;
  column_id: Column;
  assignee_user: User[];
  report_user: User;
  title: string;
  description: string;
  priority: Priority;
  estimate_point: number;
  sort: number;
  status: number;
}

export class PaginationTaskDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  start: string;
}
