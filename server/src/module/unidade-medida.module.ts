import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadeMedidaController } from '../web/rest/unidade-medida.controller';
import { UnidadeMedidaRepository } from '../repository/unidade-medida.repository';
import { UnidadeMedidaService } from '../service/unidade-medida.service';

@Module({
  imports: [TypeOrmModule.forFeature([UnidadeMedidaRepository])],
  controllers: [UnidadeMedidaController],
  providers: [UnidadeMedidaService],
  exports: [UnidadeMedidaService]
})
export class UnidadeMedidaModule {}
