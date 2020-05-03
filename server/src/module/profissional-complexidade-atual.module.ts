import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalComplexidadeAtualController } from '../web/rest/profissional-complexidade-atual.controller';
import { ProfissionalComplexidadeAtualRepository } from '../repository/profissional-complexidade-atual.repository';
import { ProfissionalComplexidadeAtualService } from '../service/profissional-complexidade-atual.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalComplexidadeAtualRepository])],
  controllers: [ProfissionalComplexidadeAtualController],
  providers: [ProfissionalComplexidadeAtualService],
  exports: [ProfissionalComplexidadeAtualService]
})
export class ProfissionalComplexidadeAtualModule {}
