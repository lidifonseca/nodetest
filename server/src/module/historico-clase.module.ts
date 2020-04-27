import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoricoClaseController } from '../web/rest/historico-clase.controller';
import { HistoricoClaseRepository } from '../repository/historico-clase.repository';
import { HistoricoClaseService } from '../service/historico-clase.service';

@Module({
  imports: [TypeOrmModule.forFeature([HistoricoClaseRepository])],
  controllers: [HistoricoClaseController],
  providers: [HistoricoClaseService],
  exports: [HistoricoClaseService]
})
export class HistoricoClaseModule {}
