import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from '../services/project.service';
import { CreateProjectDto, UpdateProjectDto } from '../dto/project.dto';
import { ApiResponse } from '../../common/response/ApiResponse';
import { Project } from '../model/project.model';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    await this.projectsService.createProject(createProjectDto);
  }

  @Get()
  async findAll() {
    try {
      const result: Project[] = await this.projectsService.findAll();
      return ApiResponse.success(result);
    } catch (error) {
      return ApiResponse.error(400, error.message);
    }
  }

  // @Get(':id')
  // getPostById(@Param('id') id: string) {
  //   console.log(this.projectsService.getProjectById(id));
  //   return this.projectsService.getProjectById(id);
  // }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    try {
      const result: Project = await this.projectsService.getProjectById(id);
      console.log('Result:', this.projectsService.getProjectById(id));
      return ApiResponse.success(result);
    } catch (error) {
      return ApiResponse.error(400, error.message);
    }
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    await this.projectsService.updateProject(id, updateProjectDto);
  }
}
