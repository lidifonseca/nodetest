import { EntityRepository, Repository } from 'typeorm';
import ProfissionalDispositivoComplexidade from '../domain/profissional-dispositivo-complexidade.entity';

@EntityRepository(ProfissionalDispositivoComplexidade)
export class ProfissionalDispositivoComplexidadeRepository extends Repository<ProfissionalDispositivoComplexidade> {}
