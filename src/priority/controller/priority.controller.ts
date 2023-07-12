import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { PriorityService } from '../services/priority.service';
import { CreatePriorityDto, UpdatePriorityDto } from '../dto/priority.dto';
import { Priority } from '../model/priority.model';
import { ApiResponse } from '../../common/response/ApiResponse';
import { isEmpty } from 'lodash';

@Controller('priority')
export class PriorityController {
  constructor(private priorityService: PriorityService) {}

  @Post()
  async create(@Body() createPriorityDto: CreatePriorityDto) {
    try {
      const result = await this.priorityService.createPriority(createPriorityDto);
      if (!isEmpty(result)) return ApiResponse.success(result);
      return ApiResponse.error(HttpStatus.BAD_REQUEST, 'Can not create priority');
    } catch (error) {
      return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      const result: Priority[] = await this.priorityService.findAll();
      return ApiResponse.success(result);
    } catch (error) {
      return ApiResponse.error(HttpStatus.NOT_FOUND, error.message);
    }
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    try {
      const result: Priority = await this.priorityService.getPriorityById(id);
      return ApiResponse.success(result);
    } catch (error) {
      return ApiResponse.error(HttpStatus.NOT_FOUND, error.message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePriorityDto: UpdatePriorityDto) {
    try {
      const result = await this.priorityService.updatePriority(id, updatePriorityDto);
      if (!isEmpty(result)) return ApiResponse.success(result);
      else return ApiResponse.error(HttpStatus.NOT_FOUND, 'Cannot find priority to update');
    } catch (error) {
      return ApiResponse.error(HttpStatus.FORBIDDEN, error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const result = await this.priorityService.deletePriority(id);
      return ApiResponse.success(result);
    } catch (error) {
      return ApiResponse.error(HttpStatus.FORBIDDEN, error.message);
    }
  }
}
