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

  async getSolicitations(id: string, solicitacao_aceita: string): Promise<any> {
    const solicitations = await this.solicitationModel
      .find({
        $and: [
          { solicitacao_aceita },
          {
            $or: [
              { data_reprovacao: { $exists: false } },
              { data_reprovacao: null },
            ],
          },
          {
            $or: [
              { id_aluno_solicitante: id },
              { id_professor_orientador: id },
            ],
          },
        ],
      })
      .populate('id_aluno_solicitante', 'nome')
      .populate('id_professor_orientador', 'nome')
      .select('nome_projeto descricao')
      .exec();

    if (solicitations.length === 0) {
      this.logger.warn('NENHUMA SOLICITAÇÃO ENCONTRADA!');

      throw new NotFoundException('Nenhuma solicitação encontrada!');
    }

    const formattedData = solicitations.map((solicitation: any) => ({
      id: solicitation._id,
      nome: solicitation.id_aluno_solicitante.nome,
      orientador: solicitation.id_professor_orientador.nome,
      descricao: `Tema: ${solicitation.nome_projeto}`,
      message: solicitation.descricao,
    }));

    this.logger.log('SOLICITAÇÕES BUSCADAS COM SUCESSO!');

    return formattedData;
  }

  async acceptSolicitation(id: string, accept: boolean): Promise<any> {
    const solicitationExists = await this.solicitationModel
      .findOne({ _id: id })
      .exec();

    if (!solicitationExists) {
      throw new NotFoundException(`Solicitação não encontrada!`);
    }

    if (accept) {
      return await this.solicitationModel
        .findOneAndUpdate(
          { _id: id },
          { $set: { solicitacao_aceita: true, data_aprovacao: new Date() } }
        )
        .exec();
    } else {
      return await this.solicitationModel
        .findOneAndUpdate(
          { _id: id },
          { $set: { solicitacao_aceita: false, data_reprovacao: new Date() } }
        )
        .exec();
    }
  }
}
