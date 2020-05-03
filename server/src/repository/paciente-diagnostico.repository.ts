import { EntityRepository, Repository } from 'typeorm';
import PacienteDiagnostico from '../domain/paciente-diagnostico.entity';

@EntityRepository(PacienteDiagnostico)
export class PacienteDiagnosticoRepository extends Repository<PacienteDiagnostico> {}
