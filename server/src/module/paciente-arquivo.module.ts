import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteArquivoController } from '../web/rest/paciente-arquivo.controller';
import { PacienteArquivoRepository } from '../repository/paciente-arquivo.repository';
import { PacienteArquivoService } from '../service/paciente-arquivo.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteArquivoRepository])],
  controllers: [PacienteArquivoController],
  providers: [PacienteArquivoService],
  exports: [PacienteArquivoService]
})
export class PacienteArquivoModule {}
