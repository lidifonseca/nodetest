import { EntityRepository, Repository } from 'typeorm';
import EspecialidadeUnidade from '../domain/especialidade-unidade.entity';

@EntityRepository(EspecialidadeUnidade)
export class EspecialidadeUnidadeRepository extends Repository<EspecialidadeUnidade> {}
