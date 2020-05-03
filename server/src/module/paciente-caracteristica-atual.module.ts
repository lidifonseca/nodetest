import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteCaracteristicaAtualController } from '../web/rest/paciente-caracteristica-atual.controller';
import { PacienteCaracteristicaAtualRepository } from '../repository/paciente-caracteristica-atual.repository';
import { PacienteCaracteristicaAtualService } from '../service/paciente-caracteristica-atual.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteCaracteristicaAtualRepository])],
  controllers: [PacienteCaracteristicaAtualController],
  providers: [PacienteCaracteristicaAtualService],
  exports: [PacienteCaracteristicaAtualService]
})
export class PacienteCaracteristicaAtualModule {}
