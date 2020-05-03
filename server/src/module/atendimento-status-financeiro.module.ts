import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtendimentoStatusFinanceiroController } from '../web/rest/atendimento-status-financeiro.controller';
import { AtendimentoStatusFinanceiroRepository } from '../repository/atendimento-status-financeiro.repository';
import { AtendimentoStatusFinanceiroService } from '../service/atendimento-status-financeiro.service';

@Module({
  imports: [TypeOrmModule.forFeature([AtendimentoStatusFinanceiroRepository])],
  controllers: [AtendimentoStatusFinanceiroController],
  providers: [AtendimentoStatusFinanceiroService],
  exports: [AtendimentoStatusFinanceiroService]
})
export class AtendimentoStatusFinanceiroModule {}
