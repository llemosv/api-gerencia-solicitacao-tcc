import { Document } from 'mongoose';

interface Tasks extends Document {
  id_solicitacao: string;
  name: string;
  is_concluded: boolean;
  data_conclusao?: Date;
}

export { Tasks };
