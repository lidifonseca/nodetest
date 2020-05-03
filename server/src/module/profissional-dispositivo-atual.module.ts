import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalDispositivoAtualController } from '../web/rest/profissional-dispositivo-atual.controller';
import { ProfissionalDispositivoAtualRepository } from '../repository/profissional-dispositivo-atual.repository';
import { ProfissionalDispositivoAtualService } from '../service/profissional-dispositivo-atual.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalDispositivoAtualRepository])],
  controllers: [ProfissionalDispositivoAtualController],
  providers: [ProfissionalDispositivoAtualService],
  exports: [ProfissionalDispositivoAtualService]
})
export class ProfissionalDispositivoAtualModule {}
