import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteDispositivoAtualController } from '../web/rest/paciente-dispositivo-atual.controller';
import { PacienteDispositivoAtualRepository } from '../repository/paciente-dispositivo-atual.repository';
import { PacienteDispositivoAtualService } from '../service/paciente-dispositivo-atual.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteDispositivoAtualRepository])],
  controllers: [PacienteDispositivoAtualController],
  providers: [PacienteDispositivoAtualService],
  exports: [PacienteDispositivoAtualService]
})
export class PacienteDispositivoAtualModule {}
