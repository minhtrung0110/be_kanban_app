import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../base.repository';
import { Project } from '../model/project.model';

@Injectable()
export class ProjectsRepository extends BaseRepository<Project> {
  constructor(
    @InjectModel('Project')
    private readonly projectModel: Model<Project>,
  ) {
    super(projectModel);
  }

  async findProjectById(projectId: string): Promise<Project> {
    return this.projectModel.findById(projectId).populate('created_by');
  }

  async findFullDataById(projectId: string): Promise<Array<any>> {
    // return this.projectModel.findById(projectId).populate('created_by');
    return this.projectModel.aggregate([
      {
        $lookup: {
          from: 'column',
          localField: '_id',
          foreignField: 'project_id',
          as: 'board_columns',
        },
      },
      {
        $unwind: '$board_columns',
      },
      {
        $lookup: {
          from: 'task',
          localField: '_id',
          foreignField: 'project_id',
          as: 'tasks',
        },
      },
      {
        $unwind: '$tasks',
      },
      {
        $lookup: {
          from: 'user',
          localField: 'created_by',
          foreignField: '_id',
          as: 'created_by',
        },
      },
      {
        $lookup: {
          from: 'user',
          localField: 'tasks.assignee_user',
          foreignField: '_id',
          as: 'tasks.assignee_user_info',
        },
      },
      {
        $lookup: {
          from: 'priority',
          localField: 'tasks.priority',
          foreignField: '_id',
          as: 'tasks.priority',
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          description: { $first: '$description' },
          status: { $first: '$status' },
          board_columns: {
            $addToSet: {
              _id: '$board_columns._id',
              title: '$board_columns.title',
            },
          },
          tasks: {
            $push: {
              _id: '$tasks._id',
              title: '$tasks.title',
              project_id: '$tasks.project_id',
              column_id: '$tasks.column_id',
              assignee_user: {
                $arrayElemAt: ['$tasks.assignee_user_info', 0],
              },
              priority: {
                $arrayElemAt: ['$tasks.priority', 0],
              },
              status: '$tasks.status',
            },
          },
          created_by: { $first: { $arrayElemAt: ['$created_by', 0] } },
        },
      },
    ]);
  }

  async countDocuments(filter) {
    return this.projectModel.countDocuments(filter);
  }
}

///  this.projectModel
//         .aggregate()
//         // .match({
//         //   _id: projectId,
//         // })
//         .lookup({
//           from: 'column',
//           localField: '_id',
//           foreignField: 'project_id',
//           as: 'board_columns',
//         })
//         .lookup({
//           from: 'user',
//           localField: 'created_by',
//           foreignField: '_id',
//           as: 'created_by',
//         })
//         .lookup({
//           from: 'task',
//           localField: '_id',
//           foreignField: 'project_id',
//           as: 'tasks',
//         })
//         .exec()
