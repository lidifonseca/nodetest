import { EntityRepository, Repository } from 'typeorm';
import PacienteComplexidadeAtual from '../domain/paciente-complexidade-atual.entity';

@EntityRepository(PacienteComplexidadeAtual)
export class PacienteComplexidadeAtualRepository extends Repository<PacienteComplexidadeAtual> {}
