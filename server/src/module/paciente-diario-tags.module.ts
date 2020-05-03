import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteDiarioTagsController } from '../web/rest/paciente-diario-tags.controller';
import { PacienteDiarioTagsRepository } from '../repository/paciente-diario-tags.repository';
import { PacienteDiarioTagsService } from '../service/paciente-diario-tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteDiarioTagsRepository])],
  controllers: [PacienteDiarioTagsController],
  providers: [PacienteDiarioTagsService],
  exports: [PacienteDiarioTagsService]
})
export class PacienteDiarioTagsModule {}
