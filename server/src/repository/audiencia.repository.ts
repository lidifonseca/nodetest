import { EntityRepository, Repository } from 'typeorm';
import Audiencia from '../domain/audiencia.entity';

@EntityRepository(Audiencia)
export class AudienciaRepository extends Repository<Audiencia> {}
