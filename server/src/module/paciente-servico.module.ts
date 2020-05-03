import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteServicoController } from '../web/rest/paciente-servico.controller';
import { PacienteServicoRepository } from '../repository/paciente-servico.repository';
import { PacienteServicoService } from '../service/paciente-servico.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteServicoRepository])],
  controllers: [PacienteServicoController],
  providers: [PacienteServicoService],
  exports: [PacienteServicoService]
})
export class PacienteServicoModule {}
