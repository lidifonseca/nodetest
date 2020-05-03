import { EntityRepository, Repository } from 'typeorm';
import ProfissionalEspecialidade from '../domain/profissional-especialidade.entity';

@EntityRepository(ProfissionalEspecialidade)
export class ProfissionalEspecialidadeRepository extends Repository<ProfissionalEspecialidade> {}
