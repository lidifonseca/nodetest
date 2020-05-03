import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndicadoresController } from '../web/rest/indicadores.controller';
import { IndicadoresRepository } from '../repository/indicadores.repository';
import { IndicadoresService } from '../service/indicadores.service';

@Module({
  imports: [TypeOrmModule.forFeature([IndicadoresRepository])],
  controllers: [IndicadoresController],
  providers: [IndicadoresService],
  exports: [IndicadoresService]
})
export class IndicadoresModule {}
