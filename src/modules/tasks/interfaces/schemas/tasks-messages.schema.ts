import * as mongoose from 'mongoose';

export const TasksMessagesSchema = new mongoose.Schema(
  {
    id_task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tasks',
    },
    id_author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'People',
    },
    message: { type: String },
  },
  { timestamps: true, collection: 'tasks-messages' }
);
