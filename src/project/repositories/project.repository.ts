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

  async countDocuments(filter) {
    return this.projectModel.countDocuments(filter);
  }
}
