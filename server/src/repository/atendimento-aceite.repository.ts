import { EntityRepository, Repository } from 'typeorm';
import AtendimentoAceite from '../domain/atendimento-aceite.entity';

@EntityRepository(AtendimentoAceite)
export class AtendimentoAceiteRepository extends Repository<AtendimentoAceite> {}
