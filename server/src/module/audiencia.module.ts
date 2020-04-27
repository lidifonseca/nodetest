import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudienciaController } from '../web/rest/audiencia.controller';
import { AudienciaRepository } from '../repository/audiencia.repository';
import { AudienciaService } from '../service/audiencia.service';

@Module({
  imports: [TypeOrmModule.forFeature([AudienciaRepository])],
  controllers: [AudienciaController],
  providers: [AudienciaService],
  exports: [AudienciaService]
})
export class AudienciaModule {}
