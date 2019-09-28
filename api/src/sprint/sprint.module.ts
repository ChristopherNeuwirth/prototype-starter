import { Module } from '@nestjs/common';
import { SprintController } from './sprint.controller';
import { SprintService } from './sprint.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SprintSchema } from '../models/sprint.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Sprint', schema: SprintSchema }])],
  controllers: [SprintController],
  providers: [SprintService],
})
export class SprintModule {}
