import { EntityRepository, Repository } from 'typeorm';
import StatusAtual from '../domain/status-atual.entity';

@EntityRepository(StatusAtual)
export class StatusAtualRepository extends Repository<StatusAtual> {}
