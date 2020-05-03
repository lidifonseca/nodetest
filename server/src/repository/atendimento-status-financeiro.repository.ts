import { EntityRepository, Repository } from 'typeorm';
import AtendimentoStatusFinanceiro from '../domain/atendimento-status-financeiro.entity';

@EntityRepository(AtendimentoStatusFinanceiro)
export class AtendimentoStatusFinanceiroRepository extends Repository<AtendimentoStatusFinanceiro> {}
