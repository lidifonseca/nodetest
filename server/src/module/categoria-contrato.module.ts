import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaContratoController } from '../web/rest/categoria-contrato.controller';
import { CategoriaContratoRepository } from '../repository/categoria-contrato.repository';
import { CategoriaContratoService } from '../service/categoria-contrato.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaContratoRepository])],
  controllers: [CategoriaContratoController],
  providers: [CategoriaContratoService],
  exports: [CategoriaContratoService]
})
export class CategoriaContratoModule {}
