import { EntityRepository, Repository } from 'typeorm';
import AtendimentoSorteioFeito from '../domain/atendimento-sorteio-feito.entity';

@EntityRepository(AtendimentoSorteioFeito)
export class AtendimentoSorteioFeitoRepository extends Repository<AtendimentoSorteioFeito> {}
