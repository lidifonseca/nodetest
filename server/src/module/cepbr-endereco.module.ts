import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CepbrEnderecoController } from '../web/rest/cepbr-endereco.controller';
import { CepbrEnderecoRepository } from '../repository/cepbr-endereco.repository';
import { CepbrEnderecoService } from '../service/cepbr-endereco.service';

@Module({
  imports: [TypeOrmModule.forFeature([CepbrEnderecoRepository])],
  controllers: [CepbrEnderecoController],
  providers: [CepbrEnderecoService],
  exports: [CepbrEnderecoService]
})
export class CepbrEnderecoModule {}
