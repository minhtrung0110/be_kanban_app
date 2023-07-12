import { Body, Controller, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
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
      return ApiResponse.error(HttpStatus.BAD_REQUEST, error.message);
    }
  }

  // @Get(':id')
  // async getPostById(@Param('id') id: string) {
  //   try {
  //     const result: Project[] = await this.projectsService.getProjectById(id);
  //     return ApiResponse.success(result);
  //   } catch (error) {
  //     return ApiResponse.error(HttpStatus.FORBIDDEN, error.message);
  //   }
  // }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    await this.projectsService.updateProject(id, updateProjectDto);
  }

  @Get(':id')
  async getFullDataProject(@Param('id') id: string) {
    try {
      const result = await this.projectsService.getFullData(id);
      // const listColumn: Column[] = await this.columnsService.findByProjectId(id);
      //  const data: ProjectAPI = { ...result, board_columns: listColumn };
      return ApiResponse.success(result);
    } catch (error) {
      return ApiResponse.error(HttpStatus.FORBIDDEN, error.message);
    }
  }
}
