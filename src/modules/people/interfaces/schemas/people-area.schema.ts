import * as mongoose from 'mongoose';

export const PeopleAreaSchema = new mongoose.Schema(
  {
    id_pessoa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'People',
    },
    id_area: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ActingArea',
    },
    fl_ativo: { type: Boolean },
  },
  { timestamps: true, collection: 'area-pessoa' },
);
