import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadItemResultadoController } from '../web/rest/pad-item-resultado.controller';
import { PadItemResultadoRepository } from '../repository/pad-item-resultado.repository';
import { PadItemResultadoService } from '../service/pad-item-resultado.service';

@Module({
  imports: [TypeOrmModule.forFeature([PadItemResultadoRepository])],
  controllers: [PadItemResultadoController],
  providers: [PadItemResultadoService],
  exports: [PadItemResultadoService]
})
export class PadItemResultadoModule {}
