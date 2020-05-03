import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalHorarioController } from '../web/rest/profissional-horario.controller';
import { ProfissionalHorarioRepository } from '../repository/profissional-horario.repository';
import { ProfissionalHorarioService } from '../service/profissional-horario.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalHorarioRepository])],
  controllers: [ProfissionalHorarioController],
  providers: [ProfissionalHorarioService],
  exports: [ProfissionalHorarioService]
})
export class ProfissionalHorarioModule {}
