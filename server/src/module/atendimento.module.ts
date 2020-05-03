import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtendimentoController } from '../web/rest/atendimento.controller';
import { AtendimentoRepository } from '../repository/atendimento.repository';
import { AtendimentoService } from '../service/atendimento.service';

@Module({
  imports: [TypeOrmModule.forFeature([AtendimentoRepository])],
  controllers: [AtendimentoController],
  providers: [AtendimentoService],
  exports: [AtendimentoService]
})
export class AtendimentoModule {}
