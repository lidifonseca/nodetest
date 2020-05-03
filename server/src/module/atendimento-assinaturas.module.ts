import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtendimentoAssinaturasController } from '../web/rest/atendimento-assinaturas.controller';
import { AtendimentoAssinaturasRepository } from '../repository/atendimento-assinaturas.repository';
import { AtendimentoAssinaturasService } from '../service/atendimento-assinaturas.service';

@Module({
  imports: [TypeOrmModule.forFeature([AtendimentoAssinaturasRepository])],
  controllers: [AtendimentoAssinaturasController],
  providers: [AtendimentoAssinaturasService],
  exports: [AtendimentoAssinaturasService]
})
export class AtendimentoAssinaturasModule {}
