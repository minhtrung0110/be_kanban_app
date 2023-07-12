import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../base.repository';
import { Column } from '../model/column.model';

@Injectable()
export class ColumnsRepository extends BaseRepository<Column> {
  constructor(
    @InjectModel('Column')
    private readonly columnModel: Model<Column>,
  ) {
    super(columnModel);
  }

  async findColumnById(columnId: string): Promise<Column> {
    return this.columnModel.findById(columnId);
  }

  async findTaskByColumnId(columnId: string): Promise<Array<any>> {
    return (
      this.columnModel
        .aggregate()
        .match({ title: 'ToDo' })
        .lookup({
          from: 'task',
          localField: '_id',
          foreignField: 'column_id',
          as: 'tasks',
        })
        // .aggregate([
        //   {
        //     $match: {
        //       title: 'ToDo',
        //     },
        //   },
        //   {
        //     $lookup: {
        //       from: 'task',
        //       localField: '_id',
        //       foreignField: 'column_id',
        //       as: 'tasks',
        //     },
        //   },
        // ])
        .exec()
    );
  }

  // async findByProjectId(projectId: string): Promise<Column[]> {
  //   return await this.columnModel.find({ project_id: projectId }).exec();
  // }

  async countDocuments(filter) {
    return this.columnModel.countDocuments(filter);
  }
}
