import * as mongoose from 'mongoose';

export const ActingAreaSchema = new mongoose.Schema(
  {
    descricao: { type: String },
    fl_ativo: { type: Boolean },
  },
  { timestamps: true, collection: 'area-atuacao' },
);
