import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ColumnsService } from '../services/column.service';
import { CreateColumnDto, UpdateColumnDto } from '../dto/column.dto';
import { Column } from '../model/column.model';
import { ApiResponse } from '../../common/response/ApiResponse';
import { isEmpty } from 'lodash';
import { ColumnIn } from '../../project/model/project.model';

@Controller('columns')
export class ColumnsController {
  constructor(private columnsService: ColumnsService) {}

  @Post()
  async create(@Body() createColumnDto: CreateColumnDto) {
    try {
      const result = await this.columnsService.createColumn(createColumnDto);
      if (!isEmpty(result)) return ApiResponse.success(result);
      return ApiResponse.error(HttpStatus.BAD_REQUEST, 'Can not create column');
    } catch (error) {
      return ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      const result: Column[] = await this.columnsService.findAll();
      return ApiResponse.success(result);
    } catch (error) {
      return ApiResponse.error(HttpStatus.NOT_FOUND, error.message);
    }
  }

  @Get(':id')
  async geColumnById(@Param('id') id: string) {
    try {
      const result: ColumnIn[] = await this.columnsService.getColumnWithTask(id);
      return ApiResponse.success(result);
    } catch (error) {
      return ApiResponse.error(HttpStatus.NOT_FOUND, error.message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    try {
      const result = await this.columnsService.updateColumn(id, updateColumnDto);
      if (!isEmpty(result)) return ApiResponse.success(result);
      else return ApiResponse.error(HttpStatus.NOT_FOUND, 'Cannot find column to update');
    } catch (error) {
      return ApiResponse.error(HttpStatus.FORBIDDEN, error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const result = await this.columnsService.deleteColumn(id);
      return ApiResponse.success(result);
    } catch (error) {
      return ApiResponse.error(HttpStatus.FORBIDDEN, error.message);
    }
  }
}
