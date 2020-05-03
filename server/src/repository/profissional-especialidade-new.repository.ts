import { EntityRepository, Repository } from 'typeorm';
import ProfissionalEspecialidadeNew from '../domain/profissional-especialidade-new.entity';

@EntityRepository(ProfissionalEspecialidadeNew)
export class ProfissionalEspecialidadeNewRepository extends Repository<ProfissionalEspecialidadeNew> {}
