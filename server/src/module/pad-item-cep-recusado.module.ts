import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadItemCepRecusadoController } from '../web/rest/pad-item-cep-recusado.controller';
import { PadItemCepRecusadoRepository } from '../repository/pad-item-cep-recusado.repository';
import { PadItemCepRecusadoService } from '../service/pad-item-cep-recusado.service';

@Module({
  imports: [TypeOrmModule.forFeature([PadItemCepRecusadoRepository])],
  controllers: [PadItemCepRecusadoController],
  providers: [PadItemCepRecusadoService],
  exports: [PadItemCepRecusadoService]
})
export class PadItemCepRecusadoModule {}
