import { EntityRepository, Repository } from 'typeorm';
import Incidente from '../domain/incidente.entity';

@EntityRepository(Incidente)
export class IncidenteRepository extends Repository<Incidente> {}
