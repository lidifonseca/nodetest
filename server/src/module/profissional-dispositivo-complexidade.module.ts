import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalDispositivoComplexidadeController } from '../web/rest/profissional-dispositivo-complexidade.controller';
import { ProfissionalDispositivoComplexidadeRepository } from '../repository/profissional-dispositivo-complexidade.repository';
import { ProfissionalDispositivoComplexidadeService } from '../service/profissional-dispositivo-complexidade.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalDispositivoComplexidadeRepository])],
  controllers: [ProfissionalDispositivoComplexidadeController],
  providers: [ProfissionalDispositivoComplexidadeService],
  exports: [ProfissionalDispositivoComplexidadeService]
})
export class ProfissionalDispositivoComplexidadeModule {}
