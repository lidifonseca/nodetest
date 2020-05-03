import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEmailAtendimentoController } from '../web/rest/report-email-atendimento.controller';
import { ReportEmailAtendimentoRepository } from '../repository/report-email-atendimento.repository';
import { ReportEmailAtendimentoService } from '../service/report-email-atendimento.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReportEmailAtendimentoRepository])],
  controllers: [ReportEmailAtendimentoController],
  providers: [ReportEmailAtendimentoService],
  exports: [ReportEmailAtendimentoService]
})
export class ReportEmailAtendimentoModule {}
