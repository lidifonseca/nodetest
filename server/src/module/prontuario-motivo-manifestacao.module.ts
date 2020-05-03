import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProntuarioMotivoManifestacaoController } from '../web/rest/prontuario-motivo-manifestacao.controller';
import { ProntuarioMotivoManifestacaoRepository } from '../repository/prontuario-motivo-manifestacao.repository';
import { ProntuarioMotivoManifestacaoService } from '../service/prontuario-motivo-manifestacao.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProntuarioMotivoManifestacaoRepository])],
  controllers: [ProntuarioMotivoManifestacaoController],
  providers: [ProntuarioMotivoManifestacaoService],
  exports: [ProntuarioMotivoManifestacaoService]
})
export class ProntuarioMotivoManifestacaoModule {}
