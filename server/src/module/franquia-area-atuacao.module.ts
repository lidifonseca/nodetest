import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FranquiaAreaAtuacaoController } from '../web/rest/franquia-area-atuacao.controller';
import { FranquiaAreaAtuacaoRepository } from '../repository/franquia-area-atuacao.repository';
import { FranquiaAreaAtuacaoService } from '../service/franquia-area-atuacao.service';

@Module({
  imports: [TypeOrmModule.forFeature([FranquiaAreaAtuacaoRepository])],
  controllers: [FranquiaAreaAtuacaoController],
  providers: [FranquiaAreaAtuacaoService],
  exports: [FranquiaAreaAtuacaoService]
})
export class FranquiaAreaAtuacaoModule {}
