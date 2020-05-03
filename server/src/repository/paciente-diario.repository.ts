import { EntityRepository, Repository } from 'typeorm';
import PacienteDiario from '../domain/paciente-diario.entity';

@EntityRepository(PacienteDiario)
export class PacienteDiarioRepository extends Repository<PacienteDiario> {}
