import { Model } from 'mongoose';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { People } from '../interfaces/people.interface';
import { PeopleType } from '../interfaces/people-type.interface';
import { ActingArea } from '../interfaces/acting-area.interface';
import { PeopleArea } from '../interfaces/people-area.interface';

@Injectable()
export class ActingAreaService {
  constructor(
    @InjectModel('ActingArea') private readonly actingArea: Model<ActingArea>,
    @InjectModel('PeopleArea') private readonly peopleArea: Model<PeopleArea>
  ) {}

  private readonly logger = new Logger(ActingAreaService.name);

  async createActingArea(createActingAreaDto: any): Promise<any> {
    const createdActingArea = new this.actingArea(createActingAreaDto);

    const save = await createdActingArea.save();

    return save;
  }

  async createPeopleArea(createPeopleAreaDto: any): Promise<any> {
    const createdPeopleArea = new this.peopleArea(createPeopleAreaDto);

    const save = await createdPeopleArea.save();

    return save;
  }

  async getAllAreas(): Promise<any> {
    const search = await this.actingArea.find().exec();
    return search;
  }

  async getAllTeachersArea(): Promise<any> {
    const search = await this.peopleArea
      .find()
      .populate({
        path: 'id_pessoa',
        match: { id_tipo_pessoa: '643bf78fed7b6eb4a6383a7e' },
      })
      .populate('id_area')
      .exec();

    const filteredResults = search.filter((item) => item.id_pessoa !== null);

    const formattedResults = filteredResults.reduce(
      (result: any, item: any) => {
        const existingPerson = result.find(
          (person) => person.id_pessoa === item.id_pessoa._id.toString()
        );

        if (existingPerson) {
          existingPerson.areas.push(item.id_area.descricao);
        } else {
          result.push({
            id_pessoa: item.id_pessoa._id.toString(),
            nome: item.id_pessoa.nome,
            areas: [item.id_area.descricao],
          });
        }

        return result;
      },
      []
    );

    return formattedResults;
  }
}
