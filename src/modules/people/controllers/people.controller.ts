import { Controller, Post, Body, Get, Delete, UsePipes, ValidationPipe, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { UpdatePeopleDto } from '../dtos/update-people.dto';

import { PeopleService } from '../services/people.service';

@Controller('api/v1/people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) { }

  @Post('createPeopleType')
  @UsePipes(ValidationPipe)
  async createPeopleType(@Body() createPeopleTypeDto: any): Promise<any> {
    const createType = await this.peopleService.createPeopleType(createPeopleTypeDto);

    return createType;
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async create(@Body() createPeopleDto: any): Promise<any> {
    const create = await this.peopleService.create(createPeopleDto);

    return create;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  async getAll(): Promise<any> {
    const search = await this.peopleService.getAllPlayers();
    return search;
  }

  @Put('update/:_id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
    @Body() updatePeopleDto: UpdatePeopleDto,
  ): Promise<any> {
    await this.peopleService.updatePeople(_id, updatePeopleDto);
  }
}
