import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteDiagnosticoTempController } from '../web/rest/paciente-diagnostico-temp.controller';
import { PacienteDiagnosticoTempRepository } from '../repository/paciente-diagnostico-temp.repository';
import { PacienteDiagnosticoTempService } from '../service/paciente-diagnostico-temp.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteDiagnosticoTempRepository])],
  controllers: [PacienteDiagnosticoTempController],
  providers: [PacienteDiagnosticoTempService],
  exports: [PacienteDiagnosticoTempService]
})
export class PacienteDiagnosticoTempModule {}
