import { EntityRepository, Repository } from 'typeorm';
import PacienteGrauParentesco from '../domain/paciente-grau-parentesco.entity';

@EntityRepository(PacienteGrauParentesco)
export class PacienteGrauParentescoRepository extends Repository<PacienteGrauParentesco> {}
