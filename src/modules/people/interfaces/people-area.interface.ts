import { Document } from 'mongoose';

interface PeopleArea extends Document {
  id_pessoa: string;
  id_area: string;
  fl_ativo: boolean;
}

export { PeopleArea };
