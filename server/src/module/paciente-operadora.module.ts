import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteOperadoraController } from '../web/rest/paciente-operadora.controller';
import { PacienteOperadoraRepository } from '../repository/paciente-operadora.repository';
import { PacienteOperadoraService } from '../service/paciente-operadora.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteOperadoraRepository])],
  controllers: [PacienteOperadoraController],
  providers: [PacienteOperadoraService],
  exports: [PacienteOperadoraService]
})
export class PacienteOperadoraModule {}
