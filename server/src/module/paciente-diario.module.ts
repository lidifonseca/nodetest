import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteDiarioController } from '../web/rest/paciente-diario.controller';
import { PacienteDiarioRepository } from '../repository/paciente-diario.repository';
import { PacienteDiarioService } from '../service/paciente-diario.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteDiarioRepository])],
  controllers: [PacienteDiarioController],
  providers: [PacienteDiarioService],
  exports: [PacienteDiarioService]
})
export class PacienteDiarioModule {}
