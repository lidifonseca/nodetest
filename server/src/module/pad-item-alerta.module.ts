import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadItemAlertaController } from '../web/rest/pad-item-alerta.controller';
import { PadItemAlertaRepository } from '../repository/pad-item-alerta.repository';
import { PadItemAlertaService } from '../service/pad-item-alerta.service';

@Module({
  imports: [TypeOrmModule.forFeature([PadItemAlertaRepository])],
  controllers: [PadItemAlertaController],
  providers: [PadItemAlertaService],
  exports: [PadItemAlertaService]
})
export class PadItemAlertaModule {}
