import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteDiagnosticoController } from '../web/rest/paciente-diagnostico.controller';
import { PacienteDiagnosticoRepository } from '../repository/paciente-diagnostico.repository';
import { PacienteDiagnosticoService } from '../service/paciente-diagnostico.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteDiagnosticoRepository])],
  controllers: [PacienteDiagnosticoController],
  providers: [PacienteDiagnosticoService],
  exports: [PacienteDiagnosticoService]
})
export class PacienteDiagnosticoModule {}
