import { EntityRepository, Repository } from 'typeorm';
import StatusAtendimento from '../domain/status-atendimento.entity';

@EntityRepository(StatusAtendimento)
export class StatusAtendimentoRepository extends Repository<StatusAtendimento> {}
