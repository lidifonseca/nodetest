import { EntityRepository, Repository } from 'typeorm';
import ProfissionalDispositivoComplexidadeAtual from '../domain/profissional-dispositivo-complexidade-atual.entity';

@EntityRepository(ProfissionalDispositivoComplexidadeAtual)
export class ProfissionalDispositivoComplexidadeAtualRepository extends Repository<ProfissionalDispositivoComplexidadeAtual> {}
