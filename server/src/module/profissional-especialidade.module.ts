import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalEspecialidadeController } from '../web/rest/profissional-especialidade.controller';
import { ProfissionalEspecialidadeRepository } from '../repository/profissional-especialidade.repository';
import { ProfissionalEspecialidadeService } from '../service/profissional-especialidade.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalEspecialidadeRepository])],
  controllers: [ProfissionalEspecialidadeController],
  providers: [ProfissionalEspecialidadeService],
  exports: [ProfissionalEspecialidadeService]
})
export class ProfissionalEspecialidadeModule {}
