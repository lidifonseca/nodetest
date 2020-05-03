import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalController } from '../web/rest/profissional.controller';
import { ProfissionalRepository } from '../repository/profissional.repository';
import { ProfissionalService } from '../service/profissional.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalRepository])],
  controllers: [ProfissionalController],
  providers: [ProfissionalService],
  exports: [ProfissionalService]
})
export class ProfissionalModule {}
