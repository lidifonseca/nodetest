import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteProntuarioController } from '../web/rest/paciente-prontuario.controller';
import { PacienteProntuarioRepository } from '../repository/paciente-prontuario.repository';
import { PacienteProntuarioService } from '../service/paciente-prontuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteProntuarioRepository])],
  controllers: [PacienteProntuarioController],
  providers: [PacienteProntuarioService],
  exports: [PacienteProntuarioService]
})
export class PacienteProntuarioModule {}
