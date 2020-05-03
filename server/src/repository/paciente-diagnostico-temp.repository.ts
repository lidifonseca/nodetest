import { EntityRepository, Repository } from 'typeorm';
import PacienteDiagnosticoTemp from '../domain/paciente-diagnostico-temp.entity';

@EntityRepository(PacienteDiagnosticoTemp)
export class PacienteDiagnosticoTempRepository extends Repository<PacienteDiagnosticoTemp> {}
