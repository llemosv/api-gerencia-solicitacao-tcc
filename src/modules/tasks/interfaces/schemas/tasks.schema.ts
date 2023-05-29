import * as mongoose from 'mongoose';

export const TasksSchema = new mongoose.Schema(
  {
    id_solicitacao: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Solicitation',
    },
    name: { type: String },
    is_concluded: { type: Boolean, default: false },
    data_conclusao: { type: Date },
  },
  { timestamps: true, collection: 'tasks' }
);
