import * as mongoose from 'mongoose';

export const SolicitationSchema = new mongoose.Schema(
  {
    id_aluno_solicitante: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'People',
    },
    id_professor_orientador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'People',
    },
    solicitacao_aceita: { type: Boolean, default: false },
    nome_projeto: { type: String },
    descricao: { type: String },
    justificativa: { type: String },
    data_aprovacao: { type: Date },
    data_reprovacao: { type: Date },
  },
  { timestamps: true, collection: 'solicitacoes' }
);
