import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProjectsRepository } from '../repositories/project.repository';
import { Project } from '../model/project.model';
import { CreateProjectDto, UpdateProjectDto } from '../dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectRepository: ProjectsRepository) {}

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.findAll();
  }

  async getProjectById(project_id: string) {
    const project = this.projectRepository.findFullDataById(project_id);
    if (project) {
      //await project;
      return project;
    }
    throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
  }

  async getFullData(project_id: string) {
    const project = this.projectRepository.findFullDataById(project_id);
    if (project) {
      //await project;
      return project;
    }
    throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
  }

  async createProject(user: CreateProjectDto) {
    return await this.projectRepository.create(user);
  }

  async updateProject(id: string, data: UpdateProjectDto) {
    return await this.projectRepository.findByIdAndUpdate(id, data);
  }

  // getListUser(): string {
  //   return 'List User Nè Nha!';
  // }
}
