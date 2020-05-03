import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientePedidoController } from '../web/rest/paciente-pedido.controller';
import { PacientePedidoRepository } from '../repository/paciente-pedido.repository';
import { PacientePedidoService } from '../service/paciente-pedido.service';

@Module({
  imports: [TypeOrmModule.forFeature([PacientePedidoRepository])],
  controllers: [PacientePedidoController],
  providers: [PacientePedidoService],
  exports: [PacientePedidoService]
})
export class PacientePedidoModule {}
