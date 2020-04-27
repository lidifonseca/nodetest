import { EntityRepository, Repository } from 'typeorm';
import Movimentacao from '../domain/movimentacao.entity';

@EntityRepository(Movimentacao)
export class MovimentacaoRepository extends Repository<Movimentacao> {}
