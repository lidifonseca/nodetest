import { EntityRepository, Repository } from 'typeorm';
import PacienteCaracteristicaAtual from '../domain/paciente-caracteristica-atual.entity';

@EntityRepository(PacienteCaracteristicaAtual)
export class PacienteCaracteristicaAtualRepository extends Repository<PacienteCaracteristicaAtual> {}
