import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteStatusAtualController } from '../web/rest/paciente-status-atual.controller';
import { PacienteStatusAtualRepository } from '../repository/paciente-status-atual.repository';
import { PacienteStatusAtualService } from '../service/paciente-status-atual.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteStatusAtualRepository])],
  controllers: [PacienteStatusAtualController],
  providers: [PacienteStatusAtualService],
  exports: [PacienteStatusAtualService]
})
export class PacienteStatusAtualModule {}
