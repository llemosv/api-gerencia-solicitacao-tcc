import { Model } from 'mongoose';

import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { People } from '../interfaces/people.interface';
import { LoginDto } from '../dtos/login.dto';

import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(@InjectModel('People') private readonly peopleModel: Model<People>) { }

  private readonly logger = new Logger(LoginService.name);

  private readonly jwtSecret: string = String(process.env.JWT_SECRET_KEY);

  async generateToken(payload: any, user: any) {
    const people = {
      name: user.nome,
      email: payload.email,
    };
    return {
      user: people,
      token: jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' }),
    };
  }

  async validateUser(loginDTO: LoginDto) {
    const { email } = loginDTO;

    const peopleExists = await this.peopleModel.findOne({ email }).exec();

    if (!peopleExists) {
      throw new NotFoundException(`Usuário não encontrado.`);
    }

    const passwordIsOk = bcrypt.compareSync(loginDTO.senha, peopleExists.senha);

    if (!passwordIsOk) throw new BadRequestException('Senha Incorreta.');

    return peopleExists;
  }
}
