import { EntityRepository, Repository } from 'typeorm';
import PacienteStatusAtual from '../domain/paciente-status-atual.entity';

@EntityRepository(PacienteStatusAtual)
export class PacienteStatusAtualRepository extends Repository<PacienteStatusAtual> {}
