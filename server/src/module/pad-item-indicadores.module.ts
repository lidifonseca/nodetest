import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadItemIndicadoresController } from '../web/rest/pad-item-indicadores.controller';
import { PadItemIndicadoresRepository } from '../repository/pad-item-indicadores.repository';
import { PadItemIndicadoresService } from '../service/pad-item-indicadores.service';

@Module({
  imports: [TypeOrmModule.forFeature([PadItemIndicadoresRepository])],
  controllers: [PadItemIndicadoresController],
  providers: [PadItemIndicadoresService],
  exports: [PadItemIndicadoresService]
})
export class PadItemIndicadoresModule {}
