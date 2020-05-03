import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CepbrEstadoController } from '../web/rest/cepbr-estado.controller';
import { CepbrEstadoRepository } from '../repository/cepbr-estado.repository';
import { CepbrEstadoService } from '../service/cepbr-estado.service';

@Module({
  imports: [TypeOrmModule.forFeature([CepbrEstadoRepository])],
  controllers: [CepbrEstadoController],
  providers: [CepbrEstadoService],
  exports: [CepbrEstadoService]
})
export class CepbrEstadoModule {}
