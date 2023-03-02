import { Document } from 'mongoose';

interface ActingArea extends Document {
  descricao: string;
  fl_ativo: boolean;
}

export { ActingArea };
