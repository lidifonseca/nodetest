import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteHospitalController } from '../web/rest/paciente-hospital.controller';
import { PacienteHospitalRepository } from '../repository/paciente-hospital.repository';
import { PacienteHospitalService } from '../service/paciente-hospital.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteHospitalRepository])],
  controllers: [PacienteHospitalController],
  providers: [PacienteHospitalService],
  exports: [PacienteHospitalService]
})
export class PacienteHospitalModule {}
