// @Global()
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './model/project.model';
import { ProjectsService } from './services/project.service';
import { ProjectsRepository } from './repositories/project.repository';
import { ProjectsController } from './controller/project.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: 'Project',
        schema: ProjectSchema,
      },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository],
  exports: [ProjectsService],
})
export class ProjectModule {}
