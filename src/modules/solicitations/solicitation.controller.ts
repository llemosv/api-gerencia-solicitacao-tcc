import {
  Controller,
  Post,
  Body,
  Get,
  UsePipes,
  ValidationPipe,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePeopleDto } from './dtos/update-people.dto';
import { SolicitationService } from './solicitation.service';

@Controller('api/v1/solicitation')
export class SolicitationController {
  constructor(private readonly solicitationService: SolicitationService) {}

  @Post('')
  //@UseGuards(AuthGuard('jwt'))
  async createSolicitation(@Body() createSolicitationDto: any): Promise<any> {
    const create = await this.solicitationService.create(createSolicitationDto);

    return create;
  }

  @Get(':_id')
  // @UseGuards(AuthGuard('jwt'))
  async update(@Param('_id') _id: string): Promise<any> {
    return await this.solicitationService.getSolicitations(_id);
  }
}
