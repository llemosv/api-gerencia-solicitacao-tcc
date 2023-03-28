import { Controller, Post, Body, Get, Delete, UsePipes, ValidationPipe, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ActingAreaService } from '../services/acting-area.service';
import { PeopleService } from '../services/people.service';

@Controller('api/v1/area')
export class ActingAreaController {
  constructor(private readonly actingAreaService: ActingAreaService) { }

  @Post('createPeopleArea')
  @UsePipes(ValidationPipe)
  async createPeopleArea(@Body() createPeopleAreaDto: any): Promise<any> {
    const create = await this.actingAreaService.createPeopleArea(createPeopleAreaDto);

    return create;
  }

  @Post('createActingArea')
  @UsePipes(ValidationPipe)
  async createActingArea(@Body() createActingAreaDto: any): Promise<any> {
    const createArea = await this.actingAreaService.createActingArea(createActingAreaDto);

    return createArea;
  }

  //@UseGuards(AuthGuard('jwt'))
  @Get('listArea')
  //@UsePipes(ValidationPipe)
  async getAllAreas(): Promise<any> {
    const areas = await this.actingAreaService.getAllAreas();

    return areas;
  }

  @Get('listPeopleArea')
  @UsePipes(ValidationPipe)
  async getAllPeopleAreas(): Promise<any> {
    const areas = await this.actingAreaService.getAllPeopleArea();

    return areas;
  }
}
