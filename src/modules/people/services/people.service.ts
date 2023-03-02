import { Model } from 'mongoose';

import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { People } from '../interfaces/people.interface';
import { PeopleType } from '../interfaces/people-type.interface';
import { ActingArea } from '../interfaces/acting-area.interface';
import { UpdatePeopleDto } from '../dtos/update-people.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel('People') private readonly peopleModel: Model<People>,
    @InjectModel('PeopleType')
    private readonly peopleTypeModel: Model<PeopleType>,
  ) { }

  private readonly logger = new Logger(PeopleService.name);

  async create(createPeopleDto: any): Promise<any> {
    const { email } = createPeopleDto;

    console.log(createPeopleDto);

    const peopleExists = await this.peopleModel.findOne({ email }).exec();

    if (peopleExists) {
      throw new BadRequestException(`O e-mail ${email} já possui um cadastro na nossa base de dados.`);
    }

    const createdPeople = new this.peopleModel(createPeopleDto);

    const save = await createdPeople.save();

    return save;
  }

  async createPeopleType(createPeopleTypeDto: any): Promise<any> {
    const createdPeopleType = new this.peopleTypeModel(createPeopleTypeDto);

    const save = await createdPeopleType.save();

    return save;
  }

  async getAllPlayers(): Promise<any> {
    const search = await this.peopleModel.find().populate('id_tipo_pessoa').exec();
    return search;
  }

  async updatePeople(_id: string, updatePeopleDto: UpdatePeopleDto): Promise<void> {
    const peopleExists = await this.peopleModel.findOne({ _id }).exec();

    if (!peopleExists) {
      throw new NotFoundException(`Pessoa com o id: ${_id} não foi encontrada na nossa base de dados.`);
    }

    await this.peopleModel.findOneAndUpdate({ _id }, { $set: updatePeopleDto }).exec();
  }
}
