import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalNewController } from '../web/rest/profissional-new.controller';
import { ProfissionalNewRepository } from '../repository/profissional-new.repository';
import { ProfissionalNewService } from '../service/profissional-new.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalNewRepository])],
  controllers: [ProfissionalNewController],
  providers: [ProfissionalNewService],
  exports: [ProfissionalNewService]
})
export class ProfissionalNewModule {}
