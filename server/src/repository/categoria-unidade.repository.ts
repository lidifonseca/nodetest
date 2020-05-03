import { EntityRepository, Repository } from 'typeorm';
import CategoriaUnidade from '../domain/categoria-unidade.entity';

@EntityRepository(CategoriaUnidade)
export class CategoriaUnidadeRepository extends Repository<CategoriaUnidade> {}
