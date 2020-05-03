import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteComplexidadeAtualController } from '../web/rest/paciente-complexidade-atual.controller';
import { PacienteComplexidadeAtualRepository } from '../repository/paciente-complexidade-atual.repository';
import { PacienteComplexidadeAtualService } from '../service/paciente-complexidade-atual.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteComplexidadeAtualRepository])],
  controllers: [PacienteComplexidadeAtualController],
  providers: [PacienteComplexidadeAtualService],
  exports: [PacienteComplexidadeAtualService]
})
export class PacienteComplexidadeAtualModule {}
