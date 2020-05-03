import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalFranquiaController } from '../web/rest/profissional-franquia.controller';
import { ProfissionalFranquiaRepository } from '../repository/profissional-franquia.repository';
import { ProfissionalFranquiaService } from '../service/profissional-franquia.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalFranquiaRepository])],
  controllers: [ProfissionalFranquiaController],
  providers: [ProfissionalFranquiaService],
  exports: [ProfissionalFranquiaService]
})
export class ProfissionalFranquiaModule {}
