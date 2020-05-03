import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteEnqueteAppController } from '../web/rest/paciente-enquete-app.controller';
import { PacienteEnqueteAppRepository } from '../repository/paciente-enquete-app.repository';
import { PacienteEnqueteAppService } from '../service/paciente-enquete-app.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteEnqueteAppRepository])],
  controllers: [PacienteEnqueteAppController],
  providers: [PacienteEnqueteAppService],
  exports: [PacienteEnqueteAppService]
})
export class PacienteEnqueteAppModule {}
