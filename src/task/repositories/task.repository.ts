import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../base.repository';
import { Task } from '../model/task.model';
import { UpdateTaskDto } from '../dto/task.dto';

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

  async findTasks(): Promise<Task[]> {
    return this.taskModel.find().populate([
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

  async createTask(doc): Promise<any> {
    const createdEntity = new this.taskModel(doc);
    return await createdEntity.save();
  }

  async update(id: string, data: UpdateTaskDto) {
    return await this.taskModel.findByIdAndUpdate(id, data);
    // return this.taskModel.find().populate([
    //   { path: 'column_id', select: '_id title' },
    //   {
    //     path: 'assignee_user',
    //     select: '_id first_name last_name mail avatar',
    //   },
    //   {
    //     path: 'report_user',
    //     select: '_id first_name last_name mail avatar',
    //   },
    //   { path: 'priority', select: 'name' },
    // ]);
  }

  async updateTasks(tasksToUpdate: Task[]): Promise<boolean> {
    const bulkOps = tasksToUpdate.map(task => ({
      updateOne: {
        filter: { _id: task._id },
        update: { $set: { sort: task.sort, column_id: task.column_id } },
      },
    }));

    try {
      await this.taskModel.bulkWrite(bulkOps);
      return true;
    } catch (err) {
      return false;
    }
  }
}
