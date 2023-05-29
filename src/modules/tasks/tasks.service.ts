import { Model } from 'mongoose';

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Tasks } from './interfaces/tasks.interface';
import { TasksMessages } from './interfaces/tasks-message.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Tasks')
    private readonly tasksModel: Model<Tasks>,
    @InjectModel('TasksMessages')
    private readonly tasksMessagesModel: Model<TasksMessages>
  ) {}

  private readonly logger = new Logger(TasksService.name);

  async createTask(createTaskDto: any): Promise<any> {
    const createTask = new this.tasksModel(createTaskDto);

    const save = await createTask.save();

    this.logger.log('TASK CRIADA COM SUCESSO!');

    return save;
  }

  async listTasks(id_solicitacao: string): Promise<any> {
    const tasks = await this.tasksModel.find({ id_solicitacao }).exec();

    if (!tasks) {
      throw new NotFoundException(
        'Ainda não foram criadas tarefas para essa solicitação.'
      );
    }

    this.logger.log('TASKS LISTADAS COM SUCESSO!');

    return tasks;
  }

  async createMessage(createMessageDto: any): Promise<any> {
    const createMessage = new this.tasksMessagesModel(createMessageDto);

    const save = await createMessage.save();

    this.logger.log('MENSAGEM PARA A TASK CRIADA COM SUCESSO!');

    return save;
  }

  async listMessagesFromTask(id_task: string): Promise<any> {
    const messages = await this.tasksMessagesModel
      .find({ id_task })
      .populate('id_author')
      .exec();

    if (!messages) {
      throw new NotFoundException(
        'Ainda não foram criadas mensagens para essa tarefa.'
      );
    }

    this.logger.log('MENSAGENS LISTADAS COM SUCESSO!');

    return messages;
  }
}
