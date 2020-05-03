import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalStatusAtualNewController } from '../web/rest/profissional-status-atual-new.controller';
import { ProfissionalStatusAtualNewRepository } from '../repository/profissional-status-atual-new.repository';
import { ProfissionalStatusAtualNewService } from '../service/profissional-status-atual-new.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalStatusAtualNewRepository])],
  controllers: [ProfissionalStatusAtualNewController],
  providers: [ProfissionalStatusAtualNewService],
  exports: [ProfissionalStatusAtualNewService]
})
export class ProfissionalStatusAtualNewModule {}
