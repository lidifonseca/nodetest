import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertasIndicadoresController } from '../web/rest/alertas-indicadores.controller';
import { AlertasIndicadoresRepository } from '../repository/alertas-indicadores.repository';
import { AlertasIndicadoresService } from '../service/alertas-indicadores.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlertasIndicadoresRepository])],
  controllers: [AlertasIndicadoresController],
  providers: [AlertasIndicadoresService],
  exports: [AlertasIndicadoresService]
})
export class AlertasIndicadoresModule {}
