import { Document } from 'mongoose';

interface PeopleType extends Document {
  descricao: string;
  fl_ativo: boolean;
}

export { PeopleType };
