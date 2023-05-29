import { Document } from 'mongoose';

interface Solicitation extends Document {
  id_aluno_solicitante: string;
  id_professor_orientador: string;
  solicitacao_aceita: boolean;
  nome_projeto: string;
  descricao?: string;
  justificativa?: string;
  data_aprovacao?: Date;
  data_reprovacao?: Date;
}
export { Solicitation };
