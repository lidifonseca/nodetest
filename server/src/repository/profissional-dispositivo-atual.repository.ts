import { EntityRepository, Repository } from 'typeorm';
import ProfissionalDispositivoAtual from '../domain/profissional-dispositivo-atual.entity';

@EntityRepository(ProfissionalDispositivoAtual)
export class ProfissionalDispositivoAtualRepository extends Repository<ProfissionalDispositivoAtual> {}
