import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteDispositivoComplexidadeController } from '../web/rest/paciente-dispositivo-complexidade.controller';
import { PacienteDispositivoComplexidadeRepository } from '../repository/paciente-dispositivo-complexidade.repository';
import { PacienteDispositivoComplexidadeService } from '../service/paciente-dispositivo-complexidade.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteDispositivoComplexidadeRepository])],
  controllers: [PacienteDispositivoComplexidadeController],
  providers: [PacienteDispositivoComplexidadeService],
  exports: [PacienteDispositivoComplexidadeService]
})
export class PacienteDispositivoComplexidadeModule {}
