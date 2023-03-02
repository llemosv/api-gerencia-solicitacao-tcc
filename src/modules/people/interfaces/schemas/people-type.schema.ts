import * as mongoose from 'mongoose';

export const PeopleTypeSchema = new mongoose.Schema(
  {
    descricao: { type: String },
    fl_ativo: { type: Boolean },
  },
  { timestamps: true, collection: 'tipo-pessoa' },
);
