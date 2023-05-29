import { Model } from 'mongoose';

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Solicitation } from './interfaces/solicitation.interface';

@Injectable()
export class SolicitationService {
  constructor(
    @InjectModel('Solicitation')
    private readonly solicitationModel: Model<Solicitation>
  ) {}

  private readonly logger = new Logger(SolicitationService.name);

  async create(createSolicitationDto: any): Promise<any> {
    const createSolicitaion = new this.solicitationModel(createSolicitationDto);

    const save = await createSolicitaion.save();

    this.logger.log('SOLICITAÇÃO CRIADA COM SUCESSO!');

    return save;
  }

  async getSolicitations(id: string): Promise<any> {
    const solicitations = await this.solicitationModel
      .find({ id_professor_orientador: id })
      .populate('id_aluno_solicitante')
      .populate('id_professor_orientador')
      .exec();

    if (solicitations.length === 0) {
      this.logger.warn('NENHUMA SOLICITAÇÃO ENCONTRADA!');

      throw new NotFoundException('Nenhuma solicitação encontrada!');
    }

    this.logger.log('SOLICITAÇÕES BUSCADAS COM SUCESSO!');

    return solicitations;
  }
}
