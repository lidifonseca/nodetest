import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndicadoresValoresController } from '../web/rest/indicadores-valores.controller';
import { IndicadoresValoresRepository } from '../repository/indicadores-valores.repository';
import { IndicadoresValoresService } from '../service/indicadores-valores.service';

@Module({
  imports: [TypeOrmModule.forFeature([IndicadoresValoresRepository])],
  controllers: [IndicadoresValoresController],
  providers: [IndicadoresValoresService],
  exports: [IndicadoresValoresService]
})
export class IndicadoresValoresModule {}
