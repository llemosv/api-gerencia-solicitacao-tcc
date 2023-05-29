import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksSchema } from './interfaces/schemas/tasks.schema';
import { TasksMessagesSchema } from './interfaces/schemas/tasks-messages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tasks', schema: TasksSchema }]),
    MongooseModule.forFeature([
      { name: 'TasksMessages', schema: TasksMessagesSchema },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [],
})
export class TasksModule {}
