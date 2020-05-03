import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SegmentosPerguntasController } from '../web/rest/segmentos-perguntas.controller';
import { SegmentosPerguntasRepository } from '../repository/segmentos-perguntas.repository';
import { SegmentosPerguntasService } from '../service/segmentos-perguntas.service';

@Module({
  imports: [TypeOrmModule.forFeature([SegmentosPerguntasRepository])],
  controllers: [SegmentosPerguntasController],
  providers: [SegmentosPerguntasService],
  exports: [SegmentosPerguntasService]
})
export class SegmentosPerguntasModule {}
