import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidenteController } from '../web/rest/incidente.controller';
import { IncidenteRepository } from '../repository/incidente.repository';
import { IncidenteService } from '../service/incidente.service';

@Module({
  imports: [TypeOrmModule.forFeature([IncidenteRepository])],
  controllers: [IncidenteController],
  providers: [IncidenteService],
  exports: [IncidenteService]
})
export class IncidenteModule {}
