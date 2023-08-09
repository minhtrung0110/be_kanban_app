import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { TasksService } from '../services/task.service';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { Task } from '../model/task.model';
import { ApiResponse } from '../../common/response/ApiResponse';
import { isEmpty } from 'lodash';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      const result = await this.tasksService.createTask(createTaskDto);
      if (!isEmpty(result)) return ApiResponse.success(result);
      return ApiResponse.error(HttpStatus.BAD_REQUEST, 'Can not create task');
    } catch (error) {
      return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      const result: Task[] = await this.tasksService.findAllFullKey();
      return ApiResponse.success(result);
    } catch (error) {
      return ApiResponse.error(HttpStatus.NOT_FOUND, error.message);
    }
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    try {
      const result: Task = await this.tasksService.getTaskById(id);
      return ApiResponse.success(result);
    } catch (error) {
      return ApiResponse.error(HttpStatus.NOT_FOUND, error.message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      const result = await this.tasksService.updateTask(id, updateTaskDto);
      if (!isEmpty(result)) return ApiResponse.success(result);
      else return ApiResponse.error(HttpStatus.NOT_FOUND, 'Cannot find task to update');
    } catch (error) {
      return ApiResponse.error(HttpStatus.FORBIDDEN, error.message);
    }
  }

  @Patch('updateMany')
  async updateTasks(@Body() updateTasks: Task[]) {
    try {
      const result = await this.tasksService.updateTasks(updateTasks);
      console.log(result);
      if (result !== false) return ApiResponse.success(result);
      else return ApiResponse.error(HttpStatus.NOT_FOUND, 'Cannot find tasks to update');
    } catch (error) {
      return ApiResponse.error(HttpStatus.FORBIDDEN, error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const result = await this.tasksService.deleteTask(id);
      return ApiResponse.success(result);
    } catch (error) {
      return ApiResponse.error(HttpStatus.FORBIDDEN, error.message);
    }
  }
}
