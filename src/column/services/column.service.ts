import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ColumnsRepository } from '../repositories/column.repository';
import { Column } from '../model/column.model';
import { CreateColumnDto, UpdateColumnDto } from '../dto/column.dto';

@Injectable()
export class ColumnsService {
  constructor(private readonly columnRepository: ColumnsRepository) {}

  async findAll(): Promise<Column[]> {
    return await this.columnRepository.getByCondition(null, { _id: 1, title: 1, sort: 1 });
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

  async createColumn(data: CreateColumnDto) {
    return await this.columnRepository.create(data);
    // return await this.columnRepository.getByCondition(null, { _id: 1, title: 1, sort: 1 });
  }

  async updateColumn(id: string, data: UpdateColumnDto) {
    return this.columnRepository.findByIdAndUpdate(id, data);
    // return await this.columnRepository.getByCondition(
    //   { project_id: { $eq: data.project_id } },
    //   { _id: 1, title: 1, sort: 1 },
    // );
  }

  async deleteColumn(id: string) {
    return await this.columnRepository.deleteOne(id);
    // return await this.columnRepository.getByCondition(null, { _id: 1, title: 1, sort: 1 });
  }
}
