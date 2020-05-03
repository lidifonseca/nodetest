import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalCategoriaContratoController } from '../web/rest/profissional-categoria-contrato.controller';
import { ProfissionalCategoriaContratoRepository } from '../repository/profissional-categoria-contrato.repository';
import { ProfissionalCategoriaContratoService } from '../service/profissional-categoria-contrato.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalCategoriaContratoRepository])],
  controllers: [ProfissionalCategoriaContratoController],
  providers: [ProfissionalCategoriaContratoService],
  exports: [ProfissionalCategoriaContratoService]
})
export class ProfissionalCategoriaContratoModule {}
