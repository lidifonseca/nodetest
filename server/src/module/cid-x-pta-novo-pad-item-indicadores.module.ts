import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CidXPtaNovoPadItemIndicadoresController } from '../web/rest/cid-x-pta-novo-pad-item-indicadores.controller';
import { CidXPtaNovoPadItemIndicadoresRepository } from '../repository/cid-x-pta-novo-pad-item-indicadores.repository';
import { CidXPtaNovoPadItemIndicadoresService } from '../service/cid-x-pta-novo-pad-item-indicadores.service';

@Module({
  imports: [TypeOrmModule.forFeature([CidXPtaNovoPadItemIndicadoresRepository])],
  controllers: [CidXPtaNovoPadItemIndicadoresController],
  providers: [CidXPtaNovoPadItemIndicadoresService],
  exports: [CidXPtaNovoPadItemIndicadoresService]
})
export class CidXPtaNovoPadItemIndicadoresModule {}
