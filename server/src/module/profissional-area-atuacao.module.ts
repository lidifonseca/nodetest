import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalAreaAtuacaoController } from '../web/rest/profissional-area-atuacao.controller';
import { ProfissionalAreaAtuacaoRepository } from '../repository/profissional-area-atuacao.repository';
import { ProfissionalAreaAtuacaoService } from '../service/profissional-area-atuacao.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalAreaAtuacaoRepository])],
  controllers: [ProfissionalAreaAtuacaoController],
  providers: [ProfissionalAreaAtuacaoService],
  exports: [ProfissionalAreaAtuacaoService]
})
export class ProfissionalAreaAtuacaoModule {}
