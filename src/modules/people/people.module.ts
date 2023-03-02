import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActingAreaSchema } from './interfaces/schemas/acting-area.schema';
import { PeopleTypeSchema } from './interfaces/schemas/people-type.schema';
import { PeopleSchema } from './interfaces/schemas/people.schema';

import { PeopleController } from './controllers/people.controller';
import { PeopleService } from './services/people.service';
import { ActingAreaController } from './controllers/acting-area.controller';
import { ActingAreaService } from './services/acting-area.service';
import { PeopleAreaSchema } from './interfaces/schemas/people-area.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'People', schema: PeopleSchema }]),
    MongooseModule.forFeature([{ name: 'PeopleType', schema: PeopleTypeSchema }]),
    MongooseModule.forFeature([{ name: 'ActingArea', schema: ActingAreaSchema }]),
    MongooseModule.forFeature([{ name: 'PeopleArea', schema: PeopleAreaSchema }]),
  ],
  controllers: [PeopleController, ActingAreaController],
  providers: [PeopleService, ActingAreaService],
  exports: [],
})
export class PeopleModule { }
