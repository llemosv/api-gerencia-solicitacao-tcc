import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SolicitationSchema } from './interfaces/schemas/solicitationschema';
import { SolicitationController } from './solicitation.controller';
import { SolicitationService } from './solicitation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Solicitation', schema: SolicitationSchema },
    ]),
  ],
  controllers: [SolicitationController],
  providers: [SolicitationService],
  exports: [],
})
export class SolicitationModule {}
