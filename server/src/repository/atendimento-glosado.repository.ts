import { EntityRepository, Repository } from 'typeorm';
import AtendimentoGlosado from '../domain/atendimento-glosado.entity';

@EntityRepository(AtendimentoGlosado)
export class AtendimentoGlosadoRepository extends Repository<AtendimentoGlosado> {}
