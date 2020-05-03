import { EntityRepository, Repository } from 'typeorm';
import ProfissionalFranquia from '../domain/profissional-franquia.entity';

@EntityRepository(ProfissionalFranquia)
export class ProfissionalFranquiaRepository extends Repository<ProfissionalFranquia> {}
