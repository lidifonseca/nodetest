import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicaoCasaEvolucaoController } from '../web/rest/licao-casa-evolucao.controller';
import { LicaoCasaEvolucaoRepository } from '../repository/licao-casa-evolucao.repository';
import { LicaoCasaEvolucaoService } from '../service/licao-casa-evolucao.service';

@Module({
  imports: [TypeOrmModule.forFeature([LicaoCasaEvolucaoRepository])],
  controllers: [LicaoCasaEvolucaoController],
  providers: [LicaoCasaEvolucaoService],
  exports: [LicaoCasaEvolucaoService]
})
export class LicaoCasaEvolucaoModule {}
