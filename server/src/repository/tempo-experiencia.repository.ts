import { EntityRepository, Repository } from 'typeorm';
import TempoExperiencia from '../domain/tempo-experiencia.entity';

@EntityRepository(TempoExperiencia)
export class TempoExperienciaRepository extends Repository<TempoExperiencia> {}
