import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProntuarioTipoManifestacaoController } from '../web/rest/prontuario-tipo-manifestacao.controller';
import { ProntuarioTipoManifestacaoRepository } from '../repository/prontuario-tipo-manifestacao.repository';
import { ProntuarioTipoManifestacaoService } from '../service/prontuario-tipo-manifestacao.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProntuarioTipoManifestacaoRepository])],
  controllers: [ProntuarioTipoManifestacaoController],
  providers: [ProntuarioTipoManifestacaoService],
  exports: [ProntuarioTipoManifestacaoService]
})
export class ProntuarioTipoManifestacaoModule {}
