import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoPreferenciaAtendimentoController } from '../web/rest/tipo-preferencia-atendimento.controller';
import { TipoPreferenciaAtendimentoRepository } from '../repository/tipo-preferencia-atendimento.repository';
import { TipoPreferenciaAtendimentoService } from '../service/tipo-preferencia-atendimento.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoPreferenciaAtendimentoRepository])],
  controllers: [TipoPreferenciaAtendimentoController],
  providers: [TipoPreferenciaAtendimentoService],
  exports: [TipoPreferenciaAtendimentoService]
})
export class TipoPreferenciaAtendimentoModule {}
