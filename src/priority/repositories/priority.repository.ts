import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../base.repository';
import { Priority } from '../model/priority.model';

@Injectable()
export class PrioritysRepository extends BaseRepository<Priority> {
  constructor(
    @InjectModel('Priority')
    private readonly columnModel: Model<Priority>,
  ) {
    super(columnModel);
  }

  async findPriorityById(columnId: string): Promise<Priority> {
    return this.columnModel.findById(columnId);
  }

  async countDocuments(filter) {
    return this.columnModel.countDocuments(filter);
  }
}
