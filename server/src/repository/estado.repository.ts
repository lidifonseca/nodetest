import { EntityRepository, Repository } from 'typeorm';
import Estado from '../domain/estado.entity';

@EntityRepository(Estado)
export class EstadoRepository extends Repository<Estado> {}
