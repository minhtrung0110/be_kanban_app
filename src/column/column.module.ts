// @Global()
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ColumnSchema } from './model/column.model';
import { ColumnsService } from './services/column.service';
import { ColumnsRepository } from './repositories/column.repository';
import { ColumnsController } from './controller/column.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: 'Column',
        schema: ColumnSchema,
      },
    ]),
  ],
  controllers: [ColumnsController],
  providers: [ColumnsService, ColumnsRepository],
  exports: [ColumnsService],
})
export class ColumnModule {}
