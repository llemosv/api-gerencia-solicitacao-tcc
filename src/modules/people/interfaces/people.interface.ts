import { Document } from 'mongoose';

interface People extends Document {
  nome: string;
  readonly email: string;
  senha: string;
  fl_ativo: boolean;
  id_tipo_pessoa: string;
}

export { People };
