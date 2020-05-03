import { EntityRepository, Repository } from 'typeorm';
import PacienteEnqueteApp from '../domain/paciente-enquete-app.entity';

@EntityRepository(PacienteEnqueteApp)
export class PacienteEnqueteAppRepository extends Repository<PacienteEnqueteApp> {}
