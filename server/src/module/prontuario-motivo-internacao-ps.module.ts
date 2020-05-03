import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProntuarioMotivoInternacaoPsController } from '../web/rest/prontuario-motivo-internacao-ps.controller';
import { ProntuarioMotivoInternacaoPsRepository } from '../repository/prontuario-motivo-internacao-ps.repository';
import { ProntuarioMotivoInternacaoPsService } from '../service/prontuario-motivo-internacao-ps.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProntuarioMotivoInternacaoPsRepository])],
  controllers: [ProntuarioMotivoInternacaoPsController],
  providers: [ProntuarioMotivoInternacaoPsService],
  exports: [ProntuarioMotivoInternacaoPsService]
})
export class ProntuarioMotivoInternacaoPsModule {}
