import { Document } from 'mongoose';

interface TasksMessages extends Document {
  id_task: string;
  id_author: string;
  message: string;
}

export { TasksMessages };
