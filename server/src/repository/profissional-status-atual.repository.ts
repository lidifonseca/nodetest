import { EntityRepository, Repository } from 'typeorm';
import ProfissionalStatusAtual from '../domain/profissional-status-atual.entity';

@EntityRepository(ProfissionalStatusAtual)
export class ProfissionalStatusAtualRepository extends Repository<ProfissionalStatusAtual> {}
