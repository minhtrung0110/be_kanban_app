import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../base.repository';
import { Task } from '../model/task.model';

@Injectable()
export class TasksRepository extends BaseRepository<Task> {
  constructor(
    @InjectModel('Task')
    private readonly taskModel: Model<Task>,
  ) {
    super(taskModel);
  }

  async findTaskById(columnId: string): Promise<Task> {
    return this.taskModel.findById(columnId).populate([
      { path: 'column_id', select: '_id title' },
      {
        path: 'assignee_user',
        select: '_id first_name last_name mail avatar',
      },
      {
        path: 'report_user',
        select: '_id first_name last_name mail avatar',
      },
      { path: 'priority', select: 'name' },
    ]);
    // .populate('column_id')
    // .populate('assignee_user')
    // .populate('report_user')
    // .populate('priority');
  }

  async countDocuments(filter) {
    return this.taskModel.countDocuments(filter);
  }
}
