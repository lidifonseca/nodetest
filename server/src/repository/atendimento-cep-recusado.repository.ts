import { EntityRepository, Repository } from 'typeorm';
import AtendimentoCepRecusado from '../domain/atendimento-cep-recusado.entity';

@EntityRepository(AtendimentoCepRecusado)
export class AtendimentoCepRecusadoRepository extends Repository<AtendimentoCepRecusado> {}
