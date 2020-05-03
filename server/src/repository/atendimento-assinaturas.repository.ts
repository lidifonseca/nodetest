import { EntityRepository, Repository } from 'typeorm';
import AtendimentoAssinaturas from '../domain/atendimento-assinaturas.entity';

@EntityRepository(AtendimentoAssinaturas)
export class AtendimentoAssinaturasRepository extends Repository<AtendimentoAssinaturas> {}
