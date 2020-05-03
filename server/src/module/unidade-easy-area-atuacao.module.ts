import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadeEasyAreaAtuacaoController } from '../web/rest/unidade-easy-area-atuacao.controller';
import { UnidadeEasyAreaAtuacaoRepository } from '../repository/unidade-easy-area-atuacao.repository';
import { UnidadeEasyAreaAtuacaoService } from '../service/unidade-easy-area-atuacao.service';

@Module({
  imports: [TypeOrmModule.forFeature([UnidadeEasyAreaAtuacaoRepository])],
  controllers: [UnidadeEasyAreaAtuacaoController],
  providers: [UnidadeEasyAreaAtuacaoService],
  exports: [UnidadeEasyAreaAtuacaoService]
})
export class UnidadeEasyAreaAtuacaoModule {}
