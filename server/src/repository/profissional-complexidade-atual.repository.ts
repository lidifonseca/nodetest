import { EntityRepository, Repository } from 'typeorm';
import ProfissionalComplexidadeAtual from '../domain/profissional-complexidade-atual.entity';

@EntityRepository(ProfissionalComplexidadeAtual)
export class ProfissionalComplexidadeAtualRepository extends Repository<ProfissionalComplexidadeAtual> {}
