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
  Query,
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
  async getSolicitation(
    @Param('_id') _id: string,
    @Query('solicitacao_aceita') solicitacao_aceita: string
  ): Promise<any> {
    return await this.solicitationService.getSolicitations(
      _id,
      solicitacao_aceita
    );
  }

  @Put(':_id')
  @UsePipes(ValidationPipe)
  async accept(
    @Param('_id') _id: string,
    @Body() accept: boolean
  ): Promise<any> {
    await this.solicitationService.acceptSolicitation(_id, accept);
  }
}
