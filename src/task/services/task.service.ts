import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TasksRepository } from '../repositories/task.repository';
import { Task } from '../model/task.model';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TasksRepository) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }

  async getTaskById(task_id: string) {
    const task = this.taskRepository.findTaskById(task_id);
    if (task) {
      //await task;
      return task;
    }
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }

  async createTask(user: CreateTaskDto) {
    return await this.taskRepository.create(user);
  }

  async updateTask(id: string, data: UpdateTaskDto) {
    return await this.taskRepository.findByIdAndUpdate(id, data);
  }

  async deleteTask(id: string) {
    return await this.taskRepository.deleteOne(id);
  }
}
