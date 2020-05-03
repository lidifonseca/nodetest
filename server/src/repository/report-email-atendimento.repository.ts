import { EntityRepository, Repository } from 'typeorm';
import ReportEmailAtendimento from '../domain/report-email-atendimento.entity';

@EntityRepository(ReportEmailAtendimento)
export class ReportEmailAtendimentoRepository extends Repository<ReportEmailAtendimento> {}
