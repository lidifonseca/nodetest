import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtendimentoImagemController } from '../web/rest/atendimento-imagem.controller';
import { AtendimentoImagemRepository } from '../repository/atendimento-imagem.repository';
import { AtendimentoImagemService } from '../service/atendimento-imagem.service';

@Module({
  imports: [TypeOrmModule.forFeature([AtendimentoImagemRepository])],
  controllers: [AtendimentoImagemController],
  providers: [AtendimentoImagemService],
  exports: [AtendimentoImagemService]
})
export class AtendimentoImagemModule {}
