import { EntityRepository, Repository } from 'typeorm';
import Atendimento from '../domain/atendimento.entity';

@EntityRepository(Atendimento)
export class AtendimentoRepository extends Repository<Atendimento> {}
