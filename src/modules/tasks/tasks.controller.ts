import {
  Controller,
  Post,
  Body,
  Get,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePeopleDto } from './dtos/update-people.dto';
import { TasksService } from './tasks.service';

@Controller('api/v1/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('')
  //@UseGuards(AuthGuard('jwt'))
  async createTask(@Body() createTaskDto: any): Promise<any> {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Get(':_id')
  // @UseGuards(AuthGuard('jwt'))
  async getTasks(@Param('_id') _id: string): Promise<any> {
    return await this.tasksService.listTasks(_id);
  }

  @Post('message')
  //@UseGuards(AuthGuard('jwt'))
  async createMessage(@Body() createMessageDto: any): Promise<any> {
    return await this.tasksService.createMessage(createMessageDto);
  }

  @Get('message/:_id')
  // @UseGuards(AuthGuard('jwt'))
  async getMessagesTask(@Param('_id') _id: string): Promise<any> {
    return await this.tasksService.listMessagesFromTask(_id);
  }
}
