import { EntityRepository, Repository } from 'typeorm';
import PacienteDispositivoComplexidade from '../domain/paciente-dispositivo-complexidade.entity';

@EntityRepository(PacienteDispositivoComplexidade)
export class PacienteDispositivoComplexidadeRepository extends Repository<PacienteDispositivoComplexidade> {}
