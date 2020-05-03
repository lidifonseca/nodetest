import { EntityRepository, Repository } from 'typeorm';
import StatusFinanceiro from '../domain/status-financeiro.entity';

@EntityRepository(StatusFinanceiro)
export class StatusFinanceiroRepository extends Repository<StatusFinanceiro> {}
