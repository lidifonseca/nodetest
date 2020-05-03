import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteDadosCartaoController } from '../web/rest/paciente-dados-cartao.controller';
import { PacienteDadosCartaoRepository } from '../repository/paciente-dados-cartao.repository';
import { PacienteDadosCartaoService } from '../service/paciente-dados-cartao.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteDadosCartaoRepository])],
  controllers: [PacienteDadosCartaoController],
  providers: [PacienteDadosCartaoService],
  exports: [PacienteDadosCartaoService]
})
export class PacienteDadosCartaoModule {}
