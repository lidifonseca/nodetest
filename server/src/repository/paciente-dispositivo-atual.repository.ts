import { EntityRepository, Repository } from 'typeorm';
import PacienteDispositivoAtual from '../domain/paciente-dispositivo-atual.entity';

@EntityRepository(PacienteDispositivoAtual)
export class PacienteDispositivoAtualRepository extends Repository<PacienteDispositivoAtual> {}
