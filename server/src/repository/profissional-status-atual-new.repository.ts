import { EntityRepository, Repository } from 'typeorm';
import ProfissionalStatusAtualNew from '../domain/profissional-status-atual-new.entity';

@EntityRepository(ProfissionalStatusAtualNew)
export class ProfissionalStatusAtualNewRepository extends Repository<ProfissionalStatusAtualNew> {}
