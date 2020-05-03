import { EntityRepository, Repository } from 'typeorm';
import PacienteProntuario from '../domain/paciente-prontuario.entity';

@EntityRepository(PacienteProntuario)
export class PacienteProntuarioRepository extends Repository<PacienteProntuario> {}
