import { Module } from '@nestjs/common';
import { TasksController } from './controller/task.controller';
import { TasksService } from './controller/task.service';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService],
})
export class AppModule { }
