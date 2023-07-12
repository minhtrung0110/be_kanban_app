import { IsNotEmpty } from 'class-validator';

export class CreatePriorityDto {
  name: string;
}

export class UpdatePriorityDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  name: string;
}
