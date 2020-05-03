import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusAtualLigacaoController } from '../web/rest/status-atual-ligacao.controller';
import { StatusAtualLigacaoRepository } from '../repository/status-atual-ligacao.repository';
import { StatusAtualLigacaoService } from '../service/status-atual-ligacao.service';

@Module({
  imports: [TypeOrmModule.forFeature([StatusAtualLigacaoRepository])],
  controllers: [StatusAtualLigacaoController],
  providers: [StatusAtualLigacaoService],
  exports: [StatusAtualLigacaoService]
})
export class StatusAtualLigacaoModule {}
