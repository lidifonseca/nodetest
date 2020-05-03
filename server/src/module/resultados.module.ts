import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultadosController } from '../web/rest/resultados.controller';
import { ResultadosRepository } from '../repository/resultados.repository';
import { ResultadosService } from '../service/resultados.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResultadosRepository])],
  controllers: [ResultadosController],
  providers: [ResultadosService],
  exports: [ResultadosService]
})
export class ResultadosModule {}
