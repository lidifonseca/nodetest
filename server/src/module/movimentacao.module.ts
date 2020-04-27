import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimentacaoController } from '../web/rest/movimentacao.controller';
import { MovimentacaoRepository } from '../repository/movimentacao.repository';
import { MovimentacaoService } from '../service/movimentacao.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovimentacaoRepository])],
  controllers: [MovimentacaoController],
  providers: [MovimentacaoService],
  exports: [MovimentacaoService]
})
export class MovimentacaoModule {}
