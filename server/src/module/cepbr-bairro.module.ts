import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CepbrBairroController } from '../web/rest/cepbr-bairro.controller';
import { CepbrBairroRepository } from '../repository/cepbr-bairro.repository';
import { CepbrBairroService } from '../service/cepbr-bairro.service';

@Module({
  imports: [TypeOrmModule.forFeature([CepbrBairroRepository])],
  controllers: [CepbrBairroController],
  providers: [CepbrBairroService],
  exports: [CepbrBairroService]
})
export class CepbrBairroModule {}
