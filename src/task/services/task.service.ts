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

  async findAllFullKey(): Promise<Task[]> {
    return await this.taskRepository.findTasks();
  }

  async getTaskById(task_id: string) {
    const task = this.taskRepository.findTaskById(task_id);
    if (task) {
      //await task;
      return task;
    }
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }

  async createTask(task: CreateTaskDto) {
    const { _id, ...data } = task;
    const response = await this.taskRepository.create(data);
    return response.populate({ path: 'priority', select: 'name' });
  }

  async updateTask(id: string, data: UpdateTaskDto) {
    return this.taskRepository.update(id, data);
  }

  async updateTasks(data: Task[]) {
    return await this.taskRepository.updateTasks(data);
  }

  async deleteTask(id: string) {
    return await this.taskRepository.deleteOne(id);
  }
}
