import { EntityRepository, Repository } from 'typeorm';
import TipoUnidade from '../domain/tipo-unidade.entity';

@EntityRepository(TipoUnidade)
export class TipoUnidadeRepository extends Repository<TipoUnidade> {}
