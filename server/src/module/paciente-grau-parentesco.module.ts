import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteGrauParentescoController } from '../web/rest/paciente-grau-parentesco.controller';
import { PacienteGrauParentescoRepository } from '../repository/paciente-grau-parentesco.repository';
import { PacienteGrauParentescoService } from '../service/paciente-grau-parentesco.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteGrauParentescoRepository])],
  controllers: [PacienteGrauParentescoController],
  providers: [PacienteGrauParentescoService],
  exports: [PacienteGrauParentescoService]
})
export class PacienteGrauParentescoModule {}
