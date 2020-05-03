import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtendimentoGlosadoController } from '../web/rest/atendimento-glosado.controller';
import { AtendimentoGlosadoRepository } from '../repository/atendimento-glosado.repository';
import { AtendimentoGlosadoService } from '../service/atendimento-glosado.service';

@Module({
  imports: [TypeOrmModule.forFeature([AtendimentoGlosadoRepository])],
  controllers: [AtendimentoGlosadoController],
  providers: [AtendimentoGlosadoService],
  exports: [AtendimentoGlosadoService]
})
export class AtendimentoGlosadoModule {}
