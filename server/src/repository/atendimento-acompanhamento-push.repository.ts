import { EntityRepository, Repository } from 'typeorm';
import AtendimentoAcompanhamentoPush from '../domain/atendimento-acompanhamento-push.entity';

@EntityRepository(AtendimentoAcompanhamentoPush)
export class AtendimentoAcompanhamentoPushRepository extends Repository<AtendimentoAcompanhamentoPush> {}
