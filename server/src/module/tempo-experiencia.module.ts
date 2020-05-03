import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempoExperienciaController } from '../web/rest/tempo-experiencia.controller';
import { TempoExperienciaRepository } from '../repository/tempo-experiencia.repository';
import { TempoExperienciaService } from '../service/tempo-experiencia.service';

@Module({
  imports: [TypeOrmModule.forFeature([TempoExperienciaRepository])],
  controllers: [TempoExperienciaController],
  providers: [TempoExperienciaService],
  exports: [TempoExperienciaService]
})
export class TempoExperienciaModule {}
