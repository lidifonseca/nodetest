import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertasResultadosEsperadosController } from '../web/rest/alertas-resultados-esperados.controller';
import { AlertasResultadosEsperadosRepository } from '../repository/alertas-resultados-esperados.repository';
import { AlertasResultadosEsperadosService } from '../service/alertas-resultados-esperados.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlertasResultadosEsperadosRepository])],
  controllers: [AlertasResultadosEsperadosController],
  providers: [AlertasResultadosEsperadosService],
  exports: [AlertasResultadosEsperadosService]
})
export class AlertasResultadosEsperadosModule {}
