import { EntityRepository, Repository } from 'typeorm';
import AtendimentoAtividades from '../domain/atendimento-atividades.entity';

@EntityRepository(AtendimentoAtividades)
export class AtendimentoAtividadesRepository extends Repository<AtendimentoAtividades> {}
