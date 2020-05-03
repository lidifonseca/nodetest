import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProntuarioTipoMotivoController } from '../web/rest/prontuario-tipo-motivo.controller';
import { ProntuarioTipoMotivoRepository } from '../repository/prontuario-tipo-motivo.repository';
import { ProntuarioTipoMotivoService } from '../service/prontuario-tipo-motivo.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProntuarioTipoMotivoRepository])],
  controllers: [ProntuarioTipoMotivoController],
  providers: [ProntuarioTipoMotivoService],
  exports: [ProntuarioTipoMotivoService]
})
export class ProntuarioTipoMotivoModule {}
