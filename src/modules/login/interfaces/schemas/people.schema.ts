import * as mongoose from 'mongoose';

export const PeopleSchema = new mongoose.Schema(
  {
    nome: { type: String },
    email: { type: String, unique: true },
    senha: { type: String },
    fl_ativo: { type: Boolean },
    id_tipo_pessoa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PeopleType',
    },
  },
  { timestamps: true, collection: 'pessoa' },
);
