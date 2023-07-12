// @Global()
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PrioritySchema } from './model/priority.model';
import { PriorityController } from './controller/priority.controller';
import { PriorityService } from './services/priority.service';
import { PrioritysRepository } from './repositories/priority.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: 'Priority',
        schema: PrioritySchema,
      },
    ]),
  ],
  controllers: [PriorityController],
  providers: [PriorityService, PrioritysRepository],
  exports: [PriorityService],
})
export class PriorityModule {}
