import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalStatusAtualController } from '../web/rest/profissional-status-atual.controller';
import { ProfissionalStatusAtualRepository } from '../repository/profissional-status-atual.repository';
import { ProfissionalStatusAtualService } from '../service/profissional-status-atual.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalStatusAtualRepository])],
  controllers: [ProfissionalStatusAtualController],
  providers: [ProfissionalStatusAtualService],
  exports: [ProfissionalStatusAtualService]
})
export class ProfissionalStatusAtualModule {}
