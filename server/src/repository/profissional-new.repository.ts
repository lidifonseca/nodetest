import { EntityRepository, Repository } from 'typeorm';
import ProfissionalNew from '../domain/profissional-new.entity';

@EntityRepository(ProfissionalNew)
export class ProfissionalNewRepository extends Repository<ProfissionalNew> {}
