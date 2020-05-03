import { EntityRepository, Repository } from 'typeorm';
import PacienteHospital from '../domain/paciente-hospital.entity';

@EntityRepository(PacienteHospital)
export class PacienteHospitalRepository extends Repository<PacienteHospital> {}
