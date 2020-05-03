import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalEspecialidadeNewController } from '../web/rest/profissional-especialidade-new.controller';
import { ProfissionalEspecialidadeNewRepository } from '../repository/profissional-especialidade-new.repository';
import { ProfissionalEspecialidadeNewService } from '../service/profissional-especialidade-new.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalEspecialidadeNewRepository])],
  controllers: [ProfissionalEspecialidadeNewController],
  providers: [ProfissionalEspecialidadeNewService],
  exports: [ProfissionalEspecialidadeNewService]
})
export class ProfissionalEspecialidadeNewModule {}
