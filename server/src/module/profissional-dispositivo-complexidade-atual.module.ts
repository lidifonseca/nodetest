import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalDispositivoComplexidadeAtualController } from '../web/rest/profissional-dispositivo-complexidade-atual.controller';
import { ProfissionalDispositivoComplexidadeAtualRepository } from '../repository/profissional-dispositivo-complexidade-atual.repository';
import { ProfissionalDispositivoComplexidadeAtualService } from '../service/profissional-dispositivo-complexidade-atual.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalDispositivoComplexidadeAtualRepository])],
  controllers: [ProfissionalDispositivoComplexidadeAtualController],
  providers: [ProfissionalDispositivoComplexidadeAtualService],
  exports: [ProfissionalDispositivoComplexidadeAtualService]
})
export class ProfissionalDispositivoComplexidadeAtualModule {}
