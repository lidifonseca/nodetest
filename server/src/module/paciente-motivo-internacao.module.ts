import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteMotivoInternacaoController } from '../web/rest/paciente-motivo-internacao.controller';
import { PacienteMotivoInternacaoRepository } from '../repository/paciente-motivo-internacao.repository';
import { PacienteMotivoInternacaoService } from '../service/paciente-motivo-internacao.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteMotivoInternacaoRepository])],
  controllers: [PacienteMotivoInternacaoController],
  providers: [PacienteMotivoInternacaoService],
  exports: [PacienteMotivoInternacaoService]
})
export class PacienteMotivoInternacaoModule {}
