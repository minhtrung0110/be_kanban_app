import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ColumnsRepository } from '../repositories/column.repository';
import { Column } from '../model/column.model';
import { CreateColumnDto, UpdateColumnDto } from '../dto/column.dto';

@Injectable()
export class ColumnsService {
  constructor(private readonly columnRepository: ColumnsRepository) {}

  async findAll(): Promise<Column[]> {
    return await this.columnRepository.findAll();
  }

  // async findByProjectId(projectId: string): Promise<Column[]> {
  //   return await this.columnRepository.findByProjectId(projectId);
  // }

  async getColumnById(column_id: string) {
    const column = this.columnRepository.findColumnById(column_id);
    if (column) {
      //await column;
      return column;
    }
    throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
  }

  getColumnWithTask(column_id: string) {
    const column = this.columnRepository.findTaskByColumnId(column_id);
    if (column) {
      //await column;
      return column;
    }
    throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
  }

  async createColumn(user: CreateColumnDto) {
    return await this.columnRepository.create(user);
  }

  async updateColumn(id: string, data: UpdateColumnDto) {
    return await this.columnRepository.findByIdAndUpdate(id, data);
  }

  async deleteColumn(id: string) {
    return await this.columnRepository.deleteOne(id);
  }
}
