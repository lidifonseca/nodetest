import { EntityRepository, Repository } from 'typeorm';
import PacienteOperadora from '../domain/paciente-operadora.entity';

@EntityRepository(PacienteOperadora)
export class PacienteOperadoraRepository extends Repository<PacienteOperadora> {}
