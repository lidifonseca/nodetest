import { EntityRepository, Repository } from 'typeorm';
import TipoEspecialidade from '../domain/tipo-especialidade.entity';

@EntityRepository(TipoEspecialidade)
export class TipoEspecialidadeRepository extends Repository<TipoEspecialidade> {}
